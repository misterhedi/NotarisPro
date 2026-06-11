export const PRISMA_SCHEMA = `// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  NOTARIS
  STAFF
}

enum DocumentStatus {
  DRAF
  VERIFIKASI
  SIGNED
  TERDAFTAR
}

model User {
  id           String        @id @default(uuid())
  email        String        @unique
  passwordHash String
  nama         String
  role         Role          @default(STAFF)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  logs         ActivityLog[]
}

model Client {
  id         String     @id @default(uuid())
  nama       String
  email      String     @unique
  telepon    String
  instansi   String?
  alamat     String
  npwp       String?
  nik        String     @unique
  documents  Document[]
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
}

model Document {
  id               String         @id @default(uuid())
  nama             String
  tipe             String         // e.g. "Akta Pendirian PT", "CV", "Waris"
  content          String?        @db.Text
  status           DocumentStatus @default(DRAF)
  version          Int            @default(1)
  digitalSignature Boolean        @default(false)
  client           Client         @relation(fields: [clientId], references: [id], onDelete: Cascade)
  clientId         String
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt
}

model ActivityLog {
  id        String   @id @default(uuid())
  userId    String?
  user      User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  username  String   // Fallback nama user jika model dihapus
  action    String   // e.g. "LOGIN", "GENERATE_AKTA", "DELETE_CLIENT"
  detail    String   @db.Text
  ipAddress String
  timestamp DateTime @default(now())
}
`;

export const DOCKER_CONFIG = `# ----- Dockerfile -----
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000
CMD ["npm", "run", "start"]

# ----- docker-compose.yml -----
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://notaris_usr:notaris_pw@db:5432/notaris_db?schema=public
      - JWT_SECRET=supersecretnotarykey2026
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: notaris_usr
      POSTGRES_PASSWORD: notaris_pw
      POSTGRES_DB: notaris_db
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata:
`;

export const NGINX_CONFIG = `# /etc/nginx/sites-available/notaris-saas.conf
server {
    listen 80;
    server_name portal.notarisindonesia.id;
    return 301 https://$host$request_uri; # Redirect otomatis ke HTTPS-SSL
}

server {
    listen 443 ssl http2;
    server_name portal.notarisindonesia.id;

    # SSL Configuration (Let's Encrypt Certbot)
    ssl_certificate /etc/letsencrypt/live/portal.notarisindonesia.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/portal.notarisindonesia.id/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "upgrade-insecure-requests" always;

    location / {
        proxy_pass http://localhost:3000; # Mengarah ke kontainer Docker atau App Port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Optimasi Upload Dokumen Besar (Maks 15MB)
    client_max_body_size 15M;
}
`;

export const API_SPEC = `// RESTful API Spec (Express.js structure)
// Base URL: /api

1. AUTHENTICATION
   - POST /api/auth/register -> Registrasi User (Admin/Staff)
   - POST /api/auth/login    -> Login User (JWT token)
   - GET  /api/auth/me       -> Periksa token, kembalikan role pengguna

2. MANAJEMEN KLIEN (CRUD)
   - GET    /api/clients        -> List semua klien (dukungan pagination & filter)
   - POST   /api/clients        -> Pembuatan profil klien baru (nama, NIK, alamat)
   - GET    /api/clients/:id    -> Detail klien beserta riwayat akta
   - PUT    /api/clients/:id    -> Sunting informasi klien
   - DELETE /api/clients/:id    -> Hapus data klien

3. SISTEM DOKUMEN & VERSI
   - GET    /api/documents        -> List dokumen diarsipkan
   - POST   /api/documents        -> Buat entri draf akta manual / via PDF upload
   - GET    /api/documents/:id    -> Dapatkan detail konten & histori revisi
   - PATCH  /api/documents/:id    -> Perbarui status akta (Draf -> Verifikasi -> Signed -> Diarsipkan)
   - POST   /api/documents/:id/sign -> Sematkan tanda tangan digital (basic SHA256)

4. ASISTEN AI INTELEGENT (Gemini 2026 Engine)
   - POST   /api/ai/draft         -> Input metadata, hasilkan draf akta Notaris lengkap
   - POST   /api/ai/summarize     -> Ringkasan hukum teks rumit
   - POST   /api/ai/analyze-risks -> Pengecekan risiko keamanan hukum & saran amandemen

5. AKTIVITAS & AUDIT LOG
   - GET    /api/logs             -> Pelacak audit perubahan data oleh staf (Khusus Admin/Notaris)
`;

export const BACKUP_SCRIPT = `#!/bin/bash
# /scripts/backup_db.sh
# Amankan database Anda dengan Backup Otomatis Harian ke Folder Lokal / Cloud S3

BACKUP_DIR="/var/backups/notaris-postgres"
DATABASE_NAME="notaris_db"
DB_USER="notaris_usr"
DATE=$(date +%Y-%m-%d_%H%M%S)
BACKUP_FILENAME="$DATABASE_NAME-backup-$DATE.sql"

# Buat direktori jika belum tersedia
mkdir -p "$BACKUP_DIR"

echo "Memulai pencadangan database [$DATABASE_NAME]..."

# Eksekusi pg_dump via Docker PG
docker exec -t $(docker ps -qf "name=db") pg_dump -U $DB_USER $DATABASE_NAME > "$BACKUP_DIR/$BACKUP_FILENAME"

# Kompresi file (.gz)
gzip "$BACKUP_DIR/$BACKUP_FILENAME"

echo "Backup berhasil disimpan di: $BACKUP_DIR/$BACKUP_FILENAME.gz"

# Bersihkan cadangan yang berumur lebih dari 30 hari
find "$BACKUP_DIR" -type f -mtime +30 -name "*.sql.gz" -exec rm {} \\;
echo "Pembersihan berkas backup lama selesai!"
`;

export const INSTALL_GUIDE_MD = `## 💻 PANDUAN INSTALASI & MENJALANKAN DI VPS / LOKAL

### PRASYARAT (Lokal):
- Node.js versi >= 18.x
- PostgreSQL versi >= 14
- Git (Opsional)

---

### Langkah 1: Kloning & Inisialisasi Project
\`\`\`bash
# Buat direktori project baru
mkdir notaris-saas && cd notaris-saas

# Inisialisasi folder backend dan frontend (atau jadikan Monorepo)
npm init -y
\`\`\`

### Langkah 2: Instalasi Ketergantungan Utama
\`\`\`bash
npm install express dotenv prisma @prisma/client @google/genai jsonwebtoken bcryptjs cors
npm install -D typescript @types/express @types/node tsx esbuild
\`\`\`

### Langkah 3: Konfigurasi Prisma Database
\`\`\`bash
# Inisialisasi Prisma ORM
npx prisma init
\`\`\`
Edit file \`.env\` yang baru dibuat, sesuaikan koneksi database PostgreSQL Anda:
\`\`\`env
DATABASE_URL="postgresql://postgres:password@localhost:5432/notaris_db?schema=public"
JWT_SECRET="sangat_rahasia_dan_aman_2026"
GEMINI_API_KEY="AI_STUDIO_API_KEY_ANDA"
\`\`\`

### Langkah 4: Migrasi Skema Database ke PostgreSQL
\`\`\`bash
# Generate skema dan dorong ke database fisik
npx prisma db push

# Menghasilkan Client Prisma
npx prisma generate
\`\`\`

### Langkah 5: Menjalankan Project (Lokal Pengembangan)
\`\`\`bash
# Jalankan server Express.js
npm run dev
\`\`\`

---

## ☁️ LANGKAH DEPLOY KE VPS UBUNTU (STANDAR INDUSTRI)

### 1. Persiapan Server VPS
Hubungkan ke server Linux Anda via SSH:
\`\`\`bash
ssh root@ip_vps_anda
\`\`\`

### 2. Install Docker & Nginx di Ubuntu
\`\`\`bash
sudo apt update && sudo apt upgrade -y
sudo apt install docker.io docker-compose nginx certbot python3-certbot-nginx -y
\`\`\`

### 3. Konfigurasi SSL Let's Encrypt Gratis
Buat file konfigurasi Nginx di \`/etc/nginx/sites-available/notaris-saas.conf\` (gunakan templat Nginx Config di atas). Hubungkan file tersebut:
\`\`\`bash
sudo ln -s /etc/nginx/sites-available/notaris-saas.conf /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
\`\`\`
Minta sertifikat SSL resmi untuk domain Anda:
\`\`\`bash
sudo certbot --nginx -d portal.notarisindonesia.id
\`\`\`

### 4. Menjalankan Docker Compose di VPS
Buat berkas \`docker-compose.yml\` dan \`Dockerfile\` di server VPS Anda, lalu jalankan:
\`\`\`bash
# Jalankan kontainer di latar belakang
docker-compose up -d --build
\`\`\`
Server sekarang mengarah ke port 80 & 443 dengan proteksi SSL, merespons balik ke Express di Docker Internal Port 3000!

---

## 💰 MODEL PENJUALAN LEPAS (STANDALONE NOTARY PLATFORM) & MONITORING SPONSOR

### A. Strategi Monetisasi & Nilai Jual Tinggi
Karena aplikasi ini **dijual lepas** (standalone license) ke Notaris & Kantor Notaris, Anda dapat mengenakan harga premium (One-Time Fee + Jasa Pemeliharaan VPS):
1. **Biaya Setup Awal (Setup Fee)**: Instalasi Docker, PostgreSQL, dan konfigurasi Domain Kustom Notaris (misal: \`www.notarismaulana.com\`).
2. **Jasa Pemeliharaan Bulanan (Maintenance SLA)**: Pengawasan server VPS, pemantauan backup database terjadwal via Cron, and pembaruan sertifikat SSL Let's Encrypt secara berkala.
3. **Optimisasi AI Grounding Premium**: Notaris membayar sesuai konsumsi API Key Gemini. Anda dapat menerapkan kuota server atau menyambungkan API Key pribadi milik Notaris langsung di panel konfigurasi VPS.

### B. Pengaturan Slot Sponsor & Rekan Institusi Khusus
Untuk meningkatkan **Nilai Sponsorship**, pemilik website dapat mengintegrasikan display dinamis logo sponsor (seperti Bank Mandiri, BCA, Bank Syariah, Developer Properti, dsb) dengan mendaftarkannya di database lokal dan menyajikannya dalam rotasi penempatan banner:
\`\`\`typescript
// model/sponsor.ts - Model Database PostgreSQL Sponsor Kerja Sama
model Sponsor {
  id        String   @id @default(uuid())
  nama      String   // Nama Perusahaan Sponsor
  logoUrl   String   // URL file gambar logo sponsor
  redirect  String   // Tautan situs sponsor jika diklik oleh pengunjung website
  aktif     Boolean  @default(true)
  expiresAt DateTime // Batas waktu masa tayang sponsorship akta
  createdAt DateTime @default(now())
}
\`\`\`

### C. Alur Rekonsiliasi Pembayaran Escrow Perbankan
Alih-alih pembayaran sewa SaaS bulanan, integrasi sistem pembayaran langsung ditujukan untuk mempercepat jasa pembuatan akta, di mana dana ditampung pada akun escrow Notaris (misalnya menggunakan Virtual Account Mandiri / Snap Billing BCA):
\`\`\`typescript
import midtransClient from 'midtrans-client';

// Inisialisasi Snap SDK untuk Pembayaran Jasa Hukum Notaris
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.ESCROW_MIDTRANS_SERVER_KEY, // Langsung ke rekening escrow Mandiri kantor Notaris
  clientKey: process.env.ESCROW_MIDTRANS_CLIENT_KEY
});

app.post("/api/billing/akta-invoice", async (req, res) => {
  const parameter = {
    transaction_details: {
      order_id: "AKTA-INV-" + Date.now(),
      gross_amount: req.body.invoiceAmount // Nilai Akta Riil (misal Rp 3.500.000)
    },
    credit_card: { secure: true },
    customer_details: {
      first_name: req.body.namaKlien,
      email: req.body.emailClient,
      phone: req.body.phoneClient
    }
  };
  const transaction = await snap.createTransaction(parameter);
  res.json({ token: transaction.token, redirectUrl: transaction.redirect_url });
});
\`\`\`
Dengan skema penjualan putus ini, seluruh keuntungan per transaksi legalitas langsung masuk ke rekening escrow notaris tanpa potongan dari pemilik platform, sangat disukai oleh para Notaris!
`;
