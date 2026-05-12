# IPB Logicore Help Center

Aplikasi Help Center berbasis web untuk pengelolaan pengajuan tiket akademik di lingkungan IPB Logicore. Mahasiswa dapat mengajukan berbagai jenis permohonan yang kemudian diproses dan divalidasi oleh Dosen.

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi](#teknologi)
- [Struktur Proyek](#struktur-proyek)
- [Database & Model](#database--model)
- [API Endpoint](#api-endpoint)
- [Menjalankan Proyek](#menjalankan-proyek)
- [Konfigurasi Environment](#konfigurasi-environment)

---

## Fitur Utama

### Mahasiswa
- Login dengan email dan password
- Dashboard dengan statistik tiket (Total, Menunggu, Selesai, Ditolak)
- Buat tiket pengajuan baru dengan 3 kategori topik
- Lampirkan file pendukung (Base64) pada pengajuan Bimbingan
- Pantau riwayat dan status tiket secara real-time
- Lihat detail tiket beserta komentar balasan dari Dosen

### Dosen
- Login dan akses dashboard khusus Dosen
- Lihat semua pengajuan yang ditujukan kepadanya
- Filter pengajuan berdasarkan status (Semua / Menunggu / Ditolak / Selesai)
- Update status pengajuan: **Selesai** atau **Ditolak**
- Tambahkan komentar/catatan saat memperbarui status

### Umum
- Autentikasi berbasis JWT (Bearer Token)
- Routing terproteksi berdasarkan role (`MAHASISWA` / `DOSEN`)
- Transisi halaman animasi (Framer Motion)
- UI responsif untuk desktop dan mobile

---

## Teknologi

### Backend
| Teknologi | Keterangan |
|---|---|
| **FastAPI** | Framework web Python, REST API |
| **SQLAlchemy** | ORM untuk manajemen database |
| **PostgreSQL (Supabase)** | Database produksi cloud |
| **python-jose** | Pembuatan dan verifikasi JWT |
| **passlib + bcrypt** | Hashing password |
| **Uvicorn** | ASGI server |

### Frontend
| Teknologi | Keterangan |
|---|---|
| **React 18 + Vite** | Framework UI dan build tool |
| **React Router v6** | Client-side routing |
| **Framer Motion** | Animasi dan transisi halaman |
| **Tailwind CSS v3** | Utility-first styling |
| **Axios** | HTTP client untuk konsumsi API |
| **Lucide React** | Library ikon |

---

## Struktur Proyek

```
IPB_Logicore_Help_Center/
├── Backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── deps.py              # Dependency: get_current_user
│   │   │       └── endpoints/
│   │   │           ├── auth.py          # Endpoint login & forgot password
│   │   │           └── ticket.py        # Endpoint CRUD tiket
│   │   ├── core/
│   │   │   ├── config.py               # Konfigurasi env (SECRET_KEY, DATABASE_URL)
│   │   │   ├── database.py             # Koneksi SQLAlchemy ke Supabase
│   │   │   └── security.py             # JWT encode/decode, password hashing
│   │   ├── models/
│   │   │   ├── user.py                 # Model: User, Mahasiswa, Dosen
│   │   │   ├── pengajuan.py            # Model: Pengajuan, Komentar, JenisPengajuan
│   │   │   └── notifikasi.py           # Model: Notifikasi
│   │   ├── repositories/
│   │   │   └── ticket.py               # Query logic untuk tiket & statistik
│   │   ├── schemas/
│   │   │   ├── auth.py                 # Schema: LoginRequest, TokenResponse
│   │   │   └── ticket.py               # Schema: TicketCreate, TicketResponse, dll.
│   │   ├── services/
│   │   │   └── auth_service.py         # Business logic autentikasi
│   │   └── main.py                     # Entry point FastAPI + CORS middleware
│   ├── requirements.txt
│   └── .env
│
├── Frontend/
│   ├── public/
│   │   └── bg-login.jpg                # Background gambar halaman login
│   ├── src/
│   │   ├── components/
│   │   │   ├── Badge.jsx               # Komponen badge status tiket
│   │   │   ├── Button.jsx              # Komponen button reusable
│   │   │   ├── IPBLogo.jsx             # Logo IPB SVG
│   │   │   ├── ModalDetailPengajuan.jsx # Modal detail tiket (Dosen)
│   │   │   ├── ModalUpdateStatus.jsx   # Modal update status + komentar (Dosen)
│   │   │   ├── Navbar.jsx              # Navbar responsif dengan hamburger menu
│   │   │   └── PageTransition.jsx      # Wrapper animasi transisi halaman
│   │   ├── context/
│   │   │   └── AuthContext.jsx         # Context: login, logout, user state
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx           # Halaman login (split layout)
│   │   │   ├── BerandaMahasiswa.jsx    # Dashboard Mahasiswa
│   │   │   ├── BerandaDosen.jsx        # Dashboard Dosen
│   │   │   ├── TiketPage.jsx           # Daftar riwayat tiket Mahasiswa
│   │   │   ├── BukaTiketBaru.jsx       # Form pengajuan tiket baru
│   │   │   ├── DetailTiket.jsx         # Detail tiket Mahasiswa
│   │   │   └── PengajuanDosen.jsx      # Daftar & kelola pengajuan Dosen
│   │   ├── services/
│   │   │   └── ticketService.ts        # Semua pemanggilan API (Axios)
│   │   ├── App.jsx                     # Router utama + AnimatePresence
│   │   ├── main.jsx                    # Entry point React
│   │   └── index.css                   # Global styles
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## Database & Model

Database menggunakan **PostgreSQL** yang di-host di **Supabase**. Tabel dibuat otomatis oleh SQLAlchemy saat server pertama kali dijalankan.

### Tabel Utama

| Tabel | Deskripsi |
|---|---|
| `users` | Data dasar semua pengguna (email, password hash, role) |
| `mahasiswa` | Data spesifik mahasiswa (NIM, program studi) |
| `dosen` | Data spesifik dosen (NIDN, jabatan) |
| `pengajuan` | Data tiket/pengajuan yang dibuat mahasiswa |
| `komentar` | Catatan balasan dosen terhadap suatu pengajuan |
| `notifikasi` | Notifikasi sistem |

### Relasi Model

```
User (polymorphic)
  ├── Mahasiswa (role=MAHASISWA) ──→ daftar_pengajuan ──→ Pengajuan
  └── Dosen    (role=DOSEN)     ──→ tugas_validasi   ──→ Pengajuan
                                                           └── Komentar (1-to-1)
```

### Status Tiket

| Status (DB) | Tampilan UI |
|---|---|
| `PENDING` | Menunggu |
| `RESOLVED` | Selesai |
| `REJECTED` | Ditolak |

### Kategori Topik Pengajuan

| ID | Nama |
|---|---|
| `1` | Pengajuan Surat |
| `2` | Pengajuan Bimbingan |
| `3` | Pengajuan Akademik |

> ⚠️ Topik **Pengajuan Bimbingan** (ID 2) mewajibkan field `tanggal_bimbingan` diisi.

---

## API Endpoint

Base URL: `http://127.0.0.1:8000`

> Semua endpoint selain login membutuhkan header: `Authorization: Bearer <token>`

### Authentication — `/api/v1/auth`

| Method | Endpoint | Deskripsi | Auth |
|---|---|---|---|
| `POST` | `/login` | Login dan dapatkan JWT token | ❌ |
| `POST` | `/forgot-password` | Kirim instruksi reset password | ❌ |

**Body Login:**
```json
{
  "email": "mahasiswa@ipb.ac.id",
  "password": "password123"
}
```

**Response Login:**
```json
{
  "access_token": "<jwt_token>",
  "token_type": "bearer",
  "role": "MAHASISWA",
  "nama": "Nama Pengguna"
}
```

---

### Tickets — `/api/v1/tickets`

| Method | Endpoint | Deskripsi | Role |
|---|---|---|---|
| `GET` | `/types` | Daftar kategori pengajuan | Semua |
| `GET` | `/lecturers` | Daftar dosen yang tersedia | Semua |
| `POST` | `/` | Buat tiket pengajuan baru | Mahasiswa |
| `GET` | `/stats` | Statistik dashboard | Semua |
| `GET` | `/my-tickets` | Riwayat tiket (sesuai role) | Semua |
| `GET` | `/{ticket_id}` | Detail tiket berdasarkan ID | Semua |
| `PATCH` | `/{ticket_id}/status` | Update status tiket | Dosen |

**Body Buat Tiket:**
```json
{
  "judul": "Permohonan Surat Keterangan",
  "deskripsi": "Deskripsi pengajuan...",
  "id_jenis_pengajuan": 1,
  "id_dosen": 5,
  "tanggal_bimbingan": null,
  "file_name": null,
  "file_data": null
}
```

**Body Update Status:**
```json
{
  "status": "RESOLVED",
  "komentar_dosen": "Pengajuan telah disetujui."
}
```

---

## Menjalankan Proyek

### 1. Backend

```bash
cd Backend

# Aktifkan virtual environment
.\venv\Scripts\activate        # Windows
# source venv/bin/activate     # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Jalankan server
uvicorn app.main:app --reload
```

Backend tersedia di: **`http://127.0.0.1:8000`**

Dokumentasi API interaktif (Swagger UI): **`http://127.0.0.1:8000/docs`**

---

### 2. Frontend

```bash
cd Frontend

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Frontend tersedia di: **`http://localhost:5173`**

---

## Konfigurasi Environment

### Backend — `Backend/.env`

```env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
SECRET_KEY=<random_secret_key_min_32_chars>
PORT=8000
```

### Frontend — `Frontend/.env`

```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

---

## Catatan Teknis

- **CORS** dikonfigurasi di `main.py` untuk mengizinkan origin `localhost:5173` dan `127.0.0.1:5173`.
- **JWT Token** disimpan di `localStorage` browser oleh frontend dan dikirim via header `Authorization: Bearer`.
- **Password** di-hash menggunakan `bcrypt` melalui library `passlib`.
- **File lampiran** dikirim dalam format **Base64** di dalam body JSON (field `file_data`).
- **Transisi halaman** menggunakan `Framer Motion` (`AnimatePresence` + `PageTransition` wrapper).
- **Role check** dilakukan di sisi backend (guard per endpoint) maupun frontend (protected route + redirect).

---

> © 2026 IPB University — Sekolah Sains Data, Matematika, dan Informatika — Ilmu Komputer
