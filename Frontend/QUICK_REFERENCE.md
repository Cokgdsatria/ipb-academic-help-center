# ⚡ QUICK REFERENCE - Developer Cheatsheet

Quick guide untuk developer yang ingin langsung mulai development.

---

## 🚀 Quick Start (5 menit)

```bash
# 1. Clone & setup
git clone <repo-url>
cd Frontend
npm install

# 2. Copy env
cp .env.example .env.local

# 3. Start dev server
npm start

# 4. Open browser
# http://localhost:3000

# 5. Login dengan:
# Email: mahasiswa@ipb.ac.id
# Password: password123
```

---

## 📂 File Structure Quick Lookup

**Tambah halaman baru?** → `src/components/Pages/NewPage.tsx`  
**Tambah component reusable?** → `src/components/Common/NewComponent.tsx`  
**Tambah custom hook?** → `src/hooks/useNewHook.ts`  
**Tambah service?** → `src/services/newService.ts`  
**Tambah type?** → Edit `src/types/index.ts`  
**Tambah constant/mock?** → Edit `src/utils/constants.ts`  
**Global style?** → Edit `src/index.css`

---

## 🔐 Common Code Snippets

### Create New Page Component

```typescript
// src/components/Pages/NewPage.tsx
import React from 'react';
import type { User } from '../../types';

interface NewPageProps {
  user: User | null;
}

const NewPage: React.FC<NewPageProps> = ({ user }) => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-gray-900'>Page Title</h1>
      {/* Page content */}
    </div>
  );
};

export default NewPage;
```

### Use Custom Hook

```typescript
import useServiceRequest from "../../hooks/useServiceRequest";

const MyComponent = () => {
  const { requests, isLoading, error, fetchUserRequests } = useServiceRequest();

  // Use hook methods...
};
```

### Form Input with Validation

```typescript
const [field, setField] = useState("");
const [error, setError] = useState("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setField(e.target.value);
  setError(""); // Clear error on change
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validate
  if (!field.trim()) {
    setError("Field is required");
    return;
  }

  // Submit
  try {
    // ... logic ...
  } catch (err) {
    setError("Error message");
  }
};
```

### Handle Status with Config

```typescript
import { STATUS_CONFIG } from '../../utils/constants';

const status = 'pending';
const config = STATUS_CONFIG[status];

// Use in JSX:
<span className={`px-3 py-1 rounded ${config.color}`}>
  {config.label}
</span>
```

### Protected Route

```typescript
// In App.tsx
<Route
  path='/admin-only'
  element={
    <ProtectedRoute
      isAuthenticated={isAuthenticated}
      userRole={user?.role}
      allowedRoles={['admin']}
    >
      <AdminPage user={user} />
    </ProtectedRoute>
  }
/>
```

---

## 🎨 Tailwind CSS Common Patterns

### Responsive Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>
```

### Card Component

```jsx
<div className="bg-white rounded-lg shadow p-6 border border-gray-200">
  {/* Content */}
</div>
```

### Button Styles

```jsx
// Primary button
<button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition'>

// Secondary button
<button className='px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition'>

// Disabled state
<button disabled className='opacity-50 cursor-not-allowed'>
```

### Loading State

```jsx
{isLoading ? (
  <LoadingSpinner text='Loading...' />
) : (
  // Content
)}
```

### Error Alert

```jsx
{
  error && <Alert type="error" message={error} autoClose={false} />;
}
```

### Status Badge

```jsx
const statusColor = STATUS_CONFIG[request.status].color;
<span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
  {STATUS_CONFIG[request.status].label}
</span>;
```

---

## 🔄 CRUD Quick Reference

### CREATE

```typescript
const { createRequest } = useServiceRequest();

await createRequest({
  userId: user.id,
  serviceId: "1",
  serviceName: "Service Name",
  title: "Title",
  description: "Description",
  category: "surat-aktif",
  status: "pending",
  priority: "high",
});
```

### READ

```typescript
const { requests, fetchUserRequests, fetchRequestById } = useServiceRequest();

// Get user's requests
await fetchUserRequests(userId, page);

// Get specific request
const request = await fetchRequestById(requestId);
```

### UPDATE

```typescript
const { updateRequest } = useServiceRequest();

await updateRequest(requestId, {
  title: "New Title",
  description: "New Description",
});
```

### DELETE

```typescript
const { deleteRequest } = useServiceRequest();

await deleteRequest(requestId);
```

### UPDATE STATUS (Admin/Dosen)

```typescript
const { updateRequestStatus } = useServiceRequest();

await updateRequestStatus(
  requestId,
  "approved", // new status
  "Good request", // notes
  adminId, // approved by
);
```

---

## 🪝 Hooks Quick Reference

### useAuth

```typescript
const { user, isAuthenticated, isLoading, error, login, logout, clearError } =
  useAuth();

// Login
const success = await login(email, password, "mahasiswa");

// Logout
logout();

// Get user
console.log(user?.name, user?.role);
```

### useServiceRequest

```typescript
const {
  requests,
  isLoading,
  error,
  totalPages,
  currentPage,
  fetchUserRequests,
  fetchAllRequests,
  fetchRequestById,
  createRequest,
  updateRequest,
  updateRequestStatus,
  deleteRequest,
  getStatistics,
  clearError,
} = useServiceRequest();
```

### useNotification

```typescript
const {
  notifications,
  unreadCount,
  isLoading,
  error,
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  deleteNotification,
  clearError,
} = useNotification();
```

---

## 🧪 Testing Common Scenarios

### Test Login

1. Go to `/login`
2. Select "Mahasiswa"
3. Click "Masuk"
4. Should redirect to `/dashboard`

### Test Create Request (Mahasiswa)

1. Login as Mahasiswa
2. Go to `/requests/new`
3. Fill form & submit
4. Should appear in `/requests` list

### Test Update Status (Admin)

1. Login as Admin
2. Go to `/requests`
3. Click "Update Status"
4. Change status & submit
5. Request status should update

### Test Delete (Mahasiswa)

1. Login as Mahasiswa
2. Create new request (status = pending)
3. Click "Hapus"
4. Confirm delete
5. Request should disappear

---

## 🐛 Debugging Tips

### TypeScript Errors

```bash
# Check all errors
npx tsc --noEmit

# Fix specific file
# Check terminal for line numbers and fix
```

### React Errors

- Open browser console (F12)
- Look for red error messages
- Check stack trace
- Search error in codebase

### Mock Data Issues

- Check `src/utils/constants.ts`
- Verify mock data structure matches types
- Check service implementation

### Performance Issues

- Use React DevTools Profiler
- Check for unnecessary re-renders
- Look for console warnings

---

## 📝 Common Tasks

### Add New Status Type

1. Edit `src/types/index.ts`

   ```typescript
   export type RequestStatus = "..." | "new-status";
   ```

2. Add to `src/utils/constants.ts`

   ```typescript
   status_name: {
     label: 'Display Name',
     color: 'bg-color-100 text-color-800',
     bgColor: 'bg-color-50',
   },
   ```

3. Use in component
   ```typescript
   import { STATUS_CONFIG } from "../../utils/constants";
   const config = STATUS_CONFIG["status_name"];
   ```

### Add New Service

1. Add to `MOCK_SERVICES` in `src/utils/constants.ts`

   ```typescript
   {
     id: '5',
     name: 'New Service',
     description: 'Description',
     category: 'category-name',
     processingTime: '3-5 hari kerja',
     requiredDocuments: ['Doc 1', 'Doc 2'],
     isAvailable: true,
   }
   ```

2. Use in RequestFormPage component

### Add New Navigation Item

1. Edit `src/utils/constants.ts` in `NAV_ITEMS`

   ```typescript
   {
     label: 'New Page',
     href: '/new-page',
     icon: 'icon-name'
   }
   ```

2. Add route in `src/App.tsx`

   ```typescript
   <Route path='/new-page' element={<NewPage user={user} />} />
   ```

3. Create component in `src/components/Pages/NewPage.tsx`

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No console logs/debuggers
- [ ] `.env.local` configured correctly
- [ ] Update API URLs to production
- [ ] Remove mock data (switch to real API)
- [ ] Update version in `package.json`
- [ ] Create build: `npm run build`
- [ ] Test build locally: `serve -s build`

---

## 📚 Further Reading

**Documentation Files:**

- `SETUP.md` - Detailed setup guide
- `PROJECT_SUMMARY.md` - Full project overview
- `README_STRUCTURE.md` - Structure documentation
- `CONTRIBUTION.md` - Collaboration guide

**External Resources:**

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/docs)

---

## 💬 Need Help?

1. Check the documentation files
2. Search in codebase (Ctrl+Shift+F)
3. Check TypeScript errors
4. Ask team members
5. Create GitHub issue

---

**Last Updated**: February 2025  
**Version**: 1.0.0  
**Status**: Production Ready
