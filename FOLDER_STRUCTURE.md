# Updated Folder Structure with Role-Based Features

```
src/
├── components/              # Shared components (all roles)
│   ├── common/             # Reusable, presentational components (Button, Card, etc.)
│   ├── forms/              # Form-related components (LoginForm, BillingForm, etc.)
│   └── layouts/            # Layout wrapper components (MainLayout, DashboardLayout, etc.)
│
├── features/                # Role-based features (ORGANIZATION BY ROLE) ⭐
│   ├── admin/
│   │   ├── pages/          # AdminDashboard, UserManagement, Reports, etc.
│   │   ├── components/     # Admin-specific UI components
│   │   ├── hooks/          # useAdminStats, useUserManagement, etc.
│   │   ├── services/       # adminService, reportService, etc.
│   │   ├── types/          # Admin-specific TypeScript types
│   │   └── README.md
│   │
│   ├── cashier/
│   │   ├── pages/          # PaymentCollection, Billing, Receipt, etc.
│   │   ├── components/     # PaymentForm, BillViewer, etc.
│   │   ├── hooks/          # usePaymentCollection, useBillingData, etc.
│   │   ├── services/       # paymentService, billingService, etc.
│   │   ├── types/          # Cashier-specific types
│   │   └── README.md
│   │
│   ├── reader/
│   │   ├── pages/          # MeterReading, ReadingsHistory, etc.
│   │   ├── components/     # MeterReadingForm, ReadingsList, etc.
│   │   ├── hooks/          # useMeterReading, useReadingSubmission, etc.
│   │   ├── services/       # meterService, readingService, etc.
│   │   ├── types/          # Reader-specific types
│   │   └── README.md
│   │
│   └── consumer/
│       ├── pages/          # ConsumerDashboard, Bills, Profile, etc.
│       ├── components/     # BillCard, PaymentHistory, etc.
│       ├── hooks/          # useConsumerBills, usePaymentHistory, etc.
│       ├── services/       # consumerService, billService, etc.
│       ├── types/          # Consumer-specific types
│       └── README.md
│
├── contexts/                # Global context providers ⭐
│   └── AuthContext.tsx     # Authentication context for all roles
│
├── middleware/auth/         # Authentication middleware ⭐
│   └── ProtectedRoute.tsx  # Route protection by role
│
├── hooks/                  # Shared hooks (all roles)
│   ├── useAuth.ts
│   ├── useFetch.ts
│   └── ...
│
├── services/               # Shared services (all roles)
│   ├── api/               # API service for HTTP requests
│   ├── auth/              # Authentication service
│   └── ...
│
├── store/                 # State management (Redux, Zustand, etc.)
│   ├── slices/
│   └── index.ts
│
├── types/                 # Shared types
│   ├── roles.ts          # Role definitions & permissions ⭐
│   ├── auth.ts           # Auth-related types ⭐
│   └── ...
│
├── utils/                 # Utility functions
├── constants/             # Application-wide constants
├── config/                # Configuration files
├── assets/                # Static files
├── __tests__/             # Test files
└── __mocks__/             # Mock data
```

## 🎯 Key Concepts:

### 1. **Features by Role** (`/features/`)
Each role (Admin, Cashier, Reader, Consumer) has its own feature folder containing:
- **pages/** - Role-specific pages/routes
- **components/** - Role-specific UI components
- **hooks/** - Role-specific custom hooks
- **services/** - Role-specific API services
- **types/** - Role-specific TypeScript types

**Benefits:**
- Clean separation of concerns
- Easy to find role-specific code
- Simple to add/remove features for specific roles
- Reduced code complexity

### 2. **Authentication Context** (`/contexts/AuthContext.tsx`)
- Global authentication state accessible by all roles
- Manages user info, login/logout, permission checking
- Provides `useAuth()` hook for accessing auth data

### 3. **Protected Routes** (`/middleware/auth/ProtectedRoute.tsx`)
- Route component that checks authentication and role authorization
- Prevents unauthorized access before rendering
- Supports single or multiple role requirements

### 4. **Role Definitions** (`/types/roles.ts`)
- Centralized enum for all roles: ADMIN, CASHIER, READER, CONSUMER
- Permission mapping for each role
- Feature access mapping for each role

## 📝 Routing Example:

```tsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './middleware/auth/ProtectedRoute';
import { UserRole } from './types/roles';

// Pages
import LoginPage from './pages/LoginPage';
import AdminDashboard from './features/admin/pages/AdminDashboard';
import PaymentCollection from './features/cashier/pages/PaymentCollectionPage';
import MeterReading from './features/reader/pages/MeterReadingPage';
import ConsumerDashboard from './features/consumer/pages/ConsumerDashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute requiredRole={UserRole.ADMIN}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Cashier routes */}
          <Route 
            path="/cashier/*" 
            element={
              <ProtectedRoute requiredRole={UserRole.CASHIER}>
                <PaymentCollection />
              </ProtectedRoute>
            } 
          />
          
          {/* Reader routes */}
          <Route 
            path="/reader/*" 
            element={
              <ProtectedRoute requiredRole={UserRole.READER}>
                <MeterReading />
              </ProtectedRoute>
            } 
          />
          
          {/* Consumer routes */}
          <Route 
            path="/consumer/*" 
            element={
              <ProtectedRoute requiredRole={UserRole.CONSUMER}>
                <ConsumerDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

## 📝 Permission Checking Example:

```tsx
// In any component
import { useAuth } from './contexts/AuthContext';

function AdminPanel() {
  const { user, hasPermission } = useAuth();
  
  return (
    <div>
      {hasPermission('manage_users') && (
        <button>Manage Users</button>
      )}
      {hasPermission('manage_bills') && (
        <button>Manage Bills</button>
      )}
    </div>
  );
}
```

## Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `UserCard.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAuth.ts`, `useFetch.ts`)
- **Utils/Services**: camelCase (e.g., `formatters.ts`, `apiService.ts`)
- **Types**: PascalCase (e.g., `User.ts`, `BillingData.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Roles**: UPPER_CASE in enum (e.g., `UserRole.ADMIN`, `UserRole.CONSUMER`)

## ✅ Best Practices

1. **Feature Isolation** - Keep role-specific code in `/features/[role]/` folders
2. **Shared Resources** - Common components and utilities stay in root directories
3. **Type Safety** - Always define types for each role's data structures
4. **Permission Checking** - Use ProtectedRoute for page-level and component-level checks
5. **Code Reusability** - Extract common UI components to `/components/common/`
6. **Service Layer** - Centralize API calls in role-specific services
7. **Testing** - Test role-specific features in isolation
8. **Documentation** - Add README.md to each feature folder explaining its purpose

## 🚀 Next Steps for Implementation

1. Create role-specific pages (AdminDashboard, PaymentCollectionPage, etc.)
2. Build role-specific layouts (AdminLayout, CashierLayout, ConsumerLayout, etc.)
3. Implement authentication service with login/logout
4. Set up route-based code splitting for better performance
5. Create role-based navigation menus
6. Add permission-based component visibility
7. Implement API services for each role's needs
