# 🏗️ ARCHITECTURE OVERVIEW - IPB Academic Help Center

Dokumentasi lengkap tentang arsitektur sistem dan aliran data aplikasi.

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React + TypeScript)               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                      PAGES (UI)                            │   │
│  ├────────────────────────────────────────────────────────────┤   │
│  │ LoginPage       │ DashboardPage   │ RequestFormPage        │   │
│  │ RequestListPage │ (Add more...)   │                        │   │
│  └────────────────────────────────────────────────────────────┘   │
│                            ↓                                       │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │              COMMON COMPONENTS                             │   │
│  ├────────────────────────────────────────────────────────────┤   │
│  │ Navbar (Navigation)    │ Alert (Messages)                 │   │
│  │ LoadingSpinner         │ (Add more...)                    │   │
│  └────────────────────────────────────────────────────────────┘   │
│                            ↓                                       │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │              CUSTOM HOOKS (State Management)               │   │
│  ├────────────────────────────────────────────────────────────┤   │
│  │ useAuth()              │ useServiceRequest()              │   │
│  │ useNotification()      │                                  │   │
│  └────────────────────────────────────────────────────────────┘   │
│                            ↓                                       │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │           SERVICES (API/Mock Layer)                        │   │
│  ├────────────────────────────────────────────────────────────┤   │
│  │ authService       │ serviceRequestService               │   │
│  │ notificationService  │ (Ready for real API)              │   │
│  └────────────────────────────────────────────────────────────┘   │
│                            ↓                                       │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │            TYPES & UTILITIES                               │   │
│  ├────────────────────────────────────────────────────────────┤   │
│  │ types/index.ts     │ utils/constants.ts                  │   │
│  │ utils/validators.ts│ utils/helpers.ts                    │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                            ↓
        ┌───────────────────────────────────────┐
        │    MOCK DATA (Development)            │
        ├───────────────────────────────────────┤
        │  localStorage (Session Storage)       │
        │  mockRequests[]                       │
        │  mockUsers[]                          │
        │  mockNotifications[]                  │
        └───────────────────────────────────────┘

                            ↓ (Future)
        ┌───────────────────────────────────────┐
        │    REAL BACKEND API (Future)          │
        ├───────────────────────────────────────┤
        │  Express / Django / etc.              │
        │  Database (PostgreSQL / MongoDB)      │
        │  JWT Authentication                   │
        └───────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

### Authentication Flow

```
User
  ↓
LoginPage (Role Selection)
  ↓ (submit)
useAuth.login()
  ↓
authService.login()
  ↓
Validate credentials vs MOCK_USERS
  ↓
If valid:
  → Save to localStorage
  → Create auth token
  → Return User object
If invalid:
  → Return error message
  ↓
useAuth state update
  ↓
Navigate to /dashboard
  ↓
Display role-based dashboard
```

### Request CRUD Flow

```
Mahasiswa → RequestFormPage
  ↓ (fill form)
  ↓ (submit)
useServiceRequest.createRequest()
  ↓
serviceRequestService.createRequest()
  ↓
Save to mockRequests[]
  ↓
Update hook state
  ↓
Navigate to /requests
  ↓
RequestListPage (display new request)
```

### Status Update Flow (Admin/Dosen)

```
RequestListPage
  ↓ (click "Update Status")
Modal appears
  ↓ (select status + notes)
useServiceRequest.updateRequestStatus()
  ↓
serviceRequestService.updateRequestStatus()
  ↓
Find request in mockRequests[]
  ↓
Update status & add notes
  ↓
Return updated request
  ↓
useServiceRequest state update
  ↓
RequestListPage refresh with new status
```

---

## 🌳 Component Hierarchy

```
App
├── Router
│   ├── Route: /login → LoginPage
│   ├── Route: /dashboard → DashboardPage
│   ├── Route: /requests → RequestListPage
│   ├── Route: /requests/new → RequestFormPage
│   ├── Route: /requests/:id/edit → RequestFormPage
│   └── Route: /* → 404
│
├── Navbar (conditional)
│   ├── Brand/Logo
│   ├── Navigation Items (dynamic per role)
│   ├── Notification Bell
│   └── User Menu
│       ├── Profile Link
│       ├── Settings Link
│       └── Logout Button
│
├── Pages (conditional rendering)
│   ├── LoginPage
│   │   ├── Role Selection
│   │   └── Credentials Form
│   ├── DashboardPage
│   │   ├── Stat Cards
│   │   ├── Quick Actions
│   │   └── Info Box
│   ├── RequestFormPage
│   │   ├── Service Selection
│   │   ├── Form Inputs
│   │   └── Submit Buttons
│   └── RequestListPage
│       ├── Filter Tabs
│       ├── Request Cards
│       └── Update Modal
│
└── Common Components (reusable)
    ├── Alert
    ├── LoadingSpinner
    └── (More to add...)
```

---

## 🔐 Role-Based Access Control

```
┌─────────────┬──────────────────┬──────────────────┬────────────────┐
│ Feature     │ Mahasiswa        │ Admin            │ Dosen          │
├─────────────┼──────────────────┼──────────────────┼────────────────┤
│ Login       │ ✅ (mhs role)    │ ✅ (admin role)  │ ✅ (dosen role)│
│ Dashboard   │ ✅ Personal      │ ✅ System-wide   │ ✅ System-wide │
│ View Svcs   │ ✅              │ ✅              │ ✅              │
│ Create Req  │ ✅              │ ❌              │ ❌              │
│ View Own    │ ✅              │ ✅ All          │ ✅ All          │
│ Edit (pend) │ ✅ Own pending  │ ❌              │ ❌              │
│ Delete (pd) │ ✅ Own pending  │ ❌              │ ❌              │
│ Update St.  │ ❌              │ ✅              │ ✅              │
│ Manage Svc  │ ❌              │ ✅              │ ❌              │
│ Manage User │ ❌              │ ✅              │ ❌              │
└─────────────┴──────────────────┴──────────────────┴────────────────┘
```

---

## 📦 Module Dependencies

```
App.tsx
├── React Router
├── useAuth hook
│   └── authService
│       └── MOCK_USERS (constants)
│
├── LoginPage
│   └── authService
│
├── DashboardPage
│   └── useServiceRequest hook
│       └── serviceRequestService
│           └── mockRequests (constants)
│
├── RequestFormPage
│   ├── useServiceRequest hook
│   ├── MOCK_SERVICES (constants)
│   └── validators (utils)
│
├── RequestListPage
│   ├── useServiceRequest hook
│   ├── STATUS_CONFIG (constants)
│   ├── PRIORITY_CONFIG (constants)
│   └── formatDate (helpers)
│
├── Navbar
│   ├── NAV_ITEMS (constants)
│   ├── getInitials (helpers)
│   └── useNotification hook
│
└── Common Components
    ├── Alert
    ├── LoadingSpinner
    └── (more...)
```

---

## 🔌 Interface/Type Integration

```
User Interface
    ↓ extends
Role: 'mahasiswa' | 'admin' | 'dosen'
    ↓
useAuth hook → User
    ↓
All Pages/Components receive User prop
    ↓
Conditional rendering based on role

ServiceRequest Interface
    ↓ includes
ServiceCategory, RequestStatus, priority
    ↓
useServiceRequest hook → ServiceRequest[]
    ↓
RequestListPage displays & filters
    ↓
STATUS_CONFIG maps status to display

AcademicService Interface
    ↓
MOCK_SERVICES constant
    ↓
RequestFormPage uses for dropdown
    ↓
New request includes service ref
```

---

## 🔄 State Management Pattern

### Context-like Pattern (without Context)

```
useAuth Hook
├── Internal State: user, isAuthenticated, isLoading, error
├── Methods: login, logout, clearError
└── localStorage persistence for session

useServiceRequest Hook
├── Internal State: requests, isLoading, error, pagination
├── Methods: CRUD operations
└── Mock service calls with delay

useNotification Hook
├── Internal State: notifications, unreadCount
├── Methods: Read/unread operations
└── Auto-fetch on user change
```

### Props Drilling (Current)

```
App passes:
  user → All pages & components
  auth functions → As needed

Each component:
  Receives user prop
  Uses appropriate hooks
  Manages local state for UI

Future: Could use Context API for global state
```

---

## 🧪 Request Lifecycle

### Create Request Lifecycle

```
1. User clicks "Ajukan Baru"
   └→ Navigate to /requests/new

2. User fills form
   ├─ Service selection (dropdown)
   ├─ Title input
   ├─ Description textarea
   └─ Priority selection

3. Form validation
   ├─ Service required
   ├─ Title not empty
   ├─ Description min 10 chars
   └─ Display errors if invalid

4. Submit form
   └→ createRequest() called

5. useServiceRequest calls:
   └→ serviceRequestService.createRequest()

6. Service creates new request:
   ├─ Add to mockRequests[]
   ├─ Assign unique ID
   └─ Set status: 'pending'

7. Hook updates state:
   └→ requests: [..., newRequest]

8. NavigateRedirect to /requests
   └→ New request visible in list
```

### Update Status Lifecycle

```
1. Admin/Dosen clicks "Update Status"
   └→ Modal opens

2. Select new status & add notes
   └→ Local modal state updates

3. Click "Simpan"
   └→ updateRequestStatus() called

4. Hook calls:
   └→ serviceRequestService.updateRequestStatus()

5. Service updates:
   ├─ Find request in mockRequests[]
   ├─ Update status
   ├─ Add notes
   ├─ Update timestamp
   └─ Return updated request

6. Hook updates state:
   └→ Update request in requests[]

7. RequestListPage refetches:
   └→ Component re-renders with new status
```

---

## 📡 Service Call Pattern

```typescript
// Example pattern used in all services:

async functionName(...args) {
  // 1. Simulate network delay
  await sleep(500-1000);

  // 2. Validate input
  if (!valid) {
    return {
      success: false,
      message: 'Error message',
      errors: ['Details']
    };
  }

  // 3. Simulate CRUD operation
  // (modify mock data)
  mockData.push(newItem);

  // 4. Return response
  return {
    success: true,
    data: result,
    message: 'Success message'
  };
}
```

---

## 🎯 Frontend vs Backend Separation

### Current (Frontend Only - Mock)

```
Frontend
├── Services (mock)
│   ├── authService (mock login)
│   ├── serviceRequestService (mock CRUD)
│   └── notificationService (mock notifications)
├── Mock Data
│   ├── mockRequests[]
│   ├── mockUsers[]
│   └── mockNotifications[]
└── localStorage (temp session)
```

### After Backend Integration

```
Frontend                          Backend
├── Services (real API)     ←→   API Endpoints
│   ├── authService        ←→   POST /auth/login
│   ├── serviceRequestService ←→ GET/POST/PUT/DELETE /requests
│   └── notificationService ←→   GET /notifications
│
├── Utils (validation)           Database
│   └── Client-side validation    ├── Users table
│                                ├── Requests table
localStorage ←→ Token            └── Notifications table
(temporary)    JWT (session)
```

---

## 🚀 Deployment Architecture

### Development Environment

```
Local Machine
├── npm start (http://localhost:3000)
├── React DevTools
├── Console debugging
└── Hot reload
```

### Production Environment

```blewe
┌─────────────────────────────────────────┐
│         CDN / Web Server                │
│  (Serves built React app)               │
├─────────────────────────────────────────┤
│                                         │
│  index.html                             │
│  └─ JavaScript bundles (minified)      │
│  └─ CSS (minified)                     │
│  └─ Assets                             │
│                                         │
└─────────────────────────────────────────┘
           ↓ API calls
┌─────────────────────────────────────────┐
│          Backend Server                 │
│  (Express / Django / etc)               │
├─────────────────────────────────────────┤
│                                         │
│  REST API endpoints                    │
│  ├─ /api/auth/login                   │
│  ├─ /api/requests                     │
│  └─ /api/notifications                │
│                                         │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│         Database                        │
│  (PostgreSQL / MongoDB)                 │
└─────────────────────────────────────────┘
```

---

## 🔄 Update Path for Backend Integration

### Step 1: Create API Service Layer

```typescript
// src/services/api.ts
const API_URL = process.env.REACT_APP_API_URL;

export const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
```

### Step 2: Update Services to Use Real API

```typescript
// Instead of:
async createRequest(request) {
  await sleep(800);
  mockRequests.push(newRequest);
  return { success: true, data: newRequest };
}

// Change to:
async createRequest(request) {
  const response = await apiCall('/requests', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return response;
}
```

### Step 3: No Component Changes

```typescript
// Components stay the same!
// They don't know about mock vs real API

const { createRequest, isLoading, error } = useServiceRequest();

// This continues to work
await createRequest(formData);
```

---

## 📊 Performance Considerations

### Current Optimizations

- ✅ Code splitting (via React Router)
- ✅ Lazy loading pages
- ✅ useCallback for memoization
- ✅ Conditional rendering
- ✅ Mock data updates only affected components

### Future Optimizations

- [ ] React.lazy() for components
- [ ] Image/asset optimization
- [ ] API response caching
- [ ] Pagination for large lists
- [ ] Search debouncing
- [ ] Virtual scrolling for long lists

---

## 🔐 Security Considerations

### Current (Development)

- ✅ Input validation
- ✅ XSS prevention (sanitizing)
- ✅ No secrets in code
- ✅ .env.local in .gitignore

### After Backend Integration

- [ ] JWT tokens
- [ ] HTTPS only
- [ ] CORS configuration
- [ ] Rate limiting
- [ ] SQL injection prevention
- [ ] CSRF protection
- [ ] Password hashing
- [ ] Secure session management

---

## 📈 Scalability Path

```
Current (Mock Data)
└→ Single developer friendly
   Works on local machine
   No backend needed

↓

Phase 2 (Simple Backend)
└→ Small team (2-3 people)
   Single backend server
   Single database

↓

Phase 3 (Microservices)
└→ Medium team (5-10 people)
   Multiple services
   Load balancing
   Database replication

↓

Phase 4 (Enterprise Scale)
└→ Large team (10+ people)
   Cloud infrastructure
   Auto-scaling
   CDN
   Real-time features
```

---

## 📚 Architecture Resources

- Component composition: React Docs
- Type safety: TypeScript Handbook
- Styling: Tailwind CSS Docs
- Routing: React Router Docs
- State management: React Hooks Docs

---

**This architecture is designed for:**

- ✅ Easy to understand
- ✅ Easy to extend
- ✅ Easy to test
- ✅ Easy to deploy
- ✅ Team collaboration

---

**Last Updated**: February 2025  
**Version**: 1.0.0
