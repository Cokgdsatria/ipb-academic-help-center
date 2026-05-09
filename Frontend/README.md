# IPB Logicore Help Center - Frontend

Frontend aplikasi Help Center untuk IPB Logicore yang dibangun dengan React, Vite, Tailwind CSS, dan React Router. Aplikasi ini menyediakan alur login, pemisahan tampilan berdasarkan peran, serta fitur pengajuan dan pemantauan tiket.

## Fitur Utama

- Login pengguna melalui API backend.
- Routing berbasis peran untuk Mahasiswa dan Dosen.
- Dashboard terproteksi setelah login.
- Form buat tiket baru.
- Halaman daftar tiket dan detail tiket.
- Halaman pengajuan untuk dosen.
- Komponen UI reusable seperti button, badge, modal, navbar, dan logo.

## Tech Stack

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React

## Struktur Folder

```bash
Frontend/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Instalasi

### 1. Masuk ke folder frontend

```bash
cd Frontend
```

### 2. Install dependency

```bash
npm install
```

### 3. Siapkan environment variable

Buat file `.env` di folder `Frontend` jika belum ada, lalu isi:

```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

Pastikan backend sudah berjalan dan endpoint API bisa diakses dari alamat tersebut.

## Menjalankan Aplikasi

### Development mode

```bash
npm run dev
```

### Build production

```bash
npm run build
```

### Preview hasil build

```bash
npm run preview
```

## Alur Aplikasi

1. User login melalui halaman login.
2. Token disimpan di `localStorage` untuk request terproteksi.
3. Role user menentukan arah navigasi ke dashboard masing-masing.
4. Halaman tertentu hanya dapat diakses jika user sudah login dan sesuai role.

## Endpoint yang Digunakan

Frontend ini terhubung ke backend melalui endpoint berikut:

- `POST /auth/login` untuk autentikasi.
- `GET /tickets/types` untuk daftar jenis pengajuan.
- `GET /tickets/lecturers` untuk daftar dosen.
- `POST /tickets/` untuk membuat tiket baru.
- `GET /tickets/stats` untuk statistik dashboard.
- `GET /tickets/my-tickets` untuk riwayat tiket user.

## Catatan

- Pastikan backend sudah aktif sebelum membuka frontend.
- Jika port backend berbeda, ubah nilai `VITE_API_URL` di file `.env`.
- Beberapa halaman menggunakan data dari `localStorage`, jadi login ulang mungkin diperlukan setelah membersihkan browser storage.
