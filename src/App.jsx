import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp,
  FileSpreadsheet, Sun, Moon, MessageSquareText, Printer, Menu, X, Send, RotateCcw
} from 'lucide-react';

// ============================================================
// ⚠️ GANTI URL INI DENGAN URL DEPLOY GOOGLE APPS SCRIPT ANDA
// ============================================================
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyEikIFjKQKp27YxnHXbrtXeVmv-iUzjnaeFCa4vQ59D9vp-x5qtbIkNTh3awZBHbjF/exec';

// ============================================================
// DATA LENGKAP — Teks TIDAK disingkat sesuai file Excel asli
// ============================================================
const initialData = [
  {
    id: 'aspek-1',
    title: '1. UNIT LAYANAN TERPADU (ULT)',
    subCategories: [
      {
        id: 'ult-1a', title: 'a. Ketersediaan Fasilitas',
        questions: [
          { id: '1a-1',  text: 'Ruangan ULT', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-1a', text: '1.a Kelayakan Ruangan ULT', weight: 0.208333333333333, options: ['Layak', 'Tidak Layak'], answer: null, note: '' },
          { id: '1a-1b', text: '1.b Pencahayaan Ruangan ULT', weight: 0.208333333333333, options: ['Baik', 'Kurang Baik'], answer: null, note: '' },
          { id: '1a-2',  text: 'Sistem Antrian', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-2a', text: '2.a Metode Sistem Antrian (Elektronik/Manual)', weight: 0.208333333333333, options: ['Elektronik', 'Manual', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-3',  text: 'Loket Pelayanan', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-3a', text: '3.a Jumlah Loket', weight: 0.208333333333333, options: ['Layak', 'Tidak Layak'], answer: null, note: '' },
          { id: '1a-4',  text: 'Tempat Duduk/Ruang Tunggu', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-4a', text: '4.a Jumlah Tempat Duduk', weight: 0.208333333333333, options: ['Layak', 'Tidak Layak'], answer: null, note: '' },
          { id: '1a-5a', text: '5.a Kondisi Tempat Duduk', weight: 0.208333333333333, options: ['Baik', 'Kurang Baik'], answer: null, note: '' },
          { id: '1a-5',  text: 'Banner Daftar Layanan dan Info Pelayanan Gratis untuk Layanan Non-PNBP', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-6',  text: 'Tarif PNBP yang Sudah Disahkan oleh KPKNL Setempat', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-7',  text: 'Komputer/Laptop Petugas ULT', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-8',  text: 'Petugas ULT', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-9',  text: 'Pendingin Ruangan (AC)', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-10', text: 'Komplementer Tamu (Permen/Air Minum/Majalah/Koran)', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-11', text: 'Sarana Pengaduan', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-12', text: 'Kotak Saran', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-13', text: 'Sarana Informasi (Terdapat Komitmen Bersama/Maklumat Pelayanan, POS Pelayanan)', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '1a-14', text: 'Tempat Sampah', weight: 0.208333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
        ]
      },
      {
        id: 'ult-1b', title: 'b. Kebersihan ULT Secara Umum',
        questions: [{ id: '1b-1', text: 'Kebersihan ULT Secara Umum', weight: 4.166666666666667, options: ['Bersih', 'Tidak Bersih'], answer: null, note: '' }]
      },
      {
        id: 'ult-1c', title: 'c. Proses Pelayanan Petugas ULT',
        questions: [
          { id: '1c-1', text: 'Menerapkan Senyum, Sapa, dan Salam', weight: 0.833333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1c-2', text: 'Penggunaan Atribut Pegawai/Petugas ULT', weight: 0.833333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1c-3', text: 'Keramahan Petugas Pemberi Layanan', weight: 0.833333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1c-4', text: 'Pemahaman tentang Layanan yang Dimiliki', weight: 0.833333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1c-5', text: 'Pemahaman tentang ZI WBK', weight: 0.833333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'ult-1d', title: 'd. Banner/Media Sosialisasi Gratifikasi/ZI-WBK',
        questions: [{ id: '1d-1', text: 'Ketersediaan Banner/Media Sosialisasi Gratifikasi/ZI-WBK', weight: 4.166666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }]
      },
      {
        id: 'ult-1e', title: 'e. Evaluasi Layanan',
        questions: [
          { id: '1e-1', text: 'Satuan Kerja melakukan tindak lanjut kotak saran', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-2', text: 'Satuan Kerja menerbitkan hasil survei atas Layanan', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-3', text: 'Satuan Kerja memiliki produk kompensasi untuk penerimaan layanan tidak sesuai standar', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-4', text: 'Satuan Kerja memiliki rekap pengguna layanan yang berkunjung', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-5', text: 'Satuan Kerja memiliki ruang privasi untuk memfasilitasi apabila terdapat pengguna layanan (customer) yang marah', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-6', text: 'Satuan Kerja memiliki jadwal publikasi melalui media cetak maupun elektronik', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-7', text: 'Satuan Kerja memberikan penghargaan/reward kepada petugas layanan (Resepsionis Lobi/Petugas ULT, Petugas Keamanan, Petugas Kebersihan, maupun pramubakti) karena berprestasi', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'ult-1f', title: 'f. Evaluasi Satuan Kerja',
        questions: [
          { id: '1f-1',  text: 'Satuan kerja memahami target kinerjanya', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-2',  text: 'Satuan kerja memperoleh penghargaan/reward karena berprestasi', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-3',  text: 'Satuan Kerja mengetahui komposisi pegawai <35 tahun dan >35 tahun', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-4',  text: 'Satuan Kerja rutin meningkatkan kompetensi pegawainya', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-5',  text: 'Satuan Kerja menunjukkan rekap kehadiran bulan ini', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-6',  text: 'Satuan Kerja mengetahui jumlah pegawai yang terlambat bulan ini', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-7',  text: 'Satuan Kerja memiliki sanksi bagi pegawai yang terlambat', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-8',  text: 'Satuan Kerja memiliki proses mutasi pegawai', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-9',  text: 'Satuan Kerja memiliki POS rotasi pegawai', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-10', text: 'Satuan Kerja memiliki inovasi di kepegawaian', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      }
    ]
  },
  {
    id: 'aspek-2',
    title: '2. SARANA',
    subCategories: [
      { id: 'sar-2a', title: 'a. Sarana Pelayanan (Aula/Mess/Penginapan/Asrama/Ruang Makan/dsb)', questions: [{ id: '2a-1', text: 'Ketersediaan Fasilitas', weight: 2.083333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '2a-2', text: 'Kebersihan', weight: 2.083333333333333, options: ['Bersih', 'Tidak Bersih'], answer: null, note: '' }] },
      { id: 'sar-2b', title: 'b. Ruang Pimpinan/Ruang Rapat', questions: [{ id: '2b-1', text: 'Ketersediaan Fasilitas', weight: 2.083333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '2b-2', text: 'Kebersihan', weight: 2.083333333333333, options: ['Bersih', 'Tidak Bersih'], answer: null, note: '' }] },
      {
        id: 'sar-2c', title: 'c. Perpustakaan',
        questions: [
          { id: '2c-1', text: 'Arah/Papan Nama/Petunjuk Ruangan', weight: 0.462962962962963, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2c-2', text: 'Pendingin Ruangan (AC)', weight: 0.462962962962963, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2c-3', text: 'Akses Password Internet/Wifi', weight: 0.462962962962963, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2c-4', text: 'Tempat Duduk', weight: 0.462962962962963, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2c-5', text: 'Multimedia untuk Akses Koleksi Audio/Visual', weight: 0.462962962962963, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2c-6', text: 'Ruang Baca', weight: 0.462962962962963, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2c-7', text: 'Pustakawan', weight: 0.462962962962963, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2c-8', text: 'Kenyamanan (Buku Tertata Rapi, Tenang, Tidak Bising, dan Pencahayaan Baik)', weight: 0.462962962962963, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '2c-9', text: 'Kebersihan', weight: 0.462962962962963, options: ['Bersih', 'Tidak Bersih'], answer: null, note: '' },
        ]
      },
      {
        id: 'sar-2d', title: 'd. Poliklinik',
        questions: [
          { id: '2d-1', text: 'Ruang Poliklinik', weight: 0.694444444444444, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2d-2', text: 'Alat Kesehatan (Tensimeter, Oxymeter, dsb)', weight: 0.694444444444444, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2d-3', text: 'Tempat Tidur', weight: 0.694444444444444, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2d-4', text: 'Kotak P3K/Obat-obatan', weight: 0.694444444444444, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2d-5', text: 'Jadwal Kunjungan Dokter', weight: 0.694444444444444, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2d-6', text: 'Kebersihan', weight: 0.694444444444444, options: ['Bersih', 'Tidak Bersih'], answer: null, note: '' },
        ]
      },
      {
        id: 'sar-2e', title: 'e. Lahan Parkir',
        questions: [
          { id: '2e-1', text: 'Tersedia Tempat Parkir Motor/Mobil Karyawan', weight: 0.833333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2e-2', text: 'Tersedia Tempat parkir motor/mobil tamu', weight: 0.833333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2e-3', text: 'Petugas Pengamanan lahan parkir', weight: 0.833333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2e-4', text: 'Parkir Khusus Penyandang Disabilitas', weight: 0.833333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '2e-5', text: 'Kebersihan Lahan Parkir', weight: 0.833333333333333, options: ['Bersih', 'Tidak Bersih'], answer: null, note: '' },
        ]
      },
      { id: 'sar-2f', title: 'f. Tempat Ibadah', questions: [{ id: '2f-1', text: 'Ketersediaan', weight: 2.083333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '2f-2', text: 'Kebersihan', weight: 2.083333333333333, options: ['Bersih', 'Tidak Bersih'], answer: null, note: '' }] },
    ]
  },
  {
    id: 'aspek-3',
    title: '3. PRASARANA',
    subCategories: [
      { id: 'pra-3a', title: 'a. Tata Usaha', questions: [{ id: '3a-1', text: 'Lemari arsip untuk menyimpan laporan keuangan.', weight: 0.555555555555556, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '3a-2', text: 'Mekanisme pengelolaan arsip yang jelas (arsip >5 tahun dipindahkan).', weight: 0.555555555555556, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '3a-3', text: 'Ruang diskusi staf', weight: 0.555555555555556, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3b', title: 'b. Pos Keamanan (Security)', questions: [{ id: '3b-1', text: 'Ketersediaan Pos Keamanan (Security)', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3c', title: 'c. Toilet', questions: [{ id: '3c-1', text: 'Tersedia Sabun', weight: 0.333333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' }, { id: '3c-2', text: 'Tersedia Tisu', weight: 0.333333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' }, { id: '3c-3', text: 'Tersedia Air', weight: 0.333333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' }, { id: '3c-4', text: 'Kenyamanan (Tidak Bau, Pencahayaan Cukup, Sirkulasi Udara Baik, dan Privasi Terjaga)', weight: 0.333333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' }, { id: '3c-5', text: 'Kebersihan', weight: 0.333333333333333, options: ['Bersih', 'Tidak Bersih'], answer: null, note: '' }] },
      { id: 'pra-3d', title: 'd. Kontak Darurat', questions: [{ id: '3d-1', text: 'RS/Puskesmas/Faskes', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '3d-2', text: 'Pemadam Kebakaran', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '3d-3', text: 'Kantor Polisi', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '3d-4', text: 'Satpol PP', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '3d-5', text: 'Gangguan Listrik (PLN)', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '3d-6', text: 'Babinsa/Kodim/Koramil', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '3d-7', text: 'Dinas Kesehatan', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3e', title: 'e. Titik Kumpul (Evakuasi)', questions: [{ id: '3e-1', text: 'Tersedia Tempat/Titik Kumpul (Evakuasi)', weight: 0.833333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '3e-2', text: 'Tersedia Papan Nama Titik Kumpul', weight: 0.833333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3f', title: 'f. Petunjuk Arah Jalan/Gedung', questions: [{ id: '3f-1', text: 'Tersedia Nama Gedung', weight: 0.555555555555556, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '3f-2', text: 'Tersedia Petunjuk Arah Jalan/Gedung', weight: 0.555555555555556, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }, { id: '3f-3', text: 'Terdapat Rambu-Rambu Lalu Lintas (Parkir, Arah Sejalur/verboden, Dilarang Berhenti, dsb)', weight: 0.555555555555556, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3g', title: 'g. Akses Password Internet/Wifi', questions: [{ id: '3g-1', text: 'Tersedia Akses Password Internet/Wifi', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3h', title: 'h. Ruang Bermain Anak (Playground)', questions: [{ id: '3h-1', text: 'Tersedia Ruang Bermain Anak (Playground)', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3i', title: 'i. Ruang Menyusui/Laktasi (Nursery Room)', questions: [{ id: '3i-1', text: 'Tersedia Ruang Menyusui/Laktasi (Nursery Room)', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3j', title: 'j. Ruang Merokok/Smooking Room', questions: [{ id: '3j-1', text: 'Tersedia Ruang Merokok/Smooking Room', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3k', title: 'k. Akses Bagi Penyandang Disabilitas (Pijakan Jalan/Guiding Block, Jalur Miring/Ramp, Pegangan Pemandu/Grap Bar, dsb)', questions: [{ id: '3k-1', text: 'Tersedia Akses Bagi Penyandang Disabilitas (Pijakan Jalan/Guiding Block, Jalur Miring/Ramp, Pegangan Pemandu/Grap Bar, dsb)', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3l', title: 'l. Kursi Roda', questions: [{ id: '3l-1', text: 'Ketersediaan Kursi Roda', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3m', title: 'm. Alat Pemadam Api Ringan (APAR)', questions: [{ id: '3m-1', text: 'Ketersediaan Alat Pemadam Api Ringan (APAR)', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3n', title: 'n. Genset', questions: [{ id: '3n-1', text: 'Ketersediaan Genset', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3o', title: 'o. Penataan, Perawatan, Kebersihan, dan Ketertiban', questions: [{ id: '3o-1', text: 'Lingkungan Kantor', weight: 0.277777777777778, options: ['Ya', 'Tidak'], answer: null, note: '' }, { id: '3o-2', text: 'Halaman Kantor', weight: 0.277777777777778, options: ['Ya', 'Tidak'], answer: null, note: '' }, { id: '3o-3', text: 'Penataan dan Perawatan Taman, Rumput, dan Pohon', weight: 0.277777777777778, options: ['Ya', 'Tidak'], answer: null, note: '' }, { id: '3o-4', text: 'Saluran Air', weight: 0.277777777777778, options: ['Ya', 'Tidak'], answer: null, note: '' }, { id: '3o-5', text: 'Ruang Publik', weight: 0.277777777777778, options: ['Ya', 'Tidak'], answer: null, note: '' }, { id: '3o-6', text: 'Ketertiban Parkir Kendaraan (Tamu, Pegawai, Petugas Kebersihan/Perawatan, dst)', weight: 0.277777777777778, options: ['Ya', 'Tidak'], answer: null, note: '' }] },
    ]
  },
  {
    id: 'aspek-4',
    title: '4. PETUGAS LAYANAN',
    subCategories: [
      {
        id: 'ptg-4a', title: 'a. Resepsionis Lobi/Petugas ULT',
        questions: [
          { id: '4a-1',  text: 'Apakah Satuan Kerja memiliki jumlah resepsionis/petugas ULT yang memadai?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-2',  text: 'Apakah Satuan Kerja memiliki standar waktu layanan dan pembagian jadwal/shift?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-3',  text: 'Apakah terdapat SOP terkait penerimaan tamu?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-4',  text: 'Apakah Resepsionis Lobi/Petugas ULT memahami tugas dan SOP penerimaan tamu?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-5',  text: 'Apakah Petugas ULT yang bersangkutan mengetahui SOP layanan satkernya?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-6',  text: 'Apakah Resepsionis Lobi/Petugas ULT diberikan perlengkapan pendukung tugas/pekerjaan memadai?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-7',  text: 'Apakah Resepsionis Lobi/Petugas ULT mendapatkan pelatihan (training) dalam melayani tamu?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-8',  text: 'Apakah Petugas ULT mengetahui manfaat aplikasi/layanan online yang disediakan?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-9',  text: 'Apakah Petugas ULT rutin membuka kotak saran?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-10', text: 'Apakah Petugas ULT mengetahui layanan yang kerap diakses oleh pengguna layanan (customer)?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-11', text: 'Apakah Petugas ULT mengetahui jumlah pengguna layanan (customer) yang berkunjung?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-12', text: 'Apakah Petugas ULT mengetahui kelompok rentang usia customer?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-13', text: 'Apakah Petugas ULT memiliki hospitality (sikap ramah) untuk penolakan layanan?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-14', text: 'Apakah Petugas ULT memiliki aktivitas saat tidak ada pengguna layanan (customer)?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-15', text: 'Apakah Satuan Kerja memiliki layanan UPT Keliling?', weight: 0.416666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'ptg-4b', title: 'b. Petugas Keamanan (Security)',
        questions: [
          { id: '4b-1',  text: 'Apakah petugas keamanan memiliki pengetahuan mengenai layanan satkernya?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-2',  text: 'Apakah petugas keamanan mengetahui SOP layanan?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-3',  text: 'Apakah terdapat SOP terkait pengamanan?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-4',  text: 'Apakah petugas keamanan memahami tugas dan SOP pengamanan?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-5',  text: 'Apakah Satuan Kerja memiliki mekanisme pembagian shift selama 24 jam?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-6',  text: 'Apakah petugas keamanan melakukan pengecekan suhu dan pengarahan penggunaan handsanitizer kepada tamu/pengguna layanan (customer)?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-7',  text: 'Apakah Satuan Kerja melakukan pelatihan petugas keamanan?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-8',  text: 'Apakah seluruh petugas keamanan telah memiliki sertifikat kompetensi?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-9',  text: 'Apakah Satuan Kerja memahami target kinerjanya?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-10', text: 'Apakah perlengkapan yang disediakan memadai (pentungan, senter, hand talkie, dsb)?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-11', text: 'Apakah terdapat koordinator yang mengkoordinasikan keamanan?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-12', text: 'Apakah petugas keamanan memiliki nomor telepon darurat (RS/Puskesmas/Faskes, Pemadam Kebakaran, Kantor Polisi, Satpol PP, PLN, Babinsa/Kodim/Koramil, dan Dinas Kesehatan)?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-13', text: 'Apakah jumlah petugas keamanan telah memadai untuk menangani seluruh area kantor?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'ptg-4c', title: 'c. Petugas Kebersihan',
        questions: [
          { id: '4c-1', text: 'Apakah terdapat SOP terkait kebersihan?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-2', text: 'Apakah petugas kebersihan memahami tugas dan SOP kebersihan?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-3', text: 'Apakah terdapat koordinator yang mengkoordinasikan kebersihan?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-4', text: 'Apakah perlengkapan yang disediakan memadai (sapu, pengki, pel, sabun, alat potong rumput, dsb)?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-5', text: 'Apakah terdapat pembagian jadwal piket/wilayah kerja petugas kebersihan?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-6', text: 'Apakah jumlah petugas kebersihan telah memadai untuk menangani seluruh area kantor?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-7', text: 'Apakah petugas kebersihan sudah bekerja dari rentang waktu <5 atau >5 tahun?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-8', text: 'Apakah petugas Kebersihan yang bersangkutan memiliki jam kerja dan pembagian jadwal shift yang jelas?', weight: 0.78125, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'ptg-4d', title: 'd. Pramubakti (Office Boy)',
        questions: [
          { id: '4d-1', text: 'Apakah terdapat SOP terkait tugas pramubakti?', weight: 1.041666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-2', text: 'Apakah pramubakti memahami tugas dan SOP pelayanan?', weight: 1.041666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-3', text: 'Apakah terdapat koordinator yang mengkoordinasikan pelayanan pramubakti?', weight: 1.041666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-4', text: 'Apakah terdapat pembagian jadwal piket/wilayah kerja pramubakti?', weight: 1.041666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-5', text: 'Apakah perlengkapan/bahan yang disediakan memadai (galon air, gula, kopi, teh, sabun/alat cuci, gelas, piring, gas, kompor, dsb)?', weight: 1.041666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-6', text: 'Apakah jumlah petugas pramubakti telah memadai untuk menangani seluruh kebutuhan kantor?', weight: 1.041666666666667, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      }
    ]
  }
];

const POSITIVE_ANSWERS = ['Ada', 'Ya', 'Bersih', 'Layak', 'Baik', 'Elektronik'];

export default function App() {
  const [satker, setSatker] = useState('');
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [auditor, setAuditor] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [data, setData] = useState(initialData);
  const [expandedCats, setExpandedCats] = useState({ 'aspek-1': true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setIsDark(true);
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        @page { size: landscape; margin: 10mm; }
        body { background: white !important; color: black !important; }
        .no-print { display: none !important; }
        .print-only { display: block !important; }
        table { width: 100%; border-collapse: collapse; font-size: 10px; }
        th, td { border: 1px solid #333; padding: 5px 7px; text-align: left; vertical-align: top; }
        th { background: #1e3a6e !important; color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        tr.aspek-row td { background: #dbeafe !important; font-weight: bold; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        tr.sub-row td { background: #f0f4ff !important; font-style: italic; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .ans-pos { color: #15803d; font-weight: 700; }
        .ans-neg { color: #dc2626; font-weight: 700; }
      }
      .print-only { display: none; }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const { scores, progress, categoryProgress } = useMemo(() => {
    let totalScore = 0, totalQ = 0, answeredQ = 0;
    const catScores = {}, catProg = {};
    data.forEach(cat => {
      let catScore = 0, cTotal = 0, cAnswered = 0;
      cat.subCategories.forEach(sub => sub.questions.forEach(q => {
        totalQ++; cTotal++;
        if (q.answer !== null) { answeredQ++; cAnswered++; }
        if (q.answer !== null) {
          if (POSITIVE_ANSWERS.includes(q.answer)) { catScore += q.weight; totalScore += q.weight; }
          else if (q.options.length === 3 && q.answer === q.options[1]) { catScore += q.weight / 2; totalScore += q.weight / 2; }
        }
      }));
      catScores[cat.id] = { current: catScore };
      catProg[cat.id] = { total: cTotal, answered: cAnswered };
    });
    const isComplete = totalQ === answeredQ && totalQ > 0 && satker.trim() !== '';
    return { scores: { total: totalScore, categories: catScores }, progress: { total: totalQ, answered: answeredQ, isComplete }, categoryProgress: catProg };
  }, [data, satker]);

  const handleAnswer = (catId, subId, qId, value) =>
    setData(prev => prev.map(c => c.id !== catId ? c : { ...c, subCategories: c.subCategories.map(s => s.id !== subId ? s : { ...s, questions: s.questions.map(q => q.id !== qId ? q : { ...q, answer: value }) }) }));

  const handleNote = (catId, subId, qId, val) =>
    setData(prev => prev.map(c => c.id !== catId ? c : { ...c, subCategories: c.subCategories.map(s => s.id !== subId ? s : { ...s, questions: s.questions.map(q => q.id !== qId ? q : { ...q, note: val }) }) }));

  const scrollToCat = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 110, behavior: 'smooth' });
    setExpandedCats(p => ({ ...p, [id]: true }));
    setIsSidebarOpen(false);
  };

  const handleReset = () => { setData(initialData); setSatker(''); setAuditor(''); setJabatan(''); setTanggal(new Date().toISOString().split('T')[0]); setShowResetModal(false); setSubmitStatus({ type: '', message: '' }); };

  const handleSubmit = async () => {
    if (!satker.trim()) { setSubmitStatus({ type: 'error', message: '⚠️ Nama Satker wajib diisi!' }); return; }
    setIsSubmitting(true); setSubmitStatus({ type: '', message: '' });
    const rows = [];
    data.forEach(cat => cat.subCategories.forEach(sub => sub.questions.forEach(q => {
      const scored = q.answer && POSITIVE_ANSWERS.includes(q.answer) ? q.weight : q.options.length === 3 && q.answer === q.options[1] ? q.weight / 2 : 0;
      rows.push({ timestamp: new Date().toLocaleString('id-ID'), unitKerja: satker, tanggal, auditor, jabatan, aspek: cat.title, subAspek: sub.title, pertanyaan: q.text, jawaban: q.answer || '', bobot: q.weight, skor: scored, catatan: q.note, totalSkor: scores.total.toFixed(4) });
    })));
    try {
      const params = new URLSearchParams();
      params.append('data', JSON.stringify({ identity: { satker, tanggal, auditor, jabatan }, rows, totalScore: scores.total }));
      const res = await fetch(GAS_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params });
      const json = await res.json();
      setSubmitStatus(json.status === 'success' ? { type: 'success', message: '✅ Data berhasil dikirim ke Google Sheets!' } : { type: 'error', message: '❌ Gagal: ' + (json.message || 'Error') });
    } catch { setSubmitStatus({ type: 'error', message: '❌ Gagal terhubung. Cek URL GAS.' }); }
    finally { setIsSubmitting(false); }
  };

  const handlePrint = () => { if (progress.isComplete) setTimeout(() => window.print(), 100); };

  const dk = isDark;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${dk ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>

      {/* ===== PRINT CONTENT ===== */}
      <div className="print-only">
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <img src={isDark ? '/Header Itjen Kemendikdasmen Dark.png' : '/Header Itjen Kemendikdasmen.png'}
            alt="Header" style={{ maxHeight: 80, margin: '0 auto', display: 'block' }}
            onError={e => { e.target.style.display = 'none'; }} />
          <h2 style={{ fontSize: 13, fontWeight: 'bold', margin: '6px 0' }}>FORM PENILAIAN CEK FISIK ATAS PEMBANGUNAN ZI WBK/WBBM TAHUN 2024</h2>
          <table style={{ width: '55%', margin: '6px auto', fontSize: 11, borderCollapse: 'collapse' }}>
            <tbody>
              {[['Unit Kerja', satker], ['Tanggal', tanggal ? new Date(tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'], ['Auditor/Penilai', auditor], ['Jabatan', jabatan], ['Total Skor', scores.total.toFixed(4)]].map(([k, v]) => (
                <tr key={k}><td style={{ border: '1px solid #999', padding: '3px 8px', fontWeight: 'bold', width: '35%' }}>{k}</td><td style={{ border: '1px solid #999', padding: '3px 8px' }}>{v || '-'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <table>
          <thead><tr><th style={{ width: '5%' }}>No.</th><th style={{ width: '17%' }}>Aspek</th><th style={{ width: '18%' }}>Sub Aspek</th><th style={{ width: '31%' }}>Pertanyaan</th><th style={{ width: '10%' }}>Jawaban</th><th style={{ width: '12%' }}>Catatan</th><th style={{ width: '7%' }}>Bobot</th></tr></thead>
          <tbody>
            {data.map((cat, ci) => (
              <React.Fragment key={cat.id}>
                <tr className="aspek-row"><td>{ci + 1}</td><td colSpan={6}><strong>{cat.title}</strong> — Skor: {(scores.categories[cat.id]?.current || 0).toFixed(3)}</td></tr>
                {cat.subCategories.map((sub, si) => (
                  <React.Fragment key={sub.id}>
                    {sub.questions.length > 1 && <tr className="sub-row"><td></td><td></td><td colSpan={5}><em>{sub.title}</em></td></tr>}
                    {sub.questions.map((q, qi) => {
                      const pos = q.answer && POSITIVE_ANSWERS.includes(q.answer);
                      return (<tr key={q.id}><td style={{ textAlign: 'center' }}>{ci + 1}.{String.fromCharCode(97 + si)}.{qi + 1}</td><td></td><td>{sub.questions.length === 1 ? sub.title : ''}</td><td>{q.text}</td><td className={q.answer ? (pos ? 'ans-pos' : 'ans-neg') : ''}>{q.answer || '-'}</td><td>{q.note || ''}</td><td style={{ textAlign: 'center' }}>{q.weight.toFixed(3)}</td></tr>);
                    })}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 11 }}>......................., ...................... 2024</p>
            <p style={{ fontSize: 11 }}>Tim Penilai / Auditor,</p>
            <div style={{ height: 60 }} />
            <p style={{ fontSize: 11, borderTop: '1px solid #000', paddingTop: 4, minWidth: 200 }}>{auditor || '___________________________'}</p>
          </div>
        </div>
      </div>

      {/* ===== WEB UI ===== */}
      <div className="no-print flex flex-col md:flex-row min-h-screen">

        {/* SIDEBAR */}
        <div className={`fixed inset-y-0 left-0 z-40 w-64 shadow-xl transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          ${dk ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'}`}>

          <div className={`p-4 flex justify-between items-center border-b ${dk ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`font-bold text-base ${dk ? 'text-blue-400' : 'text-blue-600'}`}>Progress Isian</h2>
            <button className="md:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto h-full pb-24">
            {/* Satker status */}
            <div>
              <p className={`text-xs font-semibold mb-2 uppercase tracking-wider ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Data Umum</p>
              <div className={`flex items-center gap-2 text-sm p-2.5 rounded-xl ${dk ? 'bg-gray-700' : 'bg-gray-50'}`}>
                {satker.trim() ? <CheckCircle size={16} className="text-green-500 shrink-0" /> : <AlertCircle size={16} className="text-orange-500 shrink-0" />}
                <span className={`text-xs font-medium ${satker.trim() ? (dk ? 'text-green-400' : 'text-green-700') : 'text-orange-500'}`}>
                  {satker.trim() ? 'Nama Satker ✓' : 'Nama Satker belum diisi'}
                </span>
              </div>
            </div>

            {/* Per-aspek */}
            <div>
              <p className={`text-xs font-semibold mb-2 uppercase tracking-wider border-t pt-3 ${dk ? 'border-gray-700 text-gray-400' : 'border-gray-100 text-gray-500'}`}>Aspek Penilaian</p>
              <div className="space-y-2">
                {data.map((cat, idx) => {
                  const stat = categoryProgress[cat.id];
                  const isDone = stat.answered === stat.total;
                  const pct = stat.total > 0 ? Math.round(stat.answered / stat.total * 100) : 0;
                  return (
                    <div key={cat.id} onClick={() => scrollToCat(cat.id)}
                      className={`cursor-pointer group p-3 rounded-xl border transition-all
                        ${isDone ? (dk ? 'bg-green-900/20 border-green-800/50' : 'bg-green-50 border-green-200')
                          : stat.answered > 0 ? (dk ? 'bg-blue-900/20 border-blue-800/40 hover:bg-blue-900/30' : 'bg-blue-50 border-blue-100 hover:bg-blue-100')
                          : (dk ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50')}`}>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className={`text-xs font-semibold line-clamp-2 leading-tight ${isDone ? (dk ? 'text-green-400' : 'text-green-700') : (dk ? 'text-gray-300' : 'text-gray-700')}`}>
                          {idx + 1}. {cat.title.replace(/^\d+\.\s*/, '')}
                        </span>
                        {isDone
                          ? <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                          : <span className={`text-[10px] shrink-0 font-bold px-1.5 py-0.5 rounded-full ${stat.answered > 0 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                              {stat.total - stat.answered} sisa
                            </span>
                        }
                      </div>
                      <div className={`w-full h-1.5 rounded-full ${dk ? 'bg-gray-600' : 'bg-gray-200'} mb-1`}>
                        <div className={`h-full rounded-full transition-all duration-300 ${isDone ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <div className={`text-right text-[10px] ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{stat.answered} / {stat.total}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Score summary */}
            <div className={`p-3 rounded-xl text-center border ${dk ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
              <p className={`text-xs ${dk ? 'text-blue-300' : 'text-blue-600'}`}>Total Skor Saat Ini</p>
              <p className={`text-2xl font-extrabold ${dk ? 'text-yellow-400' : 'text-blue-700'}`}>{scores.total.toFixed(2)}</p>
              <p className={`text-xs ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{progress.answered}/{progress.total} terjawab</p>
            </div>
          </div>
        </div>

        {isSidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setIsSidebarOpen(false)} />}

        {/* MAIN CONTENT */}
        <div className="flex-1 md:ml-64 flex flex-col min-h-screen">

          {/* Header Image */}
          <div className={`w-full border-b flex justify-center items-center py-3 relative ${dk ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <button className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <img src={isDark ? '/Header Itjen Kemendikdasmen Dark.png' : '/Header Itjen Kemendikdasmen.png'}
              alt="Header Itjen Kemendikdasmen"
              className="h-10 md:h-14 object-contain px-4 max-w-full"
              onError={e => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', `<span class="text-base font-bold">ITJEN KEMENDIKDASMEN</span>`); }} />
          </div>

          {/* Sticky header */}
          <header className={`sticky top-0 z-20 shadow-md backdrop-blur-md bg-opacity-95 ${dk ? 'bg-blue-950 text-white' : 'bg-blue-700 text-white'}`}>
            <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-base md:text-lg font-bold leading-tight">Form Cek Fisik WBK/WBBM</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-blue-200">Tahun 2024</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${progress.isComplete ? 'bg-green-500 text-white' : 'bg-blue-800 text-blue-200'}`}>
                    {progress.answered}/{progress.total} Terjawab
                  </span>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-xl text-right ${dk ? 'bg-blue-900' : 'bg-blue-800'}`}>
                <span className="text-[10px] block text-blue-300">Total Skor</span>
                <span className="text-xl font-extrabold text-yellow-300">{scores.total.toFixed(2)}</span>
              </div>
              <button onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full flex-shrink-0 transition-colors ${dk ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-blue-600 text-yellow-200 hover:bg-blue-500'}`}
                title={isDark ? 'Mode Terang' : 'Mode Gelap'}>
                {dk ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            <div className="h-1 bg-blue-900/50">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-green-400 transition-all duration-500"
                style={{ width: `${progress.total > 0 ? Math.round(progress.answered / progress.total * 100) : 0}%` }} />
            </div>
          </header>

          <main className="max-w-4xl w-full mx-auto p-4 space-y-5 pb-28">

            {submitStatus.message && (
              <div className={`p-4 rounded-xl flex items-start gap-3 border text-sm font-medium ${submitStatus.type === 'success' ? (dk ? 'bg-green-900/30 text-green-300 border-green-800' : 'bg-green-50 text-green-800 border-green-200') : (dk ? 'bg-red-900/30 text-red-300 border-red-800' : 'bg-red-50 text-red-800 border-red-200')}`}>
                {submitStatus.type === 'success' ? <CheckCircle size={18} className="shrink-0" /> : <AlertCircle size={18} className="shrink-0" />}
                <p>{submitStatus.message}</p>
              </div>
            )}

            {/* Identity */}
            <div className={`p-5 rounded-2xl border shadow-sm ${dk ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-sm font-bold mb-4 flex items-center gap-2 ${dk ? 'text-blue-400' : 'text-blue-600'}`}><FileSpreadsheet size={16} /> Identitas Penilaian</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className={`block text-xs font-semibold mb-1 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Nama Satker / Unit Kerja <span className="text-red-500">*</span></label>
                  <input type="text" value={satker} onChange={e => setSatker(e.target.value)} placeholder="mis. BPMP Provinsi Jambi"
                    className={`w-full p-3 border rounded-xl outline-none text-sm transition-all ${dk ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400' : 'bg-white border-gray-200 focus:border-blue-500'}`} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Tanggal Penilaian</label>
                  <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)}
                    className={`w-full p-3 border rounded-xl outline-none text-sm transition-all ${dk ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400' : 'bg-white border-gray-200 focus:border-blue-500'}`} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Nama Auditor/Penilai</label>
                  <input type="text" value={auditor} onChange={e => setAuditor(e.target.value)} placeholder="Nama lengkap"
                    className={`w-full p-3 border rounded-xl outline-none text-sm transition-all ${dk ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400' : 'bg-white border-gray-200 focus:border-blue-500'}`} />
                </div>
                <div className="sm:col-span-2">
                  <label className={`block text-xs font-semibold mb-1 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Jabatan / NIP Penilai</label>
                  <input type="text" value={jabatan} onChange={e => setJabatan(e.target.value)} placeholder="Jabatan atau NIP"
                    className={`w-full p-3 border rounded-xl outline-none text-sm transition-all ${dk ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400' : 'bg-white border-gray-200 focus:border-blue-500'}`} />
                </div>
              </div>
            </div>

            {/* Aspek Cards */}
            {data.map((cat, ci) => (
              <div key={cat.id} id={cat.id} className={`rounded-2xl border overflow-hidden shadow-sm ${dk ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <button onClick={() => setExpandedCats(p => ({ ...p, [cat.id]: !p[cat.id] }))}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors ${dk ? 'bg-blue-900/60 hover:bg-blue-900/80' : 'bg-blue-700 hover:bg-blue-800'} text-white`}>
                  <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-extrabold text-base flex-shrink-0">{ci + 1}</span>
                  <span className="flex-1 font-bold text-sm md:text-base leading-tight">{cat.title.replace(/^\d+\.\s*/, '')}</span>
                  <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">{(scores.categories[cat.id]?.current || 0).toFixed(2)} pts</span>
                  {(() => {
                    const s = categoryProgress[cat.id];
                    return s.answered === s.total
                      ? <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
                      : <span className="text-xs bg-orange-500/30 text-orange-200 px-2 py-0.5 rounded-full flex-shrink-0">{s.total - s.answered} sisa</span>;
                  })()}
                  {expandedCats[cat.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {expandedCats[cat.id] && cat.subCategories.map((sub, si) => (
                  <div key={sub.id} className={`border-b last:border-b-0 ${dk ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div className={`flex items-start gap-3 px-5 py-2.5 ${dk ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <span className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">{String.fromCharCode(97 + si)}</span>
                      <span className={`text-sm font-semibold flex-1 leading-snug ${dk ? 'text-gray-200' : 'text-gray-700'}`}>{sub.title.replace(/^[a-z]\.\s*/i, '')}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${sub.questions.every(q => q.answer !== null) ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : `${dk ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}`}>
                        {sub.questions.filter(q => q.answer !== null).length}/{sub.questions.length}
                      </span>
                    </div>

                    {sub.questions.map(q => {
                      const answered = q.answer !== null;
                      return (
                        <div key={q.id} className={`px-5 py-3 border-b last:border-b-0 ${answered ? (dk ? 'bg-green-900/10' : 'bg-green-50/60') : ''} ${dk ? 'border-gray-700/50' : 'border-gray-100'}`}>
                          <p className={`text-sm mb-2.5 leading-relaxed ${dk ? 'text-gray-300' : 'text-gray-700'}`}>{q.text}</p>
                          <div className="flex flex-wrap gap-2 mb-2.5">
                            {q.options.map(opt => {
                              const isSelected = q.answer === opt;
                              const isPos = POSITIVE_ANSWERS.includes(opt);
                              const isPartial = q.options.length === 3 && opt === q.options[1];
                              let cls = 'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ';
                              if (isSelected) cls += isPos ? 'bg-green-500 border-green-500 text-white shadow-sm' : isPartial ? 'bg-amber-500 border-amber-500 text-white' : 'bg-red-500 border-red-500 text-white shadow-sm';
                              else cls += dk ? 'bg-gray-700 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-300' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600';
                              return (
                                <button key={opt} onClick={() => handleAnswer(cat.id, sub.id, q.id, opt)} className={cls}>
                                  {isSelected && (isPos ? <CheckCircle size={13} /> : isPartial ? <AlertCircle size={13} /> : <XCircle size={13} />)}
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          <div className="relative">
                            <MessageSquareText size={15} className={`absolute top-3 left-3 ${dk ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input type="text" placeholder="Catatan/temuan fisik..." value={q.note}
                              onChange={e => handleNote(cat.id, sub.id, q.id, e.target.value)}
                              className={`w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border outline-none transition-all ${dk ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-400 placeholder-gray-400'}`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </main>

          {/* BOTTOM ACTION BAR */}
          <div className={`fixed bottom-0 left-0 right-0 md:left-64 z-30 border-t px-4 py-3 flex flex-wrap gap-2 shadow-2xl ${dk ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            <button onClick={() => setShowResetModal(true)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${dk ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              <RotateCcw size={14} /> Reset
            </button>

            <button onClick={handleSubmit} disabled={isSubmitting || !satker.trim()}
              className="flex items-center gap-1.5 flex-1 md:flex-none justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
              {isSubmitting ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={14} />}
              {isSubmitting ? 'Mengirim...' : 'Kirim ke Sheets'}
            </button>

            {/* Tombol cetak: HANYA MUNCUL jika 100% selesai + satker terisi */}
            {progress.isComplete ? (
              <button onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white text-sm font-bold shadow-md transition-all animate-pulse-once">
                <Printer size={14} /> Cetak Laporan
              </button>
            ) : (
              <div className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm border cursor-default ${dk ? 'border-gray-700 text-gray-600' : 'border-gray-100 text-gray-300 bg-gray-50'}`}
                title={`Isi semua ${progress.total - progress.answered} pertanyaan tersisa + nama satker untuk mencetak`}>
                <Printer size={14} />
                <span className="hidden sm:inline text-xs">Cetak ({progress.answered}/{progress.total})</span>
                <span className="sm:hidden text-xs">Cetak</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RESET MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className={`rounded-2xl p-6 max-w-sm w-full shadow-2xl ${dk ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="font-bold text-lg mb-2">⚠️ Reset Form?</h3>
            <p className={`text-sm mb-5 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Semua jawaban dan catatan akan dihapus. Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowResetModal(false)} className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold ${dk ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-600'}`}>Batal</button>
              <button onClick={handleReset} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold">Ya, Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
