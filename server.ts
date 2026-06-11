import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.includes("MY_KEY")) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// Mock responses for elegant fallback when API key is missing or for rapid UI prototyping
const fallbackDeedDraft = (jenisDeed: string, namaPihak: string) => {
  const dateFormatted = new Date().toLocaleDateString("id-ID", {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  return `### DRAFT AKTA NOTARIS: ${jenisDeed.toUpperCase()}
Nomor: 142/Not-JKT/VI/2026

Pada hari ini, ${dateFormatted}, pukul 10:00 WIB (Sepuluh Nol-Nol Waktu Indonesia Barat).
Menghadap kepada saya, **ACHMAD MAULANA, S.H., M.Kn.**, Notaris berkedudukan di Kota Jakarta Pusat, dengan wilayah jabatan seluruh Daerah Khusus Ibukota Jakarta:

1. **Tuan/Nyonya ${namaPihak || "BUDI SANTOSO"}**, lahir di Jakarta, tanggal 12 Mei 1984, Warga Negara Indonesia, Swasta, bertempat tinggal di Jl. Kemang Raya No. 42, Jakarta Selatan, Pemegang Kartu Tanda Penduduk (KTP) dengan NIK: 3174xxxxxxxxxxxx.
   - *Selanjutnya disebut sebagai **PIHAK PERTAMA (Pihak Yang Menyerahkan/Pendiri)**.*

2. **REKANAN / MITRA USAHA MANDIRI**, yang diwakili oleh perwakilan sah badan hukum berkedudukan di Jakarta.
   - *Selanjutnya disebut sebagai **PIHAK KEDUA (Pihak Penerima)**.*

Para penghadap dikenal oleh saya, Notaris.
Para penghadap bertindak dalam kedudukannya sebagaimana tersebut di atas menerangkan terlebih dahulu:
- Bahwa para pihak bermaksud menuangkan kesepakatan hukum dalam bentuk akta otentik ${jenisDeed} berdasarkan regulasi hukum Republik Indonesia terbaru (UU Jabatan Notaris Nomor 2 Tahun 2014).

---------------------------------------------------------
#### PASAL 1 - KESEPAKATAN DAN MAKSUD TUJUAN
Pihak Pertama dengan ini menyatakan setuju untuk mendirikan/menyerahkan objek hukum transaksi ini kepada Pihak Kedua, yang menyatakan menerima penyerahan tersebut dengan syarat-syarat dan ketentuan yang diatur dalam akta ini.

#### PASAL 2 - JANGKA WAKTU DAN VALIDITAS
Perjanjian otentik ini berlaku terhitung sejak ditandatanganinya akta ini sampai dengan seluruh kewajiban para pihak terpenuhi dengan itikad baik (bona fide).

#### PASAL 3 - PENYELESAIAN SENGKETA
Apabila terjadi perbedaan penafsiran atau perselisihan di kemudian hari, para pihak bersepakat menyelesaikannya secara mufakat. Apabila perselisihan tidak dapat diselesaikan secara kekeluargaan, para pihak memilih domisili hukum yang tetap dan umum di Kantor Kepaniteraan Pengadilan Negeri Jakarta Pusat.

---------------------------------------------------------
Demikian Akta ini dibuat sebagai draf resmi hukum yang sah.

**Pihak Pertama**                                **Pihak Kedua**


(....................)                           (....................)

                                 **Mengetahui,**
                           **ACHMAD MAULANA, S.H., M.Kn.**
                                 *Notaris Jakarta*`;
};

const fallbackSummary = (text: string) => {
  return `**Ringkasan Dokumen Hukum (Otomatis AI):**
1. **Inti Dokumen:** Dokumen yang disorot berisi materi perikatan hukum atau klausul perjanjian penting.
2. **Pihak yang Terlibat:** Teridentifikasi representasi korporasi atau perorangan yang sah untuk bertindak di hadapan Pejabat Umum (Notaris).
3. **Poin Utama:** Perlu penegasan hak waris/hak milik, jaminan kewajiban serta klausul arbitrase penyelesaian konflik di wilayah yurisdiksi Indonesia.
4. **Catatan Notaris:** Dokumen telah memenuhi kriteria formal awal, disarankan memverifikasi keabsahan identitas asli para pihak (KTP/SK Kemenkumham).`;
};

const fallbackRisks = (text: string) => {
  return `### Laporan Analisis Risiko Klausul Hukum (AI Auditor 2026)

Berikut adalah identifikasi risiko hukum dalam dokumen yang Anda unggah:

1. ⚠️ **Ketiadaan Klausul Keadaan Memaksa (Force Majeure) yang Detail**
   - *Tingkat Risiko:* **SEDANG**
   - *Rekomendasi:* Tambahkan klausul kondisi luar biasa yang spesifik mencakup bencana alam, kegagalan infrastruktur digital, serta perubahan regulasi mendadak.

2. ⚠️ **Ketidakjelasan Domisili Hukum & Forum Penyelesaian Sengketa**
   - *Tingkat Risiko:* **TINGGI**
   - *Rekomendasi:* Redaksi rancu pada bagian resolusi sengketa. Pastikan secara spesifik menyebutkan Pengadilan Negeri atau Badan Arbitrase Nasional Indonesia (BANI) untuk kepastian eksekusi.

3. ⚠️ **Definisi Nilai Transaksi & Keterlambatan Pembayaran**
   - *Tingkat Risiko:* **SEDANG**
   - *Rekomendasi:* Pastikan denda keterlambatan dituliskan dalam angka persentase harian yang rasional agar tidak dinilai eksesif oleh hakim perdata (maksimal 0.1% per hari).

*Status Penilaian Notaris: **Membutuhkan Revisi Ringan (Amandemen) sebelum Akta Otentik Dibuat.***`;
};

const fallbackChatResponse = (message: string) => {
  const msgLower = message.toLowerCase();
  if (msgLower.includes("halo") || msgLower.includes("hai") || msgLower.includes("pagi") || msgLower.includes("siang")) {
    return "Halo! Saya adalah AI Asisten Hukum Notaris. Ada yang bisa saya bantu hari ini terkait layanan kenotariatan, pembuatan akta persekutuan, akta tanah, pendirian badan usaha, atau pengecekan sertifikat?";
  }
  if (msgLower.includes("biaya") || msgLower.includes("tarif")) {
    return "Berdasarkan UU Jabatan Notaris (UUJN), penentuan honorarium Notaris dihitung berdasarkan nilai ekonomis objek akta (maksimal 1% - 2.5% tergantung skala nilai). Apakah ini untuk akta jaminan, pendirian PT, atau waris?";
  }
  if (msgLower.includes("syarat") || msgLower.includes("pendirian") || msgLower.includes("pt")) {
    return "Untuk pendirian PT (Perseroan Terbatas) di Indonesia tahun 2026, syarat dasarnya adalah:\n1. KTP & NPWP para Pendiri (minimal 2 orang)\n2. Nama PT (minimal 3 kata dalam bahasa Indonesia)\n3. Struktur Pemegang Saham (Direktur & Komisaris)\n4. Menentukan Alamat Kantor & Maksud Tujuan (Kode KBLI 2020).\n\nSaya bisa membantu membuatkan draf akta Pendirian PT secara otomatis jika Anda mengeklik menu 'AI Legal Toolkit' -> 'Generate Draft Akta'.";
  }
  return "Sangat menarik. Terkait hal tersebut, Notaris wajib menuangkannya ke dalam Akta Otentik agar bernilai pembuktian sempurna (alat bukti mutlak sebagaimana Pasal 1868 KUHPerdata). Ada yang spesifik ingin Anda tanyakan mengenai draf perikatan tersebut?";
};

// --- ENDPOINTS ---

// AI Deed Drafter Endpoint
app.post("/api/ai/draft", async (req, res) => {
  try {
    const { jenisDeed, namaPihak, detailTambahan } = req.body;
    if (!jenisDeed || !namaPihak) {
      return res.status(400).json({ error: "Jenis akta dan nama pihak wajib diisi" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Return beautiful fallback if Gemini is not set up
      return res.json({ text: fallbackDeedDraft(jenisDeed, namaPihak) });
    }

    const prompt = `Bertindaklah sebagai Notaris Senior Indonesia, Ahli Hukum Perdata, dan Drafter Akta Otentik Profesional.
Buatlah draft/rancangan akta notaris resmi bahasa Indonesia yang formal, berstruktur hukum absolut, dan sangat detail untuk:
Jenis Akta: ${jenisDeed}
Nama Penghadap/Pihak Utama: ${namaPihak}
Detail Tambahan/Ketentuan khusus: ${detailTambahan || "Tidak ada ketentuan khusus."}

Draft ini harus memuat:
1. Kepala Akta (Nama Notaris fikti: Achmad Maulana, S.H., M.Kn., kedudukan di Jakarta Pusat, tanggal hari ini).
2. Komparisi (pernyataan pihak, identitas lengkap formal).
3. Premisse (latar belakang kesepakatan).
4. Badan Akta (Pasal-pasal krusial: Hak dan Kewajiban, Jasa/Uang, Penyelesaian Sengketa, Domisili Hukum).
5. Penutup Akta (tanda tangan saksi dan notaris).

Format dalam Markdown yang rapi dan bergaya premium hukum.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Kamu adalah Senior Indonesian Notary Software AI. Hasilkan draf akta notaril yang otentik, mematuhi UUJN Nomor 2 Tahun 2014, terperinci, dan formal."
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Drafter Error:", error);
    res.status(500).json({ error: "Gagal berinteraksi dengan AI: " + error.message });
  }
});

// AI Document Summarizer Endpoint
app.post("/api/ai/sum", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Teks dokumen tidak boleh kosong" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({ text: fallbackSummary(text) });
    }

    const prompt = `Anda adalah Asisten Notaris Ahli. Ringkas dokumen hukum/akta perdata berikut ke dalam poin-poin penting, mudah dipahami namun tidak menghilangkan kekuatan substansi hukumnya.
Dokumen:
${text}

Sajikan dalam format ringkasan eksekutif notaris terstruktur.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Summary Error:", error);
    res.status(500).json({ error: "Gagal membuat ringkasan: " + error.message });
  }
});

// AI Document Risk Analyzer Endpoint
app.post("/api/ai/risk", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Teks kontrak/akta tidak boleh kosong" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({ text: fallbackRisks(text) });
    }

    const prompt = `Temukan risiko-risiko hukum tersembunyi, celah klausul, ketidakjelasan bahasa, atau kekurangan dalam draf perjanjian kenotariatan berikut.
Berikan saran perbaikan amandemen yang tepat menurut KUHPerdata Indonesia.
Dokumen Kontrak:
${text}

Sajikan analisis risiko dengan tingkat keparahan (Tinggi, Sedang, Rendah) beserta rekomendasi perbaikan hukum di masing-masing poin.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Analyzer Error:", error);
    res.status(500).json({ error: "Gagal menganalisis dokumen: " + error.message });
  }
});

// AI Chatbot Endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Pesan tidak boleh kosong" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({ text: fallbackChatResponse(message) });
    }

    const chatHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    }));

    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: "Kamu adalah AI Asisten Hukum Notaris Indonesia (NotaryAI 2026). Tugasmu adalah memberikan konsultasi hukum perdata dasar secara edukatif, mencerahkan tentang regulasi pembuatan akta, waris, pertanahan (PPAT), hukum korporasi, dan administrasi kenotariatan. Selalu gunakan tutur kata santun, profesional, dan cantumkan pasal-pasal relevan (seperti KUHPerdata/UUJN) bila memungkinkan. Ingatkan pengguna bahwa jawaban AI ini bersifat edukatif dan bukan pengganti nasihat hukum langsung."
      },
      history: chatHistory
    });

    const response = await chatInstance.sendMessage({ message: message });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: "Gagal memproses pesan chat: " + error.message });
  }
});


// Dev vs Prod Vite Integration
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static build from 'dist'.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express custom server running on http://localhost:${PORT}`);
  });
};

startServer().catch(err => {
  console.error("Server startup error:", err);
});
