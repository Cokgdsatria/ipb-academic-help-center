# IPB Academic Help Center - Frontend Setup Guide

## 📋 Prerequisites

Sebelum memulai, pastikan Anda memiliki:

- Node.js v16+ ([Download](https://nodejs.org/))
- npm atau yarn package manager
- Git

Cek versi:

```bash
node --version
npm --version
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd Frontend
npm install
```

Atau jika menggunakan yarn:

```bash
yarn install
```

### 2. Setup Environment Variables

Copy `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` sesuai kebutuhan (biasanya sudah OK untuk development).

### 3. Start Development Server

```bash
npm start
```

Aplikasi akan terbuka otomatis di `http://localhost:3000`

## 🔐 Login Test

Silakan coba login dengan credentials berikut:

### Mahasiswa

- Email: `mahasiswa@ipb.ac.id`
- Password: `password123`
- Akses: Buat pengajuan, lihat status, lihat layanan

### Admin

- Email: `admin@ipb.ac.id`
- Password: `admin123`
- Akses: Kelola semua pengajuan, layanan, pengguna

### Dosen

- Email: `dosen@ipb.ac.id`
- Password: `dosen123`
- Akses: Lihat pengajuan, memberikan feedback

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Common/        # Reusable components
│   │   └── Pages/         # Page components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API/Mock services
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Utilities & constants
│   ├── App.tsx            # Root component
│   ├── index.tsx          # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🎯 Quick Start Features

### 1. Login

- Buka aplikasi
- Pilih peran (Mahasiswa, Admin, Dosen)
- Klik "Masuk" (kredensial sudah diisi)

### 2. Dashboard

- Lihat statistik pengajuan
- Akses cepat ke fitur utama

### 3. Buat Pengajuan (Mahasiswa)

- Menu: Pengajuan Saya → Ajukan Baru
- Isi form dengan detail
- Submit

### 4. Lihat Status

- Menu: Pengajuan Saya
- Filter berdasarkan status
- Lihat detail pengajuan

### 5. Update Status (Admin/Dosen)

- Menu: Pengajuan
- Klik "Update Status"
- Ubah status dan tambahkan catatan

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Build untuk production
npm run build

# Run tests
npm test

# Eject configuration (HATI-HATI: tidak reversable)
npm run eject
```

## 🎨 Styling

Aplikasi menggunakan **Tailwind CSS** untuk styling.

### Modifying Styles

Edit file di folder `src` langsung, Tailwind akan process otomatis.

Untuk custom configuration, edit `tailwind.config.js`

## 🔧 Environment Setup

### Development

Semua sudah tersedia dengan mock data di `src/utils/constants.ts`

### Production

Untuk production, update `.env.local`:

```env
REACT_APP_API_URL=https://api.production.com
REACT_APP_ENV=production
```

## 🐛 Troubleshooting

### Port 3000 sudah terpakai

```bash
# Gunakan port lain
PORT=3001 npm start
```

### Dependencies error

```bash
# Clear cache dan reinstall
rm -rf node_modules
npm install
```

### Build error dengan TypeScript

```bash
# Cek type errors
npx tsc --noEmit
```

## 📚 Struktur File Penting

### Authentication

- `src/hooks/useAuth.ts` - Auth hook
- `src/services/authService.ts` - Auth logic
- `src/components/Pages/LoginPage.tsx` - Login UI

### CRUD Operations

- `src/hooks/useServiceRequest.ts` - State management
- `src/services/serviceRequestService.ts` - Mock API
- `src/components/Pages/RequestFormPage.tsx` - Create/Edit
- `src/components/Pages/RequestListPage.tsx` - Read/Delete

### Data Types

- `src/types/index.ts` - Semua TypeScript types

### Constants & Helpers

- `src/utils/constants.ts` - Mock data & constants
- `src/utils/validators.ts` - Form validation
- `src/utils/helpers.ts` - Utility functions

## 🚀 Next Steps

1. ✅ Setup selesai
2. ⏭️ Integrate dengan real backend API
3. ⏭️ Add database integration
4. ⏭️ Setup authentication dengan JWT
5. ⏭️ Add unit tests
6. ⏭️ Setup CI/CD pipeline

## 📞 Support

Jika ada masalah atau pertanyaan:

1. Cek README_STRUCTURE.md untuk dokumentasi struktur
2. Review kode di folder `src/`
3. Check console browser (F12) untuk error messages
4. Baca dokumentasi Tailwind CSS & React Router

## 📝 Notes

- Semua data di-store di localStorage (session based)
- Mock data reset setiap kali page reload
- Tidak ada persistence database untuk sekarang
- Semua request API punya 500ms-1s delay untuk simulasi

## ✨ Features Overview

✅ Authentication (3 roles)
✅ Dashboard dengan statistik
✅ CRUD pengajuan
✅ Role-based access control
✅ Responsive design
✅ TypeScript type safety
✅ Form validation
✅ Error handling
✅ Loading states
✅ Notification system

---

**Happy Coding!** 🎉

Untuk pertanyaan atau kontribusi, silakan update dokumentasi atau diskusi dengan team.
