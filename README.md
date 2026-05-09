# IPB Logicore Help Center

Aplikasi Help Center untuk kebutuhan pengajuan dan pengelolaan tiket di lingkungan IPB Logicore. Repository ini terdiri dari dua bagian utama:

- `Backend` untuk API FastAPI.
- `Frontend` untuk antarmuka pengguna berbasis React + Vite.

## Fitur

- Autentikasi pengguna.
- Routing berdasarkan role Mahasiswa dan Dosen.
- Pengajuan tiket dan pemantauan status.
- Dashboard terproteksi.
- Komponen UI reusable di frontend.

## Struktur Proyek

```bash
.
├── Backend/
│   ├── app/
│   ├── requirements.txt
│   └── tests/
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
└── README.md
```

## Menjalankan Backend

Masuk ke folder backend, lalu install dependency dan jalankan server:

```bash
cd Backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend default tersedia di:

- `http://127.0.0.1:8000`

Endpoint utama yang dipakai frontend berada di bawah prefix:

- `/api/v1/auth`
- `/api/v1/tickets`

## Menjalankan Frontend

Masuk ke folder frontend, lalu install dependency dan jalankan Vite:

```bash
cd Frontend
npm install
npm run dev
```

Frontend default tersedia di:

- `http://127.0.0.1:5173`

Pastikan file `.env` di folder `Frontend` berisi:

```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

## Catatan Pengembangan

- Backend menggunakan FastAPI dan CORS sudah diaktifkan untuk `localhost:5173`.
- Token login disimpan di `localStorage` oleh frontend.
- Dokumentasi frontend yang lebih lengkap ada di [Frontend/README.md](Frontend/README.md).
