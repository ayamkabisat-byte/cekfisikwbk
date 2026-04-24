// ============================================================
// DATA: Semua pertanyaan cek fisik ZI WBK/WBBM 2026
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

export const initialData = [
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
