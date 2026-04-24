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
    id: 'aspek-1', title: '1. UNIT LAYANAN TERPADU (ULT)', icon: '🏢',
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
      { id: 'ult-1b', title: 'b. Kebersihan ULT Secara Umum', questions: [
        { id: '1b-1', text: 'Kebersihan ULT Secara Umum', weight: 4.166666666666667, options: ['Bersih', 'Tidak Bersih'], answer: null, note: '' }
      ]},
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
      { id: 'ult-1d', title: 'd. Banner/Media Sosialisasi Gratifikasi/ZI-WBK', questions: [
        { id: '1d-1', text: 'Ketersediaan Banner/Media Sosialisasi Gratifikasi/ZI-WBK', weight: 4.166666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }
      ]},
      {
        id: 'ult-1e', title: 'e. Evaluasi Layanan',
        questions: [
          { id: '1e-1', text: 'Satuan Kerja melakukan tindak lanjut kotak saran', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-2', text: 'Satuan Kerja menerbitkan hasil survei atas Layanan', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-3', text: 'Satuan Kerja memiliki produk kompensasi untuk penerimaan layanan tidak sesuai standar', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-4', text: 'Satuan Kerja memiliki rekap pengguna layanan yang berkunjung', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-5', text: 'Satuan Kerja memiliki ruang privasi untuk memfasilitasi apabila terdapat pengguna layanan (customer) yang marah', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-6', text: 'Satuan Kerja memiliki jadwal publikasi melalui media cetak maupun elektronik', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
          { id: '1e-7', text: 'Satuan Kerja memberikan penghargaan/reward kepada petugas layanan karena berprestasi', weight: 0.595238095238095, options: ['Ya', 'Tidak'], answer: null, note: '' },
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
    id: 'aspek-2', title: '2. SARANA', icon: '🏗️',
    subCategories: [
      { id: 'sar-2a', title: 'a. Sarana Pelayanan (Aula/Mess/Penginapan/Asrama/Ruang Makan/dsb)', questions: [
        { id: '2a-1', text: 'Ketersediaan Fasilitas', weight: 2.083333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
        { id: '2a-2', text: 'Kebersihan', weight: 2.083333333333333, options: ['Bersih', 'Tidak Bersih'], answer: null, note: '' }
      ]},
      { id: 'sar-2b', title: 'b. Ruang Pimpinan/Ruang Rapat', questions: [
        { id: '2b-1', text: 'Ketersediaan Fasilitas', weight: 2.083333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
        { id: '2b-2', text: 'Kebersihan', weight: 2.083333333333333, options: ['Bersih', 'Tidak Bersih'], answer: null, note: '' }
      ]},
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
      { id: 'sar-2f', title: 'f. Tempat Ibadah', questions: [
        { id: '2f-1', text: 'Ketersediaan', weight: 2.083333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
        { id: '2f-2', text: 'Kebersihan', weight: 2.083333333333333, options: ['Bersih', 'Tidak Bersih'], answer: null, note: '' }
      ]},
    ]
  },
  {
    id: 'aspek-3', title: '3. PRASARANA', icon: '🏛️',
    subCategories: [
      { id: 'pra-3a', title: 'a. Tata Usaha', questions: [
        { id: '3a-1', text: 'Lemari arsip untuk menyimpan laporan keuangan.', weight: 0.555555555555556, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
        { id: '3a-2', text: 'Mekanisme pengelolaan arsip yang jelas (arsip >5 tahun dipindahkan).', weight: 0.555555555555556, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
        { id: '3a-3', text: 'Ruang diskusi staf', weight: 0.555555555555556, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }
      ]},
      { id: 'pra-3b', title: 'b. Pos Keamanan (Security)', questions: [
        { id: '3b-1', text: 'Ketersediaan Pos Keamanan (Security)', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }
      ]},
      { id: 'pra-3c', title: 'c. Toilet', questions: [
        { id: '3c-1', text: 'Tersedia Sabun', weight: 0.333333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' },
        { id: '3c-2', text: 'Tersedia Tisu', weight: 0.333333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' },
        { id: '3c-3', text: 'Tersedia Air', weight: 0.333333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' },
        { id: '3c-4', text: 'Kenyamanan (Tidak Bau, Pencahayaan Cukup, Sirkulasi Udara Baik, dan Privasi Terjaga)', weight: 0.333333333333333, options: ['Ya', 'Tidak'], answer: null, note: '' },
        { id: '3c-5', text: 'Kebersihan', weight: 0.333333333333333, options: ['Bersih', 'Tidak Bersih'], answer: null, note: '' }
      ]},
      {
        id: 'pra-3d', title: 'd. Kontak Darurat',
        questions: [
          { id: '3d-1', text: 'RS/Puskesmas/Faskes', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '3d-2', text: 'Pemadam Kebakaran', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '3d-3', text: 'Kantor Polisi', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '3d-4', text: 'Satpol PP', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '3d-5', text: 'Gangguan Listrik (PLN)', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '3d-6', text: 'Babinsa/Kodim/Koramil', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
          { id: '3d-7', text: 'Dinas Kesehatan', weight: 0.238095238095238, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
        ]
      },
      { id: 'pra-3e', title: 'e. Titik Kumpul (Evakuasi)', questions: [
        { id: '3e-1', text: 'Tersedia Tempat/Titik Kumpul (Evakuasi)', weight: 0.833333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
        { id: '3e-2', text: 'Tersedia Papan Nama Titik Kumpul', weight: 0.833333333333333, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }
      ]},
      { id: 'pra-3f', title: 'f. Petunjuk Arah Jalan/Gedung', questions: [
        { id: '3f-1', text: 'Tersedia Nama Gedung', weight: 0.555555555555556, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
        { id: '3f-2', text: 'Tersedia Petunjuk Arah Jalan/Gedung', weight: 0.555555555555556, options: ['Ada', 'Tidak Ada'], answer: null, note: '' },
        { id: '3f-3', text: 'Terdapat Rambu-Rambu Lalu Lintas (Parkir, Arah Sejalur/verboden, Dilarang Berhenti, dsb)', weight: 0.555555555555556, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }
      ]},
      { id: 'pra-3g', title: 'g. Akses Password Internet/Wifi', questions: [{ id: '3g-1', text: 'Tersedia Akses Password Internet/Wifi', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3h', title: 'h. Ruang Bermain Anak (Playground)', questions: [{ id: '3h-1', text: 'Tersedia Ruang Bermain Anak (Playground)', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3i', title: 'i. Ruang Menyusui/Laktasi (Nursery Room)', questions: [{ id: '3i-1', text: 'Tersedia Ruang Menyusui/Laktasi (Nursery Room)', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3j', title: 'j. Ruang Merokok/Smooking Room', questions: [{ id: '3j-1', text: 'Tersedia Ruang Merokok/Smooking Room', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3k', title: 'k. Akses Bagi Penyandang Disabilitas (Pijakan Jalan/Guiding Block, Jalur Miring/Ramp, Pegangan Pemandu/Grap Bar, dsb)', questions: [{ id: '3k-1', text: 'Tersedia Akses Bagi Penyandang Disabilitas', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3l', title: 'l. Kursi Roda', questions: [{ id: '3l-1', text: 'Ketersediaan Kursi Roda', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3m', title: 'm. Alat Pemadam Api Ringan (APAR)', questions: [{ id: '3m-1', text: 'Ketersediaan Alat Pemadam Api Ringan (APAR)', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3n', title: 'n. Genset', questions: [{ id: '3n-1', text: 'Ketersediaan Genset', weight: 1.666666666666667, options: ['Ada', 'Tidak Ada'], answer: null, note: '' }] },
      { id: 'pra-3o', title: 'o. Penataan, Perawatan, Kebersihan, dan Ketertiban', questions: [
        { id: '3o-1', text: 'Lingkungan Kantor', weight: 0.277777777777778, options: ['Ya', 'Tidak'], answer: null, note: '' },
        { id: '3o-2', text: 'Halaman Kantor', weight: 0.277777777777778, options: ['Ya', 'Tidak'], answer: null, note: '' },
        { id: '3o-3', text: 'Penataan dan Perawatan Taman, Rumput, dan Pohon', weight: 0.277777777777778, options: ['Ya', 'Tidak'], answer: null, note: '' },
        { id: '3o-4', text: 'Saluran Air', weight: 0.277777777777778, options: ['Ya', 'Tidak'], answer: null, note: '' },
        { id: '3o-5', text: 'Ruang Publik', weight: 0.277777777777778, options: ['Ya', 'Tidak'], answer: null, note: '' },
        { id: '3o-6', text: 'Ketertiban Parkir Kendaraan (Tamu, Pegawai, Petugas Kebersihan/Perawatan, dst)', weight: 0.277777777777778, options: ['Ya', 'Tidak'], answer: null, note: '' }
      ]},
    ]
  },
  {
    id: 'aspek-4', title: '4. PETUGAS LAYANAN', icon: '👤',
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
          { id: '4b-6',  text: 'Apakah petugas keamanan melakukan pengecekan suhu dan pengarahan penggunaan handsanitizer kepada tamu/pengguna layanan?', weight: 0.480769230769231, options: ['Ya', 'Tidak'], answer: null, note: '' },
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
