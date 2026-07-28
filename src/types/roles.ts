// Role values and types for the application
export const UserRole = {
  ADMIN: "admin",
  CASHIER: "cashier",
  READER: "reader",
  CONSUMER: "consumer",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.ADMIN]: ["manage_users", "manage_bills", "view_reports", "system_settings"],
  [UserRole.CASHIER]: ["collect_payments", "view_bills", "print_receipts"],
  [UserRole.READER]: ["read_meters", "submit_readings"],
  [UserRole.CONSUMER]: ["view_bill", "view_payment_history", "submit_complaint"],
};

// Features accessible by each role
export const ROLE_FEATURES: Record<UserRole, string[]> = {
  [UserRole.ADMIN]: ["dashboard", "user_management", "billing", "reports", "settings"],
  [UserRole.CASHIER]: ["payment_collection", "billing", "receipts"],
  [UserRole.READER]: ["meter_reading", "readings_history"],
  [UserRole.CONSUMER]: ["bills", "payments", "profile", "complaints"],
};
