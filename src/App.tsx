import React, { useState, useEffect } from 'react';
import { 
  Scale, ShieldCheck, FileText, Plus, Trash2, Users, Calendar, Cpu, 
  Award, BookOpen, Phone, ArrowRight, Search, Code, Server, Database, 
  Menu, X, ExternalLink, Lock, CheckCircle2, UserCheck, RefreshCw, 
  FileSignature, DollarSign, Globe, Activity, ChevronRight, HelpCircle,
  Clock, Check, FileDown, Layers, Terminal, AlertTriangle, Send,
  Sun, Moon, Star, Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Client, Document, ActivityLog, TaskReminder, ConsultOrder } from './types';
import { 
  PRISMA_SCHEMA, DOCKER_CONFIG, NGINX_CONFIG, API_SPEC, 
  BACKUP_SCRIPT, INSTALL_GUIDE_MD 
} from './backendDocumentation';
import SEO from './components/SEO';

export default function App() {
  // Navigation: 'public' | 'dashboard' | 'architecture'
  const [activeTab, setActiveTab] = useState<'public' | 'dashboard' | 'architecture'>('public');

  // --- DARK MODE STATE & SYNC ---
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      // Default to light for clean corporate feel unless user toggled
      return false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (e) {
      console.error('Error applying theme', e);
    }
  }, [isDark]);
  
  // Dashboard Sub-navigation: 'klien' | 'dokumen' | 'scheduler' | 'ai-tools' | 'logs' | 'orders'
  const [dashboardTab, setDashboardTab] = useState<'klien' | 'dokumen' | 'scheduler' | 'ai-tools' | 'logs' | 'orders'>('ai-tools');
  
  // Architecture Sub-navigation: 'prisma' | 'vps' | 'docker' | 'nginx' | 'api' | 'backup'
  const [archTab, setArchTab] = useState<'prisma' | 'vps' | 'docker' | 'nginx' | 'api' | 'backup'>('prisma');

  // Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- APPLICATION STATE ---
  const [clients, setClients] = useState<Client[]>([
    {
      id: 'cli-1',
      nama: 'Budi Santoso',
      email: 'budi.santoso@gmail.com',
      telepon: '081234567890',
      instansi: 'PT Nusantara Jaya Mandiri',
      alamat: 'Jl. Kemang Raya No. 42, Jakarta Selatan',
      npwp: '01.234.567.8-012.000',
      nik: '3174123456780001',
      createdAt: '2026-05-10T10:00:00Z'
    },
    {
      id: 'cli-2',
      nama: 'Dewi Lestari, S.E.',
      email: 'dewi.lestari@yahoo.com',
      telepon: '081987654321',
      instansi: 'Pribadi / Perorangan',
      alamat: 'Cluster Amethyst No. B-12, Pantai Indah Kapuk, Jakarta Utara',
      npwp: '02.456.789.1-014.000',
      nik: '3175876543210002',
      createdAt: '2026-05-18T14:30:00Z'
    },
    {
      id: 'cli-3',
      nama: 'Haji Akhmad Fauzi',
      email: 'ahmad_fauzi@gmail.com',
      telepon: '085211223344',
      instansi: 'Yayasan Bina Insan Mulia',
      alamat: 'Jl. Pemuda No. 101, Matraman, Jakarta Timur',
      npwp: '03.789.123.4-015.000',
      nik: '3173112233440003',
      createdAt: '2026-06-01T08:15:00Z'
    }
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'doc-1',
      nama: 'Akta Pendirian PT Nusantara Jaya Mandiri',
      tipe: 'Akta Pendirian PT',
      clientId: 'cli-1',
      status: 'Signed',
      version: 2,
      digitalSignature: true,
      createdAt: '2026-05-12T11:00:00Z',
      fileContent: `KANTOR NOTARIS ACHMAD MAULANA, S.H., M.Kn.\nKOTA JAKARTA PUSAT\n\nAKTA PENDIRIAN PERSEROAN TERBATAS\nPT NUSANTARA JAYA MANDIRI\nNomor: 08\n\nPada hari ini, Selasa, 12 Mei 2026...\nPenghadap: TUAN BUDI SANTOSO...\nSepakat mendirikan perseroan terbatas dengan modal dasar Rp 1.000.000.000 (Satu Miliar Rupiah)...\nTujuan: Perdagangan besar dan ekspor impor.`
    },
    {
      id: 'doc-2',
      nama: 'Keterangan Ahli Waris Almarhum Suprapto',
      tipe: 'Keterangan Waris',
      clientId: 'cli-2',
      status: 'Verifikasi',
      version: 1,
      digitalSignature: false,
      createdAt: '2026-05-20T16:00:00Z',
      fileContent: `SURAT KETERANGAN WARIS\nNomor: 394/SKW/JKT/V/2026\n\nKami yang bertandatangan di bawah ini, para ahli waris dari Almarhum Suprapto...\nMenunjuk Ny. Dewi Lestari sebagai representatif penandatanganan pengalihan aset perbankan...`
    },
    {
      id: 'doc-3',
      nama: 'Perjanjian Kawin Pemisahan Harta Budi & Dewi',
      tipe: 'Perjanjian Kawin',
      clientId: 'cli-1',
      status: 'Draf',
      version: 1,
      digitalSignature: false,
      createdAt: '2026-06-02T10:00:00Z',
      fileContent: `PERJANJIAN PEMISAHAN HARTA KEKAYAAN\nSebelum pernikahan dilangsungkan, para pihak sepakat memisahkan properti...\nPihak I: Tuan Budi Santoso\nPihak II: Nyonya Dewi Lestari...\nSeluruh hutang piutang pasca pernikahan dipasrahkan pada tanggung jawab masing-masing.`
    }
  ]);

  const [logs, setLogs] = useState<ActivityLog[]>([
    {
      id: 'log-1',
      user: 'Achmad Maulana (Notaris)',
      action: 'LOGIN',
      detail: 'Berhasil melakukan login premium dari IP resmi kantor',
      ipAddress: '182.253.14.99',
      timestamp: '2026-06-11T00:10:00Z'
    },
    {
      id: 'log-2',
      user: 'Reni Safitri (Staff)',
      action: 'MUTATION_CLIENT',
      detail: 'Menambahkan Profil Klien Baru: Haji Akhmad Fauzi',
      ipAddress: '182.253.14.101',
      timestamp: '2026-06-11T00:30:00Z'
    },
    {
      id: 'log-3',
      user: 'System Bot AI',
      action: 'GENERATE_AKTA',
      detail: 'Berhasil menyusun Draf Otomatis Akta Perjanjian Kawin',
      ipAddress: '127.0.0.1 (Internal Service)',
      timestamp: '2026-06-11T00:45:00Z'
    }
  ]);

  const [reminders, setReminders] = useState<TaskReminder[]>([
    {
      id: 'tc-1',
      title: 'Tanda Tangan Akta AJB',
      date: '2026-06-15',
      time: '10:00',
      clientName: 'Budi Santoso & Pihak Pembeli',
      description: 'Pertemuan verifikasi identitas asli, cap jempol, dan penandatanganan fisik minuta akta.',
      completed: false
    },
    {
      id: 'tc-2',
      title: 'Verifikasi Berkas Pendirian PT',
      date: '2026-06-12',
      time: '14:00',
      clientName: 'PT Nusantara Jaya Mandiri',
      description: 'Pemeriksaan kelengkapan fotokopi NPWP pendiri dan KBLI untuk penginputan Sistem SABH Kemenkumham.',
      completed: true
    },
    {
      id: 'tc-3',
      title: 'Konsultasi Pembagian Waris',
      date: '2026-06-18',
      time: '09:30',
      clientName: 'Dewi Lestari, S.E.',
      description: 'Penyusunan silsilah keluarga ahli waris sesuai hukum perdata barat.',
      completed: false
    }
  ]);

  // --- FORMS INPUT STATES ---
  const [newClient, setNewClient] = useState({
    nama: '',
    email: '',
    telepon: '',
    instansi: '',
    alamat: '',
    npwp: '',
    nik: ''
  });

  const [newDoc, setNewDoc] = useState({
    nama: '',
    tipe: 'Akta Pendirian PT' as Document['tipe'],
    clientId: '',
    fileContent: ''
  });

  const [newReminder, setNewReminder] = useState({
    title: '',
    date: '',
    time: '',
    clientName: '',
    description: ''
  });

  // --- AI TOOLKIT INTERACTION STATES ---
  const [aiAction, setAiAction] = useState<'draft' | 'summarize' | 'risk' | 'chat'>('draft');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInputText, setAiInputText] = useState('');
  const [aiResultText, setAiResultText] = useState('');
  
  // Custom states for draft generator fields
  const [draftType, setDraftType] = useState('Akta Pendirian PT');
  const [draftClientName, setDraftClientName] = useState('');
  const [draftCustomParams, setDraftCustomParams] = useState('');

  // Chat history state
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai', text: string }>>([
    { role: 'ai', text: 'Halo Tuan/Nyonya Notaris. Saya adalah NotaryAI 2026. Saya siap membantu meriset aturan hukum, menganalisis klausul akta perdata, silsilah pembagian waris komparatif, atau memformulasikan pasal kontrak kerja sama. Silakan ajukan pertanyaan Anda.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // --- MOCK NOTIFICATION / TOAST ---
  const [toast, setToast] = useState<string | null>(null);
  
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // --- ACTORS SWITCH FOR TESTING ---
  const [currentUserRole, setCurrentUserRole] = useState<'Admin' | 'Notaris' | 'Staff'>('Notaris');

  // --- PUBLIC BLOG ACTIVE POST ---
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // --- CONSULTATION & SERVICE ORDERS STANDALONE BUSINESS LEADS STATE ---
  const [consultOrders, setConsultOrders] = useState<ConsultOrder[]>([
    {
      id: 'ord-124',
      nama: 'Tuan Syihabuddin Hasan, S.Pd.',
      email: 'syihabuddin.hasan@gmail.com',
      telepon: '081211335577',
      tipeLayanan: 'Anggaran Dasar PT, CV, Yayasan',
      keterangan: 'Ingin mendirikan PT Ekspor Rempah-rempah Maluku dengan modal dasar awal Rp 600 Juta. Butuh konsultasi KBLI komparatif.',
      tanggalBooking: '2026-06-16',
      status: 'Menunggu Hubungi',
      createdAt: '2026-06-10T15:20:00Z'
    },
    {
      id: 'ord-125',
      nama: 'Ibu Ratna Kumalasari',
      email: 'ratna.kuma@yahoo.co.id',
      telepon: '081399887766',
      tipeLayanan: 'Peralihan & AJB Tanah (PPAT)',
      keterangan: 'Rencana Jual Beli tanah seluas 450m2 di daerah Jagakarsa, Jaksel. Sertifikat BPN status clean check.',
      tanggalBooking: '2026-06-19',
      status: 'Dijadwalkan',
      createdAt: '2026-06-11T00:35:00Z'
    }
  ]);

  const [newConsultForm, setNewConsultForm] = useState({
    nama: '',
    email: '',
    telepon: '',
    tipeLayanan: 'Anggaran Dasar PT, CV, Yayasan',
    keterangan: '',
    tanggalBooking: ''
  });

  const [activeBookingSuccess, setActiveBookingSuccess] = useState<ConsultOrder | null>(null);

  // --- STATE FOR FAQ ACCORDION ---
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // --- CONSULTATION & ORDER SERVICE HANDLERS ---
  const handleCreateConsultOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConsultForm.nama || !newConsultForm.telepon || !newConsultForm.tanggalBooking) {
      triggerToast('⚠️ Hubungi Kami: Nama, Telepon, dan Tanggal wajib diisi!');
      return;
    }
    const newOrder: ConsultOrder = {
      id: `ord-${Date.now()}`,
      nama: newConsultForm.nama,
      email: newConsultForm.email || 'tidak_ada@klien.com',
      telepon: newConsultForm.telepon,
      tipeLayanan: newConsultForm.tipeLayanan,
      keterangan: newConsultForm.keterangan || 'Konsultasi kenotariatan perdata umum.',
      tanggalBooking: newConsultForm.tanggalBooking,
      status: 'Menunggu Hubungi',
      createdAt: new Date().toISOString()
    };
    
    setConsultOrders([newOrder, ...consultOrders]);
    setNewConsultForm({
      nama: '',
      email: '',
      telepon: '',
      tipeLayanan: 'Anggaran Dasar PT, CV, Yayasan',
      keterangan: '',
      tanggalBooking: ''
    });

    // Write system activity log automatically
    const systemLog: ActivityLog = {
      id: `log-${Date.now()}`,
      user: 'Publik (Web)',
      action: 'BOOKING_MASUK',
      detail: `Konsumen '${newOrder.nama}' memesan jasa: ${newOrder.tipeLayanan}`,
      ipAddress: 'Client-Browser',
      timestamp: new Date().toISOString()
    };
    setLogs([systemLog, ...logs]);

    // Show booking receipt modal
    setActiveBookingSuccess(newOrder);
    triggerToast(`📩 Sukses! Jasa ${newOrder.tipeLayanan} berhasil dipesan. Notaris akan segera menghubungi.`);
  };

  const handleUpdateOrderStatus = (id: string, newStatus: ConsultOrder['status']) => {
    setConsultOrders(consultOrders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    addLog('ORDER_UPDATE', `Mengubah status pemesanan #${id} menjadi: ${newStatus}`, '182.253.14.99');
    triggerToast(`🔄 Pemesanan #${id} diubah ke: ${newStatus}`);
  };

  const handleConvertOrderToClient = (order: ConsultOrder) => {
    // Check duplication
    if (clients.some(c => c.nama.toLowerCase() === order.nama.toLowerCase())) {
      triggerToast('⚠️ Klien ini sudah terdaftar di database!');
      return;
    }
    const clientToAdd: Client = {
      id: `cli-${Date.now()}`,
      nama: order.nama,
      email: order.email,
      telepon: order.telepon,
      instansi: order.tipeLayanan.includes('PT') || order.tipeLayanan.includes('CV') ? 'Badan Usaha Baru (Draf/Drafting)' : 'Pribadi / Perorangan',
      alamat: 'Lengkapi alamat lengkap dari formulir konsultasi masuk...',
      npwp: '00.000.000.0-000.000',
      nik: '3170000000000000',
      createdAt: new Date().toISOString()
    };
    
    setClients([clientToAdd, ...clients]);

    // Create related document in Draft state automatically!
    const docToAdd: Document = {
      id: `doc-${Date.now()}`,
      nama: `Draf ${order.tipeLayanan} - ${order.nama}`,
      tipe: order.tipeLayanan.includes('Waris') 
        ? 'Keterangan Waris' 
        : order.tipeLayanan.includes('Tanah') 
          ? 'Akta Jual Beli Tanah' 
          : order.tipeLayanan.includes('Kawin') 
            ? 'Perjanjian Kawin' 
            : order.tipeLayanan.includes('Yayasan') || order.tipeLayanan.includes('PT')
              ? 'Akta Pendirian PT'
              : 'Umum / Kontrak',
      clientId: clientToAdd.id,
      status: 'Draf',
      version: 1,
      digitalSignature: false,
      fileContent: `KANTOR NOTARIS DIGITAL\n\nPENGURUSAN JASA: ${order.tipeLayanan}\nNama Klien: ${order.nama}\n\nKeterangan Pemesan:\n"${order.keterangan}"\n\nDraf awal otomatis disiapkan berdasarkan formulir pemesanan online masuk tertanggal ${order.tanggalBooking}.`,
      createdAt: new Date().toISOString()
    };
    setDocuments([docToAdd, ...documents]);

    const updatedOrders = consultOrders.map(o => o.id === order.id ? { ...o, status: 'Selesai' as const } : o);
    setConsultOrders(updatedOrders);

    addLog('ORDER_CONVERT', `Mengubah pemesanan #${order.id} menjadi Klien Resmi & membuat draf otomatis`, '182.253.14.99');
    triggerToast(`🚀 Sukses! '${order.nama}' terdaftar sebagai Klien, & draf dokumen baru otomatis dibuat.`);
  };

  const handleDeleteConsultOrder = (id: string) => {
    setConsultOrders(consultOrders.filter(o => o.id !== id));
    addLog('ORDER_DELETE', `Menghapus data pemesanan #${id} dari sistem`, '182.253.14.99');
    triggerToast('🗑️ Pemesanan jasa berhasil dihapus.');
  };

  // --- DATA FLOW HANDLERS ---
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.nama || !newClient.email || !newClient.nik) {
      triggerToast('⚠️ Nama, Email, dan NIK wajib diisi!');
      return;
    }
    const newId = `cli-${Date.now()}`;
    const clientToAdd: Client = {
      id: newId,
      ...newClient,
      createdAt: new Date().toISOString()
    };
    setClients([clientToAdd, ...clients]);
    setNewClient({
      nama: '', email: '', telepon: '', instansi: '', alamat: '', npwp: '', nik: ''
    });
    
    // Log
    addLog('MUTATION_CLIENT', `Menambahkan klien baru: ${clientToAdd.nama}`, '182.253.14.99');
    triggerToast(`🎉 Klien '${clientToAdd.nama}' berhasil ditambahkan!`);
  };

  const handleDeleteClient = (id: string, name: string) => {
    setClients(clients.filter(c => c.id !== id));
    addLog('DELETE_CLIENT', `Menghapus profil klien: ${name}`, '182.253.14.99');
    triggerToast(`🗑️ Klien '${name}' telah dihapus dari database.`);
  };

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.nama || !newDoc.clientId) {
      triggerToast('⚠️ Judul dokumen dan Pemilik Klien wajib dipilih!');
      return;
    }
    const docToAdd: Document = {
      id: `doc-${Date.now()}`,
      nama: newDoc.nama,
      tipe: newDoc.tipe,
      clientId: newDoc.clientId,
      status: 'Draf',
      version: 1,
      digitalSignature: false,
      fileContent: newDoc.fileContent || `DRAF RESERVED FOR: ${newDoc.nama}\n\nDisusun secara aman di hadapan Notaris.`,
      createdAt: new Date().toISOString()
    };
    setDocuments([docToAdd, ...documents]);
    setNewDoc({ nama: '', tipe: 'Akta Pendirian PT', clientId: '', fileContent: '' });
    
    addLog('CREATE_DOCUMENT', `Membuat draf dokumen baru: ${docToAdd.nama}`, '182.253.14.99');
    triggerToast(`🎉 Dokumen '${docToAdd.nama}' berhasil masuk antrean draf.`);
  };

  const handleToggleDocSignature = (id: string) => {
    setDocuments(documents.map(doc => {
      if (doc.id === id) {
        const nextSig = !doc.digitalSignature;
        addLog('SIGNATURE_MINTA', `${nextSig ? 'Menyematkan' : 'Mencabut'} E-Signature digital pada akta: ${doc.nama}`, '182.253.14.99');
        triggerToast(nextSig ? '🔏 Akta berhasil ditandatangani secara digital (SHA-256 Validated)!' : '🔓 E-Signature telah dicabut.');
        return { ...doc, digitalSignature: nextSig };
      }
      return doc;
    }));
  };

  const handleProgressDocStatus = (id: string) => {
    setDocuments(documents.map(doc => {
      if (doc.id === id) {
        let nextStatus: Document['status'] = 'Draf';
        if (doc.status === 'Draf') nextStatus = 'Verifikasi';
        else if (doc.status === 'Verifikasi') nextStatus = 'Signed';
        else if (doc.status === 'Signed') nextStatus = 'Terdaftar';
        else nextStatus = 'Draf';

        addLog('DOCUMENT_STATUS', `Mengubah status '${doc.nama}' menjadi ${nextStatus}`, '182.253.14.99');
        triggerToast(`🔄 Status '${doc.nama}' naik ke: ${nextStatus}`);
        return { ...doc, status: nextStatus, version: doc.status === 'Draf' ? doc.version + 1 : doc.version };
      }
      return doc;
    }));
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminder.title || !newReminder.date) {
      triggerToast('⚠️ Judul agenda dan Tanggal wajib diisi!');
      return;
    }
    const reminderToAdd: TaskReminder = {
      id: `rem-${Date.now()}`,
      ...newReminder,
      completed: false
    };
    setReminders([...reminders, reminderToAdd]);
    setNewReminder({ title: '', date: '', time: '', clientName: '', description: '' });
    
    addLog('SCHEDULE_CREATE', `Merancang jadwal baru: ${reminderToAdd.title}`, '182.253.14.99');
    triggerToast(`📅 Jadwal '${reminderToAdd.title}' masuk dalam agenda.`);
  };

  const handleToggleReminder = (id: string) => {
    setReminders(reminders.map(rem => {
      if (rem.id === id) {
        return { ...rem, completed: !rem.completed };
      }
      return rem;
    }));
  };

  const addLog = (action: string, detail: string, ipAddress: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      user: `${currentUserRole === 'Notaris' ? 'Achmad Maulana (Notaris)' : currentUserRole === 'Admin' ? 'Administrator Utama' : 'Reni Safitri (Staff)'}`,
      action,
      detail,
      ipAddress,
      timestamp: new Date().toISOString()
    };
    setLogs([newLog, ...logs]);
  };

  // --- API CALL FOR AI INTEGRATION (GEMINI SDK PROXY) ---
  const handleTriggerAiDraft = async () => {
    if (!draftClientName) {
      triggerToast('⚠️ Masukkan Nama Pihak Penghadap!');
      return;
    }
    setAiLoading(true);
    setAiResultText('');
    
    try {
      const response = await fetch('/api/ai/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jenisDeed: draftType,
          namaPihak: draftClientName,
          detailTambahan: draftCustomParams
        })
      });
      const data = await response.json();
      if (response.ok) {
        setAiResultText(data.text);
        addLog('GENERATE_AKTA_AI', `Menyusun draf akta ${draftType} menggunakan AI untuk ${draftClientName}`, '127.0.0.1');
        triggerToast('⚡ Sukses menyusun Draf Akta dengan AI!');
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (err: any) {
      console.error(err);
      triggerToast('❌ Gagal menghasilkan draft: ' + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleTriggerAiTool = async (type: 'summarize' | 'risk') => {
    if (!aiInputText.trim()) {
      triggerToast('⚠️ Masukkan teks hukum terlebih dahulu!');
      return;
    }
    setAiLoading(true);
    setAiResultText('');
    
    const endpoint = type === 'summarize' ? '/api/ai/sum' : '/api/ai/risk';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: aiInputText })
      });
      const data = await response.json();
      if (response.ok) {
        setAiResultText(data.text);
        addLog(type === 'summarize' ? 'AI_SUMMARIZE' : 'AI_ANALYZE_RISKS', `Menjalankan alat AI: ${type}`, '127.0.0.1');
        triggerToast(type === 'summarize' ? '⚡ Sukses merangkum dokumen!' : '⚠️ Berhasil menganalisis celah risiko hukum!');
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (err: any) {
      console.error(err);
      triggerToast('❌ AI Error: ' + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setAiLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: chatMessages.slice(-8) // Send a subset of chat history
        })
      });
      const data = await response.json();
      if (response.ok) {
        setChatMessages(prev => [...prev, { role: 'ai', text: data.text }]);
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setChatMessages(prev => [...prev, { role: 'ai', text: `Maaf, terjadi gangguan server: ${err.message}. Hubungkan Google Gemini API Key Anda pada sidebar untuk respons real-time.` }]);
    } finally {
      setAiLoading(false);
    }
  };

  // Convert AI generated markdown into HTML simply (basic rendering)
  const renderSimpleMarkdown = (text: string) => {
    if (!text) return '';
    return text
      .split('\n')
      .map((line, idx) => {
        let clean = line;
        
        // Headers
        if (clean.startsWith('### ')) {
          return `<h4 class="text-lg font-bold text-[#0B192C] mt-4 mb-2">${clean.slice(4)}</h4>`;
        }
        if (clean.startsWith('#### ')) {
          return `<h5 class="text-md font-bold text-gray-800 mt-3 mb-1">${clean.slice(5)}</h5>`;
        }
        if (clean.startsWith('## ')) {
          return `<h3 class="text-xl font-bold text-[#D4AF37] border-b border-gray-200 pb-2 mt-5 mb-3">${clean.slice(3)}</h3>`;
        }
        if (clean.startsWith('# ')) {
          return `<h2 class="text-2xl font-black text-[#0B192C] mt-6 mb-4">${clean.slice(2)}</h2>`;
        }
        
        // Bold
        clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        clean = clean.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Bullet list
        if (clean.trim().startsWith('- ') || clean.trim().startsWith('* ')) {
          return `<li class="ml-5 list-disc text-sm text-gray-700 leading-relaxed">${clean.trim().slice(2)}</li>`;
        }
        
        // Ordered List
        const oMatch = clean.trim().match(/^(\d+)\.\s(.*)/);
        if (oMatch) {
          return `<li class="ml-5 list-decimal text-sm text-gray-700 leading-relaxed">${oMatch[2]}</li>`;
        }

        // Horizontal Rule
        if (clean.trim() === '---' || clean.trim() === '---------------------------------------------------------') {
          return `<hr class="my-4 border-dashed border-gray-300" />`;
        }

        // Empty Line
        if (!clean.trim()) {
          return '<div class="h-2"></div>';
        }

        return `<p class="text-sm text-gray-700 leading-relaxed mb-1">${clean}</p>`;
      })
      .join('');
  };

  // --- BLOG ARTICLES DATA FOR PUBLIC VIEW ---
  const blogPosts = [
    {
      id: 1,
      title: 'UU Jabatan Notaris 2026: Transformasi ke Akta Digital & E-Notary',
      slug: 'uu-jabatan-notaris-digital-e-notary',
      excerpt: 'Studi mendalam mengenai keabsahan Akta Otentik elektronik di bawah revisi UUJN terbaru dan penerapan tanda tangan bersertifikat BSrE.',
      content: `### Pengantar E-Notary di Indonesia
Perkembangan teknologi informasi menuntut dunia hukum untuk terus beradaptasi. Berdasarkan UU Jabatan Notaris No. 2 Tahun 2014 dan penyesuaian regulasi digital tahun 2026, konsep **Cyber Notary** atau **E-Notary** kini menjadi perbincangan krusial di kalangan praktisi hukum tanah air.

### Apakah Akta Elektronik Memiliki Kekuatan Pembuktian Sempurna?
Secara klasik, akta otentik wajib dibacakan dan ditandatangani di hadapan Notaris (Pasal 1868 KUHPerdata). Namun, amandemen Undang-Undang Informasi dan Transaksi Elektronik (UU ITE) serta draf regulasi pelengkap UUJN merintis legalitas penandatanganan dokumen kenotariatan secara elektronik bersertifikat (Certificate Authority/CA).

1. **Autentisitas Data:** Tanda tangan digital menggunakan algoritma kriptografi asimetris memastikan dokumen tidak mengalami perubahan 1 karakter pun pasca ditandatangani.
2. **Sertifikat Elektronik (e-Sign):** Kerja sama lembaga audit negara seperti BSrE (Badan Siber dan Sandi Negara) memastikan identitas penandatangan mutlak tervalidasi.
3. **Penyimpanan Minuta:** Minuta akta diarsipkan secara cloud militer dengan replikasi database lokal untuk mitigasi bencana (Disaster Recovery).

### Kesimpulan & Prakiraan ke Depan
Setiap kantor notaris diwajibkan melakukan modernisasi sistem manajemen dokumennya demi menjaga daya saing di era AI Search Optimized 2026. Keamanan siber menjadi modalitas utama integritas profesi Pejabat Umum Hukum.`,
      date: '08 Juni 2026',
      author: 'Achmad Maulana, S.H., M.Kn.',
      tag: 'Regulasi Digital'
    },
    {
      id: 2,
      title: 'Panduan Praktis Syarat Pendirian PT Persekutuan Modal (UU Cipta Kerja)',
      slug: 'syarat-pendirian-pt-terbaru-2026',
      excerpt: 'Langkah taktis menyusun anggaran dasar PT, pemilihan modal disetor, penentuan kode KBLI 2020, hingga terbit SK Pengesahan Kemenkumham.',
      content: `### Pendirian PT Berdasarkan UU Cipta Kerja
Hadirnya UU Nomor 6 Tahun 2023 tentang Cipta Kerja membawa angin segar bagi kemudahan berusaha (Ease of Doing Business) di Indonesia. Pendirian PT Persekutuan Modal minimal didirikan oleh 2 orang pemegang saham dengan porsi hak masing-masing.

### Syarat Administrasi Wajib
Kantor Notaris Achmad Maulana merangkum dokumen primer yang wajib dibawa pendiri usaha:
- **Dokumen Identitas:** KTP & NPWP asli dari seluruh Pendiri, Direktur, dan Komisaris.
- **Pengecekan Nama PT:** Nama PT wajib terdiri dari minimal 3 suku kata dalam bahasa Indonesia, bebas dari kata asing, dan belum pernah digunakan oleh entitas lain di database AHU Online.
- **Domisili Usaha:** Bukti kepemilikan kantor atau perjanjian sewa menyewa gedung komersial yang bersesuaian dengan zonasi tata wilayah Jakarta.
- **Nilai Modal Dasar & Setor:** Menetapkan modal dasar minimal Rp 50.000.000 (atau ditentukan secara mandiri oleh pendiri) serta menyetor minimal 25% dari modal dasar tersebut.

### Alur Kerja AHU Sabh Kemenkumham
1. **Pembuatan Draf Akta** oleh Notaris berdasarkan data komparisi dari klien.
2. **Pembacaan & Penandatanganan** Minuta Akta Pendirian PT.
3. **Penginputan Sistem SABH** dan pembayaran PNBP.
4. **Terbitnya SK Kemenkumham** penahbisan PT sebagai badan hukum mandiri secara sah di Indonesia.`,
      date: '02 Juni 2026',
      author: 'Kepaniteraan Staff Notaris',
      tag: 'Hukum Korporasi'
    }
  ];

  // Schema Markup JSON-LD LegalService for SEO 2026
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Kantor Notaris & PPAT Achmad Maulana, S.H., M.Kn.",
    "description": "Layanan Kenotariatan Profesional, Pembuatan Akta Otentik Tanah, Hukum Waris & Legalitas Perusahaan Terpercaya di Jakarta",
    "image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
    "telephone": "+62-812-3456-7890",
    "email": "maulana.notaris@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gedung Grha Hukum Lt. 3, Jl. HR. Rasuna Said Kav. 22",
      "addressLocality": "Jakarta Selatan",
      "addressRegion": "DKI Jakarta",
      "postalCode": "12920",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-6.2241",
      "longitude": "106.8315"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "priceRange": "$$"
  };

  // --- SEO Dynamic Meta Helper ---
  const getSeoMetadata = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: "SIM-K Kantor Hub | Sistem Informasi Manajemen Kantor Notaris Mandiri",
          description: "Pusat workspace digital Kantor Notaris. Manajemen klien terpadu, draf otomatis dokumen, agenda pintar, dan AI Legal Assistant terintegrasi secara aman.",
          canonicalUrl: "https://notarismaulana.com/dashboard"
        };
      case 'architecture':
        return {
          title: "Blueprints & Panduan VPS Notaris | Kedaulatan Server Mandiri",
          description: "Cetak biru instalasi mandiri Docker, Nginx SSL, backup database otomatis, dan panduan lengkap kedaulatan data hukum perdata di VPS Kantor Notaris.",
          canonicalUrl: "https://notarismaulana.com/blueprints"
        };
      case 'public':
      default:
        return {
          title: "Notaris Pro - Kantor Digital | Jasa Pembuatan Akta & PPAT Terpercaya",
          description: "Layanan hukum kenotariatan terbaik untuk Pendirian PT/CV, Akta Tanah (PPAT), Waris Perdata, Legalitas Yayasan, dan E-Konsultasi Instan secara mandiri & akuntabel.",
          canonicalUrl: "https://notarismaulana.com/"
        };
    }
  };

  const seoMeta = getSeoMetadata();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col selection:bg-[#D4AF37] selection:text-navy-950">
      
      {/* DYNAMIC SEO META HELMET */}
      <SEO 
        title={seoMeta.title} 
        description={seoMeta.description} 
        canonicalUrl={seoMeta.canonicalUrl} 
      />
      
      {/* GLOBAL TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 right-4 md:right-8 z-50 bg-[#0B192C] text-white border border-[#D4AF37]/50 rounded-xl px-5 py-4 shadow-2xl max-w-sm flex items-start gap-3"
            id="global-toast"
          >
            <div className="bg-[#D4AF37] text-navy-950 p-1.5 rounded-lg shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium leading-normal">{toast}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ENTERPRISE HEADER BAR --- */}
      <header className="sticky top-0 z-40 bg-[#0B192C]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-lg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo & Headline */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#AA7C11] p-2.5 rounded-lg shadow-inner flex items-center justify-center">
              <Scale className="h-6 w-6 text-navy-950 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg md:text-xl tracking-tight text-white">MAULANA</span>
                <span className="text-[#D4AF37] text-xs font-semibold px-2 py-0.5 border border-[#D4AF37]/40 rounded-full">Sistem Mandiri</span>
              </div>
              <p className="text-[10px] text-gray-400 font-mono tracking-wider">KANTOR NOTARIS & PPAT • INDEPENDENT CLOUD VPS</p>
            </div>
          </div>

          {/* Navigation Links for tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-navy-950 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => { setActiveTab('public'); setMobileMenuOpen(false); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'public' 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B192C] shadow-md' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Globe className="h-4 w-4" />
              Website Publik Notaris
            </button>
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B192C] shadow-md' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="h-4 w-4" />
              SIM-K Kantor Hub (Workspace Aktif)
            </button>
            <button
              onClick={() => { setActiveTab('architecture'); setMobileMenuOpen(false); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'architecture' 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B192C] shadow-md' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code className="h-4 w-4" />
              Blueprints & Panduan VPS
            </button>
          </nav>

          {/* Quick Actions (Role Switching & Help Mode) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs bg-navy-950 border border-white/10 px-3 py-1.5 rounded-lg">
              <span className="text-gray-400">Hak Akses:</span>
              <select 
                value={currentUserRole}
                onChange={(e) => {
                  setCurrentUserRole(e.target.value as any);
                  triggerToast(`🔄 Hak akses Kantor diubah: ${e.target.value}`);
                }}
                className="bg-transparent text-[#D4AF37] font-semibold outline-none cursor-pointer focus:ring-0"
              >
                <option value="Notaris" className="bg-[#0B192C] text-white">Notaris Utama</option>
                <option value="Admin" className="bg-[#0B192C] text-white">Super Admin Server</option>
                <option value="Staff" className="bg-[#0B192C] text-white">Staff Kantor</option>
              </select>
            </div>
            
            {/* Global Theme Toggle Button */}
            <button
              onClick={() => {
                setIsDark(!isDark);
                triggerToast(isDark ? "🔆 Mode Terang diaktifkan" : "🌙 Mode Gelap diaktifkan");
              }}
              className="p-2.5 rounded-lg bg-navy-950 border border-white/10 text-[#D4AF37] hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center justify-center shrink-0"
              title={isDark ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Phone className="h-3.5 w-3.5" />
              Hubungi Notaris
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => {
                setIsDark(!isDark);
                triggerToast(isDark ? "🔆 Mode Terang diaktifkan" : "🌙 Mode Gelap diaktifkan");
              }}
              className="p-2 rounded-lg bg-navy-950 border border-white/10 text-[#D4AF37] hover:bg-white/15 transition-all duration-200 flex items-center justify-center"
              aria-label="Toggle Theme"
              title={isDark ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 hover:bg-white/15 rounded-lg"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B192C] border-b border-[#D4AF37]/30 text-white font-medium"
          >
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={() => { setActiveTab('public'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-lg text-sm hover:bg-white/10 flex items-center gap-3"
              >
                <Globe className="h-4 w-4 text-[#D4AF37]" />
                Website Publik Notaris
              </button>
              <button
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-lg text-sm hover:bg-white/10 flex items-center gap-3"
              >
                <Cpu className="h-4 w-4 text-[#D4AF37]" />
                SIM-K Kantor Hub (Workspace Aktif)
              </button>
              <button
                onClick={() => { setActiveTab('architecture'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-lg text-sm hover:bg-white/10 flex items-center gap-3"
              >
                <Code className="h-4 w-4 text-[#D4AF37]" />
                Blueprints & Panduan VPS
              </button>
              <div className="border-t border-white/10 my-2 pt-2 space-y-2">
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-xs text-gray-400">Hak Akses:</span>
                  <select 
                    value={currentUserRole}
                    onChange={(e) => {
                      setCurrentUserRole(e.target.value as any);
                      triggerToast(`🔄 Hak akses Kantor diubah: ${e.target.value}`);
                    }}
                    className="bg-[#0B192C] text-[#D4AF37] font-semibold text-xs outline-none"
                  >
                    <option value="Notaris">Notaris Utama</option>
                    <option value="Admin">Super Admin Server</option>
                    <option value="Staff">Staff Kantor</option>
                  </select>
                </div>

                <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 pt-2">
                  <span className="text-xs text-gray-400">Mode Tampilan:</span>
                  <button
                    onClick={() => {
                      setIsDark(!isDark);
                      triggerToast(isDark ? "🔆 Mode Terang diaktifkan" : "🌙 Mode Gelap diaktifkan");
                    }}
                    className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-white font-semibold transition"
                  >
                    {isDark ? (
                      <>
                        <Sun className="h-3.5 w-3.5" />
                        Mode Terang
                      </>
                    ) : (
                      <>
                        <Moon className="h-3.5 w-3.5" />
                        Mode Gelap
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN SYSTEM VIEWPORT --- */}
      <main className="flex-1">

        {/* ========================================================= */}
        {/* VIEW 1: WEBSITE PUBLIK (SEO 2026 WEB SHOWCASE) */}
        {/* ========================================================= */}
        {activeTab === 'public' && (
          <div className="animate-fadeIn">
            
            {/* HERO PROFIL SEKSI */}
            <section className="relative bg-gradient-to-b from-[#0B192C] to-[#1E3E62] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.15),transparent_40%)]"></div>
              <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center font-sans">
                
                {/* Left Tagline Headline */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#D4AF37]">
                    <ShieldCheck className="h-4 w-4" />
                    Sistem Digitalisasi Kantor Notaris Mandiri Terbaik
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                    Kepastian Hukum <br />
                    <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF] to-[#E3C16F] bg-clip-text text-transparent font-display">Otentik, Cipta & Teruji</span>
                  </h1>
                  <p className="text-gray-300 text-base md:text-lg max-w-xl leading-relaxed">
                    Kami melayani pembuatan Akta Pendirian Usaha (PT/CV), Hak Atas Tanah (PPAT), Waris Perdata, Legalitas Yayasan secara lurus, mematuhi UUJN, dan didukung transformasi teknologi hukum modern.
                  </p>
                  
                  {/* Google Search Grounding Badge */}
                  <div className="flex items-center gap-3 text-xs text-gray-400 font-mono bg-navy-950/40 p-3 rounded-xl border border-white/5 max-w-md">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                    <span>Optimized for AI Search Engines (Gemini, Perplexity, GPT 2026 Agent Grounding verified)</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-navy-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-[#D4AF37]/10 hover:shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-100 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Cpu className="h-5 w-5" />
                      Akses Workspace SIM-K Kantor
                    </button>
                    <a
                      href="#layanan"
                      className="bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-center text-sm flex items-center justify-center"
                    >
                      Pelajari Layanan Kami
                    </a>
                  </div>
                </div>

                {/* Right Frame (Simulated Modern Business Card & Google Map Widget) */}
                <div className="lg:col-span-5">
                  <div className="bg-gradient-to-br from-[#1A365D] to-[#0A1A2F] border-2 border-[#D4AF37] rounded-3xl p-6 shadow-2xl space-y-6 relative">
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/50 rounded-full px-3 py-1 font-mono text-[9px] text-[#D4AF37]">
                      PPAT DAERAH JABATAN JAKARTA
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-[#D4AF37] font-mono text-xs tracking-widest font-bold">REPUBLIC OF INDONESIA</p>
                      <h2 className="text-2xl font-bold text-white tracking-tight">KANTOR NOTARIS & PPAT</h2>
                      <p className="text-xl font-medium text-gray-200">ACHMAD MAULANA, S.H., M.Kn.</p>
                      <p className="text-xs text-gray-400">SK Kepala BPND RI No: 432/KEP-PPAT/2021</p>
                    </div>

                    <div className="border-t border-white/10 pt-4 space-y-3 font-mono text-xs text-gray-300">
                      <div className="flex items-center gap-3">
                        <Award className="h-4 w-4 text-[#D4AF37] shrink-0" />
                        <span>Izin AHU No: AHU-102.XXXX.AH.02.01</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-[#D4AF37] shrink-0" />
                        <span>+62 812-3456-7890</span>
                      </div>
                      <div className="flex items-center gap-3 text-left">
                        <BookOpen className="h-4 w-4 text-[#D4AF37] shrink-0" />
                        <span>Rasuna Said Kav. 22, Jakarta Selatan</span>
                      </div>
                    </div>

                    {/* Quick Simulated Live Stats */}
                    <div className="grid grid-cols-3 gap-2 bg-[#0B192C]/80 p-3 rounded-2xl border border-white/5 text-center">
                      <div>
                        <p className="text-lg font-bold text-[#D4AF37]">1,400+</p>
                        <p className="text-[9px] text-gray-400 uppercase font-mono">Akta Terbit</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#D4AF37]">820+</p>
                        <p className="text-[9px] text-gray-400 uppercase font-mono">PT & Usaha</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-emerald-400">100%</p>
                        <p className="text-[9px] text-gray-400 uppercase font-mono">Legal Valid</p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* PERSENTASI PILAR SEO 2026: INTERACTIVE SCHEMA EXPLORER */}
            <section className="bg-slate-100 py-6 border-y border-slate-200">
              <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="bg-[#0B192C] text-[#D4AF37] p-2 rounded-lg">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">AI & Google Search Grounding 2026 Ready</h3>
                    <p className="text-xs text-slate-500">JSON-LD LegalService Schema tertanam secara semantik.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 text-xs text-slate-700 font-mono overflow-x-auto w-full lg:w-auto">
                  <span className="text-blue-600 font-bold">StructuredData:</span>
                  <span>{"schema.org/LegalService"}</span>
                  <span className="text-[#D4AF37] font-semibold">{"200 OK • Indexable"}</span>
                </div>
              </div>
            </section>

            {/* SEKSI SPONSORSHIP & MITRA KERJASAMA RESMI */}
            <section className="bg-white py-12 border-b border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center space-y-2">
                  <h3 className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest font-mono">MITRA INSTITUSI & KERJASAMA STRATEGIS</h3>
                  <p className="text-slate-500 text-xs">Sistem hukum dan arsip Kantor kami terintegrasi, diakui, serta mendukung ekosistem lembaga berikut:</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 items-center justify-center filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100/80 hover:border-[#D4AF37] transition-colors text-center text-[10px] space-y-1.5 justify-center">
                    <span className="font-extrabold text-[#0B192C] text-sm tracking-tighter">AHU ONLINE</span>
                    <span className="text-slate-400 font-medium">Kemenkumham RI</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100/80 hover:border-[#D4AF37] transition-colors text-center text-[10px] space-y-1.5 justify-center">
                    <span className="font-extrabold text-[#0B192C] text-sm tracking-widest">I.N.I</span>
                    <span className="text-slate-400 font-medium">Ikatan Notaris Indo</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100/80 hover:border-[#D4AF37] transition-colors text-center text-[10px] space-y-1.5 justify-center">
                    <span className="font-extrabold text-[#0B192C] text-sm tracking-tight">ATR / BPN</span>
                    <span className="text-slate-400 font-medium">Badan Pertanahan Nas</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100/80 hover:border-[#D4AF37] transition-colors text-center text-[10px] space-y-1.5 justify-center">
                    <span className="font-extrabold text-[#0B192C] text-sm">BANK MANDIRI</span>
                    <span className="text-slate-400 font-medium">Perbankan Rekanan</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100/80 hover:border-[#D4AF37] transition-colors text-center text-[10px] space-y-1.5 justify-center">
                    <span className="font-extrabold text-[#0B192C] text-sm">BANK BCA</span>
                    <span className="text-slate-400 font-medium">Fasilitator Escrow</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100/80 hover:border-[#D4AF37] transition-colors text-center text-[10px] space-y-1.5 justify-center">
                    <span className="font-extrabold text-[#0B192C] text-sm tracking-widest">B.S.r.E</span>
                    <span className="text-slate-400 font-medium">Digital Signature BSSN</span>
                  </div>
                </div>

                {/* Commercial Value Badge Box */}
                <div className="bg-gradient-to-r from-[#0B192C] to-[#1E3E62] text-white p-6 rounded-3xl border border-[#D4AF37]/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md shadow-[#0B192C]/5">
                  <div className="space-y-1 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <span className="px-2 py-0.5 bg-[#D4AF37] text-navy-950 font-extrabold text-[9px] rounded uppercase">PREG-PRESTIGE</span>
                      <h4 className="font-extrabold text-sm text-[#D4AF37]">Portal Mandiri Siap Integrasi & Milik Hak Cipta Penuh</h4>
                    </div>
                    <p className="text-xs text-gray-300">Aplikasi ini dijual lepas tanpa biaya berlangganan. Notaris memegang kontrol penuh atas database, server VPS, and data sensitif klien.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveTab('architecture');
                      setArchTab('vps');
                      triggerToast('📋 Selamat datang di panduan pemindahan hosting VPS!');
                    }}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#E2C275] text-navy-950 font-bold text-xs px-5 py-2.5 rounded-xl hover:scale-105 transition-all text-center"
                  >
                    Lihat Cara Deployment VPS
                  </button>
                </div>
              </div>
            </section>

            {/* SEKSI LAYANAN UTAMA NOTARIS */}
            <section id="layanan" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <h2 className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Spesialisasi Kompetensi Kami</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#0B192C]">Layanan Hukum & Kenotariatan Profesional</h3>
                <p className="text-slate-500 text-sm">
                  Prosedur pengerjaan terdokumentasi rapi, transparan, dan diselesaikan melalui koordinasi instansi digital perbankan dan kementerian terkait.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Anggaran Dasar PT, CV, Yayasan',
                    desc: 'Pendirian badan usaha komersial maupun yayasan sosial, pengurusan NPWP, izin NIB, pendampingan legalitas.',
                    docs: 'KTP & NPWP Pendiri, Surat Sewa Ruko/Kantor, Susunan Pengurus.',
                    cost: 'Mulai Rp 2.500.000 / akta',
                    icon: BuildCardIcon('PT')
                  },
                  {
                    title: 'Peralihan & AJB Tanah (PPAT)',
                    desc: 'Prosedur Akta Jual Beli tanah/bangunan, balik nama sertifikat, akta pembagian hak bersama (APHB), pengecekan clean check.',
                    docs: 'Sertifikat Asli, KTP/NPWP Penjual-Pembeli, Bukti Lunas PBB.',
                    cost: 'Mulai 1.0% nilai transaksi',
                    icon: BuildCardIcon('TANAH')
                  },
                  {
                    title: 'Hukum Waris Perdata / Islam',
                    desc: 'Pembuatan Surat Keterangan Ahli Waris (SKW), Akta Pembagian Harta Peninggalan (APHP), hibah wasiat resmi terdaftar.',
                    docs: 'Buku Nikah Pewaris, Akta Kematian, Silsilah Suku/Kelurahan.',
                    cost: 'Mulai Rp 1.500.000 / akta',
                    icon: BuildCardIcon('WARIS')
                  },
                  {
                    title: 'Legalitas Umum & Waarmerking',
                    desc: 'Legalisasi dokumen di bawah tangan, waarmeking pendaftaran berkas eksternal, pembuatan surat kuasa bertindak korporat.',
                    docs: 'Dokumen Asli, KTP Penandatangan.',
                    cost: 'Mulai Rp 250.000 / berkas',
                    icon: BuildCardIcon('UMUM')
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/50 transition-all group flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="bg-[#0B192C]/5 text-[#D4AF37] h-12 w-12 rounded-xl group-hover:bg-[#0B192C] group-hover:text-white transition-colors flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h4 className="font-extrabold text-[#0B192C] text-lg leading-snug">{item.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                      
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                        <p className="text-[10px] uppercase font-mono text-slate-400">Berkas Wajib:</p>
                        <p className="text-[10px] text-slate-600 italic leading-normal">{item.docs}</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                      <span className="text-[#D4AF37] font-bold text-xs">{item.cost}</span>
                      <button 
                        onClick={() => {
                          setActiveTab('dashboard');
                          setDashboardTab('ai-tools');
                          setDraftType(item.title);
                          triggerToast(`🔧 Pengisi Otomatis: Draf diletakkan pada AI Legal Toolkit!`);
                        }}
                        className="text-xs font-bold text-[#0B192C] group-hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
                      >
                        Tulis Draf AI
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION: CLIENT PORTFOLIO & REPUTATION BRANDING (Daftar Klien Jasa Notaris) */}
            <section className="bg-white dark:bg-[#060F1E] py-14 border-t border-slate-100 dark:border-[#1E3A60]/40 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-2 mb-10">
                  <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-mono">MITRA & PORTOFOLIO KORPORASI</p>
                  <h3 className="text-2xl font-extrabold text-[#0B192C] dark:text-white font-sans tracking-tight"> Dipercaya oleh Institusi Terkemuka</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs max-w-2xl mx-auto">
                    Kantor Notaris & PPAT Achmad Maulana, S.H., M.Kn. secara resmi terdaftar sebagai mitra hukum legalitas dan pembuat akta terpercaya berbagai perusahaan nasional.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 items-center justify-center">
                  {[
                    { nama: 'PT BANK MANDIRI (PERSERO)', tipe: 'Escrow & Kredit Perbankan', letak: 'Jakarta' },
                    { nama: 'PT BCA SYARIAH', tipe: 'Akad Pembiayaan Murabahah', letak: 'Nasional' },
                    { nama: 'PT NUSANTARA DEVELOPER', tipe: 'Peralihan & Pemecahan AJB', letak: 'Jabodetabek' },
                    { nama: 'YAYASAN BAKTI BANGSA', tipe: 'Akta Pendirian & Perubahan AD', letak: 'Jakarta' },
                    { nama: 'PT RAJAWALI TEKNOLOGI', tipe: 'Anggaran Dasar startup & KBLI', letak: 'Bandung' }
                  ].map((klien, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#FAF9F6] dark:bg-[#0B192E] p-4 rounded-2xl border border-slate-200/50 dark:border-[#1E3A60]/40 text-center space-y-1.5 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all group shadow-sm flex flex-col justify-center h-28"
                    >
                      <div className="text-[#D4AF37] dark:text-[#D4AF37]/80 group-hover:scale-105 transition-transform flex justify-center">
                        <Building className="h-5 w-5" />
                      </div>
                      <p className="text-[11px] font-black text-[#0B192C] dark:text-white leading-tight font-sans block max-w-full truncate">{klien.nama}</p>
                      <p className="text-[9px] text-slate-400 dark:text-slate-500 font-mono tracking-tight">{klien.tipe}</p>
                      <span className="inline-block bg-[#0B192C]/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[8px] font-bold px-2 py-0.5 rounded-full w-max mx-auto font-sans">{klien.letak}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION: CLIENT TESTIMONIALS (Ulasan Positif Klien) */}
            <section className="bg-slate-50 dark:bg-[#0B192E] py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-[#1E3A60]/45 transition-colors">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 text-xs text-[#D4AF37] rounded-full font-bold uppercase tracking-wider font-mono">
                    <Award className="h-3.5 w-3.5" />
                    KEPUASAN KLIEN 100% TERJAMIN
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-[#0B192C] dark:text-white tracking-tight font-sans leading-none">
                    Ulasan Positif Dari <span className="text-[#D4AF37]">Para Klien Kami</span>
                  </h3>
                  <p className="text-slate-500 dark:text-gray-400 text-xs sm:text-sm max-w-3xl mx-auto">
                    Kualitas pengerjaan akta legal, ketepatan waktu, dan integritas hukum perdata adalah pegangan utama kami. Berikut ulasan tulus dari para pemohon jasa hukum Kantor Notaris Maulana.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 font-sans">
                  {[
                    {
                      nama: 'Tuan Budi Santoso',
                      jabatan: 'Direktur Utama, PT Nusantara Jaya Mandiri',
                      rating: 5,
                      layanan: 'Pendirian PT & Akta Anggaran Dasar',
                      teks: 'Pengalaman mendirikan PT bersama Notaris Maulana sangat luar biasa. Semua draf akta disiapkan secara otomatis dengan bantuan AI legal assistant-nya dan disahkan secara resmi oleh Kemenkumham dalam waktu kurang dari seminggu! Sangat responsif dan transparan.'
                    },
                    {
                      nama: 'Ibu Ratna Kumalasari',
                      jabatan: 'Pemilik Tanah, Jagakarsa',
                      rating: 5,
                      layanan: 'Peralihan Hak & Akta Jual Beli PPAT',
                      teks: 'Saya sangat terbantu dengan transparansi biaya dan efisiensi waktu saat pengurusan sertifikat tanah keluarga kami. Seluruh proses perbankan, pengecekan berkas clean check di BPN sangat terorganisir rapi tanpa ada manipulasi sama sekali.'
                    },
                    {
                      nama: 'Tuan Taufik Hidayat',
                      jabatan: 'Head of Legal, PT Griya Asri Realty',
                      rating: 5,
                      layanan: 'KemitraanPPAT & Pemecahan Sertifikat Rumah',
                      teks: 'Sebagai developer perumahan nasional, kolaborasi jangka panjang dengan Kantor Notaris Maulana sangat memuaskan. Beliau sangat kooperatif, tanggap, berintegritas tinggi, dan didukung sistem database kedaulatan server mandiri yang luar biasa aman.'
                    },
                    {
                      nama: 'dr. Handoko Sp.B',
                      jabatan: 'Ahli Waris Keluarga Kartasasmita',
                      rating: 5,
                      layanan: 'Keterangan Waris & Pembagian Aset',
                      teks: 'Pembagian harta waris perdata adalah urusan sensitif, namun Notaris Maulana mampu memediasi dan menuangkannya ke dalam Akta Pembagian Hak Bersama dengan sangat damai, adil, komprehensif, dan menjamin hak hukum setiap anggota keluarga.'
                    }
                  ].map((testi, idx) => (
                    <div 
                      key={idx}
                      className="bg-white dark:bg-[#060F1E] rounded-3xl p-6 border border-slate-100 dark:border-[#1E3A60]/30 shadow-sm hover:shadow-md transition-all space-y-4 relative flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                            {testi.layanan}
                          </span>
                          <div className="flex items-center gap-0.5 text-amber-500">
                            {Array.from({ length: testi.rating }).map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-current" />
                            ))}
                          </div>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed italic">
                          "{testi.teks}"
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-[#1E3A60]/20 flex items-center gap-3">
                        <div className="bg-[#0B192C] text-[#D4AF37] h-10 w-10 text-xs rounded-full font-black flex items-center justify-center border border-[#D4AF37]/50 shrink-0 uppercase">
                          {testi.nama.split(' ').slice(-1)[0][0] || 'K'}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#0B192C] dark:text-white leading-tight font-sans">{testi.nama}</h4>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5 leading-none">{testi.jabatan}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION: FAQ ACCORDION (SEO & TRUST BUILDING) */}
            <section id="faq" className="bg-white dark:bg-[#060F1E] py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-[#1E3A60]/40 transition-colors">
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-3 font-sans">
                  <div className="inline-flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 text-xs text-[#D4AF37] rounded-full font-bold uppercase tracking-wider font-mono">
                    <HelpCircle className="h-3.5 w-3.5" />
                    Pusat Informasi &amp; FAQ
                  </div>
                  <h3 className="text-3xl font-black text-[#0B192C] dark:text-white tracking-tight leading-none">
                    Pertanyaan Umum <span className="text-[#D4AF37]">Layanan Notaris &amp; PPAT</span>
                  </h3>
                  <p className="text-slate-500 dark:text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto">
                    Temukan jawaban praktis seputar legalitas hukum, prosedur pembuatan akta, estimasi waktu, serta dokumen persyaratan yang wajib Anda persiapkan.
                  </p>
                </div>

                <div className="space-y-4 font-sans">
                  {[
                    {
                      q: "Berapa range biaya/honorar pengurusan jasa hukum kenotariatan (pendirian PT, CV, atau AJB PPAT)?",
                      a: "Biaya jasa (honorar) ditentukan secara transparan berdasarkan jenis akta (perdata umum, pendirian badan usaha, atau peralihan hak tanah/PPAT) serta nilai objek transaksi bisnis Anda. Regulasi penentuan tarif kami didasarkan pada Undang-Undang Jabatan Notaris (UUJN) secara objektif dan akuntabel. Kami berkomitmen memberikan transparansi penuh tanpa ada biaya tersembunyi kelak."
                    },
                    {
                      q: "Berapa lama waktu pengerjaan draf dokumen hingga pengesahan kemenkumham selesai?",
                      a: "Untuk penyusunan Akta Pendirian PT/CV beserta proses keputusan pengesahan kemenkumham standar memakan waktu 3 - 5 hari kerja sejak kelengkapan dokumen pengurus disetujui. Sementara pengurusan balik nama sertifikat tanah dan pengesahan akta AJB oleh PPAT membutuhkan proses verifikasi pajak serta pendaftaran ke Kantor BPN sekitar 14 hari kerja."
                    },
                    {
                      q: "Dokumen persyaratan dasar apa saja yang wajib disiapkan oleh pemohon?",
                      a: "Secara umum, persyaratan utama meliputi identitas para pihak (KTP asli, Kartu Keluarga, NPWP), draf pendukung materi akta, serta berkas spesifik objek hukum (seperti Sertifikat Tanah Asli untuk PPAT, bukti pelunasan PPh dan BPHTB, serta Surat Pernyataan Setor Modal bagi perseroan)."
                    },
                    {
                      q: "Apakah seluruh proses konsultasi muatan akta bisa diselesaikan melalui online?",
                      a: "Sangat bisa! Kantor kami memfasilitasi integrasi digital penuh. Anda dapat berkonsultasi dengan asisten AI kami, mengunggah draf data hukum, dan mematangkan klausul kontrak secara virtual. Namun, sesuai aturan ketat UU Jabatan Notaris, pembacaan serta penandatanganan fisik minuta akta wajib dihadiri langsung oleh para penghadap di kantor Notaris."
                    },
                    {
                      q: "Bagaimana jaminan keamanan data berkas sengketa dan dana pembayaran escrow kami?",
                      a: "Semua dokumen digital disimpan aman di local server mandiri bebas peretas pihak ketiga. Seluruh pembayaran biaya administrasi, honorarium, dan setoran pajak negara disetorkan langsung melalui nomor Rekening Penampung (Escrow Account) perbankan resmi ke atas nama Kantor Notaris & PPAT Achmad Maulana, menjamin perlindungan finansial mutlak bagi klien."
                    }
                  ].map((faq, index) => {
                    const isOpen = activeFaq === index;
                    return (
                      <div 
                        key={index}
                        className="bg-slate-50 dark:bg-[#0B192E] rounded-2xl border border-slate-200/60 dark:border-[#1E3A60]/30 overflow-hidden transition-all hover:border-[#D4AF37]/50"
                      >
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : index)}
                          className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 transition-colors focus:outline-none"
                        >
                          <span className="font-extrabold text-[#0B192C] dark:text-white text-xs sm:text-sm hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors leading-snug">
                            {faq.q}
                          </span>
                          <span className={`p-1.5 rounded-full bg-white dark:bg-[#060F1E] text-[#D4AF37] border border-slate-100 dark:border-[#1E3A60]/30 transition-transform duration-200 flex items-center justify-center shrink-0 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                            <ChevronRight className="h-4 w-4" />
                          </span>
                        </button>

                        <div 
                          className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 border-t border-slate-200/50 dark:border-[#1E3A60]/20' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                          <div className="overflow-hidden">
                            <p className="p-5 sm:p-6 text-slate-600 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed select-text font-normal bg-white/60 dark:bg-black/10">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SECTION: DIRECT BOOKING / ONLINE LEGAL CONSULTATION FORM */}
            <section id="booking-online" className="bg-gradient-to-br from-[#0B192C] to-[#1E3E62] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-y-2 border-[#D4AF37] relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(197,160,89,0.1),transparent_50%)]"></div>
              
              <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center font-sans">
                
                {/* Left side text explanation */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-[#D4AF37]/40 px-3 py-1 text-xs text-[#D4AF37] rounded-full font-semibold uppercase tracking-wider">
                    <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                    E-Konsultasi & Layanan Hukum Mandiri
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
                    Pesan Jasa Notaris & <br />
                    <span className="text-[#D4AF37]">Jadwalkan Konsultasi Instan</span>
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Sistem portal ini terhubung langsung ke antrean internal Kantor Notaris Maulana. Pilih jenis layanan kenotariatan yang Anda butuhkan, isi detail perkara/kebutuhan Anda, dan tim hukum kami akan menghubungi Anda maksimal dalam waktu 2 jam kerja.
                  </p>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-2 rounded-xl text-[#D4AF37] shrink-0">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white font-sans">100% Bebas Kerugian & Transparan</h4>
                        <p className="text-xs text-gray-400 font-sans">Pembayaran aman melalui rekening escrow perbankan resmi langsung atas nama Notaris Maulana.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-2 rounded-xl text-[#D4AF37] shrink-0">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white font-sans">Kedaulatan Data Klien Terjaga</h4>
                        <p className="text-xs text-gray-400 font-sans">Dokumen Anda disimpan secara lokal dan aman tanpa ada perantara pihak ketiga.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-2 rounded-xl text-[#D4AF37] shrink-0">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white font-sans">Prioritas Antrean Kantor Utama</h4>
                        <p className="text-xs text-gray-400 font-sans">Pemesanan melalui sistem web memperoleh token penanganan khusus di hadapan Notaris langsung.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side form */}
                <div className="lg:col-span-7">
                  <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#D4AF37]"></div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-extrabold text-[#0B192C] font-sans">Formulir Pengajuan Jasa Hukum</h4>
                      <p className="text-xs text-slate-500 font-sans">Silakan lengkapi formulir di bawah ini dengan data asli Anda.</p>
                    </div>

                    <form onSubmit={handleCreateConsultOrder} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 block font-sans">Nama Lengkap Pemohon *</label>
                          <input 
                            type="text"
                            required
                            placeholder="Contoh: Tuan Ahmad Subarjo"
                            value={newConsultForm.nama}
                            onChange={(e) => setNewConsultForm({ ...newConsultForm, nama: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none px-4 py-2.5 rounded-xl text-xs text-slate-900 transition-all font-sans font-medium"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 block font-sans">Nomor Telepon / WhatsApp *</label>
                          <input 
                            type="tel"
                            required
                            placeholder="Contoh: 08123456789"
                            value={newConsultForm.telepon}
                            onChange={(e) => setNewConsultForm({ ...newConsultForm, telepon: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none px-4 py-2.5 rounded-xl text-xs text-slate-900 transition-all font-sans font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 block font-sans">Alamat Email (Opsional)</label>
                          <input 
                            type="email"
                            placeholder="Contoh: nama@perusahaan.com"
                            value={newConsultForm.email}
                            onChange={(e) => setNewConsultForm({ ...newConsultForm, email: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none px-4 py-2.5 rounded-xl text-xs text-slate-900 transition-all font-sans font-medium"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 block font-sans">Rencana Tanggal Pertemuan *</label>
                          <input 
                            type="date"
                            required
                            value={newConsultForm.tanggalBooking}
                            onChange={(e) => setNewConsultForm({ ...newConsultForm, tanggalBooking: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none px-4 py-2.5 rounded-xl text-xs text-slate-900 transition-all font-sans font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block font-sans">Kategori Jasa Hukum Kenotariatan *</label>
                        <select 
                          value={newConsultForm.tipeLayanan}
                          onChange={(e) => setNewConsultForm({ ...newConsultForm, tipeLayanan: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none px-4 py-2.5 rounded-xl text-xs text-slate-900 transition-all font-sans font-bold"
                        >
                          <option value="Anggaran Dasar PT, CV, Yayasan">Anggaran Dasar PT, CV, Yayasan</option>
                          <option value="Peralihan & AJB Tanah (PPAT)">Peralihan & AJB Tanah (PPAT)</option>
                          <option value="Hukum Waris Perdata / Islam">Hukum Waris Perdata / Islam</option>
                          <option value="Legalitas Umum & Waarmerking">Legalitas Umum & Waarmerking</option>
                          <option value="Konsultasi Hukum Umum Perdata">Konsultasi Hukum Umum Perdata / Lainnya</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block font-sans">Ringkasan Kasus / Kebutuhan Hukum Anda</label>
                        <textarea 
                          rows={3}
                          placeholder="Terangkan secara garis besar aset, modal usaha, atau dokumen pendukung yang ada saat ini..."
                          value={newConsultForm.keterangan}
                          onChange={(e) => setNewConsultForm({ ...newConsultForm, keterangan: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none px-4 py-2 rounded-xl text-xs text-slate-900 transition-all font-sans font-medium"
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#0B192C] to-[#1E3E62] hover:from-[#1E3E62] hover:to-[#0B192C] text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2 font-sans"
                      >
                        <Send className="h-4 w-4 text-[#D4AF37]" />
                        Kirim Pengajuan Jasa & Amankan Antrean
                      </button>
                    </form>
                  </div>
                </div>

              </div>

              {/* SUCCESS DYNAMIC MODAL / RECEIPT CARD */}
              <AnimatePresence>
                {activeBookingSuccess && (
                  <div className="fixed inset-0 z-50 bg-[#0B192C]/80 flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="bg-white text-slate-900 max-w-md w-full rounded-3xl border border-[#D4AF37] overflow-hidden shadow-2xl relative"
                    >
                      <div className="absolute top-0 left-0 right-0 h-2 bg-[#D4AF37]"></div>
                      <div className="p-6 text-center space-y-4">
                        <div className="inline-flex items-center justify-center p-3 bg-emerald-100 text-emerald-600 rounded-full mx-auto">
                          <Check className="h-8 w-8 font-black" />
                        </div>
                        
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-xl text-[#0B192C] font-sans">Pengajuan Masuk Antrean!</h4>
                          <p className="text-xs text-slate-500 font-sans">Nomor Booking Registrasi: <span className="font-mono text-[#D4AF37] font-bold">{activeBookingSuccess.id}</span></p>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-100 text-xs space-y-2 font-sans">
                          <p className="text-slate-500"><strong>Nama:</strong> {activeBookingSuccess.nama}</p>
                          <p className="text-slate-500"><strong>Jenis Jasa:</strong> {activeBookingSuccess.tipeLayanan}</p>
                          <p className="text-slate-500"><strong>Rencana Tanggal:</strong> {activeBookingSuccess.tanggalBooking}</p>
                          <p className="text-slate-500 italic mt-2 border-t border-slate-200/60 pt-2 text-[11px]">"{activeBookingSuccess.keterangan}"</p>
                        </div>

                        <div className="p-3 bg-blue-50 text-blue-800 text-[11px] leading-relaxed rounded-xl border border-blue-100 text-left font-sans">
                          💡 <strong>Hubungi via WhatsApp Pintar:</strong> Anda juga dapat menekan tombol WhatsApp di bawah untuk memberikan konfirmasi berkas manual secara kilat ke nomor asisten Notaris.
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <a 
                            href={`https://wa.me/6281234567890?text=Halo%20Notaris%20Maulana,%20saya%20sudah%20mengirim%20booking%20jasa%20*${encodeURIComponent(activeBookingSuccess.tipeLayanan)}*%20dengan%20ID%20*${activeBookingSuccess.id}*%20atas%20nama%20*${encodeURIComponent(activeBookingSuccess.nama)}*.%20Mohon%20tindak%20lanjut%20jadwal%20pertemuan.`}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors font-sans"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            Verifikasi WA
                          </a>
                          
                          <button 
                            onClick={() => setActiveBookingSuccess(null)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors font-sans"
                          >
                            Selesai & Keluar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </section>

            {/* ARTIKEL HUKUM SEO BLOG 2026 */}
            <section className="bg-[#1E3E62]/5 border-t border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left Column - Articles Grid */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="space-y-3">
                    <h2 className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Pusat Literasi Hukum (SEO Blog)</h2>
                    <h3 className="text-3xl font-black text-[#0B192C]">Edukasi Hukum Otentik & Hukum Kenotariatan</h3>
                    <p className="text-slate-500 text-sm max-w-xl">
                      Artikel ditulis dan direvieu langsung oleh pakar hukum perdata untuk keabsahan akademis dan pemenuhan semantic SEO.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {blogPosts.map((post) => (
                      <article key={post.id} className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <span className="bg-[#0B192C] text-[#D4AF37] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{post.tag}</span>
                          <span className="text-xs text-slate-400 font-mono">{post.date}</span>
                        </div>
                        <h4 className="text-xl md:text-2xl font-extrabold text-[#0B192C] hover:text-[#D4AF37] transition-all cursor-pointer">
                          {post.title}
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-xs text-slate-400 font-mono">Penulis: <strong className="text-slate-700">{post.author}</strong></span>
                          <button
                            onClick={() => setSelectedPostId(selectedPostId === post.id ? null : post.id)} 
                            className="text-[#D4AF37] font-bold text-xs flex items-center gap-1 hover:underline"
                          >
                            {selectedPostId === post.id ? 'Tutup Artikel' : 'Baca Selengkapnya'}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Interactive Full Content Render */}
                        {selectedPostId === post.id && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-slate-50 p-6 rounded-2xl border border-slate-150 text-slate-700 mt-4 overflow-hidden"
                          >
                            <div 
                              className="prose max-w-none text-slate-700 space-y-3"
                              dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(post.content) }}
                            />
                            
                            <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-2 text-xs">
                              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">#CyberNotary</span>
                              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">#UUNotaris2026</span>
                              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">#PeralihanHakTanah</span>
                              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">#NotarisJakarta</span>
                            </div>
                          </motion.div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>

                {/* Right Column - SEO Tech Meta Information Panel */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#0B192C] text-white rounded-3xl p-6 border border-[#D4AF37]/50 space-y-6 shadow-xl">
                    <div className="flex items-center gap-2 pb-3 border-b border-[#D4AF37]/30">
                      <Terminal className="text-[#D4AF37] h-5 w-5" />
                      <h4 className="font-extrabold text-sm uppercase tracking-wide">SEO 2026 Engine Crawler View</h4>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">
                      Situs web kenotariatan modern tidak hanya ramah manusia, tetapi **WAJIB** ramah mesin pencari AI (Semantic SEO, AI Agent indexing). Kode di bawah otomatis disomatkan di kepala berkas (head) menggunakan sintaks JSON-LD:
                    </p>

                    <div className="bg-black/40 p-3.5 rounded-2xl border border-white/10 font-mono text-[10px] text-gray-300 overflow-x-auto space-y-1 max-h-96">
                      <p className="text-[#D4AF37]">&lt;script type="application/ld+json"&gt;</p>
                      <pre className="whitespace-pre">{JSON.stringify(schemaMarkup, null, 2)}</pre>
                      <p className="text-[#D4AF37]">&lt;/script&gt;</p>
                    </div>

                    <div className="space-y-2 text-xs font-mono text-[#D4AF37]">
                      <div className="flex items-center justify-between">
                        <span>• Page-Speed (FCP)</span>
                        <span className="text-emerald-400 font-bold">&lt; 0.9s (Optimal)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Semantic HTML5 Tags</span>
                        <span className="text-emerald-400 font-bold">Passed</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Indexing Status</span>
                        <span className="text-emerald-400 font-bold">Robots.txt + Sitemap</span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Hub Widget */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-150 space-y-4 shadow-sm text-center">
                    <div className="bg-emerald-50 text-emerald-600 h-12 w-12 rounded-full mx-auto flex items-center justify-center">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#0B192C]">Konsultasi WhatsApp Instan</h4>
                      <p className="text-slate-500 text-xs">Butuh pencerahan instan dari staff hukum kami? Hubungi sekarang.</p>
                    </div>
                    <a 
                      href="https://wa.me/6281234567890?text=Halo%20Notaris%20Achmad%20Maulana,%20Bisa%20berkonsultasi%20mengenai%20pendirian%20PT%20saya?" 
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl inline-flex items-center justify-center gap-2 text-xs transition-colors"
                    >
                      Hubungi WA (+6281234567890)
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

              </div>
            </section>

          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: DASHBOARD NOTARIS (SAAS PORTAL INTERACTIVE PLAYGROUND) */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="animate-fadeIn min-h-[85vh] bg-[#F1F5F9] pb-12">
            
            {/* Quick Metrics Bar banner */}
            <div className="bg-[#0B192C] text-white py-4 px-4 sm:px-6 lg:px-8 border-b-2 border-[#D4AF37]">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-sans">
                <div className="space-y-1 text-center md:text-left">
                  <h2 className="text-white text-lg font-bold flex items-center gap-2 justify-center md:justify-start">
                    <Layers className="text-[#D4AF37] h-5 w-5" />
                    SIM-K (Sistem Informasi Manajemen Kantor Notaris Mandiri)
                  </h2>
                  <p className="text-xs text-gray-300">
                    Aplikasi Server Mandiri terintegrasi database lokal & API SABH Kemenkumham. Otorisasi Saat Ini: <span className="text-[#D4AF37] font-semibold">{currentUserRole}</span>.
                  </p>
                </div>

                {/* Simulated Stats Banner */}
                <div className="flex gap-4 md:gap-8 flex-wrap justify-center text-xs font-mono">
                  <div className="text-center px-3 border-r border-white/10">
                    <span className="text-gray-400 block text-[9px] uppercase">KLIEN AKTIF</span>
                    <span className="text-white font-bold text-base">{clients.length} Jiwa</span>
                  </div>
                  <div className="text-center px-3 border-r border-white/10">
                    <span className="text-gray-400 block text-[9px] uppercase">DOKUMEN TOTAL</span>
                    <span className="text-white font-bold text-base">{documents.length} Berkas</span>
                  </div>
                  <div className="text-center px-3 border-r border-white/10">
                    <span className="text-gray-400 block text-[9px] uppercase">Sertifikat Digital</span>
                    <span className="text-emerald-400 font-bold text-base">{documents.filter(d=>d.digitalSignature).length} Aktif</span>
                  </div>
                  <div className="text-center px-3">
                    <span className="text-gray-400 block text-[9px] uppercase">KATA KUNCI AI</span>
                    <span className="text-[#D4AF37] font-bold text-base">Sistem Mandiri</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Workspace */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left sidebar nav for dashboard */}
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-3 py-2 font-mono">WORKSPACE SIM-K</p>
                  
                  {[
                    { id: 'ai-tools', label: 'AI Legal Toolkit', icon: Cpu, badge: 'Smart' },
                    { id: 'klien', label: 'Manajemen Klien', icon: Users, count: clients.length },
                    { id: 'orders', label: 'Order & Konsultasi', icon: HelpCircle, count: consultOrders.filter(o=>o.status === 'Menunggu Hubungi').length, badge: consultOrders.filter(o=>o.status === 'Menunggu Hubungi').length > 0 ? 'Baru' : undefined },
                    { id: 'dokumen', label: 'Manajemen Dokumen', icon: FileText, count: documents.length },
                    { id: 'scheduler', label: 'Agenda & Reminder', icon: Calendar, count: reminders.filter(r=>!r.completed).length },
                    { id: 'logs', label: 'Audit Log Sistem', icon: Activity, badge: 'Secure' },
                  ].map((item) => {
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setDashboardTab(item.id as any)}
                        className={`w-full text-left px-3.5 py-3 rounded-2xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                          dashboardTab === item.id 
                            ? 'bg-[#0B192C] text-[#D4AF37] shadow-md' 
                            : 'text-slate-600 hover:text-navy-950 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComp className="h-4.5 w-4.5" />
                          <span>{item.label}</span>
                        </div>
                        {item.count !== undefined && (
                          <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${dashboardTab === item.id ? 'bg-[#D4AF37] text-navy-950' : 'bg-slate-200 text-slate-700'}`}>
                            {item.count}
                          </span>
                        )}
                        {item.badge && (
                          <span className={`text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded ${dashboardTab === item.id ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-emerald-100 text-emerald-800'}`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Info Box */}
                <div className="bg-gradient-to-br from-indigo-950 to-navy-900 text-white rounded-3xl p-5 border border-indigo-900 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider font-bold">Koneksi Database</span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-normal font-mono">
                    • PostgreSQL: 5432 <span className="text-emerald-400">Connected</span><br />
                    • ORM Connection: Prisma Client v5.x<br />
                    • SSL Status: HTTPS Authorized<br />
                    • Tenant ID: m-maulana-jkt
                  </p>
                </div>
              </div>

              {/* Right panel Area */}
              <div className="lg:col-span-9">

                {/* ======================================================= */}
                {/* SUB TAB: AI LEGAL TOOLKIT (GEMINI HUB) */}
                {/* ======================================================= */}
                {dashboardTab === 'ai-tools' && (
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                      <div>
                        <h3 className="text-2xl font-extrabold text-[#0B192C] flex items-center gap-2">
                          <Cpu className="text-[#D4AF37] h-6 w-6 animate-pulse" />
                          AI Legal Assistant Suite
                        </h3>
                        <p className="text-slate-500 text-xs mt-1">
                          Asisten bertenaga Google Gemini 2026. Pilih mode alat di bawah, ketik data lalu biarkan AI merancang dokumen secara instan.
                        </p>
                      </div>
                      
                      {/* Sub tab switcher inside AI toolkit */}
                      <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                        {[
                          { id: 'draft', label: 'Draft Akta' },
                          { id: 'risk', label: 'Analisis Risiko' },
                          { id: 'summarize', label: 'Ringkas PDF' },
                          { id: 'chat', label: 'Chatbot Konsultasi' },
                        ].map((btn) => (
                          <button
                            key={btn.id}
                            onClick={() => {
                              setAiAction(btn.id as any);
                              setAiResultText('');
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              aiAction === btn.id 
                                ? 'bg-[#0B192C] text-white shadow' 
                                : 'text-slate-600 hover:text-navy-950'
                            }`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* AI action workspaces */}
                    
                    {/* WORKSPACE 1: DRAFT GENERATOR */}
                    {aiAction === 'draft' && (
                      <div className="space-y-6 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700">Pilih Jenis Akta Notaris:</label>
                            <select 
                              value={draftType}
                              onChange={(e) => setDraftType(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                            >
                              <option value="Akta Pendirian PT">Akta Pendirian PT Modal Biasa (UU Cipta Kerja)</option>
                              <option value="Akta Jual Beli Tanah">AJB (Akta Jual Beli) Peralihan Hak Milik</option>
                              <option value="Keterangan Ahli Waris">Keterangan Ahli Waris & Pembagian Properti</option>
                              <option value="Perjanjian Kawin">Perjanjian Pisah Harta Kekayaan Pernikahan</option>
                              <option value="Umum Kontrak">Umum / Kontrak Sewa Komersial</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700">Nama Pihak Penghadap Utama:</label>
                            <input 
                              type="text" 
                              placeholder="misal: Tuan Budi Santoso"
                              value={draftClientName}
                              onChange={(e) => setDraftClientName(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Detail Ketentuan Tambahan (Tulis bebas / rincian porsi modal):</label>
                          <textarea 
                            rows={3}
                            placeholder="misal: Modal dasar Rp 2 Miliar. Modal disetor oleh Budi sebesar 60% dan sisanya Tuan Joko 40%. Kedudukan usaha di Jakarta Selatan..."
                            value={draftCustomParams}
                            onChange={(e) => setDraftCustomParams(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                          />
                        </div>

                        <button
                          onClick={handleTriggerAiDraft}
                          disabled={aiLoading}
                          className="w-full bg-[#0B192C] hover:bg-navy-950 text-[#D4AF37] font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs"
                        >
                          {aiLoading ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              Sedang Menyusun Draft Akta... (Kecepatan Tinggi Gemini)
                            </>
                          ) : (
                            <>
                              <Cpu className="h-4.5 w-4.5" />
                              Gunakan AI: Generate Draft Akta Otomatis
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* WORKSPACE 2: RISK ANALYZER / SUMMARIZER TEXT AREA TOOLS */}
                    {(aiAction === 'risk' || aiAction === 'summarize') && (
                      <div className="space-y-4 animate-fadeIn">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Tempel Kontrak / Undang-Undang / Teks Klausul Hukum:</label>
                          <textarea 
                            rows={6}
                            placeholder={
                              aiAction === 'risk' 
                                ? 'Tempel isi pasal kontrak di sini untuk mengevaluasi celah bahaya atau klausul yang memberatkan salah satu pihak...'
                                : 'Tempel draf berkas panjang dan kementerian yang rumit untuk diringkas menjadi poin-poin eksekutif...'
                            }
                            value={aiInputText}
                            onChange={(e) => setAiInputText(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                          />
                          <div className="flex gap-2">
                            <button 
                              type="button" 
                              onClick={() => {
                                setAiInputText(`PASAL 7 - GANTI RUGI\nApabila terjadi pembatalan sepihak sebelum waktu perjanjian berakhir, maka pihak pertama wajib mengembalikan biaya uang sewa bulanan beserta denda flat 22% dari total modal awal tanpa memperhitungkan fluktuasi Force Majeure atau bencana.`);
                                triggerToast('📋 Teks sampel hukum berhasil dimuat!');
                              }}
                              className="text-[10px] text-slate-500 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded"
                            >
                              Muat Teks Sampel Perjanjian
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => handleTriggerAiTool(aiAction)}
                          disabled={aiLoading}
                          className="w-full bg-[#0B192C] hover:bg-navy-950 text-[#D4AF37] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
                        >
                          {aiLoading ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              AI sedang membaca klausul...
                            </>
                          ) : (
                            <>
                              {aiAction === 'risk' ? <AlertTriangle className="h-4.5 w-4.5" /> : <FileText className="h-4.5 w-4.5" />}
                              Analisis Dokumen Dengan AI Sekarang
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* WORKSPACE 3: REAL CONVERSATION CHAT BOT */}
                    {aiAction === 'chat' && (
                      <div className="space-y-4 animate-fadeIn">
                        
                        <div className="bg-slate-50 rounded-2xl border border-slate-150 p-4 min-h-[350px] max-h-[400px] overflow-y-auto space-y-4 flex flex-col justify-between">
                          <div className="space-y-3">
                            {chatMessages.map((msg, index) => (
                              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                                  msg.role === 'user' 
                                    ? 'bg-[#0B192C] text-white rounded-br-none shadow' 
                                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                                }`}>
                                  <div className="font-mono text-[9px] text-[#D4AF37] mb-1 font-bold">
                                    {msg.role === 'user' ? 'NOTARIS USER' : 'NOTARYAI ACTIVE'}
                                  </div>
                                  <div dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(msg.text) }} />
                                </div>
                              </div>
                            ))}
                            {aiLoading && (
                              <div className="flex justify-start">
                                <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl px-4 py-3 text-xs flex items-center gap-2">
                                  <RefreshCw className="h-3 w-3 animate-spin text-[#D4AF37]" />
                                  NotaryAI sedang meriset landasan perdata...
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <form onSubmit={handleSendChatMessage} className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Tanyakan syarat pembuatan PT, hitung honorarium notaris, pembagian silsilah waris..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                          />
                          <button 
                            type="submit"
                            className="bg-[#0B192C] text-[#D4AF37] px-4 rounded-xl flex items-center justify-center hover:bg-navy-950 transition-colors"
                          >
                            <Send className="h-4.5 w-4.5" />
                          </button>
                        </form>
                      </div>
                    )}

                    {/* AI INTERACTION RESULT VIEWER */}
                    {aiResultText && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#FAF9F6] border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-inner space-y-6"
                      >
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                            <span className="text-[10px] font-mono text-gray-500 uppercase font-bold tracking-wider">Hasil Dokumen AI Notary Resmi</span>
                          </div>
                          
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => {
                                // Simple mock printing / PDF saving
                                const printContent = aiResultText;
                                const win = window.open("", "_blank");
                                if (win) {
                                  win.document.write(`<html><head><title>Draft Akta Notaris</title><style>body { font-family: 'Courier New', Courier, monospace; padding: 40px; line-height: 1.6; max-width: 800px; margin: auto; }</style></head><body><pre style="white-space: pre-wrap;">${printContent}</pre></body></html>`);
                                  win.document.close();
                                  win.print();
                                } else {
                                  triggerToast("Pop-up diblokir, tidak bisa mengunduh!");
                                }
                              }}
                              className="bg-[#0B192C] text-white hover:bg-[#D4AF37] hover:text-navy-950 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                            >
                              <FileDown className="h-3.5 w-3.5" />
                              Export PDF / Print Draft
                            </button>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(aiResultText);
                                triggerToast('📋 Salin ke Clipboard berhasil!');
                              }}
                              className="text-slate-500 hover:text-[#0B192C] bg-white border border-slate-200 text-[10px] font-bold px-3 py-1.5 rounded-lg"
                            >
                              Salin Teks
                            </button>
                          </div>
                        </div>

                        {/* Paper Output Sheet */}
                        <div 
                          className="prose max-w-none font-mono text-gray-800 leading-relaxed border-l-4 border-[#D4AF37] pl-4 whitespace-pre-line"
                          style={{ fontSize: '13px' }}
                          dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(aiResultText) }}
                        />
                      </motion.div>
                    )}

                  </div>
                )}

                {/* ======================================================= */}
                {/* SUB TAB: ORDER & KONSULTASI MASUK (REAL-TIME LEADS) */}
                {/* ======================================================= */}
                {dashboardTab === 'orders' && (
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <h3 className="text-xl font-extrabold text-[#0B192C] flex items-center gap-2 font-sans">
                          <HelpCircle className="text-[#D4AF37] h-6 w-6" />
                          Order &amp; Konsultasi Masuk (Sistem CRM Website)
                        </h3>
                        <p className="text-slate-500 text-xs font-sans">
                          Pantau pesanan jasa dan konsultasi online yang diajukan langsung oleh para pengunjung website publik Anda secara instan.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-xl text-[11px] font-mono">
                        <span className="h-2 w-2 bg-amber-500 rounded-full animate-ping"></span>
                        <span>{consultOrders.filter(o=>o.status === 'Menunggu Hubungi').length} Pending Leads Baru</span>
                      </div>
                    </div>

                    {/* Summary statistics inside orders sub-navigation */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3">
                        <div className="bg-amber-100 text-amber-700 p-2 text-sm rounded-xl">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-mono font-bold text-slate-400">Paling Menunggu</p>
                          <p className="text-lg font-black text-slate-800 font-sans">{consultOrders.filter(o => o.status === 'Menunggu Hubungi').length} Pengajuan</p>
                        </div>
                      </div>

                      <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-700 p-2 text-sm rounded-xl">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-mono font-bold text-slate-400">Telah Dijadwalkan</p>
                          <p className="text-lg font-black text-slate-800 font-sans">{consultOrders.filter(o => o.status === 'Dijadwalkan').length} Pertemuan</p>
                        </div>
                      </div>

                      <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3">
                        <div className="bg-emerald-100 text-emerald-700 p-2 text-sm rounded-xl">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-mono font-bold text-slate-400">Konversi Selesai</p>
                          <p className="text-lg font-black text-slate-800 font-sans">{consultOrders.filter(o => o.status === 'Selesai').length} Lead Hasil</p>
                        </div>
                      </div>
                    </div>

                    {/* Leads Grid list */}
                    {consultOrders.length === 0 ? (
                      <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                        <Users className="h-12 w-12 text-slate-300 mx-auto mb-2" />
                        <h4 className="font-bold text-slate-700 font-sans">Belum Ada Pengajuan</h4>
                        <p className="text-xs text-slate-400 font-sans">Semua formulir pesanan jasa dari web publik akan dirangkum di sini secara otomatis.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {consultOrders.map((order) => (
                          <div 
                            key={order.id} 
                            className={`border rounded-2xl p-5 hover:shadow-md transition-all ${
                              order.status === 'Menunggu Hubungi' 
                                ? 'bg-amber-50/40 border-amber-200/60' 
                                : order.status === 'Dijadwalkan' 
                                  ? 'bg-blue-50/20 border-blue-200/50' 
                                  : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 font-sans">
                              
                              {/* Left Columns - Client details metadata */}
                              <div className="space-y-3 flex-1 w-full">
                                <div className="flex items-center gap-3 flex-wrap">
                                  <span className="font-mono text-xs text-[#D4AF37] font-bold">ORD-REG•{order.id.replace('ord-', '')}</span>
                                  
                                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase font-mono ${
                                    order.status === 'Menunggu Hubungi'
                                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                      : order.status === 'Dijadwalkan'
                                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  }`}>
                                    {order.status}
                                  </span>

                                  <span className="text-[11px] text-slate-400 font-mono">Masuk: {new Date(order.createdAt).toLocaleDateString('id-ID')}</span>
                                </div>

                                <div className="space-y-1">
                                  <h4 className="text-lg font-bold text-slate-900">{order.nama}</h4>
                                  <p className="text-xs text-slate-500 font-mono">
                                    📩 {order.email} • 📞 {order.telepon}
                                  </p>
                                </div>

                                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                                  <p className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Tipe Jasa &amp; Rencana Tanggal Pertemuan:</p>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-xs font-bold text-[#0B192C]">{order.tipeLayanan}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-xs text-blue-600 font-mono font-bold">📆 {order.tanggalBooking}</span>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Uraian Perkara / Rincian Kasus:</p>
                                  <p className="text-xs text-slate-700 italic bg-white border border-slate-100 px-3 py-2 rounded-xl">
                                    "{order.keterangan}"
                                  </p>
                                </div>
                              </div>

                              {/* Right Columns - CRM Action items */}
                              <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 w-full lg:w-48 pt-2 lg:pt-0">
                                
                                <p className="text-[10px] text-slate-400 uppercase font-mono font-semibold block text-left lg:text-right w-full">Tindakan Cepat:</p>

                                <button 
                                  onClick={() => handleConvertOrderToClient(order)}
                                  disabled={order.status === 'Selesai'}
                                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-white ${
                                    order.status === 'Selesai'
                                      ? 'bg-slate-300 cursor-not-allowed'
                                      : 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow'
                                  }`}
                                >
                                  <UserCheck className="h-4 w-4" />
                                  Proses &amp; Buat Draf AD
                                </button>

                                <a 
                                  href={`https://wa.me/${order.telepon.replace(/^0/, '62')}?text=Halo%20${encodeURIComponent(order.nama)},%20kami%2520dari%20Kantor%20Notaris%20Achmad%20Maulana%20ingin%20menindaklanjuti%20pengajuan%20jasa%20kenotariatan%20*${encodeURIComponent(order.tipeLayanan)}*%20yang%20Anda%20input%20dari%20website.%20Apakah%20benar?`}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-navy-950 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                                >
                                  <Phone className="h-4 w-4 text-emerald-600" />
                                  Hubungi WhatsApp
                                </a>

                                {/* Status Changer toggles */}
                                <div className="flex gap-1 w-full">
                                  <button 
                                    onClick={() => handleUpdateOrderStatus(order.id, 'Menunggu Hubungi')}
                                    className={`flex-1 py-1.5 px-1 rounded-lg text-[9px] font-bold border font-mono transition-all ${
                                      order.status === 'Menunggu Hubungi'
                                        ? 'bg-amber-150 text-amber-850 border-amber-400 font-extrabold'
                                        : 'bg-white text-slate-500 border-slate-250 hover:bg-slate-50'
                                    }`}
                                  >
                                    Wait
                                  </button>
                                  <button 
                                    onClick={() => handleUpdateOrderStatus(order.id, 'Dijadwalkan')}
                                    className={`flex-1 py-1.5 px-1 rounded-lg text-[9px] font-bold border font-mono transition-all ${
                                      order.status === 'Dijadwalkan'
                                        ? 'bg-blue-150 text-blue-850 border-blue-400 font-extrabold'
                                        : 'bg-white text-slate-500 border-slate-250 hover:bg-slate-50'
                                    }`}
                                  >
                                    Jadwal
                                  </button>
                                  <button 
                                    onClick={() => handleUpdateOrderStatus(order.id, 'Selesai')}
                                    className={`flex-1 py-1.5 px-1 rounded-lg text-[9px] font-bold border font-mono transition-all ${
                                      order.status === 'Selesai'
                                        ? 'bg-emerald-150 text-emerald-850 border-emerald-400 font-extrabold'
                                        : 'bg-white text-slate-500 border-slate-250 hover:bg-slate-50'
                                    }`}
                                  >
                                    Selesai
                                  </button>
                                </div>

                                <button 
                                  onClick={() => handleDeleteConsultOrder(order.id)}
                                  className="w-full bg-red-50 hover:bg-red-100 hover:text-red-700 text-red-600 py-2 px-3 rounded-xl text-[10px] font-extrabold transition-all border border-red-200/50 flex items-center justify-center gap-1"
                                >
                                  <Trash2 className="h-3 w-3" />
                                  Hapus Pengajuan
                                </button>

                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ======================================================= */}
                {/* SUB TAB: MANAJEMEN KLIEN (CRUD) */}
                {/* ======================================================= */}
                {dashboardTab === 'klien' && (
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-8 animate-fadeIn">
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="text-xl font-extrabold text-[#0B192C]">Basis Data Klien Notaris</h3>
                        <p className="text-slate-500 text-xs">Simpan, sunting, dan pelihara data kependudukan (NIK/NPWP) penghadap akta Anda secara patuh administrasi.</p>
                      </div>
                    </div>

                    {/* Add Client Interactive Inline Form */}
                    <form onSubmit={handleAddClient} className="bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-4">
                      <p className="text-xs font-bold text-[#0B192C] flex items-center gap-1.5 uppercase tracking-wide">
                        <Plus className="h-4 w-4 text-[#D4AF37]" />
                        Tambah Profil Klien Baru
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input 
                          type="text" 
                          placeholder="Nama Lengkap (Sesuai KTP)"
                          value={newClient.nama}
                          onChange={(e) => setNewClient({ ...newClient, nama: e.target.value })}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="Nomor NIK KTP (16 Digit)"
                          value={newClient.nik}
                          onChange={(e) => setNewClient({ ...newClient, nik: e.target.value })}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                        />
                        <input 
                          type="email" 
                          placeholder="Email Aktif"
                          value={newClient.email}
                          onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="No HP / WhatsApp"
                          value={newClient.telepon}
                          onChange={(e) => setNewClient({ ...newClient, telepon: e.target.value })}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="Instansi Sektor Usaha (Opsional)"
                          value={newClient.instansi}
                          onChange={(e) => setNewClient({ ...newClient, instansi: e.target.value })}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="No NPWP Pajak (Opsional)"
                          value={newClient.npwp}
                          onChange={(e) => setNewClient({ ...newClient, npwp: e.target.value })}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        <input 
                          type="text" 
                          placeholder="Alamat Domisili Lengkap Sesuai KTP"
                          value={newClient.alamat}
                          onChange={(e) => setNewClient({ ...newClient, alamat: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                        />
                      </div>

                      <div className="flex justify-end pt-1">
                        <button 
                          type="submit"
                          className="bg-[#0B192C] hover:bg-[#D4AF37] text-white hover:text-navy-950 px-5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <Plus className="h-4 w-4" />
                          Simpan Klien ke Database
                        </button>
                      </div>
                    </form>

                    {/* Klien Database Table */}
                    <div className="overflow-x-auto rounded-2xl border border-slate-150">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 font-mono border-b border-slate-150">
                            <th className="p-4 uppercase">Klien / Instansi</th>
                            <th className="p-4 uppercase">Identitas (NIK & NPWP)</th>
                            <th className="p-4 uppercase">Kontak & Alamat</th>
                            <th className="p-4 uppercase text-center">Tindakan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {clients.map((c) => (
                            <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                              <td className="p-4">
                                <div className="font-bold text-slate-800 leading-normal">{c.nama}</div>
                                <span className="text-[10px] text-gray-500 italic block">{c.instansi || 'Pribadi / Individu'}</span>
                              </td>
                              <td className="p-4 space-y-1 font-mono text-[11px] text-slate-600">
                                <div><span className="text-slate-400">NIK:</span> {c.nik}</div>
                                <div><span className="text-slate-400">NPWP:</span> {c.npwp || 'Tidak ada'}</div>
                              </td>
                              <td className="p-4 space-y-1">
                                <div className="text-slate-700">{c.email} • {c.telepon}</div>
                                <p className="text-[10px] text-slate-400 truncate max-w-xs">{c.alamat}</p>
                              </td>
                              <td className="p-4 text-center">
                                <button 
                                  onClick={() => handleDeleteClient(c.id, c.nama)}
                                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-xl transition-colors"
                                  title="Hapus Klien"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                )}

                {/* ======================================================= */}
                {/* SUB TAB: MANAJEMEN DOKUMEN & VERSI */}
                {/* ======================================================= */}
                {dashboardTab === 'dokumen' && (
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-8 animate-fadeIn">
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="text-xl font-extrabold text-[#0B192C]">Arsip & Versioning Dokumen</h3>
                        <p className="text-slate-500 text-xs">Simpan naskah minuta akta, verifikasi keaslian, sematkan digital signature, serta pantau progres penandatanganan.</p>
                      </div>
                    </div>

                    {/* Document Upload Simulation Container */}
                    <form onSubmit={handleAddDoc} className="bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-4">
                      <p className="text-xs font-bold text-[#0B192C] flex items-center gap-1.5 uppercase tracking-wide">
                        <Plus className="h-4 w-4 text-[#D4AF37]" />
                        Mulai Arsip Akta Baru / Registrasi Minuta
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input 
                          type="text" 
                          placeholder="Judul Berkas Akta"
                          value={newDoc.nama}
                          onChange={(e) => setNewDoc({ ...newDoc, nama: e.target.value })}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                        />

                        <select 
                          value={newDoc.tipe}
                          onChange={(e) => setNewDoc({ ...newDoc, tipe: e.target.value as any })}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                        >
                          <option value="Akta Pendirian PT">Akta Pendirian PT</option>
                          <option value="Akta Jual Beli Tanah">Akta Jual Beli Tanah</option>
                          <option value="Keterangan Waris">Keterangan Waris</option>
                          <option value="Perjanjian Kawin">Perjanjian Kawin</option>
                          <option value="Umum / Kontrak">Umum / Kontrak</option>
                        </select>

                        <select 
                          value={newDoc.clientId}
                          onChange={(e) => setNewDoc({ ...newDoc, clientId: e.target.value })}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none text-slate-700"
                        >
                          <option value="">-- Pilih Klien Penghadap --</option>
                          {clients.map(c => (
                            <option key={c.id} value={c.id}>{c.nama} ({c.instansi || 'Pribadi'})</option>
                          ))}
                        </select>
                      </div>

                      <textarea 
                        rows={3}
                        placeholder="Konten berkas / poin pasal penting (opsional)..."
                        value={newDoc.fileContent}
                        onChange={(e) => setNewDoc({ ...newDoc, fileContent: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                      />

                      <div className="flex justify-between items-center text-[10px] text-slate-500 italic">
                        <span className="flex items-center gap-1.5">
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          Mendukung Drag-and-Drop lokal PDF/DOCX (Simulasi 2026 upload aman)
                        </span>
                        
                        <button 
                          type="submit"
                          className="bg-[#0B192C] hover:bg-[#D4AF37] text-white hover:text-navy-950 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <Plus className="h-4 w-4" />
                          Arsipkan Berkas
                        </button>
                      </div>
                    </form>

                    {/* Document List */}
                    <div className="grid grid-cols-1 gap-4">
                      {documents.map((doc) => {
                        const clientName = clients.find(c => c.id === doc.clientId)?.nama || 'Klien Tidak Ditemukan';
                        return (
                          <div key={doc.id} className="bg-slate-50 border border-slate-150 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#D4AF37] transition-all">
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                                  doc.tipe === 'Akta Pendirian PT' ? 'bg-indigo-100 text-[#0B192C]' :
                                  doc.tipe === 'Keterangan Waris' ? 'bg-amber-100 text-amber-850' : 'bg-slate-200 text-slate-700'
                                }`}>
                                  {doc.tipe}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400">Ver. {doc.version}</span>
                              </div>
                              <h4 className="font-extrabold text-[#0B192C] text-sm md:text-base leading-tight">{doc.nama}</h4>
                              <p className="text-xs text-slate-500">Pemilik Kontrak: <strong className="text-slate-800">{clientName}</strong></p>
                              <p className="text-[10px] text-slate-450 italic font-mono">Dibuat tanggal: {new Date(doc.createdAt).toLocaleDateString('id-ID')}</p>
                            </div>

                            {/* Actions Right Side */}
                            <div className="flex flex-wrap items-center gap-3">
                              
                              {/* Progress Status Button */}
                              <button
                                onClick={() => handleProgressDocStatus(doc.id)} 
                                className={`text-[10px] font-mono font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-sm transition-all ${
                                  doc.status === 'Draf' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' :
                                  doc.status === 'Verifikasi' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                                  doc.status === 'Signed' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' :
                                  'bg-[#0B192C] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-navy-950'
                                }`}
                                title="Klik untuk naikkan status"
                              >
                                {doc.status === 'Draf' && <Clock className="h-3.5 w-3.5" />}
                                {doc.status === 'Verifikasi' && <UserCheck className="h-3.5 w-3.5" />}
                                {doc.status === 'Signed' && <FileSignature className="h-3.5 w-3.5" />}
                                {doc.status === 'Terdaftar' && <CheckCircle2 className="h-3.5 w-3.5" />}
                                Status: {doc.status.toUpperCase()}
                              </button>

                              {/* Tanda tangan digital toggle button */}
                              <button
                                onClick={() => handleToggleDocSignature(doc.id)}
                                className={`text-[10px] font-bold px-3.5 py-2 rounded-xl border flex items-center gap-1.5 transition-all ${
                                  doc.digitalSignature 
                                    ? 'bg-emerald-600 text-white border-transparent' 
                                    : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                                }`}
                              >
                                {doc.digitalSignature ? (
                                  <>
                                    <Lock className="h-3.5 w-3.5" />
                                    Signed (SHA256 Valid)
                                  </>
                                ) : (
                                  <>
                                    <FileSignature className="h-3.5 w-3.5 text-slate-400" />
                                    Teken Digital (Basic)
                                  </>
                                )}
                              </button>

                            </div>

                          </div>
                        );
                      })}
                    </div>

                  </div>
                )}

                {/* ======================================================= */}
                {/* SUB TAB: AGENDA & SCHEDULER */}
                {/* ======================================================= */}
                {dashboardTab === 'scheduler' && (
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-8 animate-fadeIn">
                    
                    <div>
                      <h3 className="text-xl font-extrabold text-[#0B192C]">Agenda Tanda Tangan & Verifikasi</h3>
                      <p className="text-slate-500 text-xs">Atur dan ingatkan jadwal kehadiran penandatanganan minuta fisik para penghadap beserta saksi kantor.</p>
                    </div>

                    <form onSubmit={handleAddReminder} className="bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-4">
                      <p className="text-xs font-bold text-[#0B192C] flex items-center gap-1.5 uppercase tracking-wide">
                        <Plus className="h-4 w-4 text-[#D4AF37]" />
                        Tambah Agenda Penandatanganan Baru
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input 
                          type="text" 
                          placeholder="Nama Rapat / Agenda AJB"
                          value={newReminder.title}
                          onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                        />
                        <input 
                          type="date" 
                          value={newReminder.date}
                          onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                        />
                        <input 
                          type="time" 
                          value={newReminder.time}
                          onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="Nama Klien Utama"
                          value={newReminder.clientName}
                          onChange={(e) => setNewReminder({ ...newReminder, clientName: e.target.value })}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none md:col-span-3"
                        />
                      </div>

                      <textarea 
                        rows={2}
                        placeholder="Deskripsi agenda atau instruksi berkas penunjang asli..."
                        value={newReminder.description}
                        onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4AF37] outline-none"
                      />

                      <div className="flex justify-end">
                        <button 
                          type="submit"
                          className="bg-[#0B192C] text-[#D4AF37] px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          Simpan Rencana Jadwal
                        </button>
                      </div>
                    </form>

                    {/* Timeline List */}
                    <div className="space-y-4">
                      {reminders.map((rem) => (
                        <div key={rem.id} className="bg-slate-50 border border-slate-150 p-4 rounded-2xl flex items-center justify-between gap-4">
                          <div className="flex gap-4 items-start">
                            {/* Toggle completed button */}
                            <button 
                              onClick={() => handleToggleReminder(rem.id)}
                              className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                rem.completed ? 'bg-emerald-500 border-transparent text-white' : 'border-slate-300 bg-white hover:border-[#D4AF37]'
                              }`}
                            >
                              {rem.completed && <Check className="h-4 w-4" />}
                            </button>
                            
                            <div className="space-y-1">
                              <h4 className={`font-bold text-sm ${rem.completed ? 'line-through text-slate-400' : 'text-[#0B192C]'}`}>
                                {rem.title}
                              </h4>
                              <p className="text-slate-600 text-xs">Penghadap: <strong className="text-slate-700">{rem.clientName}</strong></p>
                              {rem.description && (
                                <p className="text-[11px] text-slate-450 leading-normal italic">{rem.description}</p>
                              )}
                              
                              <div className="flex items-center gap-3 text-[10px] text-[#D4AF37] font-mono font-semibold">
                                <span className="bg-[#0B192C] text-white px-2 py-0.5 rounded flex items-center gap-1">
                                  <Calendar className="h-3 w-3 text-[#D4AF37]" />
                                  {rem.date}
                                </span>
                                {rem.time && (
                                  <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {rem.time} WIB
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 text-xs">
                            <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[9px] ${
                              rem.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800 animate-pulse'
                            }`}>
                              {rem.completed ? 'Selesai' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* ======================================================= */}
                {/* SUB TAB: AUDIT LOGS */}
                {/* ======================================================= */}
                {dashboardTab === 'logs' && (
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-extrabold text-[#0B192C]">Jejak Audit Keamanan (Audit Log)</h3>
                        <p className="text-slate-500 text-xs font-sans">Sistem melacak seluruh aktivitas penulisan akta dan pergantian data, menjaga kepatuhan hukum dari gugatan sengketa.</p>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setLogs([
                            {
                              id: `log-${Date.now()}`,
                              user: 'Achmad Maulana (Notaris)',
                              action: 'AUDIT_EXPORT',
                              detail: 'Ekspor berkas riwayat audit log lengkap untuk penyelarasan Kemenkumham manual',
                              ipAddress: '182.253.14.99',
                              timestamp: new Date().toISOString()
                            },
                            ...logs
                          ]);
                          triggerToast('📋 Riwayat log audit baru dicatatkan oleh Pengawas!');
                        }}
                        className="bg-[#0B192C] text-white font-bold text-xs px-3.5 py-2 rounded-xl hover:text-[#D4AF37] transition-all"
                      >
                        Tambah Catatan Audit
                      </button>
                    </div>

                    {/* Timeline logs */}
                    <div className="overflow-x-auto rounded-2xl border border-slate-150">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 font-mono border-b border-slate-150">
                            <th className="p-4 uppercase">Waktu</th>
                            <th className="p-4 uppercase">Operator</th>
                            <th className="p-4 uppercase">Aksi / Event</th>
                            <th className="p-4 uppercase">Rincian Perubahan</th>
                            <th className="p-4 uppercase font-mono">IP Address</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 font-mono text-[11px] text-slate-700">
                          {logs.map((lg) => (
                            <tr key={lg.id} className="hover:bg-slate-50">
                              <td className="p-4 text-[10px] text-zinc-400">
                                {new Date(lg.timestamp).toLocaleTimeString('id-ID')}
                              </td>
                              <td className="p-4 font-bold text-[#0B192C]">
                                {lg.user}
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  lg.action.includes('CLIENT') ? 'bg-indigo-100 text-indigo-800' :
                                  lg.action.includes('AKTA') || lg.action.includes('DOC') ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                                }`}>
                                  {lg.action}
                                </span>
                              </td>
                              <td className="p-4 text-xs font-sans text-slate-600">
                                {lg.detail}
                              </td>
                              <td className="p-4 text-[10px] text-slate-400">
                                {lg.ipAddress}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                )}

              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: ARCHITECTURE & VPS PLAYBOOK (BLUEPRINTS) */}
        {/* ========================================================= */}
        {activeTab === 'architecture' && (
          <div className="animate-fadeIn bg-[#111827] text-gray-200 py-12 pb-24 min-h-[85vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              
              <div className="space-y-2 text-center max-w-3xl mx-auto">
                <h2 className="text-[#D4AF37] text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2">
                  <Terminal className="h-4.5 w-4.5" />
                  Enterprise Backend blueprints 2026
                </h2>
                <h3 className="text-3xl font-black text-white">Struktur Proyek, DB Schema, VPS & Docker</h3>
                <p className="text-gray-400 text-sm">
                  Cetak biru (blueprints) tingkat enterprise untuk peluncuran di VPS Ubuntu mandiri terdedikasi (single-tenant) lengkap dengan skema handal dan otomatisasi backup.
                </p>
              </div>

              {/* Sub Architecture Tab Navigation */}
              <div className="flex flex-wrap gap-1 bg-gray-900 p-1.5 rounded-2xl border border-gray-800 max-w-4xl mx-auto">
                {[
                  { id: 'prisma', label: 'Schema.prisma (ORM)', icon: Database },
                  { id: 'vps', label: 'VPS Deployment', icon: Server },
                  { id: 'docker', label: 'Docker & Compose', icon: Layers },
                  { id: 'nginx', label: 'Nginx Config (SSL)', icon: ShieldCheck },
                  { id: 'api', label: 'REST API Specs', icon: Code },
                  { id: 'backup', label: 'Database Backup', icon: Clock }
                ].map((tb) => {
                  const Icon = tb.icon;
                  return (
                    <button
                      key={tb.id}
                      onClick={() => setArchTab(tb.id as any)}
                      className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        archTab === tb.id 
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-navy-950 shadow-md' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tb.label}
                    </button>
                  );
                })}
              </div>

              {/* Render Selected Blueprint File Viewer */}
              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
                
                {/* Header toolbar for clipboard */}
                <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-rose-500"></span>
                    <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                    <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-mono text-gray-400 ml-2">
                      {archTab === 'prisma' && 'prisma/schema.prisma'}
                      {archTab === 'vps' && 'DEPLOYMENT_PLAYBOOK.md'}
                      {archTab === 'docker' && 'docker-compose.yml & Dockerfile'}
                      {archTab === 'nginx' && 'nginx/notaris-saas.conf'}
                      {archTab === 'api' && 'REST_API_ARCHITECTURE.json'}
                      {archTab === 'backup' && 'scripts/backup_db.sh'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      let textToCopy = '';
                      if (archTab === 'prisma') textToCopy = PRISMA_SCHEMA;
                      if (archTab === 'vps') textToCopy = INSTALL_GUIDE_MD;
                      if (archTab === 'docker') textToCopy = DOCKER_CONFIG;
                      if (archTab === 'nginx') textToCopy = NGINX_CONFIG;
                      if (archTab === 'api') textToCopy = API_SPEC;
                      if (archTab === 'backup') textToCopy = BACKUP_SCRIPT;
                      
                      navigator.clipboard.writeText(textToCopy);
                      triggerToast('📋 Salin blueprint penginstalan berhasil!');
                    }}
                    className="bg-[#0B192C] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-navy-950 border border-[#D4AF37]/40 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    Salin Kode Blueprint
                  </button>
                </div>

                {/* Preformatted File Content */}
                <div className="overflow-x-auto">
                  {archTab === 'vps' ? (
                    <div 
                      className="prose prose-invert max-w-none text-gray-300 space-y-4 leading-relaxed text-sm"
                      dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(INSTALL_GUIDE_MD) }}
                    />
                  ) : (
                    <pre className="font-mono text-xs text-gray-300 overflow-x-auto leading-relaxed bg-black/40 p-4 rounded-2xl border border-gray-800/80">
                      {archTab === 'prisma' && PRISMA_SCHEMA}
                      {archTab === 'docker' && DOCKER_CONFIG}
                      {archTab === 'nginx' && NGINX_CONFIG}
                      {archTab === 'api' && API_SPEC}
                      {archTab === 'backup' && BACKUP_SCRIPT}
                    </pre>
                  )}
                </div>

                {/* Footnote Guide */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-dashed border-gray-800 space-y-2">
                  <p className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4" />
                    Penjelasan Struktur Folder Lengkap Produksi:
                  </p>
                  <ul className="text-[11px] text-gray-400 space-y-1 pl-4 list-disc font-mono">
                    <li><strong>/prisma/</strong> : Tempat penempatan schema.prisma untuk migrasi ke PostgreSQL.</li>
                    <li><strong>/server.ts</strong> : Backend Server Router utama (Express & integrasi OpenAI/Gemini SDK).</li>
                    <li><strong>/src/App.tsx</strong> : Single SPA Client untuk simulasi interface utama.</li>
                    <li><strong>/scripts/</strong> : Berkas bash shell otomatisasi pemeliharaan basis data (cron jobs).</li>
                    <li><strong>/nginx/</strong> : File konfigurasi reverse-proxy pelindung HTTPS/SSL Let's Encrypt.</li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* --- ENTERPRISE FOOTER SECURE --- */}
      <footer className="bg-[#0B192C] text-gray-400 border-t border-[#D4AF37]/30 py-8 px-4 text-center text-xs font-sans">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-white">
            <Scale className="h-4.5 w-4.5 text-[#D4AF37]" />
            <span className="font-bold tracking-tight">KANTOR NOTARIS & PPAT ACHMAD MAULANA, S.H., M.Kn.</span>
          </div>
          <p className="max-w-md mx-auto text-[11px] text-gray-400 leading-normal">
            Gedung Grha Hukum Lt. 3, Jl. HR. Rasuna Said Kav. 22, Jakarta Selatan, 12920. Terakreditasi BPHN RI dan Kemenkumham RI secara sah.
          </p>
          <div className="pt-4 border-t border-white/5 text-[10px] text-gray-500 font-mono flex flex-col md:flex-row items-center justify-between gap-4">
            <span>© 2026 Maulana Notaris - Sistem Manajemen Mandiri (SIM-K). Hak Akses Penuh Klien/Notaris.</span>
            <span>Lisensi: VPS Dedicated Enterprise - Single Tenant Sovereign Database</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Simple layout helpers for icons based on type
function BuildCardIcon(type: string) {
  if (type === 'PT') return <Users className="h-6 w-6 stroke-[1.5]" />;
  if (type === 'TANAH') return <ShieldCheck className="h-6 w-6 stroke-[1.5]" />;
  if (type === 'WARIS') return <Scale className="h-6 w-6 stroke-[1.5]" />;
  return <BookOpen className="h-6 w-6 stroke-[1.5]" />;
}
