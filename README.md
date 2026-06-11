# Notaris Pro — Kantor Digital

Platform digital hukum untuk Kantor Notaris & PPAT yang menggabungkan **website publik ber-SEO**, **dashboard manajemen kantor (SIM-K)**, dan **asisten AI legal** dalam satu aplikasi web.

**Pembuat Aplikasi:** [sid.onenationpress.com](https://sid.onenationpress.com)

---

## Tentang Sistem

Notaris Pro dirancang sebagai solusi lengkap bagi kantor notaris modern yang ingin hadir secara digital. Aplikasi ini terdiri dari tiga modul utama yang dapat diakses melalui satu antarmuka:

| Modul | Deskripsi |
|-------|-----------|
| **Website Publik** | Halaman profil kantor notaris dengan optimasi SEO, showcase layanan, formulir pemesanan konsultasi, dan chatbot AI untuk pengunjung. |
| **SIM-K Kantor Hub** | Dashboard internal (*Sistem Informasi Manajemen Kantor*) untuk mengelola klien, dokumen akta, jadwal tugas, pesanan konsultasi, log aktivitas, dan toolkit AI legal. |
| **Dokumentasi Arsitektur** | Panduan teknis deploy ke VPS: skema Prisma, konfigurasi Docker, Nginx, spesifikasi API, dan skrip backup database. |

---

## Fitur Utama

### Website Publik
- Landing page profesional dengan animasi dan dukungan dark mode
- Meta tag dinamis & JSON-LD Schema Markup untuk SEO lokal
- Daftar layanan notaris (pendirian PT, jual beli tanah, waris, perjanjian kawin, dll.)
- Formulir pemesanan konsultasi online
- Chatbot AI publik untuk pertanyaan hukum dasar

### SIM-K Kantor Hub (Dashboard)
- **Manajemen Klien** — CRUD profil klien (nama, NIK, NPWP, alamat, instansi)
- **Manajemen Dokumen** — Arsip akta dengan status alur kerja: `Draf` → `Verifikasi` → `Signed` → `Terdaftar`
- **Scheduler** — Pengingat tugas dan jadwal pertemuan klien
- **Pesanan Konsultasi** — Kelola permintaan konsultasi dari website publik
- **Log Aktivitas** — Audit trail aksi pengguna (login, mutasi data, generate akta)
- **AI Legal Toolkit** — Asisten bertenaga Google Gemini:
  - Generate draft akta notaris otomatis
  - Ringkasan dokumen hukum
  - Analisis risiko klausul kontrak
  - Chat konsultasi hukum interaktif

### Dokumentasi Arsitektur (Blueprint Deploy)
- Skema database PostgreSQL via Prisma ORM
- Konfigurasi `Dockerfile` & `docker-compose.yml`
- Konfigurasi reverse proxy Nginx + SSL (Let's Encrypt)
- Spesifikasi REST API lengkap untuk fase produksi
- Skrip backup database otomatis

---

## Tech Stack

| Lapisan | Teknologi |
|---------|-----------|
| Frontend | React 19, TypeScript, Tailwind CSS 4, Motion |
| Build Tool | Vite 6 |
| Backend | Express.js (custom server dengan Vite middleware) |
| AI Engine | Google Gemini API (`@google/genai`) |
| Database (rencana) | PostgreSQL + Prisma ORM |
| Ikon | Lucide React |

---

## Struktur Proyek

```
NotarisPro/
├── server.ts                  # Server Express + endpoint AI + integrasi Vite
├── index.html                 # Entry point HTML
├── vite.config.ts             # Konfigurasi Vite
├── package.json
├── .env.example               # Template variabel lingkungan
├── metadata.json              # Metadata aplikasi
└── src/
    ├── main.tsx               # Bootstrap React
    ├── App.tsx                # Komponen utama (3 modul: publik, dashboard, arsitektur)
    ├── types.ts               # TypeScript interfaces (Client, Document, dll.)
    ├── index.css              # Global styles + Tailwind
    ├── backendDocumentation.ts # Blueprint deploy (Prisma, Docker, Nginx, API spec)
    └── components/
        └── SEO.tsx            # Komponen meta tag dinamis
```

---

## Menjalankan Secara Lokal

### Prasyarat
- Node.js 18+
- npm

### Langkah Instalasi

1. Clone repositori:
   ```bash
   git clone https://github.com/misterhedi/NotarisPro.git
   cd NotarisPro
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

3. Buat file environment:
   ```bash
   cp .env.example .env.local
   ```

4. Isi variabel di `.env.local` (minimal `GEMINI_API_KEY` untuk fitur AI penuh).

5. Jalankan server development:
   ```bash
   npm run dev
   ```

6. Buka browser di **http://localhost:3000**

> Tanpa `GEMINI_API_KEY` yang valid, fitur AI tetap berjalan dengan respons fallback bawaan untuk keperluan prototyping UI.

---

## Variabel Lingkungan

| Variabel | Wajib | Deskripsi |
|----------|-------|-----------|
| `GEMINI_API_KEY` | Opsional* | API key Google Gemini untuk fitur asisten AI |
| `APP_URL` | Opsional | URL publik aplikasi (untuk tautan internal & OAuth) |
| `DATABASE_URL` | Untuk produksi | Connection string PostgreSQL (Prisma) |
| `JWT_SECRET` | Untuk produksi | Kunci rahasia penandatanganan token autentikasi |

\* Fitur AI menggunakan respons fallback jika tidak dikonfigurasi.

---

## API Endpoint (Tersedia)

Server Express menyediakan endpoint AI berikut:

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| `POST` | `/api/ai/draft` | Generate draft akta notaris |
| `POST` | `/api/ai/sum` | Ringkasan dokumen hukum |
| `POST` | `/api/ai/risk` | Analisis risiko klausul kontrak |
| `POST` | `/api/ai/chat` | Chat konsultasi hukum interaktif |

Spesifikasi API lengkap untuk fase produksi (auth, CRUD klien/dokumen, audit log) tersedia di modul **Dokumentasi Arsitektur** dalam aplikasi, serta di `src/backendDocumentation.ts`.

---

## Build & Deploy Produksi

```bash
# Build frontend (Vite) + bundle server (esbuild)
npm run build

# Jalankan server produksi
npm start
```

Untuk deploy ke VPS, ikuti panduan di modul **Dokumentasi Arsitektur** yang mencakup:
- Setup PostgreSQL + Prisma migration
- Containerisasi dengan Docker Compose
- Reverse proxy Nginx dengan SSL
- Skrip backup database harian

---

## Status Pengembangan

| Komponen | Status |
|----------|--------|
| UI Website Publik | ✅ Selesai |
| Dashboard SIM-K (frontend) | ✅ Selesai |
| Endpoint AI (Gemini) | ✅ Selesai |
| Dokumentasi arsitektur deploy | ✅ Selesai |
| Backend CRUD + Auth (Prisma) | 🔧 Blueprint tersedia, belum diimplementasikan |
| Integrasi database persisten | 🔧 Rencana (saat ini data disimpan di state React) |

---

## Pembuat Aplikasi

Aplikasi ini dikembangkan oleh **[Sid — One Nation Press](https://sid.onenationpress.com)**.

Kunjungi [https://sid.onenationpress.com](https://sid.onenationpress.com) untuk informasi layanan pembuatan aplikasi web dan solusi digital lainnya.

---

## Lisensi

Proyek ini bersifat privat. Hubungi pemilik repositori untuk informasi lisensi dan penggunaan.

---

## Kontribusi

Pull request dan issue dipersilakan. Untuk perubahan besar, buka issue terlebih dahulu untuk mendiskusikan rencana perubahan.
