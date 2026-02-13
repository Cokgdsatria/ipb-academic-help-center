coba coba

# 📚 IPB Academic Help Center - Frontend Structure

## 📁 Struktur Folder

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Common/           # Komponen yang dapat digunakan kembali
│   │   │   ├── Navbar.tsx    # Navigation dengan role-based menu
│   │   │   ├── Alert.tsx     # Alert/notification component
│   │   │   └── LoadingSpinner.tsx
│   │   │
│   │   └── Pages/            # Halaman aplikasi
│   │       ├── LoginPage.tsx          # 🔐 Login dengan 3 role
│   │       ├── DashboardPage.tsx      # 📊 Dashboard (role-based)
│   │       ├── RequestFormPage.tsx    # 📝 Form pengajuan (CREATE/UPDATE)
│   │       └── RequestListPage.tsx    # 📋 List pengajuan (READ/DELETE)
│   │
│   ├── hooks/                # Custom React Hooks
│   │   ├── useAuth.ts        # Authentication hook
│   │   ├── useServiceRequest.ts # Service request management
│   │   └── useNotification.ts   # Notification management
│   │
│   ├── services/             # API/Mock services
│   │   ├── authService.ts           # Login, logout, token management
│   │   ├── serviceRequestService.ts # CRUD untuk pengajuan
│   │   └── notificationService.ts   # Notification management
│   │
│   ├── types/                # TypeScript interfaces
│   │   └── index.ts          # Semua type definitions
│   │
│   ├── utils/                # Helper functions
│   │   ├── constants.ts      # Constants & mock data
│   │   ├── validators.ts     # Form validation
│   │   └── helpers.ts        # Utility functions
│   │
│   ├── App.tsx               # Root component dengan routing
│   └── index.tsx             # Entry point
│
└── package.json              # Dependencies
```

## 🔐 Fitur Login (3 Role)

### Role dan Akses:

1. **Mahasiswa** 👨‍🎓
   - Akses: Buat pengajuan, lihat status, lihat layanan
   - Fitur: Create, Read, Update (pending), Delete (pending)
   - Dashboard: Statistik pengajuan personal

2. **Admin** ⚙️
   - Akses: Kelola semua pengajuan, kelola layanan, kelola pengguna
   - Fitur: Full CRUD untuk semua fitur
   - Dashboard: Statistik keseluruhan sistem

3. **Dosen** 👨‍🏫
   - Akses: Lihat pengajuan, memberikan feedback/komentar
   - Fitur: Read, Update (dengan komentar)
   - Dashboard: Statistik pengajuan

### Credentials Demo:

```
Mahasiswa:
Email: mahasiswa@ipb.ac.id
Password: password123

Admin:
Email: admin@ipb.ac.id
Password: admin123

Dosen:
Email: dosen@ipb.ac.id
Password: dosen123
```

## 📝 CRUD Operations

### Service Request Management

#### CREATE - Buat Pengajuan Baru

```typescript
// Hook: useServiceRequest()
const { createRequest } = useServiceRequest();

await createRequest({
  userId: user.id,
  serviceId: "1",
  serviceName: "Surat Aktif Kuliah",
  title: "Permohonan Surat Aktif",
  description: "...",
  category: "surat-aktif",
  status: "pending",
  priority: "high",
});
```

**Akses**: Mahasiswa only
**Status** yang valid: pending → processing → approved/rejected → completed

#### READ - Ambil Data Pengajuan

```typescript
// Ambil pengajuan user
fetchUserRequests(userId, page);

// Ambil semua pengajuan (admin/dosen)
fetchAllRequests(page, status);

// Ambil detail satu pengajuan
fetchRequestById(requestId);
```

**Akses**: Mahasiswa (own), Admin/Dosen (all)

#### UPDATE - Edit/Update Pengajuan

```typescript
// Edit data pengajuan (mahasiswa, hanya jika pending)
updateRequest(requestId, {
  title: "Judul baru",
  description: "Deskripsi baru",
});

// Update status (admin/dosen only)
updateRequestStatus(requestId, "processing", notes);
```

**Akses**:

- Edit: Mahasiswa (only if status = pending)
- Status: Admin/Dosen only

#### DELETE - Hapus Pengajuan

```typescript
deleteRequest(requestId);
```

**Akses**: Mahasiswa (only if status = pending)

## 🎨 Tailwind CSS Styling

Semua komponen menggunakan Tailwind CSS dengan palet warna:

- **Primary**: Blue (Login, buttons, aktif)
- **Success**: Green (Approved, completed)
- **Warning**: Yellow/Amber (Pending, warning messages)
- **Danger**: Red (Rejected, error)
- **Info**: Purple/Gray (Processing, info)

Status warna mapping:

```
pending    → Yellow
processing → Blue
approved   → Green
rejected   → Red
completed  → Emerald
```

## 🪝 Custom Hooks

### useAuth

```typescript
const { user, isAuthenticated, isLoading, error, login, logout } = useAuth();

// Login dengan role
const success = await login(email, password, "mahasiswa");

// Logout
logout();
```

### useServiceRequest

```typescript
const {
  requests,
  isLoading,
  error,
  fetchUserRequests,
  createRequest,
  updateRequest,
  deleteRequest,
} = useServiceRequest();
```

### useNotification

```typescript
const {
  notifications,
  unreadCount,
  fetchNotifications,
  markAsRead,
  deleteNotification,
} = useNotification();
```

## 🔄 Data Flow

```
LoginPage
  ↓
useAuth (login) → authService.login()
  ↓
DashboardPage (role-based content)
  ↓
Navigation Items
  ↓
RequestListPage
  ↓ (CREATE)
RequestFormPage → useServiceRequest → serviceRequestService
  ↓ (UPDATE)
RequestDetailPage → updateRequest/updateRequestStatus
  ↓ (DELETE)
deleteRequest
```

## 🧪 Mock Data

Data mock disimpan di `/utils/constants.ts`:

- `MOCK_USERS`: 3 user untuk login
- `MOCK_SERVICES`: Daftar layanan akademik
- `STATUS_CONFIG`: Konfigurasi status dengan warna
- `PRIORITY_CONFIG`: Konfigurasi prioritas

Setiap service mock API ada delay untuk simulasi network request.

## 🚀 Fitur yang Sudah Implementasi

✅ Login dengan 3 role (Mahasiswa, Admin, Dosen)
✅ Dashboard role-based dengan statistik
✅ Navbar dengan navigasi dynamic
✅ Form pengajuan (CREATE) - Mahasiswa
✅ List pengajuan (READ) dengan filter status
✅ Edit pengajuan (UPDATE) - Mahasiswa (pending only)
✅ Delete pengajuan (DELETE) - Mahasiswa (pending only)
✅ Update status - Admin/Dosen
✅ Responsive design (mobile-friendly)
✅ TypeScript type safety
✅ Custom hooks untuk state management
✅ Error handling & validation
✅ Loading states
✅ Success/Error notifications

## 📦 Dependencies (untuk nanti install)

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x.x",
  "tailwindcss": "^3.x.x",
  "typescript": "^5.x.x"
}
```

## 🎯 Langkah Berikutnya

1. Install dependencies
2. Setup React Router dengan routing
3. Buat halaman detail Request Card
4. Buat halaman Services List
5. Integrate dengan real API
6. Add file upload untuk attachments
7. Add pagination untuk list
8. Add search & advanced filter
9. Add notification system real-time
10. Add user management halaman

## 📝 Catatan

- Semua data dimulai dari mock service di `/utils/constants.ts`
- Ketika integrate dengan real API, hanya perlu update service files
- Components tetap bisa digunakan tanpa perubahan
- TypeScript membantu catch errors saat development
- Tailwind CSS memudahkan styling tanpa custom CSS files

---

**Dibuat untuk**: ADS Project - Semester 6
**Tujuan**: Menyediakan sistem informasi layanan akademik yang modular dan kolaboratif
