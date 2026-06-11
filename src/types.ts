export interface Client {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  instansi: string;
  alamat: string;
  npwp: string;
  nik: string;
  createdAt: string;
}

export interface Document {
  id: string;
  nama: string;
  tipe: 'Akta Pendirian PT' | 'Akta Jual Beli Tanah' | 'Keterangan Waris' | 'Perjanjian Kawin' | 'Umum / Kontrak';
  clientId: string;
  status: 'Draf' | 'Verifikasi' | 'Signed' | 'Terdaftar';
  version: number;
  digitalSignature: boolean;
  fileContent?: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  detail: string;
  ipAddress: string;
  timestamp: string;
}

export interface TaskReminder {
  id: string;
  title: string;
  date: string;
  time?: string;
  clientName: string;
  description: string;
  completed: boolean;
}

export interface ConsultOrder {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  tipeLayanan: string;
  keterangan: string;
  tanggalBooking: string;
  status: 'Menunggu Hubungi' | 'Dijadwalkan' | 'Selesai';
  createdAt: string;
}
