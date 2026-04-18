import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp, FileSpreadsheet, Sun, Moon, MessageSquareText, Printer, Menu, X } from 'lucide-react';

// --- DATA DENGAN BOBOT (SKOR) PRESISI SESUAI FILE CSV ---
const initialData = [
  {
    id: 'aspek-1',
    title: '1. UNIT LAYANAN TERPADU (ULT)',
    subCategories: [
      {
        id: 'ult-1a', title: 'a. Ketersediaan Fasilitas',
        questions: [
          { id: '1a-1', text: '1. Ruangan ULT', weight: 0.208333333333333, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-1a', text: '1.a Kelayakan Ruangan ULT', weight: 0.208333333333333, options: ['Layak', 'Tidak Layak'], answer: null, note: '' },
          { id: '1a-1b', text: '1.b Pencahayaan Ruangan ULT', weight: 0.208333333333333, options: ['Terang', 'Gelap'], answer: null, note: '' },
          { id: '1a-2', text: '2. Sistem Antrian', weight: 0.208333333333333, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-2a', text: '2.a Metode Sistem Antrian', weight: 0.208333333333333, options: ['Elektronik', 'Manual', 'Tidak'], answer: null, note: '' },
          { id: '1a-3', text: '3. Loket Pelayanan', weight: 0.208333333333333, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-3a', text: '3.a Jumlah Loket', weight: 0.208333333333333, options: ['Memadai', 'Kurang'], answer: null, note: '' },
          { id: '1a-4', text: '4. Tempat Duduk/Ruang Tunggu', weight: 0.208333333333333, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-4a', text: '4.a Jumlah Tempat Duduk', weight: 0.208333333333333, options: ['Memadai', 'Kurang'], answer: null, note: '' },
          { id: '1a-5a', text: '5.a Kondisi Tempat Duduk', weight: 0.208333333333333, options: ['Layak', 'Rusak'], answer: null, note: '' },
          { id: '1a-5', text: '5. Banner Daftar Layanan dan Info Gratis', weight: 0.208333333333333, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '1a-6', text: '6. Tarif PNBP Disahkan KPKNL', weight: 0.208333333333333, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '1a-7', text: '7. Komputer/Laptop Petugas ULT', weight: 0.208333333333333, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '1a-8', text: '8. Petugas ULT', weight: 0.208333333333333, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-9', text: '9. Pendingin Ruangan (AC)', weight: 0.208333333333333, options: ['Ada/Fungsi', 'Rusak/Tidak'], answer: null, note: '' },
          { id: '1a-10', text: '10. Komplementer Tamu (Permen/Air dll)', weight: 0.208333333333333, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-11', text: '11. Sarana Pengaduan', weight: 0.208333333333333, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-12', text: '12. Kotak Saran', weight: 0.208333333333333, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-13', text: '13. Sarana Informasi (Maklumat dll)', weight: 0.208333333333333, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '1a-14', text: '14. Tempat Sampah', weight: 0.208333333333333, options: ['Ada', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'ult-1b', title: 'b. Kebersihan ULT Secara Umum',
        questions: [{ id: '1b-1', text: 'Kebersihan ULT Secara Umum', weight: 4.166666666666667, options: ['Bersih & Rapi', 'Kurang/Kotor'], answer: null, note: '' }]
      },
      {
        id: 'ult-1c', title: 'c. Proses Pelayanan Petugas ULT',
        questions: [
          { id: '1c-1', text: '1. Menerapkan Senyum, Sapa, Salam', weight: 0.833333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1c-2', text: '2. Penggunaan Atribut Pegawai/Petugas', weight: 0.833333333333333, options: ['Lengkap', 'Tidak Lengkap'], answer: null, note: '' },
          { id: '1c-3', text: '3. Keramahan Petugas Pemberi Layanan', weight: 0.833333333333333, options: ['Ramah', 'Kurang Ramah'], answer: null, note: '' },
          { id: '1c-4', text: '4. Pemahaman Layanan yang Dimiliki', weight: 0.833333333333333, options: ['Paham', 'Tidak Paham'], answer: null, note: '' },
          { id: '1c-5', text: '5. Pemahaman tentang ZI WBK', weight: 0.833333333333333, options: ['Paham', 'Tidak Paham'], answer: null, note: '' },
        ]
      },
      {
        id: 'ult-1d', title: 'd. Banner/Media Sosialisasi Gratifikasi',
        questions: [{ id: '1d-1', text: 'Ketersediaan Banner/Media Sosialisasi ZI-WBK', weight: 4.166666666666667, options: ['Terpasang', 'Tidak'], answer: null, note: '' }]
      },
      {
        id: 'ult-1e', title: 'e. Evaluasi Layanan',
        questions: [
          { id: '1e-1', text: '1. Tindak lanjut kotak saran', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-2', text: '2. Menerbitkan hasil survei atas Layanan', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-3', text: '3. Kompensasi untuk layanan tidak sesuai standar', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-4', text: '4. Rekap pengguna layanan yang berkunjung', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-5', text: '5. Ruang privasi untuk pelanggan marah', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-6', text: '6. Jadwal publikasi media cetak/elektronik', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-7', text: '7. Reward kepada petugas layanan', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'ult-1f', title: 'f. Evaluasi Satuan Kerja',
        questions: [
          { id: '1f-1', text: '1. Memahami target kinerjanya', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-2', text: '2. Memperoleh penghargaan/reward berprestasi', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-3', text: '3. Mengetahui komposisi pegawai berdasarkan usia', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-4', text: '4. Rutin meningkatkan kompetensi pegawai', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-5', text: '5. Menunjukkan rekap kehadiran', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-6', text: '6. Mengetahui jumlah pegawai terlambat', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-7', text: '7. Memiliki sanksi pegawai terlambat', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-8', text: '8. Memiliki proses mutasi pegawai', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-9', text: '9. Memiliki POS rotasi pegawai', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-10', text: '10. Memiliki inovasi di kepegawaian', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      }
    ]
  },
  {
    id: 'aspek-2',
    title: '2. SARANA',
    subCategories: [
      {
        id: 'sar-2a', title: 'a. Sarana Pelayanan (Aula/Mess/dsb)',
        questions: [
          { id: '2a-1', text: '1. Ketersediaan Fasilitas', weight: 1.666666666666667, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2a-2', text: '2. Kebersihan', weight: 1.666666666666667, options: ['Bersih', 'Kurang Bersih'], answer: null, note: '' },
        ]
      },
      {
        id: 'sar-2b', title: 'b. Ruang Pimpinan/Ruang Rapat',
        questions: [
          { id: '2b-1', text: '1. Ketersediaan Fasilitas', weight: 1.666666666666667, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2b-2', text: '2. Kebersihan', weight: 1.666666666666667, options: ['Bersih', 'Kurang Bersih'], answer: null, note: '' },
        ]
      },
      {
        id: 'sar-2c', title: 'c. Perpustakaan',
        questions: [
          { id: '2c-1', text: '1. Papan Nama/Petunjuk Ruangan', weight: 0.37037037037037, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2c-2', text: '2. Pendingin Ruangan (AC)', weight: 0.37037037037037, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2c-3', text: '3. Akses Internet/Wifi', weight: 0.37037037037037, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2c-4', text: '4. Tempat Duduk', weight: 0.37037037037037, options: ['Memadai', 'Kurang'], answer: null, note: '' },
          { id: '2c-5', text: '5. Akses Audio/Visual', weight: 0.37037037037037, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2c-6', text: '6. Ruang Baca', weight: 0.37037037037037, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2c-7', text: '7. Pustakawan', weight: 0.37037037037037, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2c-8', text: '8. Kenyamanan Ruangan', weight: 0.37037037037037, options: ['Nyaman', 'Kurang Nyaman'], answer: null, note: '' },
          { id: '2c-9', text: '9. Kebersihan', weight: 0.37037037037037, options: ['Bersih', 'Kurang Bersih'], answer: null, note: '' },
        ]
      },
      {
        id: 'sar-2d', title: 'd. Poliklinik',
        questions: [
          { id: '2d-1', text: '1. Ruang Poliklinik', weight: 0.555555555555555, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2d-2', text: '2. Alat Kesehatan (Tensimeter dll)', weight: 0.555555555555555, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2d-3', text: '3. Tempat Tidur', weight: 0.555555555555555, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2d-4', text: '4. Kotak P3K/Obat-obatan', weight: 0.555555555555555, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2d-5', text: '5. Jadwal Kunjungan Dokter', weight: 0.555555555555555, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2d-6', text: '6. Kebersihan', weight: 0.555555555555555, options: ['Bersih', 'Kurang Bersih'], answer: null, note: '' },
        ]
      },
      {
        id: 'sar-2e', title: 'e. Lahan Parkir',
        questions: [
          { id: '2e-1', text: '1. Tempat Parkir Pegawai', weight: 0.666666666666666, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2e-2', text: '2. Tempat parkir tamu', weight: 0.666666666666666, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2e-3', text: '3. Petugas Pengamanan lahan parkir', weight: 0.666666666666666, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2e-4', text: '4. Parkir Khusus Disabilitas', weight: 0.666666666666666, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2e-5', text: '5. Kebersihan Lahan Parkir', weight: 0.666666666666666, options: ['Bersih', 'Kurang Bersih'], answer: null, note: '' },
        ]
      },
      {
        id: 'sar-2f', title: 'f. Tempat Ibadah',
        questions: [
          { id: '2f-1', text: '1. Ketersediaan', weight: 1.666666666666667, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2f-2', text: '2. Kebersihan', weight: 1.666666666666667, options: ['Bersih', 'Kurang Bersih'], answer: null, note: '' },
        ]
      }
    ]
  },
  {
    id: 'aspek-3',
    title: '3. PRASARANA',
    subCategories: [
      {
        id: 'pra-3a', title: 'a. Tata Usaha',
        questions: [
          { id: '3a-1', text: '1. Lemari arsip laporan keuangan.', weight: 0.666666666666666, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3a-2', text: '2. Mekanisme pengelolaan arsip jelas.', weight: 0.666666666666666, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3a-3', text: '3. Ruang diskusi staf', weight: 0.666666666666666, options: ['Ada', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'pra-3b', title: 'b. Pos Keamanan (Security)',
        questions: [{ id: '3b-1', text: 'Ketersediaan Pos Keamanan', weight: 2.0, options: ['Tersedia', 'Tidak'], answer: null, note: '' }]
      },
      {
        id: 'pra-3c', title: 'c. Toilet',
        questions: [
          { id: '3c-1', text: '1. Tersedia Sabun', weight: 0.4, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3c-2', text: '2. Tersedia Tisu', weight: 0.4, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3c-3', text: '3. Tersedia Air', weight: 0.4, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3c-4', text: '4. Kenyamanan (Tidak Bau, dll)', weight: 0.4, options: ['Nyaman', 'Tidak Nyaman'], answer: null, note: '' },
          { id: '3c-5', text: '5. Kebersihan', weight: 0.4, options: ['Bersih', 'Kotor'], answer: null, note: '' },
        ]
      },
      {
        id: 'pra-3d', title: 'd. Kontak Darurat',
        questions: [
          { id: '3d-1', text: '1. RS/Puskesmas/Faskes', weight: 0.285714285714285, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3d-2', text: '2. Pemadam Kebakaran', weight: 0.285714285714285, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3d-3', text: '3. Kantor Polisi', weight: 0.285714285714285, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3d-4', text: '4. Satpol PP', weight: 0.285714285714285, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3d-5', text: '5. Gangguan Listrik (PLN)', weight: 0.285714285714285, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3d-6', text: '6. Babinsa/Kodim/Koramil', weight: 0.285714285714285, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3d-7', text: '7. Dinas Kesehatan', weight: 0.285714285714285, options: ['Ada', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'pra-3e', title: 'e. Titik Kumpul (Evakuasi)',
        questions: [
          { id: '3e-1', text: '1. Tersedia Tempat Titik Kumpul', weight: 1.0, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '3e-2', text: '2. Papan Nama Titik Kumpul', weight: 1.0, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'pra-3f', title: 'f. Petunjuk Arah Jalan/Gedung',
        questions: [
          { id: '3f-1', text: '1. Tersedia Nama Gedung', weight: 0.666666666666666, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3f-2', text: '2. Tersedia Petunjuk Arah Jalan/Gedung', weight: 0.666666666666666, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3f-3', text: '3. Terdapat Rambu-Rambu Lalu Lintas', weight: 0.666666666666666, options: ['Ada', 'Tidak'], answer: null, note: '' },
        ]
      },
      { id: 'pra-3g', title: 'g. Akses Password Internet/Wifi', questions: [{ id: '3g-1', text: 'Tersedia Akses Internet/Wifi', weight: 2.0, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3h', title: 'h. Ruang Bermain Anak (Playground)', questions: [{ id: '3h-1', text: 'Tersedia Ruang Bermain Anak', weight: 2.0, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3i', title: 'i. Ruang Menyusui/Laktasi', questions: [{ id: '3i-1', text: 'Tersedia Ruang Laktasi', weight: 2.0, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3j', title: 'j. Ruang Merokok/Smooking Room', questions: [{ id: '3j-1', text: 'Tersedia Ruang Merokok', weight: 2.0, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3k', title: 'k. Akses Penyandang Disabilitas', questions: [{ id: '3k-1', text: 'Akses Disabilitas (Pijakan/Ramp/dll)', weight: 2.0, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3l', title: 'l. Kursi Roda', questions: [{ id: '3l-1', text: 'Ketersediaan Kursi Roda', weight: 2.0, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3m', title: 'm. Alat Pemadam Api (APAR)', questions: [{ id: '3m-1', text: 'Ketersediaan APAR', weight: 2.0, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3n', title: 'n. Genset', questions: [{ id: '3n-1', text: 'Ketersediaan Genset', weight: 2.0, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      {
        id: 'pra-3o', title: 'o. Penataan, Kebersihan, Ketertiban',
        questions: [
          { id: '3o-1', text: '1. Lingkungan Kantor', weight: 0.333333333333333, options: ['Tertata', 'Tidak'], answer: null, note: '' },
          { id: '3o-2', text: '2. Halaman Kantor', weight: 0.333333333333333, options: ['Tertata', 'Tidak'], answer: null, note: '' },
          { id: '3o-3', text: '3. Penataan Taman, Rumput, Pohon', weight: 0.333333333333333, options: ['Terawat', 'Tidak'], answer: null, note: '' },
          { id: '3o-4', text: '4. Saluran Air', weight: 0.333333333333333, options: ['Lancar', 'Tersumbat'], answer: null, note: '' },
          { id: '3o-5', text: '5. Ruang Publik', weight: 0.333333333333333, options: ['Terawat', 'Tidak'], answer: null, note: '' },
          { id: '3o-6', text: '6. Ketertiban Parkir Kendaraan', weight: 0.333333333333333, options: ['Tertib', 'Tidak Tertib'], answer: null, note: '' },
        ]
      }
    ]
  },
  {
    id: 'aspek-4',
    title: '4. PETUGAS LAYANAN',
    subCategories: [
      {
        id: 'pet-4a', title: 'a. Resepsionis Lobi/Petugas ULT',
        questions: [
          { id: '4a-1', text: '1. Jumlah resepsionis memadai?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-2', text: '2. Memiliki standar waktu & jadwal/shift?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-3', text: '3. Terdapat SOP penerimaan tamu?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-4', text: '4. Memahami SOP penerimaan tamu?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-5', text: '5. Mengetahui SOP layanan satkernya?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-6', text: '6. Diberikan perlengkapan tugas memadai?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-7', text: '7. Mendapatkan pelatihan (training)?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-8', text: '8. Mengetahui manfaat layanan online?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-9', text: '9. Rutin membuka kotak saran?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-10', text: '10. Mengetahui layanan yang kerap diakses?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-11', text: '11. Mengetahui jumlah pengguna berkunjung?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-12', text: '12. Mengetahui kelompok usia customer?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-13', text: '13. Memiliki hospitality penolakan layanan?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-14', text: '14. Aktivitas saat tidak ada pengguna?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-15', text: '15. Memiliki layanan UPT Keliling?', weight: 0.416666666666666, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'pet-4b', title: 'b. Petugas Keamanan (Security)',
        questions: [
          { id: '4b-1', text: '1. Pengetahuan layanan satkernya?', weight: 0.48076923076923, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-2', text: '2. Mengetahui SOP layanan?', weight: 0.48076923076923, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-3', text: '3. Terdapat SOP terkait pengamanan?', weight: 0.48076923076923, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-4', text: '4. Memahami tugas & SOP pengamanan?', weight: 0.48076923076923, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-5', text: '5. Mekanisme shift selama 24 jam?', weight: 0.48076923076923, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-6', text: '6. Pengecekan suhu & arahan handsanitizer?', weight: 0.48076923076923, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-7', text: '7. Pelatihan petugas keamanan?', weight: 0.48076923076923, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-8', text: '8. Telah memiliki sertifikat?', weight: 0.48076923076923, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-9', text: '9. Memahami target kinerjanya?', weight: 0.48076923076923, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-10', text: '10. Perlengkapan (HT, dll) memadai?', weight: 0.48076923076923, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-11', text: '11. Terdapat koordinator keamanan?', weight: 0.48076923076923, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-12', text: '12. Memiliki nomor telepon darurat?', weight: 0.48076923076923, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-13', text: '13. Jumlah petugas memadai?', weight: 0.48076923076923, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'pet-4c', title: 'c. Petugas Kebersihan',
        questions: [
          { id: '4c-1', text: '1. Terdapat SOP kebersihan?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-2', text: '2. Memahami tugas & SOP kebersihan?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-3', text: '3. Terdapat koordinator kebersihan?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-4', text: '4. Perlengkapan (sapu dll) memadai?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-5', text: '5. Pembagian jadwal piket/wilayah?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-6', text: '6. Jumlah petugas memadai?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-7', text: '7. Bekerja rentang waktu <5 atau >5 thn?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-8', text: '8. Jam kerja & pembagian shift jelas?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'pet-4d', title: 'd. Pramubakti (Office Boy)',
        questions: [
          { id: '4d-1', text: '1. Terdapat SOP tugas pramubakti?', weight: 1.041666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-2', text: '2. Memahami tugas & SOP pelayanan?', weight: 1.041666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-3', text: '3. Terdapat koordinator pramubakti?', weight: 1.041666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-4', text: '4. Pembagian jadwal piket/wilayah?', weight: 1.041666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-5', text: '5. Perlengkapan disediakan memadai?', weight: 1.041666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-6', text: '6. Jumlah pramubakti memadai?', weight: 1.041666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      }
    ]
  }
];

export default function App() {
  const [satker, setSatker] = useState('');
  const [data, setData] = useState(initialData);
  const [expandedCats, setExpandedCats] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Inisialisasi Environment
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = './favicon.png';

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);

    // Stylesheet Khusus Print untuk Cetak Tabel Matriks
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        @page { size: landscape; margin: 10mm; }
        body { background-color: white !important; color: black !important; }
        .no-print { display: none !important; }
        .print-only { display: block !important; }
        table { width: 100%; border-collapse: collapse; font-size: 11px; }
        th, td { border: 1px solid black; padding: 6px; text-align: left; vertical-align: top; }
        th { background-color: #f3f4f6 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
      .print-only { display: none; }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleCategory = (catId) => {
    setExpandedCats(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const handleAnswer = (catId, subCatId, qId, value) => {
    setData(prev => prev.map(cat => 
      cat.id === catId ? { ...cat, subCategories: cat.subCategories.map(sub => 
        sub.id === subCatId ? { ...sub, questions: sub.questions.map(q => 
          q.id === qId ? { ...q, answer: value } : q
        )} : sub
      )} : cat
    ));
  };

  const handleNote = (catId, subCatId, qId, noteValue) => {
    setData(prev => prev.map(cat => 
      cat.id === catId ? { ...cat, subCategories: cat.subCategories.map(sub => 
        sub.id === subCatId ? { ...sub, questions: sub.questions.map(q => 
          q.id === qId ? { ...q, note: noteValue } : q
        )} : sub
      )} : cat
    ));
  };

  // Kalkulasi Skor dan Progress Sidebar
  const { scores, progress, categoryProgress } = useMemo(() => {
    let totalScore = 0;
    let maxTotalScore = 0;
    const catScores = {};
    const catProgress = {};
    let totalQuestions = 0;
    let answeredQuestions = 0;

    data.forEach(cat => {
      let catCurrentScore = 0;
      let catMaxScore = 0;
      let catTotalQ = 0;
      let catAnsweredQ = 0;
      
      cat.subCategories.forEach(sub => {
        sub.questions.forEach(q => {
          totalQuestions++;
          catTotalQ++;
          if (q.answer !== null) {
            answeredQuestions++;
            catAnsweredQ++;
          }

          catMaxScore += q.weight;
          maxTotalScore += q.weight;

          if (q.answer === q.options[0]) {
            catCurrentScore += q.weight;
            totalScore += q.weight;
          } else if (q.options.length === 3 && q.answer === q.options[1]) {
            catCurrentScore += (q.weight / 2); 
            totalScore += (q.weight / 2);
          }
        });
      });

      catScores[cat.id] = { current: catCurrentScore, max: catMaxScore };
      catProgress[cat.id] = { total: catTotalQ, answered: catAnsweredQ };
    });

    return { 
      scores: { total: totalScore, max: maxTotalScore, categories: catScores },
      progress: { total: totalQuestions, answered: answeredQuestions, isComplete: (totalQuestions === answeredQuestions && satker.trim() !== '') },
      categoryProgress: catProgress
    };
  }, [data, satker]);

  // Fungsi Kirim Data ke Google Sheet
 const handleSubmit = async () => {
    if (!satker.trim()) {
      setSubmitStatus({ type: 'error', message: 'Nama Satker wajib diisi!' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    const payload = {
      satker: satker,
      waktu: new Date().toISOString(),
      totalSkor: scores.total,
      detail: []
    };

    data.forEach(cat => {
      cat.subCategories.forEach(sub => {
        sub.questions.forEach(q => {
          let skorDiperoleh = 0;
          if (q.answer === q.options[0]) skorDiperoleh = q.weight;
          else if (q.options.length === 3 && q.answer === q.options[1]) skorDiperoleh = q.weight / 2;

          payload.detail.push({
            aspek: cat.title,
            subAspek: sub.title,
            pertanyaan: q.text,
            jawaban: q.answer || 'Belum diisi',
            catatan: q.note || '-',
            skor: skorDiperoleh,
            bobot: q.weight
          });
        });
      });
    });

    try {
      // ==== PASTE URL ANDA DI BAWAH INI ====
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEikIFjKQKp27YxnHXbrtXeVmv-iUzjnaeFCa4vQ59D9vp-x5qtbIkNTh3awZBHbjF/exec';
      
      if(GOOGLE_SCRIPT_URL.includes('URL_WEB_APP')) {
         setTimeout(() => {
            console.log("Data Payload:", payload);
            setIsSubmitting(false);
            setSubmitStatus({ type: 'success', message: `Simulasi Berhasil! (Ubah URL untuk kirim asli)` });
         }, 1500);
         return;
      }

      // Bypass sistem keamanan localhost ke Google Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Mencegah browser memblokir request localhost
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload)
      });
      
      // Menggunakan no-cors akan membuat request berhasil masuk secara gaib
      setSubmitStatus({ type: 'success', message: 'Data berhasil dikirim dan disimpan ke Google Sheets!' });
      
    } catch (error) {
      console.error(error);
      setSubmitStatus({ type: 'error', message: 'Terjadi kesalahan jaringan. Periksa koneksi internet.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    // Pada saat cetak, CSS print-only akan mengambil alih, mengubah web menjadi tabel laporan resmi.
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const scrollToCat = (id) => {
    const el = document.getElementById(id);
    if(el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
    setIsSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      
      {/* HEADER CETAK (Hanya Muncul Saat Print PDF) */}
      <div className="print-only">
        <h1 style={{fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px'}}>
          LAPORAN HASIL CEK FISIK WBK/WBBM TAHUN 2024
        </h1>
        <p style={{marginBottom: '20px'}}><strong>SATUAN KERJA:</strong> {satker || '_____________________'}</p>
        <table>
          <thead>
            <tr>
              <th style={{width: '15%'}}>Aspek</th>
              <th style={{width: '15%'}}>Sub Aspek</th>
              <th style={{width: '35%'}}>Pertanyaan</th>
              <th style={{width: '10%'}}>Jawaban</th>
              <th style={{width: '15%'}}>Catatan</th>
              <th style={{width: '5%'}}>Skor</th>
              <th style={{width: '5%'}}>Bobot</th>
            </tr>
          </thead>
          <tbody>
            {data.map(cat => (
              cat.subCategories.map(sub => (
                sub.questions.map((q, i) => {
                  let skorDiperoleh = 0;
                  if (q.answer === q.options[0]) skorDiperoleh = q.weight;
                  else if (q.options.length === 3 && q.answer === q.options[1]) skorDiperoleh = q.weight / 2;

                  return (
                    <tr key={q.id}>
                      {i === 0 && <td rowSpan={sub.questions.length}><strong>{cat.title}</strong></td>}
                      {i === 0 && <td rowSpan={sub.questions.length}>{sub.title}</td>}
                      <td>{q.text}</td>
                      <td style={{textAlign: 'center', fontWeight: 'bold'}}>{q.answer || '-'}</td>
                      <td>{q.note || ''}</td>
                      <td style={{textAlign: 'center'}}>{skorDiperoleh.toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>{q.weight.toFixed(2)}</td>
                    </tr>
                  )
                })
              ))
            ))}
            <tr>
              <td colSpan="5" style={{textAlign: 'right', fontWeight: 'bold', fontSize: '14px'}}>TOTAL SKOR KESELURUHAN:</td>
              <td colSpan="2" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '14px'}}>{scores.total.toFixed(2)} / 100</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TAMPILAN WEB (Sembunyi Saat Cetak) */}
      <div className="no-print flex flex-col md:flex-row min-h-screen">
        
        {/* SIDEBAR INDIKATOR PROGRESS (Kiri pada Desktop, Drawer pada Mobile) */}
        <div className={`fixed inset-y-0 left-0 z-40 w-64 shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${isDark ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'}`}>
          <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-lg text-blue-600 dark:text-blue-400">Progress Isian</h2>
            <button className="md:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 space-y-4 overflow-y-auto h-full pb-24">
            {/* Indikator Satker */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">DATA UMUM</div>
              <div className="flex items-center gap-2 text-sm">
                {satker.trim() ? <CheckCircle size={16} className="text-green-500" /> : <AlertCircle size={16} className="text-orange-500" />}
                <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>Nama Satker</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 border-t border-gray-100 dark:border-gray-700 pt-4">ASPEK PENILAIAN</div>
            {data.map((cat, idx) => {
              const stat = categoryProgress[cat.id];
              const isDone = stat.answered === stat.total;
              return (
                <div key={cat.id} onClick={() => scrollToCat(cat.id)} className={`cursor-pointer group p-3 rounded-xl border transition-all ${isDark ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-100 hover:bg-blue-50'} ${isDone ? (isDark ? 'bg-green-900/10 border-green-800/50' : 'bg-green-50 border-green-100') : ''}`}>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className={`text-sm font-semibold line-clamp-2 ${isDone ? 'text-green-600 dark:text-green-400' : isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {idx + 1}. {cat.title.replace(/^\d+\.\s*/, '')}
                    </span>
                    {isDone ? <CheckCircle size={16} className="text-green-500 shrink-0" /> : null}
                  </div>
                  
                  {/* Progress Bar Kecil */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
                    <div className={`h-1.5 rounded-full ${isDone ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${(stat.answered / stat.total) * 100}%` }}></div>
                  </div>
                  <div className="text-xs text-right text-gray-500 dark:text-gray-400">
                    {stat.answered} / {stat.total}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* KONTEN UTAMA */}
        <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
          
          <div className={`w-full ${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex justify-center py-4 relative`}>
            <button className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <img 
              src={isDark ? './Header Itjen Kemendikdasmen Dark.png' : './Header Itjen Kemendikdasmen.png'} 
              alt="Header Itjen Kemendikdasmen" 
              className="h-12 md:h-16 object-contain px-4"
              onError={(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '<span class="text-xl font-bold">KEMENDIKDASMEN</span>'); }}
            />
          </div>

          <header className={`sticky top-0 z-20 shadow-md backdrop-blur-md bg-opacity-90 transition-colors ${isDark ? 'bg-blue-900 text-white' : 'bg-blue-700 text-white'}`}>
            <div className="max-w-4xl mx-auto p-4 flex justify-between items-center gap-2">
              <div className="flex-1">
                <h1 className="text-lg md:text-xl font-bold leading-tight">Form Cek Fisik</h1>
                <div className="flex items-center gap-2">
                  <p className="text-xs md:text-sm text-blue-200 line-clamp-1">WBK/WBBM 2024</p>
                  <span className={`hidden sm:inline-block text-[10px] md:text-xs px-2 py-0.5 rounded-full font-medium ${progress.isComplete ? 'bg-green-500 text-white' : 'bg-blue-800 text-blue-200'}`}>
                    {progress.answered}/{progress.total} Terjawab
                  </span>
                </div>
              </div>
              
              <div className={`px-3 py-1.5 rounded-lg text-right flex items-center gap-3 ${isDark ? 'bg-blue-950' : 'bg-blue-800'}`}>
                <div className="text-right">
                  <span className="text-[10px] md:text-xs block text-blue-200">Total Skor Akhir</span>
                  <span className="text-lg md:text-xl font-bold">
                    {scores.total.toFixed(2)} 
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full transition-colors ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-blue-600 text-yellow-300 hover:bg-blue-500'}`}
                title="Toggle Dark Mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </header>

          <main className="max-w-4xl w-full mx-auto p-4 mt-2 space-y-6 pb-24">
            
            {submitStatus.message && (
              <div className={`p-4 rounded-xl flex items-start gap-3 border shadow-sm ${
                submitStatus.type === 'success' 
                  ? (isDark ? 'bg-green-900/30 text-green-300 border-green-800' : 'bg-green-50 text-green-800 border-green-200')
                  : (isDark ? 'bg-red-900/30 text-red-300 border-red-800' : 'bg-red-50 text-red-800 border-red-200')
              }`}>
                {submitStatus.type === 'success' ? <CheckCircle className="shrink-0 mt-0.5" size={20} /> : <AlertCircle className="shrink-0 mt-0.5" size={20} />}
                <p className="text-sm font-medium">{submitStatus.message}</p>
              </div>
            )}

            <div className={`p-5 rounded-2xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Nama Satker / Unit Kerja yang Diperiksa <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                className={`w-full p-3 border rounded-xl outline-none transition-all
                  ${isDark 
                    ? 'bg-gray-900 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400'}`}
                placeholder="Contoh: BPMP Provinsi Jambi"
                value={satker}
                onChange={(e) => setSatker(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {data.map((cat, index) => (
                <div id={cat.id} key={cat.id} className={`rounded-2xl shadow-sm border overflow-hidden transition-colors scroll-mt-24 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  
                  <div 
                    className={`p-4 flex justify-between items-center cursor-pointer transition-colors ${
                      isDark ? 'bg-gray-800 hover:bg-gray-750 border-b border-gray-700' : 'bg-blue-50 hover:bg-blue-100/50'
                    }`}
                    onClick={() => toggleCategory(cat.id)}
                  >
                    <div className="flex-1 pr-4">
                      <h2 className={`font-bold text-lg md:text-xl leading-tight ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                        {cat.title}
                      </h2>
                      <div className={`text-sm mt-1.5 font-medium ${isDark ? 'text-gray-400' : 'text-blue-600'}`}>
                        Skor Aspek: <span className={isDark ? 'text-white' : 'text-blue-800'}>{scores.categories[cat.id].current.toFixed(2)}</span> / {Math.round(scores.categories[cat.id].max)}
                      </div>
                    </div>
                    <div className={`shrink-0 p-1.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-blue-200 text-blue-700'}`}>
                      {expandedCats[cat.id] === false ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                    </div>
                  </div>

                  {(expandedCats[cat.id] !== false) && (
                    <div className="p-4 md:p-6 space-y-8">
                      {cat.subCategories.map((sub) => (
                        <div key={sub.id} className="space-y-5">
                          <h3 className={`font-semibold p-3 rounded-lg border-l-4 ${
                            isDark 
                              ? 'bg-gray-900 border-blue-500 text-gray-200' 
                              : 'bg-gray-50 border-blue-500 text-gray-800'
                          }`}>
                            {sub.title}
                          </h3>
                          
                          <div className="space-y-6">
                            {sub.questions.map((q) => (
                              <div key={q.id} className={`pb-6 border-b last:border-0 last:pb-0 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                                <p className={`text-[15px] md:text-base font-medium mb-3 leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                  {q.text}
                                </p>
                                
                                <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3 mb-3">
                                  {q.options.map((opt, optIdx) => {
                                    const isPositive = optIdx === 0;
                                    const isPartial = q.options.length === 3 && optIdx === 1;
                                    const isSelected = q.answer === opt;
                                    
                                    let btnClass = "flex-1 py-2.5 px-3 rounded-xl border text-sm md:text-[15px] font-semibold transition-all duration-200 flex justify-center items-center gap-1.5 ";
                                    
                                    if (isSelected) {
                                      if (isPositive) {
                                        btnClass += isDark ? "bg-green-600/20 border-green-500 text-green-400" : "bg-green-500 border-green-600 text-white shadow-md";
                                      } else if (isPartial) {
                                        btnClass += isDark ? "bg-yellow-600/20 border-yellow-500 text-yellow-400" : "bg-yellow-500 border-yellow-600 text-white shadow-md";
                                      } else {
                                        btnClass += isDark ? "bg-red-600/20 border-red-500 text-red-400" : "bg-red-500 border-red-600 text-white shadow-md";
                                      }
                                    } else {
                                      btnClass += isDark
                                        ? "bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                                        : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400";
                                    }

                                    return (
                                      <button
                                        key={opt}
                                        onClick={() => handleAnswer(cat.id, sub.id, q.id, opt)}
                                        className={btnClass}
                                      >
                                        {isSelected && (isPositive ? <CheckCircle size={16} /> : (isPartial ? <AlertCircle size={16}/> : <XCircle size={16} />))}
                                        {opt}
                                      </button>
                                    );
                                  })}
                                </div>

                                <div className="mt-2 relative">
                                  <div className={`absolute top-3 left-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    <MessageSquareText size={18} />
                                  </div>
                                  <input 
                                    type="text"
                                    placeholder="Tambahkan catatan/temuan fisik di sini..."
                                    value={q.note}
                                    onChange={(e) => handleNote(cat.id, sub.id, q.id, e.target.value)}
                                    className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border outline-none transition-all ${
                                      isDark 
                                        ? 'bg-gray-900 border-gray-700 text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600' 
                                        : 'bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400'
                                    }`}
                                  />
                                </div>

                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-6 space-y-4">
              {!progress.isComplete && (
                <div className={`p-4 text-center rounded-xl text-sm border font-medium ${isDark ? 'bg-orange-900/30 border-orange-800 text-orange-300' : 'bg-orange-50 border-orange-200 text-orange-800'}`}>
                  Masih ada <strong>{progress.total - progress.answered} pertanyaan</strong> yang belum dijawab. Mohon lengkapi untuk hasil cetak yang sempurna.
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 p-4 rounded-2xl font-bold text-lg text-white flex justify-center items-center gap-3 transition-all shadow-lg
                    ${isSubmitting 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'}`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FileSpreadsheet size={24} />
                      <span>Simpan ke Sheets</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePrint}
                  disabled={!progress.isComplete}
                  className={`flex-1 p-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-3 transition-all shadow-lg
                    ${progress.isComplete 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-[0.98]' 
                      : isDark ? 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  <Printer size={24} />
                  <span>Cetak PDF / Laporan</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}