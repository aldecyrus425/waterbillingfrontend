# Project Folder Structure

Enterprise-level folder structure for the Water Billing Frontend application.

```
src/
├── components/              # React components (organized by type)
│   ├── common/             # Reusable, presentational components (Button, Card, etc.)
│   ├── forms/              # Form-related components (LoginForm, BillingForm, etc.)
│   └── layouts/            # Layout wrapper components (MainLayout, DashboardLayout, etc.)
│
├── pages/                  # Top-level page/route components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   └── ...
│
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts
│   ├── useFetch.ts
│   └── ...
│
├── services/               # Business logic and API calls
│   ├── api/               # API service for HTTP requests
│   │   └── index.ts
│   ├── auth/              # Authentication service
│   │   └── index.ts
│   └── ...
│
├── store/                 # State management (Redux, Zustand, etc.)
│   ├── slices/           # Redux slices or store modules
│   │   ├── authSlice.ts
│   │   ├── billingSlice.ts
│   │   └── ...
│   └── index.ts
│
├── types/                 # TypeScript type definitions and interfaces
│   ├── index.ts          # Export all types here
│   ├── auth.ts
│   ├── billing.ts
│   └── ...
│
├── utils/                 # Utility functions
│   ├── index.ts          # Export all utilities here
│   ├── formatters.ts
│   ├── validators.ts
│   └── ...
│
├── constants/             # Application-wide constants
│   └── index.ts
│
├── config/                # Configuration files
│   └── index.ts
│
├── assets/                # Static files
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── styles/                # Global styles (minimal with Tailwind)
│   └── index.css
│
├── __tests__/             # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── ...
│
├── __mocks__/             # Mock data and mock functions for testing
│
├── App.tsx               # Root component
├── main.tsx              # Application entry point
└── index.css             # Global styles with Tailwind
```

## Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `UserCard.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAuth.ts`, `useFetch.ts`)
- **Utils/Services**: camelCase (e.g., `formatters.ts`, `apiService.ts`)
- **Types**: PascalCase (e.g., `User.ts`, `BillingData.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

## Best Practices

1. **Keep components focused** - Each component should have a single responsibility
2. **Export barrel files** - Use `index.ts` files to export commonly used items
3. **Centralize API calls** - Use the `services/api` directory for all HTTP requests
4. **Type everything** - Use TypeScript types in the `types/` directory
5. **Use utilities** - Extract common logic into reusable utility functions
6. **Organize by feature** - As the app grows, consider organizing by feature/domain
7. **Test regularly** - Use `__tests__` directory for unit and integration tests
