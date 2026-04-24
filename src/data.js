// ============================================================
// DATA: Semua pertanyaan cek fisik ZI WBK/WBBM 2026
// FIX v2: Bobot Aspek 2 & 3 dikalibrasi sesuai instrumen resmi
//         (referensi: file Excel "Cek Fisik WBK WBBM" dari Itjen)
//
// Distribusi resmi:
//   Aspek 1 ULT         = 25 poin (6 sub × 4.1667)
//   Aspek 2 Sarana      = 25 poin (6 sub × 4.1667) ← sebelumnya 20
//   Aspek 3 Prasarana   = 25 poin (15 sub × 1.6667) ← sebelumnya 30
//   Aspek 4 Petugas     = 25 poin (4 sub × 6.25)
//   ─────────────────────────────────
//   TOTAL               = 100 poin
// ============================================================

export const GAS_URL = 'https://script.google.com/macros/s/AKfycbwQ29y8240MueaQ52NiWYJ3q495qsvjuhmVzgAHOsE4SABPcISIro1BfhYMJ2aquPKy/exec';

export const POSITIVE_ANSWERS = ['Ada', 'Ya', 'Bersih', 'Layak', 'Baik', 'Elektronik'];

export const getPredicate = (score) => {
  if (score >= 90) return { label: 'Sangat Baik', stars: 5, emoji: '⭐⭐⭐⭐⭐' };
  if (score >= 80) return { label: 'Baik', stars: 4, emoji: '⭐⭐⭐⭐' };
  if (score >= 70) return { label: 'Cukup', stars: 3, emoji: '⭐⭐⭐' };
  if (score >= 60) return { label: 'Kurang', stars: 2, emoji: '⭐⭐' };
  return { label: 'Sangat Kurang', stars: 1, emoji: '⭐' };
};

// Konstanta bobot sub-aspek (per instrumen resmi)
const SUB_ASPEK_1 = 4.166666666666667;  // 25 / 6
const SUB_ASPEK_2 = 4.166666666666667;  // 25 / 6
const SUB_ASPEK_3 = 1.666666666666667;  // 25 / 15
const SUB_ASPEK_4 = 6.25;               // 25 / 4

export const initialData = [
  {
    id: 'aspek-1',
    title: '1. UNIT LAYANAN TERPADU (ULT)',
    subCategories: [
      {
        id: 'ult-1a', title: 'a. Ketersediaan Fasilitas',
        // 20 soal × (4.1667 / 20) = 0.208333...
        questions: [
          { id: '1a-1', text: '1. Ruangan ULT', weight: SUB_ASPEK_1 / 20, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-1a', text: '1.a Kelayakan Ruangan ULT', weight: SUB_ASPEK_1 / 20, options: ['Layak', 'Tidak Layak'], answer: null, note: '' },
          { id: '1a-1b', text: '1.b Pencahayaan Ruangan ULT', weight: SUB_ASPEK_1 / 20, options: ['Terang', 'Gelap'], answer: null, note: '' },
          { id: '1a-2', text: '2. Sistem Antrian', weight: SUB_ASPEK_1 / 20, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-2a', text: '2.a Metode Sistem Antrian', weight: SUB_ASPEK_1 / 20, options: ['Elektronik', 'Manual', 'Tidak'], answer: null, note: '' },
          { id: '1a-3', text: '3. Loket Pelayanan', weight: SUB_ASPEK_1 / 20, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-3a', text: '3.a Jumlah Loket', weight: SUB_ASPEK_1 / 20, options: ['Memadai', 'Kurang'], answer: null, note: '' },
          { id: '1a-4', text: '4. Tempat Duduk/Ruang Tunggu', weight: SUB_ASPEK_1 / 20, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-4a', text: '4.a Jumlah Tempat Duduk', weight: SUB_ASPEK_1 / 20, options: ['Memadai', 'Kurang'], answer: null, note: '' },
          { id: '1a-5', text: '5. Banner Daftar Layanan dan Info Gratis', weight: SUB_ASPEK_1 / 20, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '1a-5a', text: '5.a Kondisi Tempat Duduk', weight: SUB_ASPEK_1 / 20, options: ['Layak', 'Rusak'], answer: null, note: '' },
          { id: '1a-6', text: '6. Tarif PNBP Disahkan KPKNL', weight: SUB_ASPEK_1 / 20, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '1a-7', text: '7. Komputer/Laptop Petugas ULT', weight: SUB_ASPEK_1 / 20, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '1a-8', text: '8. Petugas ULT', weight: SUB_ASPEK_1 / 20, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-9', text: '9. Pendingin Ruangan (AC)', weight: SUB_ASPEK_1 / 20, options: ['Ada/Fungsi', 'Rusak/Tidak'], answer: null, note: '' },
          { id: '1a-10', text: '10. Komplementer Tamu (Permen/Air dll)', weight: SUB_ASPEK_1 / 20, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-11', text: '11. Sarana Pengaduan', weight: SUB_ASPEK_1 / 20, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-12', text: '12. Kotak Saran', weight: SUB_ASPEK_1 / 20, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '1a-13', text: '13. Sarana Informasi (Maklumat dll)', weight: SUB_ASPEK_1 / 20, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '1a-14', text: '14. Tempat Sampah', weight: SUB_ASPEK_1 / 20, options: ['Ada', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'ult-1b', title: 'b. Kebersihan ULT Secara Umum',
        questions: [{ id: '1b-1', text: 'Kebersihan ULT Secara Umum', weight: SUB_ASPEK_1, options: ['Bersih & Rapi', 'Kurang/Kotor'], answer: null, note: '' }]
      },
      {
        id: 'ult-1c', title: 'c. Proses Pelayanan Petugas ULT',
        // 5 soal × (4.1667 / 5) = 0.833333...
        questions: [
          { id: '1c-1', text: '1. Menerapkan Senyum, Sapa, Salam', weight: SUB_ASPEK_1 / 5, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1c-2', text: '2. Penggunaan Atribut Pegawai/Petugas', weight: SUB_ASPEK_1 / 5, options: ['Lengkap', 'Tidak Lengkap'], answer: null, note: '' },
          { id: '1c-3', text: '3. Keramahan Petugas Pemberi Layanan', weight: SUB_ASPEK_1 / 5, options: ['Ramah', 'Kurang Ramah'], answer: null, note: '' },
          { id: '1c-4', text: '4. Pemahaman Layanan yang Dimiliki', weight: SUB_ASPEK_1 / 5, options: ['Paham', 'Tidak Paham'], answer: null, note: '' },
          { id: '1c-5', text: '5. Pemahaman tentang ZI WBK', weight: SUB_ASPEK_1 / 5, options: ['Paham', 'Tidak Paham'], answer: null, note: '' },
        ]
      },
      {
        id: 'ult-1d', title: 'd. Banner/Media Sosialisasi Gratifikasi',
        questions: [{ id: '1d-1', text: 'Ketersediaan Banner/Media Sosialisasi ZI-WBK', weight: SUB_ASPEK_1, options: ['Terpasang', 'Tidak'], answer: null, note: '' }]
      },
      {
        id: 'ult-1e', title: 'e. Evaluasi Layanan',
        // 7 soal × (4.1667 / 7) = 0.595238...
        questions: [
          { id: '1e-1', text: '1. Tindak lanjut kotak saran', weight: SUB_ASPEK_1 / 7, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-2', text: '2. Menerbitkan hasil survei atas Layanan', weight: SUB_ASPEK_1 / 7, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-3', text: '3. Kompensasi untuk layanan tidak sesuai standar', weight: SUB_ASPEK_1 / 7, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-4', text: '4. Rekap pengguna layanan yang berkunjung', weight: SUB_ASPEK_1 / 7, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-5', text: '5. Ruang privasi untuk pelanggan marah', weight: SUB_ASPEK_1 / 7, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-6', text: '6. Jadwal publikasi media cetak/elektronik', weight: SUB_ASPEK_1 / 7, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-7', text: '7. Reward kepada petugas layanan', weight: SUB_ASPEK_1 / 7, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'ult-1f', title: 'f. Evaluasi Satuan Kerja',
        // 10 soal × (4.1667 / 10) = 0.416666...
        questions: [
          { id: '1f-1', text: '1. Memahami target kinerjanya', weight: SUB_ASPEK_1 / 10, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-2', text: '2. Memperoleh penghargaan/reward berprestasi', weight: SUB_ASPEK_1 / 10, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-3', text: '3. Mengetahui komposisi pegawai berdasarkan usia', weight: SUB_ASPEK_1 / 10, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-4', text: '4. Rutin meningkatkan kompetensi pegawai', weight: SUB_ASPEK_1 / 10, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-5', text: '5. Menunjukkan rekap kehadiran', weight: SUB_ASPEK_1 / 10, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-6', text: '6. Mengetahui jumlah pegawai terlambat', weight: SUB_ASPEK_1 / 10, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-7', text: '7. Memiliki sanksi pegawai terlambat', weight: SUB_ASPEK_1 / 10, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-8', text: '8. Memiliki proses mutasi pegawai', weight: SUB_ASPEK_1 / 10, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-9', text: '9. Memiliki POS rotasi pegawai', weight: SUB_ASPEK_1 / 10, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1f-10', text: '10. Memiliki inovasi di kepegawaian', weight: SUB_ASPEK_1 / 10, options: ['Ya', 'Tidak'], answer: null, note: '' },
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
        // 2 soal × (4.1667 / 2) = 2.0833  [FIX: dari 1.6667]
        questions: [
          { id: '2a-1', text: '1. Ketersediaan Fasilitas', weight: SUB_ASPEK_2 / 2, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2a-2', text: '2. Kebersihan', weight: SUB_ASPEK_2 / 2, options: ['Bersih', 'Kurang Bersih'], answer: null, note: '' },
        ]
      },
      {
        id: 'sar-2b', title: 'b. Ruang Pimpinan/Ruang Rapat',
        questions: [
          { id: '2b-1', text: '1. Ketersediaan Fasilitas', weight: SUB_ASPEK_2 / 2, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2b-2', text: '2. Kebersihan', weight: SUB_ASPEK_2 / 2, options: ['Bersih', 'Kurang Bersih'], answer: null, note: '' },
        ]
      },
      {
        id: 'sar-2c', title: 'c. Perpustakaan',
        // 9 soal × (4.1667 / 9) = 0.4630  [FIX: dari 0.3704]
        questions: [
          { id: '2c-1', text: '1. Papan Nama/Petunjuk Ruangan', weight: SUB_ASPEK_2 / 9, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2c-2', text: '2. Pendingin Ruangan (AC)', weight: SUB_ASPEK_2 / 9, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2c-3', text: '3. Akses Internet/Wifi', weight: SUB_ASPEK_2 / 9, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2c-4', text: '4. Tempat Duduk', weight: SUB_ASPEK_2 / 9, options: ['Memadai', 'Kurang'], answer: null, note: '' },
          { id: '2c-5', text: '5. Akses Audio/Visual', weight: SUB_ASPEK_2 / 9, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2c-6', text: '6. Ruang Baca', weight: SUB_ASPEK_2 / 9, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2c-7', text: '7. Pustakawan', weight: SUB_ASPEK_2 / 9, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2c-8', text: '8. Kenyamanan Ruangan', weight: SUB_ASPEK_2 / 9, options: ['Nyaman', 'Kurang Nyaman'], answer: null, note: '' },
          { id: '2c-9', text: '9. Kebersihan', weight: SUB_ASPEK_2 / 9, options: ['Bersih', 'Kurang Bersih'], answer: null, note: '' },
        ]
      },
      {
        id: 'sar-2d', title: 'd. Poliklinik',
        // 6 soal × (4.1667 / 6) = 0.6944  [FIX: dari 0.5556]
        questions: [
          { id: '2d-1', text: '1. Ruang Poliklinik', weight: SUB_ASPEK_2 / 6, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2d-2', text: '2. Alat Kesehatan (Tensimeter dll)', weight: SUB_ASPEK_2 / 6, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2d-3', text: '3. Tempat Tidur', weight: SUB_ASPEK_2 / 6, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2d-4', text: '4. Kotak P3K/Obat-obatan', weight: SUB_ASPEK_2 / 6, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2d-5', text: '5. Jadwal Kunjungan Dokter', weight: SUB_ASPEK_2 / 6, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2d-6', text: '6. Kebersihan', weight: SUB_ASPEK_2 / 6, options: ['Bersih', 'Kurang Bersih'], answer: null, note: '' },
        ]
      },
      {
        id: 'sar-2e', title: 'e. Lahan Parkir',
        // 5 soal × (4.1667 / 5) = 0.8333  [FIX: dari 0.6667]
        questions: [
          { id: '2e-1', text: '1. Tempat Parkir Pegawai', weight: SUB_ASPEK_2 / 5, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2e-2', text: '2. Tempat parkir tamu', weight: SUB_ASPEK_2 / 5, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2e-3', text: '3. Petugas Pengamanan lahan parkir', weight: SUB_ASPEK_2 / 5, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '2e-4', text: '4. Parkir Khusus Disabilitas', weight: SUB_ASPEK_2 / 5, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2e-5', text: '5. Kebersihan Lahan Parkir', weight: SUB_ASPEK_2 / 5, options: ['Bersih', 'Kurang Bersih'], answer: null, note: '' },
        ]
      },
      {
        id: 'sar-2f', title: 'f. Tempat Ibadah',
        questions: [
          { id: '2f-1', text: '1. Ketersediaan', weight: SUB_ASPEK_2 / 2, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '2f-2', text: '2. Kebersihan', weight: SUB_ASPEK_2 / 2, options: ['Bersih', 'Kurang Bersih'], answer: null, note: '' },
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
        // 3 soal × (1.6667 / 3) = 0.5556  [FIX: dari 0.6667]
        questions: [
          { id: '3a-1', text: '1. Lemari arsip laporan keuangan.', weight: SUB_ASPEK_3 / 3, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3a-2', text: '2. Mekanisme pengelolaan arsip jelas.', weight: SUB_ASPEK_3 / 3, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3a-3', text: '3. Ruang diskusi staf', weight: SUB_ASPEK_3 / 3, options: ['Ada', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'pra-3b', title: 'b. Pos Keamanan (Security)',
        // [FIX: dari 2.0 → 1.6667]
        questions: [{ id: '3b-1', text: 'Ketersediaan Pos Keamanan', weight: SUB_ASPEK_3, options: ['Tersedia', 'Tidak'], answer: null, note: '' }]
      },
      {
        id: 'pra-3c', title: 'c. Toilet',
        // 5 soal × (1.6667 / 5) = 0.3333  [FIX: dari 0.4]
        questions: [
          { id: '3c-1', text: '1. Tersedia Sabun', weight: SUB_ASPEK_3 / 5, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3c-2', text: '2. Tersedia Tisu', weight: SUB_ASPEK_3 / 5, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3c-3', text: '3. Tersedia Air', weight: SUB_ASPEK_3 / 5, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3c-4', text: '4. Kenyamanan (Tidak Bau, dll)', weight: SUB_ASPEK_3 / 5, options: ['Nyaman', 'Tidak Nyaman'], answer: null, note: '' },
          { id: '3c-5', text: '5. Kebersihan', weight: SUB_ASPEK_3 / 5, options: ['Bersih', 'Kotor'], answer: null, note: '' },
        ]
      },
      {
        id: 'pra-3d', title: 'd. Kontak Darurat',
        // 7 soal × (1.6667 / 7) = 0.2381  [FIX: dari 0.2857]
        questions: [
          { id: '3d-1', text: '1. RS/Puskesmas/Faskes', weight: SUB_ASPEK_3 / 7, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3d-2', text: '2. Pemadam Kebakaran', weight: SUB_ASPEK_3 / 7, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3d-3', text: '3. Kantor Polisi', weight: SUB_ASPEK_3 / 7, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3d-4', text: '4. Satpol PP', weight: SUB_ASPEK_3 / 7, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3d-5', text: '5. Gangguan Listrik (PLN)', weight: SUB_ASPEK_3 / 7, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3d-6', text: '6. Babinsa/Kodim/Koramil', weight: SUB_ASPEK_3 / 7, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3d-7', text: '7. Dinas Kesehatan', weight: SUB_ASPEK_3 / 7, options: ['Ada', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'pra-3e', title: 'e. Titik Kumpul (Evakuasi)',
        // 2 soal × (1.6667 / 2) = 0.8333  [FIX: dari 1.0]
        questions: [
          { id: '3e-1', text: '1. Tersedia Tempat Titik Kumpul', weight: SUB_ASPEK_3 / 2, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
          { id: '3e-2', text: '2. Papan Nama Titik Kumpul', weight: SUB_ASPEK_3 / 2, options: ['Tersedia', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'pra-3f', title: 'f. Petunjuk Arah Jalan/Gedung',
        // 3 soal × (1.6667 / 3) = 0.5556  [FIX: dari 0.6667]
        questions: [
          { id: '3f-1', text: '1. Tersedia Nama Gedung', weight: SUB_ASPEK_3 / 3, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3f-2', text: '2. Tersedia Petunjuk Arah Jalan/Gedung', weight: SUB_ASPEK_3 / 3, options: ['Ada', 'Tidak'], answer: null, note: '' },
          { id: '3f-3', text: '3. Terdapat Rambu-Rambu Lalu Lintas', weight: SUB_ASPEK_3 / 3, options: ['Ada', 'Tidak'], answer: null, note: '' },
        ]
      },
      // Sub 3g–3n: masing-masing 1 soal × 1.6667  [FIX: dari 2.0]
      { id: 'pra-3g', title: 'g. Akses Password Internet/Wifi', questions: [{ id: '3g-1', text: 'Tersedia Akses Internet/Wifi', weight: SUB_ASPEK_3, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3h', title: 'h. Ruang Bermain Anak (Playground)', questions: [{ id: '3h-1', text: 'Tersedia Ruang Bermain Anak', weight: SUB_ASPEK_3, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3i', title: 'i. Ruang Menyusui/Laktasi', questions: [{ id: '3i-1', text: 'Tersedia Ruang Laktasi', weight: SUB_ASPEK_3, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3j', title: 'j. Ruang Merokok/Smooking Room', questions: [{ id: '3j-1', text: 'Tersedia Ruang Merokok', weight: SUB_ASPEK_3, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3k', title: 'k. Akses Penyandang Disabilitas', questions: [{ id: '3k-1', text: 'Akses Disabilitas (Pijakan/Ramp/dll)', weight: SUB_ASPEK_3, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3l', title: 'l. Kursi Roda', questions: [{ id: '3l-1', text: 'Ketersediaan Kursi Roda', weight: SUB_ASPEK_3, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3m', title: 'm. Alat Pemadam Api (APAR)', questions: [{ id: '3m-1', text: 'Ketersediaan APAR', weight: SUB_ASPEK_3, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      { id: 'pra-3n', title: 'n. Genset', questions: [{ id: '3n-1', text: 'Ketersediaan Genset', weight: SUB_ASPEK_3, options: ['Ada', 'Tidak'], answer: null, note: '' }] },
      {
        id: 'pra-3o', title: 'o. Penataan, Kebersihan, Ketertiban',
        // 6 soal × (1.6667 / 6) = 0.2778  [FIX: dari 0.3333]
        questions: [
          { id: '3o-1', text: '1. Lingkungan Kantor', weight: SUB_ASPEK_3 / 6, options: ['Tertata', 'Tidak'], answer: null, note: '' },
          { id: '3o-2', text: '2. Halaman Kantor', weight: SUB_ASPEK_3 / 6, options: ['Tertata', 'Tidak'], answer: null, note: '' },
          { id: '3o-3', text: '3. Penataan Taman, Rumput, Pohon', weight: SUB_ASPEK_3 / 6, options: ['Terawat', 'Tidak'], answer: null, note: '' },
          { id: '3o-4', text: '4. Saluran Air', weight: SUB_ASPEK_3 / 6, options: ['Lancar', 'Tersumbat'], answer: null, note: '' },
          { id: '3o-5', text: '5. Ruang Publik', weight: SUB_ASPEK_3 / 6, options: ['Terawat', 'Tidak'], answer: null, note: '' },
          { id: '3o-6', text: '6. Ketertiban Parkir Kendaraan', weight: SUB_ASPEK_3 / 6, options: ['Tertib', 'Tidak Tertib'], answer: null, note: '' },
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
        // 15 soal × (6.25 / 15) = 0.4167
        questions: [
          { id: '4a-1', text: '1. Jumlah resepsionis memadai?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-2', text: '2. Memiliki standar waktu & jadwal/shift?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-3', text: '3. Terdapat SOP penerimaan tamu?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-4', text: '4. Memahami SOP penerimaan tamu?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-5', text: '5. Mengetahui SOP layanan satkernya?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-6', text: '6. Diberikan perlengkapan tugas memadai?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-7', text: '7. Mendapatkan pelatihan (training)?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-8', text: '8. Mengetahui manfaat layanan online?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-9', text: '9. Rutin membuka kotak saran?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-10', text: '10. Mengetahui layanan yang kerap diakses?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-11', text: '11. Mengetahui jumlah pengguna berkunjung?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-12', text: '12. Mengetahui kelompok usia customer?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-13', text: '13. Memiliki hospitality penolakan layanan?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-14', text: '14. Aktivitas saat tidak ada pengguna?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4a-15', text: '15. Memiliki layanan UPT Keliling?', weight: SUB_ASPEK_4 / 15, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'pet-4b', title: 'b. Petugas Keamanan (Security)',
        // 13 soal × (6.25 / 13) = 0.4808
        questions: [
          { id: '4b-1', text: '1. Pengetahuan layanan satkernya?', weight: SUB_ASPEK_4 / 13, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-2', text: '2. Mengetahui SOP layanan?', weight: SUB_ASPEK_4 / 13, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-3', text: '3. Terdapat SOP terkait pengamanan?', weight: SUB_ASPEK_4 / 13, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-4', text: '4. Memahami tugas & SOP pengamanan?', weight: SUB_ASPEK_4 / 13, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-5', text: '5. Mekanisme shift selama 24 jam?', weight: SUB_ASPEK_4 / 13, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-6', text: '6. Pengecekan suhu & arahan handsanitizer?', weight: SUB_ASPEK_4 / 13, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-7', text: '7. Pelatihan petugas keamanan?', weight: SUB_ASPEK_4 / 13, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-8', text: '8. Telah memiliki sertifikat?', weight: SUB_ASPEK_4 / 13, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-9', text: '9. Memahami target kinerjanya?', weight: SUB_ASPEK_4 / 13, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-10', text: '10. Perlengkapan (HT, dll) memadai?', weight: SUB_ASPEK_4 / 13, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-11', text: '11. Terdapat koordinator keamanan?', weight: SUB_ASPEK_4 / 13, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-12', text: '12. Memiliki nomor telepon darurat?', weight: SUB_ASPEK_4 / 13, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4b-13', text: '13. Jumlah petugas memadai?', weight: SUB_ASPEK_4 / 13, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'pet-4c', title: 'c. Petugas Kebersihan',
        // 8 soal × (6.25 / 8) = 0.78125
        questions: [
          { id: '4c-1', text: '1. Terdapat SOP kebersihan?', weight: SUB_ASPEK_4 / 8, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-2', text: '2. Memahami tugas & SOP kebersihan?', weight: SUB_ASPEK_4 / 8, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-3', text: '3. Terdapat koordinator kebersihan?', weight: SUB_ASPEK_4 / 8, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-4', text: '4. Perlengkapan (sapu dll) memadai?', weight: SUB_ASPEK_4 / 8, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-5', text: '5. Pembagian jadwal piket/wilayah?', weight: SUB_ASPEK_4 / 8, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-6', text: '6. Jumlah petugas memadai?', weight: SUB_ASPEK_4 / 8, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-7', text: '7. Bekerja rentang waktu <5 atau >5 thn?', weight: SUB_ASPEK_4 / 8, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4c-8', text: '8. Jam kerja & pembagian shift jelas?', weight: SUB_ASPEK_4 / 8, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      },
      {
        id: 'pet-4d', title: 'd. Pramubakti (Office Boy)',
        // 6 soal × (6.25 / 6) = 1.04167
        questions: [
          { id: '4d-1', text: '1. Terdapat SOP tugas pramubakti?', weight: SUB_ASPEK_4 / 6, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-2', text: '2. Memahami tugas & SOP pelayanan?', weight: SUB_ASPEK_4 / 6, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-3', text: '3. Terdapat koordinator pramubakti?', weight: SUB_ASPEK_4 / 6, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-4', text: '4. Pembagian jadwal piket/wilayah?', weight: SUB_ASPEK_4 / 6, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-5', text: '5. Perlengkapan disediakan memadai?', weight: SUB_ASPEK_4 / 6, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '4d-6', text: '6. Jumlah pramubakti memadai?', weight: SUB_ASPEK_4 / 6, options: ['Ya', 'Tidak'], answer: null, note: '' },
        ]
      }
    ]
  }
];
