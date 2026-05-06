export const dummyUser = {
  mahasiswa: {
    id: 1,
    nama: 'Hannan Azhari Batubara',
    email: 'hannan@apps.ipb.ac.id',
    role: 'mahasiswa',
    password: 'mahasiswa123',
  },
  dosen: {
    id: 2,
    nama: 'Dr. Cokorda Wildan Batubara',
    email: 'budi@ipb.ac.id',
    role: 'dosen',
    password: 'dosen123',
  },
};

export const topikBantuan = [
  'Surat Izin Akademik',
  'Pengajuan Bimbingan',
  'Pengajuan Surat PKL',
];

export const daftarDosen = [
  'Ahmad Ridha S.Kom., M.S - 198005072005011001',
  'Auriza Rahmad Akbar S.Kom., M.Kom. - 198703052020121002',
  'Auzi Asfarian S.Kom., M.Kom - 198906042015041001',
  'Dean Apriana Ramadhan S.Kom., M.Kom - 198904142018031001',
  'Dr. Aziz Kustiyo S.Si., M.Kom - 197007191998021001',
  'Dr. Eng. Annisa S.Kom., M.Kom - 197907312005012002',
  'Dr. Hendra Rahmawan S.Kom., M.T - 198205012009121004',
  'Dr. Heru Sukoco S.Si., M.T - 197507132000121001',
  'Dr. Ir. Sri Wahjuni M.T - 196805012005012001',
  'Dr. Karlisa Priandana S.T., M.Eng - 198511212012122002',
  'Dr. Mushthofa S.Kom., M.Sc - 198203252009121003',
  'Dr. Shelvie Nidya Neyman S.Kom., M.Si - 197702062005012002',
  'Dr. Sony Hartono Wijaya S.Kom., M.Kom - 198108092008121002',
  'Dr. Toto Haryanto S.Kom., M.Si - 198211172014041001',
  'Dr. Yani Nurhadryani S.Si., M.T - 197404041998022001',
  'Endang Purnama Giri S.Kom., M.Kom - 198210102006041027',
  'Firman Ardiansyah S.Kom., M.Si - 197905222005011003',
  'Hafidlotul Fatimah Ahmad S.Kom., M.Kom. - 199708122024062001',
  'Hari Agung Adrianto S.Kom., M.Si., Ph.D - 197609172005011001',
  'Ir. Julio Adisantoso M.Kom - 196207141986011002',
  'Irman Hermadi S.Kom., M.S., Ph.D - 197503112006041009',
  'Lailan Sahrina Hasibuan S.Kom., M.Kom - 198702262019032013',
  'Mayanda Mega Santoni S.Kom., M.Kom. - 1371086505900001',
  'Medria Kusuma Dewi Hardhienata S.Komp., Ph.D - 198608222020122001',
  'Muhamad Asyhar Agmalaro S.Si., M.Kom - 198603312012121001',
  'Prof. Dr. Eng. Wisnu Ananta Kusuma S.T., M.T - 197111102005011005',
  'Prof. Dr. Imas Sukaesih Sitanggang S.Si., M.Kom - 197501301998022001',
  'Prof. Dr. Ir. Agus Buono M.Si., M.Kom - 196607021993021001',
  'Prof. Dr. Yeni Herdiyeni S.Si., M.Kom - 197509232000122001',
  'Rina Trisminingsih, S.Kom., M.T., Ph.D. - 198810282015042001',
];

export const dummyTickets = [
  {
    id: '#765379',
    topik: 'Pengajuan Surat Sakit',
    subject: 'Permohonan Surat Sakit Kuliah',
    deskripsi:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.',
    tanggal: '12/04/2026, 10:30',
    status: 'Selesai',
    mahasiswa: 'Hannan Azhari Batubara',
    files: [
      { name: 'Surat_Keterangan_Sakit.pdf', size: '245 KB' },
      { name: 'Bukti_Medis.pdf', size: '512 KB' },
    ],
    komentar: [
      {
        nama: 'Dr. Cokorda Wildan Batubara',
        tanggal: '13/04/2026, 19:15',
        isi: 'SYUDUDU',
      },
    ],
  },
  {
    id: '#787845',
    topik: 'Pengajuan Bimbingan',
    subject: 'Permohonan Jadwal Bimbingan Skripsi',
    deskripsi:
      'Saya ingin mengajukan permohonan jadwal bimbingan skripsi untuk bulan April 2026. Mohon konfirmasi ketersediaan waktu Bapak/Ibu.',
    tanggal: '24/03/2026, 14:15',
    status: 'Ditolak',
    mahasiswa: 'Wildan Hatami',
    files: [
      { name: 'Proposal_Skripsi.pdf', size: '1.2 MB' },
    ],
    komentar: [
      {
        nama: 'Dr. Budi Santoso',
        tanggal: '25/03/2026, 09:00',
        isi: 'Maaf, jadwal saya penuh untuk bulan April. Silakan ajukan ulang untuk bulan Mei.',
      },
    ],
  },
  {
    id: '#769340',
    topik: 'Pengajuan Surat PKL',
    subject: 'Permohonan Surat Pengantar PKL',
    deskripsi:
      'Saya membutuhkan surat pengantar PKL untuk perusahaan PT. Teknologi Nusantara. Rencana PKL mulai tanggal 1 Juni 2026.',
    tanggal: '28/01/2026, 09:20',
    status: 'Ditolak',
    mahasiswa: 'Cokorda Gede Satria W',
    files: [
      { name: 'Surat_Pengantar_PKL.pdf', size: '340 KB' },
      { name: 'Surat_Perjanjian_Perusahaan.pdf', size: '450 KB' },
    ],
    komentar: [],
  },
  {
    id: '#741200',
    topik: 'Surat Izin Akademik',
    subject: 'Permohonan Izin Tidak Masuk Kuliah',
    deskripsi: 'Saya ingin mengajukan izin tidak masuk kuliah selama 3 hari karena acara keluarga.',
    tanggal: '15/04/2026, 08:00',
    status: 'Menunggu',
    mahasiswa: 'Cokorda Gede Satria W',
    files: [
      { name: 'Surat_Izin.pdf', size: '180 KB' },
    ],
    komentar: [],
  },
];

export const statsData = {
  total: 124,
  menunggu: 39,
  disetujui: 81,
  ditolak: 52,
  selesai: 98,
};
