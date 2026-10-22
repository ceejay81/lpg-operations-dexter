import { createContext, useContext, useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'

type IconName =
  | 'grid' | 'users' | 'user' | 'cylinder' | 'receive' | 'swap' | 'truck'
  | 'coins' | 'receipt' | 'check' | 'chart' | 'file' | 'settings' | 'search'
  | 'calendar' | 'bell' | 'chevron' | 'plus' | 'filter' | 'download' | 'close'
  | 'money' | 'clock' | 'location' | 'phone' | 'eye' | 'flame' | 'shield'

const iconPaths: Record<IconName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  cylinder: <><path d="M9 2h6v3H9zM8 5h8l2 3v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8z"/><path d="M9 9h6M9 18h6"/></>,
  receive: <><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 17v3h16v-3"/></>,
  swap: <><path d="M20 7H5l3-3M4 17h15l-3 3"/></>,
  truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>,
  coins: <><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/></>,
  receipt: <><path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h4"/></>,
  check: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m7 12 3 3 7-7"/></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
  file: <><path d="M6 2h9l4 4v16H6z"/><path d="M14 2v5h5M9 12h7M9 16h7"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V21h-4v-.08a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3v-4h.08a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3h4v.08a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21v4h-.08a1.7 1.7 0 0 0-1.55 1z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  plus: <path d="M12 5v14M5 12h14"/>,
  filter: <path d="M4 5h16l-6 7v6l-4 2v-8z"/>,
  download: <><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  money: <><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M7 9H6v1M17 15h1v-1"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2"/></>,
  phone: <path d="M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4c0 1-1 2-2 2A17 17 0 0 1 3 5c0-1 1-2 2-2z"/>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
  flame: <path d="M13 2c1 6-4 7-4 12 0 2 1 3 3 3-1-4 4-5 3-9 3 3 5 6 5 9a8 8 0 1 1-16 0c0-6 5-9 9-15z"/>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
}

export interface StationSettingsData {
  // 1. Refill Pricing & Logistics Fees
  refill11kg: string
  refill50kg: string
  refill2kg: string
  offBrandFee: string
  offBrandRequalFee: string
  requalTestingFee: string
  deliveryFee: string
  expressDeliveryFee: string
  morningFloat: string
  cashVarianceWarning: string

  // 2. Cylinder Deposit Liabilities & Escrow
  deposit11kg: string
  deposit50kg: string
  deposit2kg: string
  scrapPenalty: string
  valveReplacementFee: string

  // 3. Tax, Invoicing & VAT Parameters
  taxRegistration: string
  vatRate: string
  withholdingTaxRate: string
  statutoryDiscount: string
  invoicePrefix: string
  deliveryReceiptPrefix: string
  depositSlipPrefix: string
  expensePrefix: string
  birMinNumber: string
  birPtuNumber: string
  invoiceFooterNote: string

  // 4. Credit Terms, Aging & Float Days
  agingLockDays: string
  agingWarnDays: string
  maxFloatReturnDays: string
  commCreditGraceDays: string
  commCreditLimit: string
  retailCreditLimit: string
  defaultFloatLimit: string
  retailFloatLimit: string
  loyaltyExpiryDays: string

  // 5. Cylinder Safety & QC Tolerances (RA 11592)
  requalYears: string
  minNetWeight11kg: string
  maxNetWeight11kg: string
  minNetWeight50kg: string
  maxNetWeight50kg: string
  minNetWeight2kg: string
  maxNetWeight2kg: string
  scaleTolerance: string
  quarantineDays: string
  lowStockYardThreshold: string

  // 6. Station Identity, Permits & Security Credentials
  stationName: string
  brandName: string
  stationAddress: string
  stationOwner: string
  stationContact: string
  stationEmail: string
  stationTin: string
  doePermit: string
  doeSccNumber: string
  bfpFsicNumber: string
  lguPermitNumber: string
  depotHub: string
  supervisorPin: string
  closingPin: string
}

export const defaultStationSettings: StationSettingsData = {
  // 1. Refill Pricing & Logistics Fees
  refill11kg: '1040.00',
  refill50kg: '4750.00',
  refill2kg: '280.00',
  offBrandFee: '50.00',
  offBrandRequalFee: '150.00',
  requalTestingFee: '80.00',
  deliveryFee: '30.00',
  expressDeliveryFee: '60.00',
  morningFloat: '5000.00',
  cashVarianceWarning: '50.00',

  // 2. Cylinder Deposit Liabilities & Escrow
  deposit11kg: '1800.00',
  deposit50kg: '4500.00',
  deposit2kg: '950.00',
  scrapPenalty: '800.00',
  valveReplacementFee: '250.00',

  // 3. Tax, Invoicing & VAT Parameters
  taxRegistration: 'Non-VAT Registered',
  vatRate: '0.00',
  withholdingTaxRate: '1.00',
  statutoryDiscount: '5.00', // Senior Citizen / PWD statutory discount (RA 9994/RA 10754)
  invoicePrefix: 'INV-2026-',
  deliveryReceiptPrefix: 'DR-2026-',
  depositSlipPrefix: 'DS-2026-',
  expensePrefix: 'EXP-2026-',
  birMinNumber: 'MIN-2026-991204',
  birPtuNumber: 'PTU-FP-0812-2024',
  invoiceFooterNote: 'This official receipt is system-generated and valid under BIR RR regulations.',

  // 4. Credit Terms, Aging & Float Days
  agingLockDays: '30', // Automatic hard-lock threshold
  agingWarnDays: '15', // Early warning threshold
  maxFloatReturnDays: '14', // Cylinder shell return window
  commCreditGraceDays: '7',
  commCreditLimit: '50000.00',
  retailCreditLimit: '5000.00',
  defaultFloatLimit: '10',
  retailFloatLimit: '3',
  loyaltyExpiryDays: '365',

  // 5. Cylinder Safety & QC Tolerances (RA 11592)
  requalYears: '5', // 5-Year hydrostatic cycle
  minNetWeight11kg: '10.90',
  maxNetWeight11kg: '11.20',
  minNetWeight50kg: '49.70',
  maxNetWeight50kg: '50.30',
  minNetWeight2kg: '2.65',
  maxNetWeight2kg: '2.80',
  scaleTolerance: '0.15', // kg scale drift
  quarantineDays: '30',
  lowStockYardThreshold: '25',

  // 6. Station Identity, Permits & Security Credentials
  stationName: 'SEAGAS GenSan Distribution Hub',
  brandName: 'SEAGAS (SEAOIL LPG)',
  stationAddress: 'J. Catolico Ave., Brgy. Lagao, General Santos City',
  stationOwner: 'Dexter Mendoza',
  stationContact: '0917 882 1940 / (083) 552-8192',
  stationEmail: 'gensan.hub@seagas.ph',
  stationTin: '294-819-041-000 Non-VAT',
  doePermit: 'R12-DOE-LPG-0914',
  doeSccNumber: 'SCC-2024-R12-0481',
  bfpFsicNumber: 'FSIC-GS-2026-1049',
  lguPermitNumber: 'BP-GSC-2026-08192',
  depotHub: 'SEAOIL GenSan Bulk Terminal (Makar)',
  supervisorPin: 'OWNER1234',
  closingPin: '4829',
}

export const SettingsContext = createContext<{
  settings: StationSettingsData
  setSettings: React.Dispatch<React.SetStateAction<StationSettingsData>>
  updateSetting: (field: keyof StationSettingsData, val: string) => void
  saveSettings: (newSettings: StationSettingsData) => void
  resetSettings: () => void
}>({
  settings: defaultStationSettings,
  setSettings: () => {},
  updateSetting: () => {},
  saveSettings: () => {},
  resetSettings: () => {},
})

export function useStationSettings() {
  return useContext(SettingsContext)
}

function Icon({ name, size = 19 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>
}

interface NavSection {
  group: string
  items: { label: string; icon: IconName }[]
}

const navSections: NavSection[] = [
  {
    group: 'Operations',
    items: [
      { label: 'Dashboard', icon: 'grid' },
      { label: 'POS (Sales & Exchange)', icon: 'swap' },
      { label: 'Deliveries & Dispatch', icon: 'truck' },
      { label: 'Receiving & Stock In', icon: 'receive' },
    ],
  },
  {
    group: 'Assets & Stocks',
    items: [
      { label: 'Cylinder Fleet', icon: 'cylinder' },
      { label: 'Store Inventory', icon: 'file' },
    ],
  },
  {
    group: 'People & Accounts',
    items: [
      { label: 'Customers & Suki', icon: 'users' },
      { label: 'Staff & Riders', icon: 'user' },
    ],
  },
  {
    group: 'Finance & Control',
    items: [
      { label: 'AR & Risk Control', icon: 'bell' },
      { label: 'Expenses', icon: 'receipt' },
      { label: 'Daily Closing', icon: 'check' },
      { label: 'Reports & Audit', icon: 'chart' },
      { label: 'Settings', icon: 'settings' },
    ],
  },
]

const transactions = [
  ['08:24 AM', 'Maria Santos', 'Sale', 'SG-11-004521', '₱1,200', 'ST001'],
  ['09:15 AM', 'Juan Dela Cruz', 'Exchange', 'SG-11-003998', '₱600', 'ST002'],
  ['10:02 AM', 'ABC Restaurant', 'Delivery', 'SG-11-004617', '₱2,400', 'ST003'],
  ['11:37 AM', 'Ana Reyes', 'Sale', 'SG-11-004305', '₱1,200', 'ST001'],
  ['01:18 PM', 'LM Food House', 'Exchange', 'SG-11-004112', '₱600', 'ST002'],
]

const pageData: Record<string, { subtitle: string; columns: string[]; rows: string[][]; action: string }> = {
  Customers: { subtitle: 'Manage customer profiles and transaction relationships.', action: 'Add Customer', columns: ['Customer', 'Company Name','Contact', 'Address', 'Tax No.', 'Preferred Brand', 'Status'], rows: [
    ['Maria Santos', '0917 234 8891', 'J. Catolico St., Brgy. Lagao, GenSan', 'TIN-882-194', 'SEAGAS', 'Active'],
    ['Juan Dela Cruz', '0928 441 2098', 'P. Acharon Blvd., Brgy. Calumpang, GenSan', 'TIN-342-818', 'SEAGAS', 'Active'],
    ['ABC Restaurant', '0918 309 1204', 'National Highway, Brgy. Labangal, GenSan', 'TIN-119-822', 'SEAGAS', 'Business'],
    ['Ana Reyes', '0915 779 6214', 'Aparente St., Brgy. City Heights, GenSan', '—', 'SEAGAS', 'Active'],
    ['LM Food House', '0998 232 6180', 'Makar Junction, Brgy. Labangal, GenSan', 'TIN-441-512', 'SEAGAS', 'Business'],
  ]},
  Staff: { subtitle: 'Manage team details, roles, and system access.', action: 'Add Staff Member', columns: ['Staff Code', 'Full Name', 'Position', 'Contact', 'Date Started', 'Status'], rows: [
    ['ST001', 'Paolo Mendoza', 'Cashier', '0917 555 0101', 'Jan 12, 2024', 'Active'],
    ['ST002', 'Leah Villanueva', 'Office Administrator', '0917 555 0102', 'Mar 04, 2024', 'Active'],
    ['ST003', 'Mark Ramos', 'Delivery Driver', '0917 555 0103', 'Jun 18, 2025', 'Active'],
    ['ST004', 'Cris Bautista', 'Yard Custodian', '0917 555 0104', 'Sep 08, 2025', 'Active'],
    ['ST005', 'Nilo Cruz', 'Delivery Driver', '0917 555 0105', 'Nov 12, 2025', 'Active'],
    ['ST006', 'Ronald David', 'Delivery Driver', '0917 555 0106', 'Feb 03, 2026', 'Active'],
  ]},
  'Cylinder Inventory': { subtitle: 'Track every cylinder across locations and movements.', action: 'Register Cylinder', columns: ['Serial Number', 'Brand', 'Tare Weight', 'Status', 'Location', 'Linked Customer'], rows: [
    ['SG-11-004521', 'SEAGAS', '13.4 kg', 'With Customer', 'Brgy. Lagao Hub', 'Maria Santos'],
    ['SG-11-003998', 'SEAGAS', '12.8 kg', 'Empty', 'GenSan Main Yard', '—'],
    ['SG-11-004617', 'SEAGAS', '13.2 kg', 'On delivery', 'Delivery Multi-cab 03', 'ABC Restaurant'],
    ['SG-11-004305', 'SEAGAS', '12.9 kg', 'Full', 'GenSan Main Yard', '—'],
    ['SG-11-004112', 'SEAGAS', '13.1 kg', 'Damaged', 'Quarantine Bay (RA 11592)', '—'],
  ]},
  Deliveries: { subtitle: 'Assign, monitor, and complete customer deliveries.', action: 'New Delivery', columns: ['Delivery ID', 'Customer', 'Address', 'Cylinder', 'Driver', 'Status'], rows: [
    ['DEL-1018', 'ABC Restaurant', 'National Highway, Brgy. Labangal, GenSan', 'SG-11-004617', 'ST003 · Mark Ramos', 'In transit'],
    ['DEL-1019', 'Maria Santos', 'J. Catolico St., Brgy. Lagao, GenSan', 'SG-11-004722', 'ST005 · Nilo Cruz', 'Pending'],
    ['DEL-1020', 'LM Food House', 'Makar Junction, Brgy. Labangal, GenSan', 'SG-11-004811', 'Unassigned', 'Pending'],
    ['DEL-1017', 'Ana Reyes', 'Aparente St., Brgy. City Heights, GenSan', 'SG-11-004305', 'ST003 · Mark Ramos', 'Completed'],
  ]},
  Loans: { subtitle: 'Monitor cylinder loans, balances, and repayments.', action: 'Record Loan', columns: ['Loan ID', 'Customer', 'Principal', 'Outstanding', 'Interest Paid', 'Status'], rows: [
    ['LN-2026-041', 'ABC Restaurant', '₱80,000', '₱62,000', '₱1,250', 'Current'],
    ['LN-2026-038', 'LM Food House', '₱55,000', '₱42,000', '₱850', 'Current'],
    ['LN-2025-119', 'Juan Dela Cruz', '₱20,000', '₱16,000', '₱250', 'Due soon'],
  ]},
  Expenses: { subtitle: 'Record and categorize operational spending.', action: 'Record Expense', columns: ['Expense ID', 'Date', 'Category', 'Description', 'Amount', 'Staff Code'], rows: [
    ['EXP-0812', 'Oct 16, 2026', 'Fuel', 'Truck fuel refill', '₱1,500', 'ST001'],
    ['EXP-0811', 'Oct 16, 2026', 'Salaries', 'Driver cash allowance', '₱1,200', 'ST001'],
    ['EXP-0810', 'Oct 16, 2026', 'Utilities', 'Water bill', '₱480', 'ST002'],
    ['EXP-0809', 'Oct 16, 2026', 'Others', 'Office supplies', '₱500', 'ST002'],
  ]},
  'Audit Logs': { subtitle: 'Review permanent, read-only system activity records.', action: 'Export Logs', columns: ['Date', 'Time', 'Staff Code', 'Action Type', 'Details', 'Record'], rows: [
    ['Oct 16, 2026', '01:18 PM', 'ST002', 'Invoice created', 'LM Food House · ₱600', 'INV-2026-0315'],
    ['Oct 16, 2026', '11:42 AM', 'ST001', 'Expense recorded', 'Fuel · ₱1,500', 'EXP-0812'],
    ['Oct 16, 2026', '10:28 AM', 'ST003', 'Delivery completed', 'ABC Restaurant', 'DEL-1017'],
    ['Oct 16, 2026', '09:15 AM', 'ST002', 'Exchange transaction', 'Juan Dela Cruz', 'INV-2026-0314'],
  ]},
}

// --- AR & 30-DAY CREDIT RISK ENGINE ---
export interface CustomerRisk {
  name: string
  lendingTier: 'Full Deposit' | 'Mutual Agreement' | 'Partial Deposit'
  creditLimit: number
  currentBalance: number
  oldestInvoiceDays: number   // ≥30 → Hard Lock
  currentFloat: number        // > maxFloatLimit → Hard Lock
  maxFloatLimit: number
  overdueInvoices: { id: string; amount: string; daysOld: number }[]
}

export const customerRiskData: CustomerRisk[] = [
  {
    name: 'Maria Santos',
    lendingTier: 'Full Deposit',
    creditLimit: 2500,
    currentBalance: 0,
    oldestInvoiceDays: 5,
    currentFloat: 1,
    maxFloatLimit: 3,
    overdueInvoices: [],
  },
  {
    name: 'ABC Restaurant',
    lendingTier: 'Mutual Agreement',
    creditLimit: 80000,
    currentBalance: 62000,
    oldestInvoiceDays: 38,   // BREACH: >30 Days
    currentFloat: 8,
    maxFloatLimit: 10,
    overdueInvoices: [
      { id: 'INV-2026-0201', amount: '₱12,000', daysOld: 38 },
      { id: 'INV-2026-0188', amount: '₱8,500', daysOld: 42 },
    ],
  },
  {
    name: "Aling Nena",
    lendingTier: 'Partial Deposit',
    creditLimit: 5000,
    currentBalance: 4800,
    oldestInvoiceDays: 14,
    currentFloat: 2,
    maxFloatLimit: 4,
    overdueInvoices: [],
  },
  {
    name: 'LM Food House',
    lendingTier: 'Mutual Agreement',
    creditLimit: 60000,
    currentBalance: 42000,
    oldestInvoiceDays: 18,
    currentFloat: 12,        // BREACH: 12 > max limit of 10
    maxFloatLimit: 10,
    overdueInvoices: [],
  },
  {
    name: "Nanay Gloria Bakery",
    lendingTier: 'Partial Deposit',
    creditLimit: 30000,
    currentBalance: 18500,
    oldestInvoiceDays: 8,
    currentFloat: 4,
    maxFloatLimit: 6,
    overdueInvoices: [],
  },
]

export type LockReason = 'AGING' | 'FLOAT' | 'BOTH' | null

export function evaluateRisk(risk: CustomerRisk, customAgingThreshold: number = 30): {
  locked: boolean
  reason: LockReason
  agingBreach: boolean
  floatBreach: boolean
} {
  const agingBreach = risk.oldestInvoiceDays >= customAgingThreshold
  const floatBreach = risk.currentFloat > risk.maxFloatLimit
  const locked = agingBreach || floatBreach
  const reason: LockReason = agingBreach && floatBreach ? 'BOTH' : agingBreach ? 'AGING' : floatBreach ? 'FLOAT' : null
  return { locked, reason, agingBreach, floatBreach }
}

export const quarantinedFleetSerials = ['SG-11-002109', 'SG-11-007731', 'SG-11-004112']

export function checkQuarantineStatus(serial: string): { isQuarantined: boolean; reason: string } {
  const s = serial.trim().toUpperCase()
  if (
    quarantinedFleetSerials.some(q => s.includes(q)) ||
    s.includes('QUARANTINE') ||
    s.includes('EXPIRED') ||
    s.includes('DAMAGED')
  ) {
    return {
      isQuarantined: true,
      reason: 'This cylinder is locked in Quarantine (Expired 5-Year Safety Stamp or Damaged Shell). Illegal to sell or load under LPG Safety Law (RA 11592).',
    }
  }
  return { isQuarantined: false, reason: '' }
}

function Button({ children, variant = 'primary', icon, onClick, type = 'button' }: { children: ReactNode; variant?: 'primary'|'secondary'|'ghost'; icon?: IconName; onClick?: () => void; type?: 'button'|'submit' }) {
  return <button type={type} className={`btn btn-${variant}`} onClick={onClick}>{icon && <Icon name={icon} size={17}/>}<span>{children}</span></button>
}

function Badge({ children }: { children: ReactNode }) {
  const text = String(children).toLowerCase()
  const tone = text.includes('damaged') || text.includes('expired') || text.includes('non-compliant') || text.includes('overdue') || text.includes('leaking') ? 'danger' : text.includes('pending') || text.includes('due') || text.includes('transit') || text.includes('delivery') || text.includes('truck') ? 'warning' : text.includes('active') || text.includes('completed') || text.includes('current') || text.includes('full') || text.includes('valid') || text.includes('stock') || text.includes('suki') || text.includes('approved') || text.includes('exact') || text.includes('compliant') || text.includes('matched') || text.includes('balanced') ? 'success' : 'info'
  return <span className={`badge badge-${tone}`}>{children}</span>
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>
}

function CardTitle({ icon, title, subtitle, action }: { icon?: IconName; title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="card-heading"><div><div className="title-row">{icon && <span className="title-icon"><Icon name={icon} size={16}/></span>}<h2>{title}</h2></div>{subtitle && <p>{subtitle}</p>}</div>{action}</div>
}

function SearchField({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return <label className="search-field"><Icon name="search" size={17}/><input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}/></label>
}

function isRightAlignedColumn(colName: string): boolean {
  const c = colName.toLowerCase()
  return (
    c.includes('amount') ||
    c.includes('price') ||
    c.includes('cost') ||
    c.includes('balance') ||
    c.includes('limit') ||
    c.includes('weight') ||
    c.includes('quantity') ||
    c.includes('qty') ||
    c.includes('stock') ||
    c.includes('gross') ||
    c.includes('net') ||
    c.includes('margin') ||
    c.includes('action') ||
    c.includes('quick action') ||
    c.includes('status & action') ||
    c.includes('principal') ||
    c.includes('outstanding') ||
    c.includes('subtotal') ||
    c.includes('total') ||
    c.includes('paid')
  )
}

interface StatItem {
  label: string
  value: string
  sub?: string
  hint?: string
  status?: 'ok' | 'warning' | 'danger' | 'info' | 'neutral'
}

function StatStrip({ stats, items, className }: { stats?: StatItem[]; items?: StatItem[]; className?: string }) {
  const list = items || stats || []
  return (
    <div className={`stat-strip ${className || ''}`}>
      {list.map((s, i) => (
        <div key={s.label || i} className="stat-cell">
          <span className="stat-label">{s.label}</span>
          <strong className={`stat-value ${s.status ? `stat-${s.status}` : ''}`}>{s.value}</strong>
          {(s.hint || s.sub) && <small className="stat-hint">{s.hint || s.sub}</small>}
        </div>
      ))}
    </div>
  )
}

type StatusTone = 'ok' | 'warn' | 'danger' | 'info' | 'neutral'

function StatusChip({ tone = 'neutral', children }: { tone?: StatusTone; children: ReactNode }) {
  return (
    <span className="status-chip">
      <span className={`status-chip-dot ${tone}`} />
      <span className="status-chip-text">{children}</span>
    </span>
  )
}

function getStatusTone(status: string): StatusTone {
  const s = String(status).toLowerCase()
  if (s.includes('full') || s.includes('ready') || s.includes('valid') || s.includes('completed') || s.includes('delivered') || s.includes('active') || s.includes('balanced') || s.includes('paid') || s.includes('verified') || s.includes('passed') || s.includes('intact')) return 'ok'
  if (s.includes('customer') || s.includes('processing') || s.includes('open') || s.includes('info')) return 'info'
  if (s.includes('truck') || s.includes('transit') || s.includes('due') || s.includes('pending') || s.includes('draft') || s.includes('partial') || s.includes('warning')) return 'warn'
  if (s.includes('quarantine') || s.includes('defect') || s.includes('expired') || s.includes('illegal') || s.includes('overdue') || s.includes('breached') || s.includes('locked') || s.includes('damaged') || s.includes('danger')) return 'danger'
  return 'neutral'
}

function parseRequal(requal: string): { label: string; tone: StatusTone } {
  const r = requal.toLowerCase()
  if (r.includes('expired') || r.includes('illegal')) {
    return { label: 'Expired', tone: 'danger' }
  }
  if (r.includes('due soon') || r.includes('due oct')) {
    const match = requal.match(/[A-Za-z]{3}\s*\d{4}/)
    return { label: match ? `Due ${match[0]}` : 'Due Soon', tone: 'warn' }
  }
  const match = requal.match(/[A-Za-z]{3}\s*\d{4}/)
  return { label: match ? match[0] : 'Valid', tone: 'ok' }
}

interface CompositionSegment {
  label: string
  value: number
  color: string
}

function CompositionBar({ segments, title, subtitle }: { segments: CompositionSegment[]; title?: string; subtitle?: string }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  return (
    <div className="composition-panel">
      {(title || subtitle) && (
        <div className="composition-header">
          <div>
            {title && <span className="composition-title">{title}</span>}
            {subtitle && <p className="composition-subtitle">{subtitle}</p>}
          </div>
        </div>
      )}
      <div className="composition-bar" role="progressbar" aria-label="Asset distribution">
        {segments.map(s => (
          <div
            key={s.label}
            style={{ width: `${(s.value / total) * 100}%`, background: s.color }}
            title={`${s.label}: ${s.value.toLocaleString()} (${Math.round((s.value / total) * 100)}%)`}
          />
        ))}
      </div>
      <dl className="composition-legend">
        {segments.map(s => (
          <div key={s.label} className="legend-item">
            <span className="legend-dot" style={{ background: s.color }} />
            <dt className="legend-label">{s.label}</dt>
            <dd className="legend-count">{s.value.toLocaleString()}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function FleetCompositionBar() {
  const segments = [
    { label: 'Full Ready in Yard', value: 428, color: '#078a76' },
    { label: 'With Suki Customer', value: 290, color: '#1877c9' },
    { label: 'Empty Basyo in Yard', value: 163, color: '#5297cb' },
    { label: 'On Delivery Trucks', value: 78, color: '#c97818' },
    { label: 'Quarantine Bay (RA 11592)', value: 65, color: '#c64a50' },
  ]
  return (
    <div className="composition-panel">
      <div className="composition-header">
        <div>
          <span className="composition-title">Total Active Fleet: <strong>1,024 SEAGAS Cylinders</strong></span>
          <p className="composition-subtitle">Proportional physical asset distribution across GenSan operations</p>
        </div>
        <div className="composition-badges">
          <span className="composition-chip ok">428 Ready for Dispatch</span>
          <span className="composition-chip danger">65 Inspection Hold</span>
        </div>
      </div>
      <div className="composition-bar" role="progressbar" aria-label="Cylinder fleet distribution">
        {segments.map(s => (
          <div
            key={s.label}
            style={{ width: `${(s.value / 1024) * 100}%`, background: s.color }}
            title={`${s.label}: ${s.value} (${((s.value / 1024) * 100).toFixed(1)}%)`}
          />
        ))}
      </div>
      <dl className="composition-legend">
        {segments.map(s => (
          <div key={s.label} className="legend-item">
            <span className="legend-dot" style={{ background: s.color }} />
            <dt className="legend-label">{s.label}</dt>
            <dd className="legend-count">{s.value.toLocaleString()}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function CylinderRegisterTable({
  rows,
  onInspect,
}: {
  rows: string[][]
  onInspect: (row: string[]) => void
}) {
  return (
    <div className="ops-table-wrap">
      <table className="ops-table-fixed">
        <colgroup>
          <col style={{ width: '150px' }} />
          <col style={{ width: '170px' }} />
          <col style={{ width: '90px' }} />
          <col style={{ width: '150px' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '160px' }} />
          <col /> {/* flexible: custody */}
          <col style={{ width: '140px' }} />
          <col style={{ width: '88px' }} />
        </colgroup>
        <thead>
          <tr>
            <th className="text-left">Serial</th>
            <th className="text-left">Brand</th>
            <th className="text-right">Size (kg)</th>
            <th className="text-left">Valve</th>
            <th className="text-right">Tare (kg)</th>
            <th className="text-left">Status</th>
            <th className="text-left">Location / Carrier</th>
            <th className="text-left">Requal due</th>
            <th className="text-right"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((tank, idx) => {
            const serial = tank[0]
            const brand = tank[1]
            const sizeNum = parseFloat(tank[2]) || 11.0
            const valve = tank[3].replace(' Threaded', '').replace(' (Snap-On)', ' (SNP)')
            const tareNum = parseFloat(tank[4]) || 13.0
            const status = tank[5]
            const custody = tank[6]
            const requal = tank[7]

            const statusTone = getStatusTone(status)
            const requalParsed = parseRequal(requal)

            return (
              <tr key={serial || idx} onClick={() => onInspect(tank)} className="clickable">
                <td className="cell-mono cell-truncate">{serial}</td>
                <td className="cell-truncate" title={brand}>{brand}</td>
                <td className="text-right tabular-nums">{sizeNum.toFixed(1)}</td>
                <td className="cell-truncate">{valve}</td>
                <td className="text-right tabular-nums">{tareNum.toFixed(1)}</td>
                <td>
                  <StatusChip tone={statusTone}>{status}</StatusChip>
                </td>
                <td className="cell-truncate" title={custody}>{custody}</td>
                <td>
                  <StatusChip tone={requalParsed.tone}>{requalParsed.label}</StatusChip>
                </td>
                <td className="text-right">
                  <button
                    type="button"
                    className="ops-action-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      onInspect(tank)
                    }}
                    title="Inspect cylinder details"
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function DataTable({ columns, rows, onRowClick }: { columns: string[]; rows: string[][]; onRowClick?: (row: string[]) => void }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map(c => {
              const rightAlign = isRightAlignedColumn(c)
              return (
                <th key={c} style={{ textAlign: rightAlign ? 'right' : 'left' }}>
                  {c}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row[0]}-${i}`} onClick={() => onRowClick?.(row)} className={onRowClick ? 'clickable' : ''}>
              {row.map((cell, j) => {
                const rightAlign = isRightAlignedColumn(columns[j])
                const isNumeric = cell.startsWith('₱') || /^\d+(\.\d+)?%?$/.test(cell.trim()) || cell.endsWith('kg') || cell.endsWith('pcs')
                return (
                  <td
                    key={j}
                    style={{
                      textAlign: rightAlign ? 'right' : 'left',
                      fontVariantNumeric: isNumeric ? 'tabular-nums' : undefined,
                    }}
                  >
                    {j === 0 && columns[0] === 'Customer' ? (
                      <span className="customer-cell">
                        <span className="mini-avatar">{cell.split(' ').map(x => x[0]).slice(0, 2).join('')}</span>
                        {cell}
                      </span>
                    ) : columns[j].includes('Status') || columns[j].includes('Requal') ? (
                      <StatusChip tone={getStatusTone(cell)}>{cell}</StatusChip>
                    ) : columns[j] === 'Suki Badge' || columns[j] === 'Lending Tier' ? (
                      <Badge>{cell}</Badge>
                    ) : columns[j] === 'Movement Type' ? (
                      <span className={`movement-badge movement-${cell.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>{cell}</span>
                    ) : (
                      cell
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Sidebar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark"><Icon name="flame" size={27}/></div><div><strong>SEAGAS</strong><span>GenSan LPG Control</span></div></div>
    <nav aria-label="Primary navigation">
      {navSections.map(sec => (
        <div key={sec.group} className="nav-group">
          <div className="nav-group-label">{sec.group}</div>
          {sec.items.map(item => {
            const isActive =
              page === item.label ||
              (item.label === 'Cylinder Fleet' && (page === 'Cylinders & Tanks' || page === 'Daily Cylinder Movement Log' || page === 'Cylinders')) ||
              (item.label === 'Reports & Audit' && (page === 'Reports & Analytics' || page === 'Daily Stock Movement Report' || page === 'Audit Logs')) ||
              (item.label === 'POS (Sales & Exchange)' && page === 'Sales & Exchange') ||
              (item.label === 'Receiving & Stock In' && page === 'Receiving')
            return (
              <button
                key={item.label}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setPage(item.label)}
              >
                <Icon name={item.icon}/>
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      ))}
    </nav>
    <div className="sidebar-art"><div className="cylinder-art"><Icon name="cylinder" size={46}/></div><strong>SEAOIL SEAGAS</strong><span>GenSan Operation</span><i></i><small>Version 2.4.0</small></div>
  </aside>
}

function KpiCard({ icon, label, value, change, tone }: { icon: IconName; label: string; value: string; change: string; tone: string }) {
  return <Card className={`kpi kpi-${tone}`}><div className="kpi-icon"><Icon name={icon} size={25}/></div><div><span>{label}</span><strong>{value}</strong><small><b>▲ {change}</b> vs. {label === "Today's Sales" ? 'yesterday' : 'last week'}</small></div></Card>
}

function MovementChart() {
  const data = [[120,80,58],[78,48,38],[140,84,61],[100,76,53],[106,78,53],[105,79,59],[170,130,111]]
  return <Card className="movement-card"><CardTitle icon="chart" title="Cylinder Movement" subtitle="Received, Sold/Exchanged, and Delivered (Last 7 Days)" action={<div className="legend"><span className="teal">Received</span><span className="navy">Sold / Exchanged</span><span className="blue">Delivered</span></div>}/>
    <div className="bar-chart"><div className="y-labels"><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div><div className="plot">{[0,1,2,3,4].map(x => <i key={x}/>)}
      <div className="bar-groups">{data.map((values, i) => <div className="bar-group" key={i}><div className="bars">{values.map((v,j) => <b key={j} className={`bar bar-${j}`} style={{height: `${v / 2}px`}} title={`${v} cylinders`}/>)}</div><span>Oct {10+i}</span></div>)}</div>
    </div></div>
  </Card>
}

function InventoryStatus() {
  const statuses = [['Full','428','42%'],['Empty','163','16%'],['With Customer','290','28%'],['On Loan','78','8%'],['Damaged','42','4%'],['Scrapped','23','2%']]
  return <Card className="inventory-card"><CardTitle icon="cylinder" title="Inventory Status" action={<span className="card-total">Total: 1,024 Cylinders</span>}/><div className="inventory-content"><div className="donut"><div><strong>1,024</strong><span>Total</span></div></div><div className="status-list">{statuses.map((s,i) => <div key={s[0]}><i className={`dot dot-${i}`}/><span>{s[0]}</span><b>{s[1]}</b><small>{s[2]}</small></div>)}</div></div></Card>
}

const checklist = ['Count cash','Count full and empty cylinders','Match invoices against cash collected','Prepare short daily summary','Record closing staff code','Owner review']

function ClosingChecklist({ checked, toggle }: { checked: boolean[]; toggle: (i: number) => void }) {
  const complete = checked.filter(Boolean).length
  return <Card className="checklist-card"><CardTitle icon="check" title="Daily Closing Checklist" action={<span className="progress-count">{complete}/6</span>}/><div className="progress"><i style={{width: `${complete / 6 * 100}%`}}/></div><div className="check-list">{checklist.map((item,i) => <label key={item} className={checked[i] ? 'done' : ''}><input type="checkbox" checked={checked[i]} onChange={() => toggle(i)}/><span className="custom-check">{checked[i] && '✓'}</span>{item}</label>)}</div></Card>
}

function AuditActivity() {
  const entries = [['01:18 PM','Invoice created (INV-2026-0315)','by ST002 · LM Food House · ₱600'],['11:42 AM','Expense recorded','by ST001 · Fuel · ₱1,500'],['10:28 AM','Delivery completed','by ST003 · SG-11-004617 · ABC Restaurant'],['09:15 AM','Exchange transaction','by ST002 · SG-11-003998 · Juan Dela Cruz'],['08:24 AM','Invoice created (INV-2026-0314)','by ST001 · Maria Santos · ₱1,200']]
  return <Card className="audit-card"><CardTitle icon="file" title="Audit Activity" action={<Button variant="ghost">View All <span>→</span></Button>}/><div className="timeline">{entries.map((e,i) => <div className="timeline-row" key={e[0]}><i className={`timeline-dot dot-${i}`}/><time>{e[0]}</time><div><strong>{e[1]}</strong><span>{e[2]}</span></div></div>)}</div></Card>
}

// ---------------------------------------------------------------------------
// InvoiceData — covers all 21 invoice checklist items
// ---------------------------------------------------------------------------
interface InvoiceData {
  invoiceNo?: string          // 1. Invoice number / series
  date?: string               // 2. Date
  time?: string               // 2. Time
  // Seller identity — 3
  sellerName?: string
  sellerAddress?: string
  sellerTin?: string
  sellerVatStatus?: string
  // Customer identity — 4
  customerName?: string
  customerBiz?: string
  address?: string
  contact?: string
  tin?: string
  // Staff & delivery linkage — 17, 18
  staffCode?: string
  staffName?: string
  deliveryRef?: string
  driverName?: string
  // Payment — 13, 14
  paymentMethod?: string
  amountPaid?: number
  creditOutstanding?: number
  // Cylinder transaction — 15, 16
  serial?: string
  brand?: string
  netWeight?: string
  cylinderUnitPrice?: number
  depositFee?: number
  hasReturnedEmpty?: boolean
  returnedSerial?: string
  // Surcharges
  swapFee?: number
  // Accessories — 7, 8
  additionalItems?: { name: string; sku: string; qty: number; unitPrice: number }[]
  // Discount — 9
  discountLabel?: string
  discountAmount?: number
  // VAT classification — 10
  vatClassification?: 'vatable' | 'zero-rated' | 'exempt'
  // Status — 20
  status?: 'active' | 'voided' | 'corrected'
  voidReason?: string
  correctedRef?: string
}

function InvoiceModal({ data, onClose }: { data?: InvoiceData; onClose: () => void }) {
  const { settings } = useStationSettings()
  const [toast, setToast] = useState('')
  const [showVoidConfirm, setShowVoidConfirm] = useState(false)
  const [voided, setVoided] = useState(data?.status === 'voided')

  // ── Resolved invoice data with sensible demo defaults ──────────────────
  const inv: Required<Omit<InvoiceData, 'additionalItems'>> & { additionalItems: NonNullable<InvoiceData['additionalItems']> } = {
    invoiceNo:          data?.invoiceNo          || `${settings.invoicePrefix}0315`,
    date:               data?.date               || 'October 16, 2026',
    time:               data?.time               || '08:24 AM',
    sellerName:         data?.sellerName         || `${settings.stationName} (${settings.brandName})`,
    sellerAddress:      data?.sellerAddress      || settings.stationAddress,
    sellerTin:          data?.sellerTin          || settings.stationTin,
    sellerVatStatus:    data?.sellerVatStatus    || `${settings.taxRegistration} · BIR COR Active`,
    customerName:       data?.customerName       || 'Maria Santos',
    customerBiz:        data?.customerBiz        || '—',
    address:            data?.address            || 'J. Catolico St., Brgy. Lagao, GenSan',
    contact:            data?.contact            || '0917 234 8891',
    tin:                data?.tin                || 'TIN-882-194',
    staffCode:          data?.staffCode          || 'ST001',
    staffName:          data?.staffName          || 'Paolo Mendoza',
    deliveryRef:        data?.deliveryRef        || '—',
    driverName:         data?.driverName         || '—',
    paymentMethod:      data?.paymentMethod      || 'Cash',
    amountPaid:         data?.amountPaid         ?? (parseFloat(settings.refill11kg) || 1040),
    creditOutstanding:  data?.creditOutstanding  ?? 0,
    serial:             data?.serial             || 'SG-11-004521',
    brand:              data?.brand              || settings.brandName,
    netWeight:          data?.netWeight          || '11.0 kg',
    cylinderUnitPrice:  data?.cylinderUnitPrice  ?? (parseFloat(settings.refill11kg) || 1040),
    depositFee:         data?.depositFee         ?? 0,
    hasReturnedEmpty:   data?.hasReturnedEmpty   !== undefined ? data.hasReturnedEmpty : true,
    returnedSerial:     data?.returnedSerial     || 'SG-11-003871',
    swapFee:            data?.swapFee            ?? 0,
    additionalItems:    data?.additionalItems    || [],
    discountLabel:      data?.discountLabel      || '',
    discountAmount:     data?.discountAmount     ?? 0,
    vatClassification:  data?.vatClassification  || (settings.taxRegistration.includes('12% VAT') ? 'vatable' : 'exempt'),
    status:             data?.status             || 'active',
    voidReason:         data?.voidReason         || '',
    correctedRef:       data?.correctedRef       || '',
  }

  // ── Computation block ──────────────────────────────────────────────────
  const cylinderLine  = inv.cylinderUnitPrice + inv.swapFee
  const depositLine   = inv.depositFee
  const accsTotal     = inv.additionalItems.reduce((s, i) => s + i.unitPrice * i.qty, 0)
  const discountAmt   = inv.discountAmount
  const subtotal      = cylinderLine + depositLine + accsTotal - discountAmt
  // VAT — Driven dynamically by station settings & invoice classification
  const configuredVatRate = parseFloat(settings.vatRate) || 0
  const isVatable     = inv.vatClassification === 'vatable' || (settings.taxRegistration.includes('12% VAT') && inv.vatClassification !== 'exempt')
  const vatAmount     = isVatable && configuredVatRate > 0 ? (subtotal * configuredVatRate) / (100 + configuredVatRate) : 0
  const netOfVat      = isVatable ? subtotal - vatAmount : subtotal
  const totalDue      = subtotal   // inclusive amount
  const balance       = totalDue - inv.amountPaid
  const isCreditSale  = inv.paymentMethod.toLowerCase().includes('credit') || inv.paymentMethod.toLowerCase().includes('paautang')
  const isActive      = !voided && inv.status !== 'voided'

  function handlePrint() {
    setToast(`Sent ${inv.invoiceNo} to EPSON POS Receipt Printer!`)
    setTimeout(() => setToast(''), 2500)
  }

  function handleVoid() {
    setVoided(true)
    setShowVoidConfirm(false)
    setToast(`Invoice ${inv.invoiceNo} voided and flagged in audit trail.`)
    setTimeout(() => setToast(''), 2800)
  }

  const statusLabel = voided ? 'VOIDED' : inv.status === 'corrected' ? 'CORRECTED' : 'OFFICIAL'
  const statusColor = voided ? '#c64a50' : inv.status === 'corrected' ? '#b76307' : '#078a76'

  return (
    <div className="modal-backdrop document-backdrop" onMouseDown={onClose}>
      {toast && <div className="toast"><span>✓</span>{toast}</div>}
      <article
        className={`document-modal invoice-modal${!isActive ? ' invoice-voided' : ''}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="document-close" aria-label="Close invoice" onClick={onClose}>
          <Icon name="close" />
        </button>

        {/* ── VOID / CORRECTED watermark-style banner ── */}
        {!isActive && (
          <div className="invoice-status-banner" style={{ background: voided ? '#fef2f2' : '#fffbeb', borderColor: voided ? '#fca5a5' : '#fde68a', color: voided ? '#991b1b' : '#92400e' }}>
            <strong>⊘ {voided ? 'VOIDED' : 'CORRECTED'}</strong>
            {voided && <span>This invoice has been cancelled and is no longer valid for payment or collection.</span>}
            {inv.correctedRef && <span>Corrected by: <strong>{inv.correctedRef}</strong></span>}
          </div>
        )}
        {inv.status === 'corrected' && !voided && (
          <div className="invoice-status-banner" style={{ background: '#fffbeb', borderColor: '#fde68a', color: '#92400e' }}>
            <strong>⚠ CORRECTED INVOICE</strong>
            <span>This document supersedes a prior invoice. Ref: <strong>{inv.correctedRef || 'INV-2026-0314'}</strong></span>
          </div>
        )}

        {/* ── HEADER: Seller identity (Check 1, 2, 3) ── */}
        <header className="invoice-head">
          <div className="invoice-brand">
            <span><Icon name="flame" size={24} /></span>
            <div>
              {/* Check 3: Seller registered name, address, TIN, VAT status */}
              <strong>{inv.sellerName}</strong>
              <small>{inv.sellerAddress}</small>
              <small style={{ color: '#688299' }}>TIN: {inv.sellerTin} · {inv.sellerVatStatus}</small>
              <small style={{ color: '#688299' }}>DOE Permit: R12-DOE-LPG-0914</small>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {/* Check 1: Invoice number and series */}
            <strong style={{ fontSize: 15 }}>{inv.invoiceNo}</strong>
            <span style={{ display: 'block', marginTop: 3 }}>Series: 2026-0001 – 2026-2000</span>
            {/* Check 2: Date and time */}
            <span style={{ display: 'block', color: '#688299', fontSize: 12, marginTop: 2 }}>
              {inv.date} · {inv.time}
            </span>
            {/* Status label */}
            <span style={{ display: 'inline-block', marginTop: 5, padding: '2px 8px', background: statusColor, color: '#fff', borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}>
              {statusLabel}
            </span>
          </div>
        </header>

        {/* ── PARTIES: Customer identity + Cashier (Check 4, 17) ── */}
        <div className="document-columns">
          <section>
            {/* Check 4: Customer identity */}
            <h3>Sold To</h3>
            <dl>
              <dt>Customer Name</dt>
              <dd><strong>{inv.customerName}</strong></dd>
              {inv.customerBiz !== '—' && (<><dt>Business Name</dt><dd>{inv.customerBiz}</dd></>)}
              <dt>Address</dt>
              <dd>{inv.address}</dd>
              <dt>Contact</dt>
              <dd>{inv.contact}</dd>
              <dt>Customer TIN</dt>
              <dd>{inv.tin}</dd>
            </dl>
          </section>
          <section>
            {/* Check 17: Staff attribution · Check 18: Delivery linkage */}
            <h3>Transaction Details</h3>
            <dl>
              <dt>Cashier</dt>
              <dd>{inv.staffCode} · {inv.staffName}</dd>
              <dt>Date & Time</dt>
              <dd>{inv.date} · {inv.time}</dd>
              <dt>Payment Method</dt>
              <dd><Badge>{inv.paymentMethod}</Badge></dd>
              {inv.deliveryRef !== '—' && (
                <>
                  <dt>Delivery Trip Ref</dt>
                  <dd style={{ color: '#1877c9', fontWeight: 600 }}>{inv.deliveryRef}</dd>
                  <dt>Assigned Driver</dt>
                  <dd>{inv.driverName}</dd>
                </>
              )}
              {/* Check 10: VAT classification */}
              <dt>VAT Classification</dt>
              <dd>
                <span style={{ fontSize: 12, padding: '1px 7px', borderRadius: 4, fontWeight: 700, background: isVatable ? '#e0f2fe' : '#f0fdf4', color: isVatable ? '#075985' : '#166534' }}>
                  {inv.vatClassification === 'vatable' ? 'VATable (12% EVAT)' : inv.vatClassification === 'zero-rated' ? 'Zero-Rated (0%)' : 'VAT-Exempt (LPG Residential)'}
                </span>
              </dd>
            </dl>
          </section>
        </div>

        {/* ── LINE ITEMS TABLE (Check 5, 6, 7, 8) ── */}
        <div className="document-table">
          <table>
            <thead>
              <tr>
                <th style={{ width: '35%' }}>Description / SKU</th>
                <th>Cylinder Serial</th>
                <th style={{ textAlign: 'right' }}>Qty / Unit</th>
                <th style={{ textAlign: 'right' }}>Unit Price</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* LPG Refill line — Check 5, 6, 7, 8 */}
              <tr>
                <td>
                  <strong>LPG Cylinder Refill · {inv.netWeight}</strong>
                  <br /><small style={{ color: '#688299' }}>{inv.brand} · POL Threaded Valve</small>
                </td>
                <td className="cell-mono">{inv.serial}</td>
                <td style={{ textAlign: 'right' }}>1 cyl</td>
                <td style={{ textAlign: 'right' }}>₱{inv.cylinderUnitPrice.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                <td style={{ textAlign: 'right' }}>₱{inv.cylinderUnitPrice.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
              </tr>

              {/* Cylinder Shell Deposit — Check 15 */}
              {depositLine > 0 && (
                <tr style={{ color: '#1877c9' }}>
                  <td>
                    <strong>Cylinder Shell Deposit (Refundable)</strong>
                    <br /><small>Cash held in trust · Returned on shell surrender</small>
                  </td>
                  <td className="cell-mono">{inv.serial}</td>
                  <td style={{ textAlign: 'right' }}>1 shell</td>
                  <td style={{ textAlign: 'right' }}>₱{depositLine.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                  <td style={{ textAlign: 'right' }}>₱{depositLine.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                </tr>
              )}

              {/* Swap / Requal Surcharge */}
              {inv.swapFee > 0 && (
                <tr style={{ color: '#b76307' }}>
                  <td>
                    <strong>Off-Brand / Requal Surcharge</strong>
                    <br /><small>Handling & BPS inspection fee</small>
                  </td>
                  <td>—</td>
                  <td style={{ textAlign: 'right' }}>1 svc</td>
                  <td style={{ textAlign: 'right' }}>₱{inv.swapFee.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                  <td style={{ textAlign: 'right' }}>₱{inv.swapFee.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                </tr>
              )}

              {/* Accessories — Check 5, 6, 7, 8 */}
              {inv.additionalItems.map((it, idx) => (
                <tr key={`${it.sku}-${idx}`}>
                  <td>
                    <strong>{it.name}</strong>
                    <br /><small style={{ color: '#688299' }}>SKU: {it.sku}</small>
                  </td>
                  <td>—</td>
                  <td style={{ textAlign: 'right' }}>{it.qty} pcs</td>
                  <td style={{ textAlign: 'right' }}>₱{it.unitPrice.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                  <td style={{ textAlign: 'right' }}>₱{(it.unitPrice * it.qty).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}

              {/* Discount — Check 9 */}
              {discountAmt > 0 && (
                <tr style={{ color: '#c64a50' }}>
                  <td colSpan={4}>
                    <strong>Discount — {inv.discountLabel || 'Promotional / Senior / PWD'}</strong>
                    <br /><small>Supporting discount slip required for statutory discounts</small>
                  </td>
                  <td style={{ textAlign: 'right' }}>−₱{discountAmt.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── CYLINDER EXCHANGE DETAILS (Check 15, 16) ── */}
        <div className="invoice-summary">
          <div className="return-info">
            <h3>Cylinder Exchange Record</h3>
            <p>
              <span>Transaction Type</span>
              <strong>{inv.hasReturnedEmpty ? 'Palit-Basyo (Exchange)' : 'New Shell Purchase'}</strong>
            </p>
            {/* Check 16: both cylinder IDs */}
            <p>
              <span>Outgoing Full Cylinder Serial</span>
              <strong className="cell-mono">{inv.serial}</strong>
            </p>
            {inv.hasReturnedEmpty ? (
              <p>
                <span>Incoming Empty Basyo Serial</span>
                <strong className="cell-mono">{inv.returnedSerial}</strong>
              </p>
            ) : (
              <p>
                <span>Incoming Empty Basyo</span>
                <strong style={{ color: '#64748b' }}>None · New cylinder issued</strong>
              </p>
            )}
            {/* Check 15: deposit clearly separate */}
            {depositLine > 0 && (
              <p style={{ marginTop: 8, padding: '6px 10px', background: '#eef5ff', borderRadius: 5, border: '1px dashed #93c5fd' }}>
                <span style={{ color: '#1877c9', fontWeight: 600 }}>Shell Deposit (NOT revenue)</span>
                <strong style={{ color: '#1877c9' }}>₱{depositLine.toLocaleString('en-PH', { minimumFractionDigits: 2 })} · Refundable</strong>
              </p>
            )}
          </div>

          {/* ── TOTALS & VAT BREAKDOWN (Check 11, 12) ── */}
          <div className="invoice-totals">
            <p>
              <span>LPG Subtotal</span>
              <strong>₱{(inv.cylinderUnitPrice + inv.swapFee).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
            </p>
            {depositLine > 0 && (
              <p style={{ color: '#1877c9' }}>
                <span>Shell Deposit (Refundable)</span>
                <strong>₱{depositLine.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
              </p>
            )}
            {accsTotal > 0 && (
              <p>
                <span>Accessories / Hardware</span>
                <strong>₱{accsTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
              </p>
            )}
            {discountAmt > 0 && (
              <p style={{ color: '#c64a50' }}>
                <span>Discount ({inv.discountLabel})</span>
                <strong>−₱{discountAmt.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
              </p>
            )}

            {/* Check 10 & 11: VAT breakdown */}
            {isVatable ? (
              <>
                <p style={{ borderTop: '1px solid #e2e8f0', paddingTop: 8, marginTop: 8 }}>
                  <span>VATable Sales (ex-VAT)</span>
                  <strong>₱{netOfVat.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
                </p>
                <p>
                  <span>12% Output VAT</span>
                  <strong>₱{vatAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
                </p>
                <p>
                  <span>Zero-Rated / Exempt</span>
                  <strong>₱0.00</strong>
                </p>
              </>
            ) : (
              <p style={{ borderTop: '1px solid #e2e8f0', paddingTop: 8, marginTop: 8, color: '#166534', fontSize: 12 }}>
                <span>VAT-Exempt (LPG Residential)</span>
                <strong>₱0.00 VAT</strong>
              </p>
            )}

            {/* Check 12: VAT-inclusive total */}
            <p className="grand-total">
              <span>Total Amount Due</span>
              <strong>₱{totalDue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
            </p>

            {/* Check 13: Payment details */}
            <p style={{ color: '#078a76' }}>
              <span>Amount Paid ({inv.paymentMethod})</span>
              <strong>₱{inv.amountPaid.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
            </p>
            {balance !== 0 && (
              <p style={{ color: balance > 0 ? '#c64a50' : '#078a76' }}>
                <span>{balance > 0 ? 'Balance Remaining' : 'Change Given'}</span>
                <strong>{balance > 0 ? '' : '−'}₱{Math.abs(balance).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
              </p>
            )}

            {/* Check 14: Credit sale details */}
            {isCreditSale && (
              <div style={{ marginTop: 8, padding: '8px 10px', background: '#fef9ec', border: '1px solid #fde68a', borderRadius: 5 }}>
                <strong style={{ fontSize: 12, color: '#92400e', display: 'block' }}>Credit / Paautang Account</strong>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#92400e' }}>
                  <span>Amount Charged:</span>
                  <strong> ₱{totalDue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
                </p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#92400e' }}>
                  <span>Outstanding Balance (Kartilya):</span>
                  <strong> ₱{(inv.creditOutstanding + totalDue).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── AUDIT TRAIL NOTE (Check 21) ── */}
        <div style={{ padding: '8px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: 11, color: '#64748b', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <span>📋 Audit Trail: <strong>{inv.invoiceNo}</strong> → Sale → {inv.paymentMethod} Collection → Stock Movement → Customer Ledger</span>
          {inv.deliveryRef !== '—' && <span>🚚 Linked Delivery: <strong>{inv.deliveryRef}</strong></span>}
        </div>

        <footer className="document-footer">
          <div>
            <em>{settings.invoiceFooterNote}</em>
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>
              BIR MIN: {settings.birMinNumber} • BIR PTU: {settings.birPtuNumber}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {!voided && (
              <Button variant="secondary" onClick={() => setShowVoidConfirm(true)}>Void Invoice</Button>
            )}
            <Button variant="secondary" icon="file" onClick={handlePrint}>Print Invoice</Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </footer>

        {/* Void Confirmation Dialog — Check 20 */}
        {showVoidConfirm && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: 28, maxWidth: 360, width: '90%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>⊘</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#991b1b', margin: '0 0 8px' }}>Void This Invoice?</h3>
              <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px', lineHeight: 1.5 }}>
                <strong>{inv.invoiceNo}</strong> will be permanently cancelled. This action is logged to the immutable audit trail and cannot be reversed.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <Button variant="secondary" onClick={() => setShowVoidConfirm(false)}>Cancel</Button>
                <Button onClick={handleVoid}>Confirm Void</Button>
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}

interface DeliverySlipData {
  deliveryId?: string
  customer?: string
  company?: string
  address?: string
  contact?: string
  serial?: string
  brand?: string
  driver?: string
  status?: string
}

function DeliverySlipModal({ data, onClose, onMarkDelivered }: { data?: DeliverySlipData; onClose: () => void; onMarkDelivered?: () => void }) {
  const [toast, setToast] = useState('')
  const slip = {
    deliveryId: data?.deliveryId || 'DEL-1018',
    customer: data?.customer || 'ABC Restaurant',
    company: data?.company || 'ABC Food Corp.',
    address: data?.address || 'National Highway, Brgy. Labangal, GenSan',
    contact: data?.contact || '0918 309 1204',
    serial: data?.serial || 'SG-11-004617',
    brand: data?.brand || 'SEAGAS (SEAOIL 11kg POL)',
    driver: data?.driver || 'Mark Ramos (ST003)',
    status: data?.status || 'In Transit',
  }

  function handlePrint() {
    setToast(`Delivery Trip Ticket ${slip.deliveryId} printed for driver!`)
    setTimeout(() => setToast(''), 2500)
  }

  return (
    <div className="modal-backdrop document-backdrop" onMouseDown={onClose}>
      {toast && <div className="toast"><span>✓</span>{toast}</div>}
      <article className="document-modal slip-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="document-close" aria-label="Close delivery slip" onClick={onClose}>
          <Icon name="close" />
        </button>
        <header className="slip-head">
          <div>
            <span className="eyebrow">SEAGAS Operations Control System · GenSan</span>
            <h2>Delivery Slip & Trip Manifest</h2>
          </div>
          <div>
            <strong>{slip.deliveryId}</strong>
            <Badge>{slip.status}</Badge>
          </div>
        </header>

        <div className="document-columns">
          <section>
            <h3>Customer Information</h3>
            <dl>
              <dt>Customer Name</dt>
              <dd>{slip.customer}</dd>
              <dt>Company</dt>
              <dd>{slip.company}</dd>
              <dt>Drop Address</dt>
              <dd>{slip.address}</dd>
              <dt>Contact Number</dt>
              <dd>{slip.contact}</dd>
            </dl>
          </section>
          <section>
            <h3>Delivery Details</h3>
            <dl>
              <dt>Cylinder Serial</dt>
              <dd>{slip.serial}</dd>
              <dt>Brand & Spec</dt>
              <dd>{slip.brand}</dd>
              <dt>Assigned Driver</dt>
              <dd>{slip.driver}</dd>
              <dt>Dispatch Date</dt>
              <dd>October 16, 2026</dd>
            </dl>
          </section>
        </div>

        <section className="condition-section">
          <h3>Pre-Trip Safety & Condition Checks</h3>
          <div>
            {['Safety Seal Intact', 'No Valve Leak Detected', 'Tare Weight Verified (13.4kg)'].map((x) => (
              <span key={x}>
                <i>✓</i>{x}
              </span>
            ))}
          </div>
        </section>

        <section className="signature-section">
          <h3>Customer Acknowledgement (Drop Sign-Off)</h3>
          <div className="signature-box">✓ Digitally Signed on Handheld / Physical Slip</div>
          <small>Received in good condition · Empty basyo surrendered</small>
        </section>

        <footer className="document-footer">
          <span>Prepared by ST001 · Paolo Mendoza</span>
          <div>
            <Button variant="secondary" icon="file" onClick={handlePrint}>Print Slip</Button>
            <Button onClick={() => { onMarkDelivered?.(); onClose() }}>Mark as Delivered</Button>
          </div>
        </footer>
      </article>
    </div>
  )
}

function Dashboard({ setPage }: { setPage: (p: string) => void }) {
  const [checked, setChecked] = useState(Array(6).fill(false))
  const [invoiceOpen, setInvoiceOpen] = useState(false)
  return <div className="page dashboard">
    {invoiceOpen && <InvoiceModal onClose={() => setInvoiceOpen(false)}/>}
    <div className="page-heading"><div><h1>Dashboard</h1><p>Overview of LPG operations today.</p></div><div className="quote"><Icon name="flame" size={23}/><span>“Sa ligtas na LPG, mas magandang bukas.”</span></div></div>
    <StatStrip
      stats={[
        { label: "Today's Gross Sales", value: '₱24,850.00', sub: '+18% vs yesterday', status: 'ok' },
        { label: 'Full Cylinders Ready', value: '428 Tanks', sub: 'In GenSan yard', status: 'info' },
        { label: 'Empty Basyo in Yard', value: '163 Tanks', sub: 'Awaiting depot refill' },
        { label: 'Pending Dispatches', value: '12 Trips', sub: '3 drivers en route', status: 'warning' },
      ]}
    />
    <div className="dashboard-grid"><MovementChart/><InventoryStatus/>
      <Card className="transactions-card"><CardTitle icon="file" title="Recent Transactions" action={<Button variant="ghost" onClick={() => setPage('POS (Sales & Exchange)')}>View All <span>→</span></Button>}/><DataTable columns={['Time','Customer','Transaction','Cylinder Serial','Amount','Staff Code']} rows={transactions} onRowClick={() => setInvoiceOpen(true)}/></Card>
      <ClosingChecklist checked={checked} toggle={i => setChecked(c => c.map((v,x) => x === i ? !v : v))}/>
      <Card style={{ borderLeft: '4px solid #c64a50', background: '#fff9f9' }}>
        <CardTitle
          icon="bell"
          title="AR & Credit Risk Engine"
          subtitle="2 Accounts Hard-Locked · POS & Dispatch Releases Blocked"
          action={<Button variant="ghost" onClick={() => setPage('AR & Risk Control')}>Manage AR Risk <span>→</span></Button>}
        />
        <div style={{ padding: '0 16px 14px', fontSize: 13, color: '#688299' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>🔒 ABC Restaurant (38d overdue · ₱12k breach)</span>
            <strong style={{ color: '#c64a50' }}>Hard-Locked</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>🔒 LM Food House (12/10 cylinders float breach)</span>
            <strong style={{ color: '#c64a50' }}>Hard-Locked</strong>
          </div>
        </div>
      </Card>
      <Card className="loan-card"><CardTitle icon="coins" title="Loan & Expense Snapshot" action={<Button variant="ghost" onClick={() => setPage('Expenses')}>View Details <span>→</span></Button>}/><div className="snapshot-grid">{[['coins','Loan Balance','₱120,000','As of Oct 16, 2026'],['money','Interest Paid','₱2,350','This month'],['receipt',"Today's Expenses",'₱3,680','For Oct 16, 2026']].map((x,i) => <div className={`snapshot snapshot-${i}`} key={x[1]}><span><Icon name={x[0] as IconName}/></span><div><small>{x[1]}</small><strong>{x[2]}</strong><em>{x[3]}</em></div></div>)}</div><h3>Expense Categories (Today)</h3><div className="expense-tiles">{[['Fuel','₱1,500'],['Salaries','₱1,200'],['Utilities','₱480'],['Others','₱500']].map((x,i) => <div className={`expense-${i}`} key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong></div>)}</div></Card>
      <AuditActivity/>
    </div>
  </div>
}

function ModulePage({ page, setPage }: { page: string; setPage: (page: string) => void }) {
  const config = pageData[page]
  const [dataRows, setDataRows] = useState(config.rows)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [modal, setModal] = useState(false)
  const [selected, setSelected] = useState<string[] | null>(null)
  const [deliverySlip, setDeliverySlip] = useState(false)
  const [toast, setToast] = useState('')

  // New staff form fields
  const [field0, setField0] = useState('')
  const [field1, setField1] = useState('')
  const [field2, setField2] = useState('')
  const [field3, setField3] = useState('')

  const rows = useMemo(() => dataRows.filter(row => row.join(' ').toLowerCase().includes(query.toLowerCase()) && (filter === 'All' || row.includes(filter))), [query, filter, dataRows])
  const inventoryFilters = ['All','Full','Empty','With Customer','On delivery','Damaged']

  function submit(e: FormEvent) {
    e.preventDefault()
    if (page === 'Staff') {
      const code = field0 || `ST00${dataRows.length + 1}`
      const name = field1 || 'New Staff Member'
      const pos = field2 || 'Staff / Rider'
      const contact = field3 || '0917 000 0000'
      const newStaffRow = [code, name, pos, contact, 'Oct 16, 2026', 'Active']
      setDataRows([newStaffRow, ...dataRows])
    }
    setModal(false)
    setToast(`${config.action.replace('Add ', '')} saved successfully`)
    setField0('')
    setField1('')
    setField2('')
    setField3('')
    setTimeout(() => setToast(''), 2800)
  }

  function handleExport() {
    setToast(`${page.replace(/\s+/g, '_')}_Records.xlsx exported successfully!`)
    setTimeout(() => setToast(''), 2500)
  }

  return <div className="page module-page">
    {deliverySlip && <DeliverySlipModal onClose={() => setDeliverySlip(false)}/>}
    {toast && <div className="toast"><span>✓</span>{toast}</div>}
    <div className="page-heading">
      <div>
        <h1>{page}</h1>
        <p>{config.subtitle}</p>
      </div>
      <div className="heading-actions">
        {page === 'Cylinder Inventory' && <Button variant="secondary" icon="swap" onClick={() => setPage('Cylinder Fleet')}>Movement Log</Button>}
        <Button icon={page === 'Audit Logs' ? 'download' : 'plus'} onClick={() => page === 'Audit Logs' ? handleExport() : setModal(true)}>
          {config.action}
        </Button>
      </div>
    </div>
    <div className="mini-stats">
      {(page === 'Staff' ? [['Total Staff','12'],['Active On Duty','8'],['Delivery Riders','4'],['Cashiers & Yard','4']] : [['Records Today','24'],['Open Items','12'],['Completed','36'],['Updated','Just now']]).map((s,i) => (
        <Card key={s[0]}>
          <span className={`stat-mark mark-${i}`}><Icon name={i === 0 ? 'users' : i === 1 ? 'clock' : i === 2 ? 'check' : 'chart'}/></span>
          <div><small>{s[0]}</small><strong>{s[1]}</strong></div>
        </Card>
      ))}
    </div>
    <Card className="records-card">
      <div className="toolbar">
        <SearchField value={query} onChange={setQuery} placeholder={`Search ${page.toLowerCase()}...`}/>
        <div className="toolbar-actions">
          {page === 'Cylinder Inventory' && <select value={filter} onChange={e => setFilter(e.target.value)}>{inventoryFilters.map(f => <option key={f}>{f}</option>)}</select>}
          <Button variant="secondary" icon="filter">Filters</Button>
          <Button variant="secondary" icon="download" onClick={handleExport}>Export</Button>
        </div>
      </div>
      <DataTable columns={config.columns} rows={rows} onRowClick={row => page === 'Deliveries' ? setDeliverySlip(true) : setSelected(row)}/>
      {rows.length === 0 && <div className="empty-state"><Icon name="search" size={30}/><strong>No matching records</strong><span>Try adjusting your search or filters.</span></div>}
      <div className="pagination">
        <span>Showing {rows.length} of {dataRows.length} records</span>
        <div><button>‹</button><button className="current">1</button><button>›</button></div>
      </div>
    </Card>

    {(modal || selected) && (
      <div className="modal-backdrop" onMouseDown={() => { setModal(false); setSelected(null) }}>
        <div className="modal" onMouseDown={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <h2>{selected ? 'Record Details' : config.action}</h2>
              <p>{selected ? 'Review the complete record information.' : `Enter the details below to create a new ${page.toLowerCase()} record.`}</p>
            </div>
            <button aria-label="Close" onClick={() => { setModal(false); setSelected(null) }}><Icon name="close"/></button>
          </div>
          {selected ? (
            <div className="detail-list">
              {config.columns.map((c, i) => (
                <div key={c}><span>{c}</span><strong>{selected[i]}</strong></div>
              ))}
              <div className="detail-note"><Icon name="clock"/><span>Last updated Oct 16, 2026 at 1:18 PM</span></div>
              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
                {page !== 'Audit Logs' && (
                  <Button onClick={() => {
                    setToast(`Record ${selected[0]} updated!`)
                    setSelected(null)
                    setTimeout(() => setToast(''), 2500)
                  }}>Save Changes</Button>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-grid">
                <label>
                  <span>{config.columns[0]}<b>*</b></span>
                  <input required value={field0} onChange={e => setField0(e.target.value)} placeholder={`e.g. ST005`} />
                </label>
                <label>
                  <span>{config.columns[1]}<b>*</b></span>
                  <input required value={field1} onChange={e => setField1(e.target.value)} placeholder={`e.g. Juan Perez`} />
                </label>
                <label>
                  <span>{config.columns[2]}<b>*</b></span>
                  <input required value={field2} onChange={e => setField2(e.target.value)} placeholder={`e.g. Delivery Driver`} />
                </label>
                <label>
                  <span>{config.columns[3]}</span>
                  <input value={field3} onChange={e => setField3(e.target.value)} placeholder={`e.g. 0917 123 4567`} />
                </label>
              </div>
              <label className="full-field">
                <span>Notes & Roles</span>
                <textarea placeholder="Add any operational notes or permissions..." />
              </label>
              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
                <Button type="submit">Save Record</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    )}
  </div>
}


function OperationsForm({ page }: { page: string }) {
  const [saved, setSaved] = useState(false)
  const [invoiceOpen, setInvoiceOpen] = useState(false)
  const forms: Record<string, { subtitle: string; fields: string[]; summary: [string,string][] }> = {
    Receiving: { subtitle: 'Record incoming supplier cylinders and complete safety checks.', fields: ['Supplier','Delivery Document No.','Cylinder Serial Number','Brand','Gross Weight','Tare Weight','Receiving Staff Code','Date Received'], summary: [['Expected Cylinders','40'],['Scanned','32'],['Checks Passed','30']] },
    'Sales & Exchange': { subtitle: 'Create a sale or cylinder exchange for a selected customer.', fields: ['Customer','Cylinder Brand','Cylinder Serial Number','Net Weight','Selling Price','Empty Cylinder Returned','Processing Staff Code','Payment Method'], summary: [['Subtotal','₱1,200'],['Discount','₱0'],['Total Amount','₱1,200']] },
    'Daily Closing': { subtitle: 'Reconcile today’s cash, inventory counts, and owner review.', fields: ['Cash on Hand','Expected Cash','Full Cylinder Count','Empty Cylinder Count','Closing Staff Code','Owner Review Code','Variance Reason','Daily Summary'], summary: [['Expected Sales','₱24,850'],['Cash Counted','₱24,850'],['Variance','₱0']] },
    Settings: { subtitle: 'Configure business details and operational preferences.', fields: ['Business Name','Contact Number','Business Address','Tax Number','Default LPG Brand','Low Stock Threshold','Invoice Prefix','Time Zone'], summary: [['System Version','1.0.0'],['Last Backup','Today'],['Audit Status','Active']] },
  }
  const data = forms[page]
  return <div className="page module-page">{invoiceOpen && <InvoiceModal onClose={() => setInvoiceOpen(false)}/>} {saved && <div className="toast"><span>✓</span>{page} details saved successfully</div>}<div className="page-heading"><div><h1>{page}</h1><p>{data.subtitle}</p></div></div><div className="form-layout"><Card className="main-form"><CardTitle icon={page === 'Receiving' ? 'receive' : page === 'Sales & Exchange' ? 'swap' : page === 'Settings' ? 'settings' : 'check'} title={page === 'Settings' ? 'System Preferences' : `${page} Details`} subtitle="Complete all required fields before saving."/><form onSubmit={e => {e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2800)}}><div className="form-grid">{data.fields.map((f,i) => <label key={f}><span>{f}{i < 6 && <b>*</b>}</span>{f.includes('Summary') || f.includes('Reason') || f.includes('Address') ? <textarea required={i < 6} placeholder={`Enter ${f.toLowerCase()}`}/> : <input required={i < 6} placeholder={`Enter ${f.toLowerCase()}`}/>}</label>)}</div><div className="modal-actions"><Button variant="secondary">Cancel</Button><Button type="submit">Save {page === 'Sales & Exchange' ? 'Transaction' : page}</Button></div></form></Card><Card className="form-summary"><CardTitle title={page === 'Sales & Exchange' ? 'Invoice Preview' : 'Summary'}/>{data.summary.map(s => <div className="summary-row" key={s[0]}><span>{s[0]}</span><strong>{s[1]}</strong></div>)}{page === 'Sales & Exchange' && <Button variant="secondary" icon="eye" onClick={() => setInvoiceOpen(true)}>Open Sample Invoice</Button>}<div className="info-box"><Icon name="check"/><p>All records are automatically added to the read-only audit log after saving.</p></div></Card></div>{page === 'Sales & Exchange' && <Card className="sales-history"><CardTitle icon="receipt" title="Recent Transactions" subtitle="Select any transaction to view its invoice."/><DataTable columns={['Time','Customer','Transaction','Cylinder Serial','Amount','Staff Code']} rows={transactions} onRowClick={() => setInvoiceOpen(true)}/></Card>}</div>
}

const MasterHeader = ({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) =>
  <div className="page-heading"><div><h1>{title}</h1><p>{subtitle}</p></div>{actions && <div className="heading-actions">{actions}</div>}</div>

function FilterTabs({ items, active, onChange }: { items: string[]; active: string; onChange: (item: string) => void }) {
  return <div className="filter-tabs">{items.map(item => <button key={item} className={active === item ? 'active' : ''} onClick={() => onChange(item)}>{item}</button>)}</div>
}

function CustomersSuki({ setPage }: { setPage?: (page: string) => void }) {
  const initialCustomers = [
    ['Maria Santos', '—', '0917 234 8891', 'J. Catolico St., Brgy. Lagao, GenSan', 'TIN-882-194', 'SEAGAS 11kg (POL Threaded)', 'Full Deposit', '₱0 / ₱2,500', '1 Tank (₱1,800)', 'View Kartilya'],
    ['ABC Restaurant', 'ABC Food Corp.', '0918 309 1204', 'National Highway, Brgy. Labangal, GenSan', 'TIN-119-822', 'SEAGAS 11kg (Compact 20mm)', 'Mutual Agreement', '₱62,000 / ₱80,000', '8 Tanks (₱16,000)', 'View Kartilya'],
    ['Aling Nena', "Nena's Carinderia", '0928 441 2098', 'P. Acharon Blvd., Brgy. Calumpang, GenSan', 'TIN-342-818', 'SEAGAS 11kg (Snap-On SNP)', 'Partial Deposit', '₱4,800 / ₱5,000', '2 Tanks (₱3,500)', 'View Kartilya'],
    ['LM Food House', 'LM Ventures Inc.', '0998 232 6180', 'Makar Junction, Brgy. Labangal, GenSan', 'TIN-441-512', 'SEAGAS 11kg (Snap-On SNP)', 'Mutual Agreement', '₱42,000 / ₱60,000', '6 Tanks (₱10,500)', 'View Kartilya'],
    ['Nanay Gloria Bakery', "Gloria's Panaderya", '0917 889 1234', 'Aparente St., Brgy. City Heights, GenSan', 'TIN-552-199', 'SEAGAS 50kg Industrial (POL)', 'Partial Deposit', '₱18,500 / ₱30,000', '4 Tanks (₱8,000)', 'View Kartilya'],
  ]

  const initialCreditRows = [
    ['ABC Restaurant', 'Suki Commercial', '0918 309 1204 · Brgy. Labangal, GenSan', '₱80,000', '₱62,000', 'Oct 08, 2026', 'Oct 18, 2026', 'View Kartilya'],
    ["Nena's Carinderia", 'Suki Regular', '0928 441 2098 · Brgy. Calumpang, GenSan', '₱5,000', '₱4,800', 'Sep 12, 2026', 'Oct 16, 2026', 'View Kartilya'],
    ['LM Food House', 'Suki Commercial', '0998 232 6180 · Makar Junction, GenSan', '₱60,000', '₱42,000', 'Oct 01, 2026', 'Oct 20, 2026', 'View Kartilya'],
    ["Gloria's Panaderya", 'Suki Commercial', '0917 889 1234 · Brgy. City Heights, GenSan', '₱30,000', '₱18,500', 'Oct 10, 2026', 'Oct 25, 2026', 'View Kartilya'],
  ]

  const initialDeposits = [
    ['DEP-2026-089', 'Maria Santos', 'SG-11-004521', '11kg POL Threaded', '₱1,800.00', 'Oct 02, 2026', '14 Days', 'Active Deposit'],
    ['DEP-2026-044', 'Juan Dela Cruz', 'SG-11-003998', '11kg Compact (CMP)', '₱2,000.00', 'Aug 15, 2026', '62 Days', 'Overdue Review'],
    ['DEP-2026-012', 'Kusina Ni Nanay', 'SG-50-001004', '50kg POL Industrial', '₱0.00 (Owner Approved)', 'Jul 10, 2026', '98 Days', 'Zero-Deposit Suki'],
    ['DEP-2026-095', 'ABC Restaurant', 'SG-11-004617', '11kg Snap-On (SNP)', '₱1,750.00', 'Oct 14, 2026', '2 Days', 'Active Deposit'],
    ['DEP-2026-077', 'Tatay Boying Bakery', 'SG-50-001923', '50kg POL Industrial', '₱4,500.00', 'Sep 18, 2026', '28 Days', 'Active Deposit'],
  ]

  const [tab, setTab] = useState('All Customers')
  const [customerList, setCustomerList] = useState(initialCustomers)
  const [creditList, setCreditList] = useState(initialCreditRows)
  const [deposits, setDeposits] = useState(initialDeposits)
  const [search, setSearch] = useState('')
  const [drawer, setDrawer] = useState<string[] | null>(null)
  const [kartilya, setKartilya] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [paymentModal, setPaymentModal] = useState(false)
  const [issueDepositOpen, setIssueDepositOpen] = useState(false)
  const [refundModalItem, setRefundModalItem] = useState<string[] | null>(null)
  const [toast, setToast] = useState('')

  // Add Customer Form Fields
  const [cName, setCName] = useState('')
  const [cCompany, setCCompany] = useState('')
  const [cPhone, setCPhone] = useState('')
  const [cAddress, setCAddress] = useState('')
  const [cTin, setCTin] = useState('')
  const [cBrand, setCBrand] = useState('SEAGAS Standard 11kg (POL)')
  const [cTier, setCTier] = useState('Suki Regular')
  const [cCreditLimit, setCCreditLimit] = useState('5000')

  // Deposit Form Fields
  const [depCustomer, setDepCustomer] = useState('Maria Santos')
  const [depSerial, setDepSerial] = useState('SG-11-008122')
  const [depSize, setDepSize] = useState('11.0 kg POL')
  const [depAmount, setDepAmount] = useState('1800')

  // Payment Form Fields
  const [payAmount, setPayAmount] = useState('5000')
  const [payOrNo, setPayOrNo] = useState('OR-0892')
  const [payMethod, setPayMethod] = useState('Cash')

  function handleIssueDeposit(e: FormEvent) {
    e.preventDefault()
    const slipId = `DEP-2026-${Math.floor(100 + Math.random() * 900)}`
    const newDeposit = [
      slipId,
      depCustomer,
      depSerial,
      depSize,
      `₱${parseFloat(depAmount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
      'Today (Oct 16)',
      '0 Days',
      'Active Deposit'
    ]
    setDeposits([newDeposit, ...deposits])
    setIssueDepositOpen(false)
    showToast(`Official Deposit Slip ${slipId} issued for ${depCustomer}!`)
  }

  function handleApproveRefund() {
    if (!refundModalItem) return
    const updated = deposits.map(dep => {
      if (dep[0] === refundModalItem[0]) {
        return [dep[0], dep[1], dep[2], dep[3], dep[4], dep[5], 'Returned', 'Refunded & Restocked']
      }
      return dep
    })
    setDeposits(updated)
    const slip = refundModalItem[0]
    const amount = refundModalItem[4]
    setRefundModalItem(null)
    showToast(`Deposit ${slip} refunded (${amount}) to customer! Cash disbursed from drawer.`)
  }

  // Passbook ledger state
  const [kartilyaLedger, setKartilyaLedger] = useState([
    ['Oct 16', 'INV-0315', '13 LPG cylinders delivered', '₱14,140', '—', '₱62,000'],
    ['Oct 08', 'OR-0881', 'Payment received via Cashier', '—', '₱12,000', '₱47,860'],
    ['Oct 02', 'INV-0298', '10 LPG cylinders delivered', '₱10,400', '—', '₱59,860'],
  ])
  const [currentBalance, setCurrentBalance] = useState(62000)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  function handleAddCustomer(e: FormEvent) {
    e.preventDefault()
    const newCust = [
      cName,
      cCompany || '—',
      cPhone,
      cAddress,
      cTin || '—',
      cBrand,
      cTier,
      `₱0 / ₱${Number(cCreditLimit).toLocaleString('en-PH')}`,
      '0 Tanks (₱0)',
      'View Kartilya',
    ]
    setCustomerList([newCust, ...customerList])
    if (Number(cCreditLimit) > 0) {
      setCreditList([
        [cName, cTier, `${cPhone} · ${cAddress}`, `₱${Number(cCreditLimit).toLocaleString('en-PH')}`, '₱0', '—', 'Oct 30, 2026', 'View Kartilya'],
        ...creditList,
      ])
    }
    setAddModal(false)
    showToast(`Customer "${cName}" added successfully to master records!`)
    setCName('')
    setCCompany('')
    setCPhone('')
    setCAddress('')
    setCTin('')
  }

  function handleRecordPayment(e: FormEvent) {
    e.preventDefault()
    const amt = parseFloat(payAmount) || 0
    const newBal = Math.max(0, currentBalance - amt)
    setCurrentBalance(newBal)

    const newLedgerRow = [
      'Today',
      payOrNo,
      `Payment received (${payMethod})`,
      '—',
      `₱${amt.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
      `₱${newBal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
    ]
    setKartilyaLedger([newLedgerRow, ...kartilyaLedger])

    // Update in credit list as well
    setCreditList(creditList.map(item => item[0] === 'ABC Restaurant' ? [item[0], item[1], item[2], item[3], `₱${newBal.toLocaleString('en-PH')}`, 'Today', item[6], item[7]] : item))

    setPaymentModal(false)
    showToast(`Payment of ₱${amt.toLocaleString('en-PH')} posted! New Balance: ₱${newBal.toLocaleString('en-PH')}`)
  }

  const filteredCustomers = useMemo(() => {
    return customerList.filter(row => {
      const matchSearch = row.join(' ').toLowerCase().includes(search.toLowerCase())
      if (!matchSearch) return false
      if (tab === 'Suki Accounts') return row[6].includes('Suki')
      if (tab === 'Commercial / Business') return row[6].includes('Commercial')
      return true
    })
  }, [customerList, search, tab])

  const filteredCredit = useMemo(() => {
    return creditList.filter(row => row.join(' ').toLowerCase().includes(search.toLowerCase()))
  }, [creditList, search])

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}

      {/* Add Customer Modal */}
      {addModal && (
        <div className="modal-backdrop" onMouseDown={() => setAddModal(false)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Add Customer Profile</h2>
                <p>Register a new residential or commercial LPG customer with valve and credit preferences.</p>
              </div>
              <button aria-label="Close" onClick={() => setAddModal(false)}><Icon name="close"/></button>
            </div>
            <form onSubmit={handleAddCustomer}>
              <div className="form-grid">
                <label>
                  <span>Customer Name<b>*</b></span>
                  <input required value={cName} onChange={e => setCName(e.target.value)} placeholder="e.g. Elena Ramos" />
                </label>
                <label>
                  <span>Business / Company Name</span>
                  <input value={cCompany} onChange={e => setCCompany(e.target.value)} placeholder="e.g. Ramos Bakery (leave blank if residential)" />
                </label>
                <label>
                  <span>Mobile Phone #<b>*</b></span>
                  <input required value={cPhone} onChange={e => setCPhone(e.target.value)} placeholder="0917 123 4567" />
                </label>
                <label>
                  <span>Delivery Address / Barangay<b>*</b></span>
                  <input required value={cAddress} onChange={e => setCAddress(e.target.value)} placeholder="e.g. J. Catolico St., Brgy. Lagao, GenSan" />
                </label>
                <label>
                  <span>Tax ID (TIN for Invoicing)</span>
                  <input value={cTin} onChange={e => setCTin(e.target.value)} placeholder="TIN-000-000" />
                </label>
                <label>
                  <span>Preferred Valve System (SEAGAS Fleet)</span>
                  <select value={cBrand} onChange={e => setCBrand(e.target.value)} style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 11 }}>
                    <option>SEAGAS Standard 11kg (POL Threaded)</option>
                    <option>SEAGAS Compact 11kg (20mm Snap-On)</option>
                    <option>SEAGAS Industrial 50kg (SRV / POL)</option>
                    <option>SEAGAS Camping 2.7kg (Compact)</option>
                  </select>
                </label>
                <label>
                  <span>Suki Account Tier</span>
                  <select value={cTier} onChange={e => setCTier(e.target.value)} style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 11 }}>
                    <option>Suki Regular (Residential)</option>
                    <option>Suki Commercial (Carinderia / Bakery)</option>
                    <option>Walk-In Retail Buyer</option>
                  </select>
                </label>
                <label>
                  <span>Credit Ceiling / Paautang Limit (₱)</span>
                  <input type="number" step="500" value={cCreditLimit} onChange={e => setCCreditLimit(e.target.value)} placeholder="5000" />
                </label>
              </div>
              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setAddModal(false)}>Cancel</Button>
                <Button type="submit">Save Customer Record</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Payment Submodal */}
      {paymentModal && (
        <div className="modal-backdrop" onMouseDown={() => setPaymentModal(false)}>
          <div className="modal payment-modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Record Paautang Collection</h2>
                <p>Post customer credit payment and generate official collection receipt.</p>
              </div>
              <button onClick={() => setPaymentModal(false)}><Icon name="close"/></button>
            </div>
            <form onSubmit={handleRecordPayment} style={{ padding: '16px 22px' }}>
              <div style={{ display: 'grid', gap: 12 }}>
                <label>
                  <span style={{ fontSize: 10, color: '#688299', fontWeight: 600 }}>Customer Account</span>
                  <input value="ABC Restaurant · Account #SUKI-0082" readOnly style={{ height: 36, padding: '0 10px', background: '#f5f8fa', border: '1px solid #dce5ed', borderRadius: 6, fontSize: 11 }} />
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <label>
                    <span style={{ fontSize: 10, color: '#688299', fontWeight: 600 }}>Payment Amount (₱)<b>*</b></span>
                    <input type="number" required value={payAmount} onChange={e => setPayAmount(e.target.value)} style={{ height: 36, padding: '0 10px', border: '1px solid #b7ded5', borderRadius: 6, fontSize: 13, fontWeight: 700, color: '#078672' }} />
                  </label>
                  <label>
                    <span style={{ fontSize: 10, color: '#688299', fontWeight: 600 }}>Official Receipt # (OR)</span>
                    <input required value={payOrNo} onChange={e => setPayOrNo(e.target.value)} style={{ height: 36, padding: '0 10px', border: '1px solid #dce5ed', borderRadius: 6, fontSize: 11 }} />
                  </label>
                </div>
                <label>
                  <span style={{ fontSize: 10, color: '#688299', fontWeight: 600 }}>Payment Mode</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 4 }}>
                    {['Cash', 'GCash / Maya', 'Bank Check'].map(m => (
                      <button
                        key={m}
                        type="button"
                        className={payMethod === m ? 'btn btn-primary' : 'btn btn-secondary'}
                        style={{ height: 34, fontSize: 10 }}
                        onClick={() => setPayMethod(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </label>
              </div>
              <div className="modal-actions" style={{ marginTop: 18 }}>
                <Button variant="secondary" onClick={() => setPaymentModal(false)}>Cancel</Button>
                <Button type="submit">Post Payment to Passbook</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital Kartilya Modal */}
      {kartilya && (
        <div className="modal-backdrop" onClick={() => setKartilya(false)}>
          <div className="modal kartilya-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Digital Kartilya (Customer Passbook)</h2>
                <p>ABC Restaurant · Account #SUKI-0082 · Brgy. Labangal, GenSan</p>
              </div>
              <button onClick={() => setKartilya(false)}><Icon name="close"/></button>
            </div>
            <div className="passbook-head">
              <div>
                <span>Approved Credit Limit</span>
                <strong>₱80,000</strong>
              </div>
              <div>
                <span>Current Outstanding Balance</span>
                <strong style={{ color: currentBalance > 50000 ? '#bb3b42' : '#078d7a' }}>
                  ₱{currentBalance.toLocaleString('en-PH')}
                </strong>
              </div>
              <div>
                <span>Available Purchasing Credit</span>
                <strong>₱{Math.max(0, 80000 - currentBalance).toLocaleString('en-PH')}</strong>
              </div>
            </div>
            <DataTable
              columns={['Date', 'Reference', 'Description', 'Charge (+)', 'Payment (−)', 'Running Balance']}
              rows={kartilyaLedger}
            />
            <div className="modal-actions kartilya-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button icon="coins" onClick={() => setPaymentModal(true)}>Record Payment / Collection</Button>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="secondary" icon="download" onClick={() => showToast('Statement of Account (PDF) generated for ABC Restaurant!')}>
                  Print Statement of Account
                </Button>
                <Button onClick={() => setKartilya(false)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Side Drawer */}
      {drawer && (
        <div className="drawer-backdrop" onClick={() => setDrawer(null)}>
          <aside className="side-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-head">
              <div>
                <span className="mini-avatar">{drawer[0].split(' ').map(x => x[0]).slice(0, 2).join('')}</span>
                <h2>{drawer[0]}</h2>
                <p>{drawer[1] === '—' ? 'Residential Suki Account' : drawer[1]}</p>
              </div>
              <button onClick={() => setDrawer(null)}><Icon name="close"/></button>
            </div>
            <div className="drawer-section">
              <h3>Contact & Delivery Address</h3>
              <p><Icon name="phone"/>{drawer[2]}</p>
              <p><Icon name="location"/>{drawer[3]}</p>
              <p><Icon name="file"/>{drawer[4]}</p>
            </div>
            <div className="drawer-section">
              <h3>Credit Standing & Asset Liability</h3>
              <div className="drawer-metrics">
                <div>
                  <span>Credit Standing</span>
                  <strong>{drawer[7]}</strong>
                </div>
                <div>
                  <span>Active Cylinders Loaned</span>
                  <strong>{drawer[8]}</strong>
                </div>
              </div>
            </div>
            <div className="drawer-section">
              <h3>Recent Ledger Transactions</h3>
              {[
                ['Oct 16', '11kg LPG Refill Ref #INV-0315', '₱1,040'],
                ['Oct 08', 'Payment collection receipt', '-₱1,500'],
                ['Sep 28', 'Cylinder shell deposit', '₱1,800'],
              ].map(x => (
                <div className="ledger-line" key={x[0]}>
                  <span>{x[0]}</span>
                  <b>{x[1]}</b>
                  <strong>{x[2]}</strong>
                </div>
              ))}
            </div>
            <div className="drawer-actions">
              <Button variant="secondary" icon="download" onClick={() => showToast(`Statement of Account exported for ${drawer[0]}!`)}>
                Export Statement
              </Button>
              <Button onClick={() => { setDrawer(null); setKartilya(true); }}>
                View Digital Kartilya
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Issue Deposit Slip Modal */}
      {issueDepositOpen && (
        <div className="modal-backdrop" onMouseDown={() => setIssueDepositOpen(false)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Issue Customer Cylinder Deposit Slip</h2>
                <p>Record cash deposit liability held in trust for loaned SEAGAS cylinder shell.</p>
              </div>
              <button onClick={() => setIssueDepositOpen(false)}><Icon name="close"/></button>
            </div>
            <form onSubmit={handleIssueDeposit}>
              <div className="form-grid">
                <label>
                  <span>Customer Name<b>*</b></span>
                  <input required value={depCustomer} onChange={e => setDepCustomer(e.target.value)} placeholder="e.g. Maria Santos" />
                </label>
                <label>
                  <span>Cylinder Serial<b>*</b></span>
                  <input required value={depSerial} onChange={e => setDepSerial(e.target.value)} placeholder="e.g. SG-11-008122" />
                </label>
                <label>
                  <span>Cylinder Size & Valve</span>
                  <input required value={depSize} onChange={e => setDepSize(e.target.value)} placeholder="e.g. 11.0 kg POL" />
                </label>
                <label>
                  <span>Deposit Cash Amount (₱)<b>*</b></span>
                  <input required type="number" value={depAmount} onChange={e => setDepAmount(e.target.value)} placeholder="1800" />
                </label>
              </div>
              <div className="detail-note" style={{ marginTop: 12 }}>
                <span>ℹ</span> Deposit amount will be held in the customer deposit trust ledger and is 100% refundable upon surrender of this official SEAGAS shell.
              </div>
              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setIssueDepositOpen(false)}>Cancel</Button>
                <Button type="submit">Issue Official Deposit Slip</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Refund Deposit Modal */}
      {refundModalItem && (
        <div className="modal-backdrop" onMouseDown={() => setRefundModalItem(null)}>
          <div className="modal payment-modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Process Shell Return & Cash Refund</h2>
                <p>Surrender cylinder shell and return customer cash deposit.</p>
              </div>
              <button onClick={() => setRefundModalItem(null)}><Icon name="close"/></button>
            </div>
            <div className="detail-list">
              <div><span>Deposit Slip ID:</span><strong>{refundModalItem[0]}</strong></div>
              <div><span>Customer:</span><strong>{refundModalItem[1]}</strong></div>
              <div><span>Cylinder Serial:</span><strong>{refundModalItem[2]}</strong></div>
              <div><span>Shell Type:</span><strong>{refundModalItem[3]}</strong></div>
              <div><span>Refund Cash Amount:</span><strong style={{ color: '#078a76', fontSize: 16 }}>{refundModalItem[4]}</strong></div>
              <div><span>Days Out:</span><strong>{refundModalItem[6]}</strong></div>

              <div className="detail-note">
                <span>✓</span> Shell inspected: Footring solid, valve intact. Surrender confirmed. ₱{refundModalItem[4]} will be disbursed from cash drawer.
              </div>

              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setRefundModalItem(null)}>Cancel</Button>
                <Button onClick={handleApproveRefund}>Approve & Refund Cash</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <MasterHeader
        title="Customers & Suki Management"
        subtitle="Manage customer profiles, suki relationships, credit standing (paautang), and cylinder deposit liabilities."
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            {tab === 'Cylinder Deposits & Escrow' ? (
              <Button icon="plus" onClick={() => setIssueDepositOpen(true)}>Issue Deposit Slip</Button>
            ) : (
              <Button icon="plus" onClick={() => setAddModal(true)}>Add Customer</Button>
            )}
          </div>
        }
      />
      <FilterTabs
        items={['All Customers', 'Suki Accounts', 'Commercial / Business', 'Credit & Paautang (Kartilya)', 'Cylinder Deposits & Escrow']}
        active={tab}
        onChange={setTab}
      />

      {tab === 'Cylinder Deposits & Escrow' ? (
        <>
          <StatStrip
            stats={[
              { label: 'Total Deposit Liability Held', value: '₱522,000.00', sub: 'Refundable cash trust fund' },
              { label: 'Active Deposit Slips', value: '290 Slips', sub: 'Customers holding shells', status: 'ok' },
              { label: 'Overdue Review (>60 Days)', value: '18 Cylinders', sub: 'Risk of unreturned basyo', status: 'danger' },
              { label: 'Zero-Deposit Suki Accounts', value: '8 Accounts', sub: 'Owner authorized trust credit', status: 'warning' },
            ]}
          />

          <Card className="records-card master-table">
            <div className="toolbar">
              <SearchField value={search} onChange={setSearch} placeholder="Search deposit slips, customers, or serials..." />
              <Button icon="plus" onClick={() => setIssueDepositOpen(true)}>
                Issue New Deposit Slip
              </Button>
              <Button variant="secondary" icon="download" onClick={() => showToast('Customer deposits exported: Cylinder_Deposits_Master.xlsx')}>
                Export Deposit List
              </Button>
            </div>
            <DataTable
              columns={[
                'Deposit Slip ID',
                'Customer Name',
                'Cylinder Serial',
                'Size & Valve',
                'Deposit Amount',
                'Date Issued',
                'Outstanding',
                'Status & Action',
              ]}
              rows={deposits.filter(r => r.join(' ').toLowerCase().includes(search.toLowerCase())).map(row => [
                row[0],
                row[1],
                row[2],
                row[3],
                row[4],
                row[5],
                row[6],
                row[7] === 'Active Deposit' ? 'Active (Click to Refund)' : row[7]
              ])}
              onRowClick={(row) => {
                if (row[7].includes('Active')) {
                  setRefundModalItem(row)
                }
              }}
            />
          </Card>
        </>
      ) : tab === 'Credit & Paautang (Kartilya)' ? (
        <>
          <StatStrip
            stats={[
              { label: 'Total Outstanding Paautang', value: '₱134,000.00', sub: '28 commercial accounts' },
              { label: 'Due for Collection', value: '₱68,500.00', sub: 'Oct 15–18 cycle', status: 'info' },
              { label: 'Overdue > 30 Days', value: '₱18,200.00', sub: 'Hard lock alert', status: 'danger' },
              { label: 'Collected This Week', value: '₱42,300.00', sub: '+18% vs last week', status: 'ok' },
            ]}
          />
          <Card className="records-card master-table">
            <div className="toolbar">
              <SearchField value={search} onChange={setSearch} placeholder="Search customer, business, or account..." />
              {setPage && (
                <Button variant="secondary" icon="bell" onClick={() => setPage('AR & Risk Control')}>
                  AR & Risk Control 🔒
                </Button>
              )}
              <Button variant="secondary" icon="coins" onClick={() => setPaymentModal(true)}>Record Payment</Button>
            </div>
            <DataTable
              columns={['Customer / Business', 'Suki Badge', 'Contact & Address', 'Credit Limit', 'Current Balance', 'Last Payment', 'Next Due Date', 'Actions']}
              rows={filteredCredit}
              onRowClick={() => setKartilya(true)}
            />
          </Card>
        </>
      ) : (
        <Card className="records-card master-table">
          <div className="toolbar">
            <SearchField value={search} onChange={setSearch} placeholder="Search customers, company, contact, or barangay..." />
            <Button variant="secondary" icon="download" onClick={() => showToast('Customers_Master_Directory.xlsx exported successfully!')}>
              Export List
            </Button>
          </div>
          <DataTable
            columns={['Customer Name', 'Company Name', 'Contact #', 'Address / Barangay', 'TIN', 'Preferred Brand & Valve', 'Lending Tier', 'Credit / Limit', 'Active Deposits', 'Actions']}
            rows={filteredCustomers}
            onRowClick={setDrawer}
          />
          <div className="pagination">
            <span>Showing {filteredCustomers.length} of {customerList.length} customers</span>
            <div>
              <button>‹</button>
              <button className="current">1</button>
              <button>›</button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

function CylinderFleet({ setPage }: { setPage: (page: string) => void }) {
  const initialFleet = [
    ['SG-11-004521', 'SEAGAS (SEAOIL)', '11.0 kg', 'POL Threaded', '13.4 kg', 'Circulating Float', 'Lagao Household Route', 'Mar 2028 · Valid', 'Inspect / Transfer'],
    ['SG-11-003998', 'SEAGAS (SEAOIL)', '11.0 kg', 'Compact (Snap-On)', '12.8 kg', 'Empty Basyo (Yard)', 'Main Warehouse Yard', 'Dec 2027 · Valid', 'Inspect / Transfer'],
    ['SG-11-004617', 'SEAGAS (SEAOIL)', '11.0 kg', 'Snap-On (SNP)', '13.1 kg', 'On Truck', 'Truck 03 · Mark Ramos', 'Jun 2029 · Valid', 'Inspect / Transfer'],
    ['SG-50-001004', 'SEAGAS (SEAOIL)', '50.0 kg', 'POL Heavy', '48.5 kg', 'Full (Warehouse)', 'Main Warehouse Staging', 'Oct 2026 · Due Soon', 'Inspect / Transfer'],
    ['SG-11-002109', 'SEAGAS (SEAOIL)', '11.0 kg', 'Compact (Snap-On)', '13.0 kg', 'Quarantine Bay', 'Quarantine Bay · Bay 02', 'Expired · Due Requal', 'Inspect / Transfer'],
    ['SG-11-008122', 'SEAGAS (SEAOIL)', '11.0 kg', 'POL Threaded', '13.5 kg', 'Full (Warehouse)', 'Main Warehouse Staging', 'Aug 2029 · Valid', 'Inspect / Transfer'],
    ['SG-50-001923', 'SEAGAS (SEAOIL)', '50.0 kg', 'POL Heavy', '49.2 kg', 'Commercial Float', 'Kusina Ni Nanay (Commercial Float)', 'Jan 2028 · Valid', 'Inspect / Transfer'],
    ['SG-11-007731', 'SEAGAS (SEAOIL)', '11.0 kg', 'POL Threaded', '13.3 kg', 'Quarantine Bay', 'Quarantine Bay · Bay 01', 'Expired · Illegal to Refill', 'Inspect / Transfer'],
    ['SG-11-006240', 'SEAGAS (SEAOIL)', '11.0 kg', 'Snap-On (SNP)', '13.0 kg', 'Empty Basyo (Yard)', 'Main Yard Staging', 'May 2029 · Valid', 'Inspect / Transfer'],
    ['SG-02-000881', 'SEAGAS (SEAOIL)', '2.7 kg', 'Camping Valve', '4.2 kg', 'Full (Warehouse)', 'Main Warehouse Staging', 'Jul 2028 · Valid', 'Inspect / Transfer'],
  ]

  const initialMovements = [
    ['08:24 AM', 'SG-11-004521', 'SEAGAS (SEAOIL)', 'POS Palit-Basyo Dispatch', 'Yard Staff Paolo', 'ST001', 'Main Warehouse', 'Circulating Float', 'Completed'],
    ['09:15 AM', 'SG-11-003998', 'SEAGAS (SEAOIL)', 'Palit-Basyo Return Intake', 'Yard Staff ST002', 'ST002', 'Circulating Float', 'Empty Basyo (Yard)', 'Completed'],
    ['10:02 AM', 'SG-11-004617', 'SEAGAS (SEAOIL)', 'Delivery Dispatch', 'Driver Mark Ramos', 'ST003', 'Main Warehouse', 'Truck 03 (En Route)', 'In Transit'],
    ['11:37 AM', 'SG-11-002109', 'SEAGAS (SEAOIL)', 'Quarantine Tag', 'Store Inspector ST001', 'ST001', 'Yard Staging', 'Quarantine Bay', 'Quarantined'],
    ['01:18 PM', 'SG-50-001004', 'SEAGAS (SEAOIL)', 'Supplier Refill Intake', 'Depot Lorry NDX-4821', 'ST004', 'Supplier Truck', 'Full (Warehouse)', 'Completed'],
  ]

  const [tab, setTab] = useState('Master Fleet Register')
  const [fleet, setFleet] = useState(initialFleet)
  const [movements, setMovements] = useState(initialMovements)
  const [search, setSearch] = useState('')
  const [filterSize, setFilterSize] = useState('All')
  const [filterValve, setFilterValve] = useState('All')
  const [filterLocation, setFilterLocation] = useState('All')
  const [filterRequal, setFilterRequal] = useState('All')
  const [toast, setToast] = useState('')

  // Modals state
  const [registerOpen, setRegisterOpen] = useState(false)
  const [inspectorCylinder, setInspectorCylinder] = useState<string[] | null>(null)
  const [dispatchRequalOpen, setDispatchRequalOpen] = useState(false)
  const [manualTransferOpen, setManualTransferOpen] = useState(false)

  // Inspector form fields (for editing location & custody)
  const [editLocation, setEditLocation] = useState('Full (Warehouse)')
  const [editCustodian, setEditCustodian] = useState('Main Warehouse')

  // Register cylinder form fields
  const [regSerial, setRegSerial] = useState('SG-11-009845')
  const [regBrand, setRegBrand] = useState('SEAGAS (SEAOIL)')
  const [regSize, setRegSize] = useState('11.0 kg')
  const [regValve, setRegValve] = useState('POL Threaded')
  const [regTare, setRegTare] = useState('13.3 kg')
  const [regStatus, setRegStatus] = useState('Full (Warehouse)')
  const [regRequal, setRegRequal] = useState('Oct 2031 · Valid')

  // Manual transfer fields
  const [transferSerial, setTransferSerial] = useState('SG-11-003998')
  const [transferTo, setTransferTo] = useState('Quarantine Bay')
  const [transferReason, setTransferReason] = useState('Dented footring noticed during yard inspection')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  function handleOpenInspector(row: string[]) {
    setInspectorCylinder(row)
    setEditLocation(row[5] || 'Full (Warehouse)')
    setEditCustodian(row[6] || 'Main Warehouse')
  }

  function handleSaveInspector() {
    if (!inspectorCylinder) return
    const updated = fleet.map(tank => {
      if (tank[0] === inspectorCylinder[0]) {
        return [
          tank[0],
          tank[1],
          tank[2],
          tank[3],
          tank[4],
          editLocation,
          editCustodian,
          tank[7],
          tank[8],
        ]
      }
      return tank
    })
    setFleet(updated)

    // Log movement
    const newMovement = [
      'Just Now',
      inspectorCylinder[0],
      inspectorCylinder[1],
      'Location Transfer',
      editCustodian,
      'OWNER',
      inspectorCylinder[5],
      editLocation,
      'Completed'
    ]
    setMovements([newMovement, ...movements])

    setInspectorCylinder(null)
    showToast(`Cylinder ${inspectorCylinder[0]} relocated to ${editLocation}!`)
  }

  function handleFlagQuarantine(tankSerial: string) {
    const updated = fleet.map(tank => {
      if (tank[0] === tankSerial) {
        return [
          tank[0],
          tank[1],
          tank[2],
          tank[3],
          tank[4],
          'Quarantine Bay',
          'Defective / Requal Required',
          'Expired · Quarantine Holding',
          tank[8],
        ]
      }
      return tank
    })
    setFleet(updated)
    setInspectorCylinder(null)
    showToast(`Cylinder ${tankSerial} moved to Quarantine Bay under DOE RA 11592!`)
  }

  function handleRegister(e: FormEvent) {
    e.preventDefault()
    const newTank = [
      regSerial,
      regBrand,
      regSize,
      regValve,
      regTare,
      regStatus,
      'Main Warehouse',
      regRequal,
      'Inspect / Transfer',
    ]
    setFleet([newTank, ...fleet])
    setRegisterOpen(false)
    showToast(`Cylinder ${regSerial} registered into Master Fleet!`)
    setRegSerial(`SG-11-00${Math.floor(1000 + Math.random() * 9000)}`)
  }

  function handleManualTransfer(e: FormEvent) {
    e.preventDefault()
    setFleet(prev => prev.map(tank => {
      if (tank[0] === transferSerial) {
        return [tank[0], tank[1], tank[2], tank[3], tank[4], transferTo, transferReason, tank[7], tank[8]]
      }
      return tank
    }))
    const newMovement = [
      'Just Now',
      transferSerial,
      'SEAGAS (SEAOIL)',
      'Manual Yard Transfer',
      'Operations Lead',
      'ST001',
      'Yard Staging',
      transferTo,
      'Completed'
    ]
    setMovements([newMovement, ...movements])
    setManualTransferOpen(false)
    showToast(`Transferred ${transferSerial} to ${transferTo}!`)
  }

  const filteredFleet = useMemo(() => {
    return fleet.filter(row => {
      const matchSearch = row.join(' ').toLowerCase().includes(search.toLowerCase())
      if (!matchSearch) return false
      if (filterSize !== 'All' && row[2] !== filterSize) return false
      if (filterValve !== 'All' && !row[3].toLowerCase().includes(filterValve.toLowerCase())) return false
      if (filterLocation !== 'All' && !row[5].toLowerCase().includes(filterLocation.toLowerCase())) return false
      if (filterRequal !== 'All') {
        if (filterRequal === 'Valid' && !row[7].toLowerCase().includes('valid')) return false
        if (filterRequal === 'Expired' && !row[7].toLowerCase().includes('expired')) return false
        if (filterRequal === 'Due Soon' && !row[7].toLowerCase().includes('due soon')) return false
      }
      return true
    })
  }, [fleet, search, filterSize, filterValve, filterLocation, filterRequal])

  const quarantineTanks = useMemo(() => {
    return fleet.filter(r => r[5].toLowerCase().includes('quarantine') || r[7].toLowerCase().includes('expired') || r[5].toLowerCase().includes('cross-brand'))
  }, [fleet])

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}

      {/* Register Cylinder Modal */}
      {registerOpen && (
        <div className="modal-backdrop" onMouseDown={() => setRegisterOpen(false)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Register Cylinder Asset</h2>
                <p>Register serial number, collar tare weight, valve fitting, and DOE BPS requalification schedule.</p>
              </div>
              <button onClick={() => setRegisterOpen(false)}><Icon name="close"/></button>
            </div>
            <form onSubmit={handleRegister}>
              <div className="form-grid">
                <label>
                  <span>Serial Number (Collar Stamp)<b>*</b></span>
                  <input required value={regSerial} onChange={e => setRegSerial(e.target.value)} placeholder="e.g. SG-11-008912" />
                </label>
                <label>
                  <span>Official Fleet Brand<b>*</b></span>
                  <select value={regBrand} onChange={e => setRegBrand(e.target.value)} style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 11 }}>
                    <option>SEAGAS (SEAOIL)</option>
                  </select>
                </label>
                <label>
                  <span>Cylinder Size (Capacity)</span>
                  <select value={regSize} onChange={e => setRegSize(e.target.value)} style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 11 }}>
                    <option>11.0 kg</option>
                    <option>50.0 kg</option>
                    <option>2.7 kg</option>
                    <option>22.0 kg</option>
                  </select>
                </label>
                <label>
                  <span>Valve Fitting System</span>
                  <select value={regValve} onChange={e => setRegValve(e.target.value)} style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 11 }}>
                    <option>POL Threaded (Standard Screw)</option>
                    <option>Compact 20mm (Snap-On)</option>
                    <option>SNP Auto-Lock</option>
                    <option>POL Heavy (SRV 50kg)</option>
                  </select>
                </label>
                <label>
                  <span>Tare Weight (TW Stamped kg)<b>*</b></span>
                  <input required value={regTare} onChange={e => setRegTare(e.target.value)} placeholder="e.g. 13.4 kg" />
                </label>
                <label>
                  <span>Initial Physical Location</span>
                  <select value={regStatus} onChange={e => setRegStatus(e.target.value)} style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 11 }}>
                    <option>Full (Warehouse)</option>
                    <option>Empty Basyo (Yard)</option>
                    <option>With Customer</option>
                    <option>Quarantine Bay</option>
                  </select>
                </label>
              </div>
              <label className="full-field">
                <span>5-Year Requalification Due Date (BPS Hydrostatic Stamp)</span>
                <input value={regRequal} onChange={e => setRegRequal(e.target.value)} placeholder="e.g. Oct 2031 · Valid" />
              </label>
              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setRegisterOpen(false)}>Cancel</Button>
                <Button type="submit">Save & Register Cylinder</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Forensic Inspector & Location Transfer Modal */}
      {inspectorCylinder && (
        <div className="modal-backdrop" onClick={() => setInspectorCylinder(null)}>
          <div className="modal inspector-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Cylinder Forensic Inspection & Custody Transfer</h2>
                <p>Asset Serial: <strong>{inspectorCylinder[0]}</strong> · {inspectorCylinder[1]} ({inspectorCylinder[2]})</p>
              </div>
              <button onClick={() => setInspectorCylinder(null)}><Icon name="close"/></button>
            </div>

            {/* Forensic Specs */}
            <div className="lifecycle-stats">
              <div>
                <span>Stamped Tare (TW)</span>
                <strong>{inspectorCylinder[4]}</strong>
              </div>
              <div>
                <span>Valve Type</span>
                <strong>{inspectorCylinder[3]}</strong>
              </div>
              <div>
                <span>Current Status</span>
                <strong>{inspectorCylinder[5]}</strong>
              </div>
              <div>
                <span>BPS Requal Status</span>
                <strong style={{ color: inspectorCylinder[7].includes('Expired') ? '#c64a50' : inspectorCylinder[7].includes('Due') ? '#b78103' : '#078a76' }}>
                  {inspectorCylinder[7]}
                </strong>
              </div>
            </div>

            {/* Transfer Location Card */}
            <div className="transfer-card">
              <strong style={{ fontSize: 13, color: '#112849', display: 'block', marginBottom: 10 }}>
                Transfer Physical Location & Custody
              </strong>
              <div className="form-grid">
                <label>
                  <span>Target Location / Bay</span>
                  <select
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 13 }}
                  >
                    <option>Full (Warehouse)</option>
                    <option>Empty Basyo (Yard)</option>
                    <option>With Customer</option>
                    <option>On Truck</option>
                    <option>Quarantine Bay</option>
                    <option>Cross-Brand Swap Cage</option>
                  </select>
                </label>
                <label>
                  <span>Assigned Custodian / Account / Truck</span>
                  <input
                    value={editCustodian}
                    onChange={(e) => setEditCustodian(e.target.value)}
                    placeholder="e.g. Maria Santos or Truck 03"
                    style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 13 }}
                  />
                </label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <Button onClick={handleSaveInspector}>
                  Update Location & Custody
                </Button>
              </div>
            </div>

            {/* Timeline */}
            <div className="lifecycle-timeline">
              <h3>Movement & Compliance History</h3>
              {[
                { date: 'Oct 16, 2026 · 08:24 AM', title: 'Location Recorded', desc: `Current: ${inspectorCylinder[5]} (Custody: ${inspectorCylinder[6]})` },
                { date: 'Oct 02, 2026 · 10:45 AM', title: 'Dispatched to Suki Account', desc: 'Loaded on Delivery Tricycle #03 · Driver Mark Ramos' },
                { date: 'Sep 15, 2026 · 02:15 PM', title: 'Supplier Refill Intake & Tare Verified', desc: 'Received from Refilling Plant · Net Gas: 11.02 kg (Legal)' },
                { date: 'Mar 2023 · BPS Certified', title: '5-Year Hydrostatic Requalification Passed', desc: 'Tested at 3.3 MPa · No wall thinning, footring solid' },
              ].map((ev, i) => (
                <div key={i} className="lifecycle-entry">
                  <div className="lifecycle-icon">{i + 1}</div>
                  <div>
                    <strong>{ev.title}</strong>
                    <span>{ev.date} — {ev.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-actions" style={{ padding: '14px 22px', display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="secondary"
                onClick={() => handleFlagQuarantine(inspectorCylinder[0])}
              >
                Flag for Quarantine Bay (RA 11592)
              </Button>
              <Button onClick={() => setInspectorCylinder(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Transfer Modal */}
      {manualTransferOpen && (
        <div className="modal-backdrop" onMouseDown={() => setManualTransferOpen(false)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Record Physical Cylinder Movement</h2>
                <p>Transfer cylinder between warehouse, yard staging, delivery trucks, or quarantine bay.</p>
              </div>
              <button onClick={() => setManualTransferOpen(false)}><Icon name="close"/></button>
            </div>
            <form onSubmit={handleManualTransfer}>
              <div className="form-grid">
                <label>
                  <span>Select Cylinder Serial<b>*</b></span>
                  <select
                    value={transferSerial}
                    onChange={(e) => setTransferSerial(e.target.value)}
                    style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 13 }}
                  >
                    {fleet.map(tank => (
                      <option key={tank[0]} value={tank[0]}>
                        {tank[0]} · {tank[1]} ({tank[5]})
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Destination Location<b>*</b></span>
                  <select
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.value)}
                    style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 13 }}
                  >
                    <option>Full (Warehouse)</option>
                    <option>Empty Basyo (Yard)</option>
                    <option>On Truck (Dispatch)</option>
                    <option>Quarantine Bay</option>
                    <option>Cross-Brand Swap Cage</option>
                  </select>
                </label>
              </div>
              <label className="full-field">
                <span>Transfer Reason / Custody Notes<b>*</b></span>
                <input required value={transferReason} onChange={e => setTransferReason(e.target.value)} placeholder="e.g. Staged for tomorrow morning truck dispatch" />
              </label>
              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setManualTransferOpen(false)}>Cancel</Button>
                <Button type="submit">Save Movement</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <MasterHeader
        title="Cylinder Fleet Management"
        subtitle="Master fleet inventory, forensic collar inspection, DOE RA 11592 quarantine bay, and physical yard movements."
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" icon="swap" onClick={() => setManualTransferOpen(true)}>
              Record Transfer
            </Button>
            <Button icon="plus" onClick={() => setRegisterOpen(true)}>
              Register Cylinder
            </Button>
          </div>
        }
      />

      {/* Filter Tabs */}
      <FilterTabs
        items={['Master Fleet Register', 'Quarantine & DOE Requalification (RA 11592)', 'Daily Movement & Transfer Log']}
        active={tab}
        onChange={setTab}
      />

      {/* TAB 1: MASTER FLEET REGISTER */}
      {tab === 'Master Fleet Register' && (
        <>
          {/* Fleet Composition Bar (Ops Data Layout) */}
          <FleetCompositionBar />

          <Card className="records-card master-table">
            <div className="filter-toolbar">
              <SearchField value={search} onChange={setSearch} placeholder="Search serial or brand..." />
              <select className="w-size" value={filterSize} onChange={e => setFilterSize(e.target.value)}>
                <option value="All">Size: All</option>
                <option value="11.0 kg">11.0 kg</option>
                <option value="50.0 kg">50.0 kg</option>
                <option value="2.7 kg">2.7 kg</option>
              </select>
              <select className="w-valve" value={filterValve} onChange={e => setFilterValve(e.target.value)}>
                <option value="All">Valve: All</option>
                <option value="POL">POL</option>
                <option value="Compact">Snap-On</option>
                <option value="SNP">SNP</option>
              </select>
              <select className="w-location" value={filterLocation} onChange={e => setFilterLocation(e.target.value)}>
                <option value="All">Location: All</option>
                <option value="Warehouse">Warehouse (Full)</option>
                <option value="Yard">Yard (Empty)</option>
                <option value="Customer">With Customer</option>
                <option value="Truck">On Truck</option>
                <option value="Quarantine">Quarantine</option>
              </select>
              <select className="w-requal" value={filterRequal} onChange={e => setFilterRequal(e.target.value)}>
                <option value="All">Requal: All</option>
                <option value="Valid">Valid</option>
                <option value="Due Soon">Due Soon</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <CylinderRegisterTable
              rows={filteredFleet}
              onInspect={handleOpenInspector}
            />
            <div className="pagination">
              <span>Showing {filteredFleet.length} of {fleet.length} sample tracked cylinders (1,024 master fleet)</span>
              <div>
                <button>‹</button>
                <button className="current">1</button>
                <button>›</button>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* TAB 2: QUARANTINE & DOE REQUALIFICATION */}
      {tab === 'Quarantine & DOE Requalification (RA 11592)' && (
        <>
          <div className="quarantine-banner">
            <div>
              <strong>DOE RA 11592 Cylinder Safety & Compliance Mandate</strong>
              <span>
                All LPG cylinders must undergo hydrostatic pressure testing every 5 years. Operating with expired, dented, or uncertified cylinders carries severe penalties under DOE DC2022-05-0017.
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button
                variant="secondary"
                onClick={() => {
                  showToast('Batch of 15 cylinders dispatched to Solid Gas Hydrostatic Testing Plant (Valenzuela)!')
                }}
              >
                Dispatch to BPS Testing Plant
              </Button>
            </div>
          </div>

          <div className="quarantine-cards">
            <Card>
              <span>Expired 5-Yr BPS Tests</span>
              <strong style={{ color: '#c64a50' }}>42 Tanks</strong>
              <small style={{ color: '#71839c' }}>Due for Hydrostatic Test</small>
            </Card>
            <Card>
              <span>Dented / Defective Footrings</span>
              <strong style={{ color: '#b78103' }}>15 Tanks</strong>
              <small style={{ color: '#71839c' }}>Requires Collar/Base Repair</small>
            </Card>
            <Card>
              <span>Leaking Valve O-Rings</span>
              <strong style={{ color: '#b78103' }}>8 Tanks</strong>
              <small style={{ color: '#71839c' }}>Core Replacement Needed</small>
            </Card>
            <Card>
              <span>Cross-Brand Holding (RA 11592)</span>
              <strong style={{ color: '#1877c9' }}>12 Tanks</strong>
              <small style={{ color: '#71839c' }}>Awaiting Swapping Center Trade</small>
            </Card>
          </div>

          <Card className="records-card master-table">
            <CardTitle
              icon="cylinder"
              title="Quarantined & Non-Compliant Cylinders"
              action={<Badge>{quarantineTanks.length} Tanks Quarantined</Badge>}
            />
            <DataTable
              columns={[
                'Serial Number',
                'Brand',
                'Size',
                'Valve Type',
                'Tare Weight',
                'Quarantine Issue / Defect',
                'Current Bay',
                'Compliance Status',
                'Forensic Inspection',
              ]}
              rows={quarantineTanks}
              onRowClick={handleOpenInspector}
            />
          </Card>
        </>
      )}

      {/* TAB 3: DAILY MOVEMENT & TRANSFER LOG */}
      {tab === 'Daily Movement & Transfer Log' && (
        <Card className="records-card master-table">
          <div className="toolbar">
            <SearchField value={search} onChange={setSearch} placeholder="Search movements by serial, customer, or staff..." />
            <Button icon="swap" onClick={() => setManualTransferOpen(true)}>
              Record Transfer
            </Button>
            <Button variant="secondary" icon="download" onClick={() => showToast('Movement log exported: Daily_Movement_Log_2026-10-16.xlsx')}>
              Export Movement Log
            </Button>
          </div>
          <DataTable
            columns={[
              'Time',
              'Cylinder Serial',
              'Brand',
              'Movement Type',
              'Customer / Custodian',
              'Staff Code',
              'From Location',
              'To Location',
              'Status',
            ]}
            rows={movements.filter(r => r.join(' ').toLowerCase().includes(search.toLowerCase()))}
          />
        </Card>
      )}
    </div>
  )
}


function StoreInventory() {
  const initialProducts = [
    ['REG-CMP-01', 'SEAGAS Snap-On Safety Regulator (20mm)', 'Regulators', 'SEAOIL SEAGAS Depot', '28 pcs', '₱480.00', '₱650.00', '26%', 'In Stock'],
    ['REG-POL-01', 'SEAGAS Heavy Duty Brass POL Screw Regulator', 'Regulators', 'SEAOIL SEAGAS Depot', '15 pcs', '₱380.00', '₱520.00', '27%', 'In Stock'],
    ['HSE-ORG-2M', 'Reinforced Heavy Duty Orange LPG Hose (2m)', 'Hoses & Clamps', 'Eagle Brand', '42 pcs', '₱110.00', '₱200.00', '45%', 'In Stock'],
    ['CLP-SS-01', 'Stainless Steel Worm Clamps (Pair)', 'Hoses & Clamps', 'Local Hardware', '110 pairs', '₱15.00', '₱35.00', '57%', 'In Stock'],
    ['STV-SGL-CI', 'Cast Iron Single Burner High-Pressure Stove', 'Stoves & Burners', 'Kovea', '8 pcs', '₱750.00', '₱1,100.00', '32%', 'In Stock'],
    ['VAL-POL-REP', 'POL Brass Replacement Core Valve', 'Spare Parts', 'BPS Certified', '24 pcs', '₱120.00', '₱220.00', '45%', 'In Stock'],
  ]

  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [addProductModal, setAddProductModal] = useState(false)
  const [stockInModal, setStockInModal] = useState(false)
  const [detailProduct, setDetailProduct] = useState<string[] | null>(null)
  const [toast, setToast] = useState('')

  // Add Product Form
  const [pCode, setPCode] = useState('REG-NEW-01')
  const [pName, setPName] = useState('')
  const [pCategory, setPCategory] = useState('Regulators')
  const [pSupplier, setPSupplier] = useState('')
  const [pStock, setPStock] = useState('20')
  const [pCost, setPCost] = useState('300')
  const [pPrice, setPPrice] = useState('450')

  // Stock In Form
  const [selectedStockProduct, setSelectedStockProduct] = useState(products[0][1])
  const [stockQty, setStockQty] = useState('10')
  const [supplierDr, setSupplierDr] = useState('DR-889104')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  function handleAddProduct(e: FormEvent) {
    e.preventDefault()
    const cost = parseFloat(pCost) || 0
    const price = parseFloat(pPrice) || 0
    const margin = price > 0 ? `${Math.round(((price - cost) / price) * 100)}%` : '0%'
    const newProd = [
      pCode,
      pName,
      pCategory,
      pSupplier || 'Local Distributor',
      `${pStock} pcs`,
      `₱${cost.toFixed(2)}`,
      `₱${price.toFixed(2)}`,
      margin,
      'In Stock',
    ]
    setProducts([newProd, ...products])
    setAddProductModal(false)
    showToast(`Product "${pName}" added to catalog!`)
    setPName('')
  }

  function handleStockIn(e: FormEvent) {
    e.preventDefault()
    const qty = parseInt(stockQty, 10) || 0
    setProducts(products.map(p => {
      if (p[1] === selectedStockProduct) {
        const currentQty = parseInt(p[4].split(' ')[0], 10) || 0
        const newQty = currentQty + qty
        return [p[0], p[1], p[2], p[3], `${newQty} pcs`, p[5], p[6], p[7], 'In Stock']
      }
      return p
    }))
    setStockInModal(false)
    showToast(`Stock In verified! +${qty} units added for ${selectedStockProduct}`)
  }

  const filteredProducts = useMemo(() => {
    return products.filter(row => {
      const matchSearch = row.join(' ').toLowerCase().includes(search.toLowerCase())
      if (!matchSearch) return false
      if (categoryFilter !== 'All' && row[2] !== categoryFilter) return false
      return true
    })
  }, [products, search, categoryFilter])

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}

      {/* Add Product Modal */}
      {addProductModal && (
        <div className="modal-backdrop" onMouseDown={() => setAddProductModal(false)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Add Store Product / Accessory</h2>
                <p>Register retail hardware, stove accessories, and safety regulators.</p>
              </div>
              <button onClick={() => setAddProductModal(false)}><Icon name="close"/></button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="form-grid">
                <label>
                  <span>Item SKU Code<b>*</b></span>
                  <input required value={pCode} onChange={e => setPCode(e.target.value)} placeholder="e.g. HSE-ORG-3M" />
                </label>
                <label>
                  <span>Product Name<b>*</b></span>
                  <input required value={pName} onChange={e => setPName(e.target.value)} placeholder="e.g. Heavy Duty LPG Reinforced Hose (3m)" />
                </label>
                <label>
                  <span>Category<b>*</b></span>
                  <select value={pCategory} onChange={e => setPCategory(e.target.value)} style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 11 }}>
                    <option>Regulators</option>
                    <option>Hoses & Clamps</option>
                    <option>Stoves & Burners</option>
                    <option>Spare Parts</option>
                  </select>
                </label>
                <label>
                  <span>Brand / Supplier</span>
                  <input value={pSupplier} onChange={e => setPSupplier(e.target.value)} placeholder="e.g. Eagle Brand Hardware" />
                </label>
                <label>
                  <span>Opening Stock Quantity</span>
                  <input type="number" value={pStock} onChange={e => setPStock(e.target.value)} placeholder="20" />
                </label>
                <label>
                  <span>Unit Wholesale Cost (₱)<b>*</b></span>
                  <input type="number" required value={pCost} onChange={e => setPCost(e.target.value)} placeholder="250" />
                </label>
                <label>
                  <span>Store Selling Price (₱)<b>*</b></span>
                  <input type="number" required value={pPrice} onChange={e => setPPrice(e.target.value)} placeholder="380" />
                </label>
              </div>
              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setAddProductModal(false)}>Cancel</Button>
                <Button type="submit">Save Product</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock In Modal */}
      {stockInModal && (
        <div className="modal-backdrop" onMouseDown={() => setStockInModal(false)}>
          <div className="modal payment-modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Stock In / Restock Goods</h2>
                <p>Record arrival of merchandise shipments and increase inventory count.</p>
              </div>
              <button onClick={() => setStockInModal(false)}><Icon name="close"/></button>
            </div>
            <form onSubmit={handleStockIn} style={{ padding: '16px 22px' }}>
              <div style={{ display: 'grid', gap: 12 }}>
                <label>
                  <span style={{ fontSize: 12, color: '#688299', fontWeight: 600 }}>Select Product to Restock</span>
                  <select
                    value={selectedStockProduct}
                    onChange={e => setSelectedStockProduct(e.target.value)}
                    style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 13, width: '100%' }}
                  >
                    {products.map(p => <option key={p[0]}>{p[1]}</option>)}
                  </select>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <label>
                    <span style={{ fontSize: 12, color: '#688299', fontWeight: 600 }}>Quantity to Add (pcs)<b>*</b></span>
                    <input type="number" min="1" required value={stockQty} onChange={e => setStockQty(e.target.value)} style={{ height: 38, padding: '0 10px', border: '1px solid #b7ded5', borderRadius: 6, fontSize: 13, fontWeight: 700, color: '#078672' }} />
                  </label>
                  <label>
                    <span style={{ fontSize: 12, color: '#688299', fontWeight: 600 }}>Supplier DR / Invoice #</span>
                    <input required value={supplierDr} onChange={e => setSupplierDr(e.target.value)} style={{ height: 38, padding: '0 10px', border: '1px solid #dce5ed', borderRadius: 6, fontSize: 13 }} />
                  </label>
                </div>
              </div>
              <div className="modal-actions" style={{ marginTop: 18 }}>
                <Button variant="secondary" onClick={() => setStockInModal(false)}>Cancel</Button>
                <Button type="submit">Confirm Stock In</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {detailProduct && (
        <div className="modal-backdrop" onClick={() => setDetailProduct(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>{detailProduct[1]}</h2>
                <p>SKU: {detailProduct[0]} · Category: {detailProduct[2]}</p>
              </div>
              <button onClick={() => setDetailProduct(null)}><Icon name="close"/></button>
            </div>
            <div className="detail-list" style={{ padding: '16px 22px' }}>
              <div><span>Supplier:</span><strong>{detailProduct[3]}</strong></div>
              <div><span>Stock on Hand:</span><strong style={{ color: '#0b8e78', fontSize: 14 }}>{detailProduct[4]}</strong></div>
              <div><span>Wholesale Cost:</span><strong>{detailProduct[5]}</strong></div>
              <div><span>Retail Price:</span><strong>{detailProduct[6]}</strong></div>
              <div><span>Gross Margin:</span><strong>{detailProduct[7]}</strong></div>
              <div><span>Status:</span><Badge>{detailProduct[8]}</Badge></div>
              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setDetailProduct(null)}>Close</Button>
                <Button icon="receive" onClick={() => { setSelectedStockProduct(detailProduct[1]); setDetailProduct(null); setStockInModal(true); }}>
                  Stock In / Restock
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <MasterHeader
        title="Store Inventory"
        subtitle="Retail merchandise, burner accessories, regulators, and store consumables."
        actions={
          <>
            <Button variant="secondary" icon="receive" onClick={() => setStockInModal(true)}>Stock In / Receive Goods</Button>
            <Button icon="plus" onClick={() => setAddProductModal(true)}>Add Product</Button>
          </>
        }
      />
      <div className="mini-stats">
        {[
          ['Active SKUs', `${products.length}`],
          ['Stock Value', '₱86,420'],
          ['Low Stock', '3 items'],
          ['Avg. Margin', '37%'],
        ].map((x, i) => (
          <Card key={x[0]}>
            <span className={`stat-mark mark-${i}`}><Icon name={i === 1 ? 'money' : i === 3 ? 'chart' : 'file'}/></span>
            <div><small>{x[0]}</small><strong>{x[1]}</strong></div>
          </Card>
        ))}
      </div>
      <Card className="records-card master-table">
        <div className="toolbar">
          <SearchField value={search} onChange={setSearch} placeholder="Search item code, product, category, or supplier..." />
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Regulators">Regulators</option>
            <option value="Hoses & Clamps">Hoses & Clamps</option>
            <option value="Stoves & Burners">Stoves & Burners</option>
            <option value="Spare Parts">Spare Parts</option>
          </select>
        </div>
        <DataTable
          columns={['Item Code', 'Product Name', 'Category', 'Brand / Supplier', 'Stock on Hand', 'Unit Cost', 'Selling Price', 'Margin', 'Status']}
          rows={filteredProducts}
          onRowClick={setDetailProduct}
        />
      </Card>
    </div>
  )
}


interface PosInventoryProduct {
  sku: string
  name: string
  category: string
  brand: string
  price: number
  stock: number
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

interface PosCartItem {
  sku: string
  name: string
  category: string
  price: number
  qty: number
  stock: number
}

const posCatalog: PosInventoryProduct[] = [
  {
    sku: 'REG-SNAP-01',
    name: 'SEAGAS Snap-On 20mm Safety Regulator',
    category: 'Regulators',
    brand: 'SEAOIL SEAGAS Depot',
    price: 380,
    stock: 45,
    status: 'In Stock',
  },
  {
    sku: 'REG-POL-02',
    name: 'Heavy-Duty Brass POL Regulator',
    category: 'Regulators',
    brand: 'SEAOIL SEAGAS Depot',
    price: 450,
    stock: 28,
    status: 'In Stock',
  },
  {
    sku: 'HOSE-ORG-01',
    name: 'Reinforced Orange LPG Hose (2m)',
    category: 'Hoses & Clamps',
    brand: 'Eagle Brand',
    price: 180,
    stock: 60,
    status: 'In Stock',
  },
  {
    sku: 'CLAMP-SS-01',
    name: 'Stainless Steel Worm Clamp (Pair)',
    category: 'Hoses & Clamps',
    brand: 'Local Hardware',
    price: 35,
    stock: 120,
    status: 'In Stock',
  },
  {
    sku: 'BRN-CI-01',
    name: 'Cast-Iron Heavy Duty Burner',
    category: 'Stoves & Burners',
    brand: 'Kovea Industrial',
    price: 850,
    stock: 8,
    status: 'Low Stock',
  },
  {
    sku: 'BRN-COMM-40',
    name: 'Heavy Commercial Burner C-40',
    category: 'Stoves & Burners',
    brand: 'SuperFlame GenSan',
    price: 1450,
    stock: 0,
    status: 'Out of Stock',
  },
  {
    sku: 'VAL-POL-REP',
    name: 'POL Brass Replacement Core Valve',
    category: 'Spare Parts',
    brand: 'BPS Certified',
    price: 220,
    stock: 24,
    status: 'In Stock',
  },
]

function SalesPOS() {
  const { settings } = useStationSettings()
  const [type, setType] = useState('Palit-Basyo')
  const [swapCondition, setSwapCondition] = useState('clean')
  const [invoice, setInvoice] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [customer, setCustomer] = useState('Maria Santos · Suki Regular')
  const [customerList, setCustomerList] = useState([
    'Maria Santos · Suki Regular',
    'ABC Restaurant · Suki Commercial',
    'Aling Nena · Suki Regular',
    'LM Food House · Suki Commercial',
    'Walk-In Residential Buyer',
  ])
  const [newCustomerModal, setNewCustomerModal] = useState(false)
  const [newCustName, setNewCustName] = useState('')
  const [newCustPhone, setNewCustPhone] = useState('')
  const [toast, setToast] = useState('')

  // POS Inventory Product Selection Local State
  const [invSearch, setInvSearch] = useState('')
  const [invCategory, setInvCategory] = useState('All')
  const [posCart, setPosCart] = useState<PosCartItem[]>([])

  // Outgoing cylinder serial & safety check
  const [outgoingSerial, setOutgoingSerial] = useState('SG-11-004521')
  const cylinderCheck = checkQuarantineStatus(outgoingSerial)

  const agingDaysThreshold = parseInt(settings.agingLockDays, 10) || 30
  const basePrice = parseFloat(settings.refill11kg) || 1040
  const swapFee = swapCondition === 'offbrand' ? (parseFloat(settings.offBrandRequalFee) || 150) : swapCondition === 'requal' ? (parseFloat(settings.requalTestingFee) || 80) : 0
  const depositFee = type === 'New Cylinder' ? (parseFloat(settings.deposit11kg) || 1800) : 0
  const cylinderSubtotal = basePrice + swapFee + depositFee

  const accessoriesTotal = posCart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const grandTotal = cylinderSubtotal + accessoriesTotal
  const configuredVat = parseFloat(settings.vatRate) || 0
  const isVatRegistered = settings.taxRegistration.includes('12% VAT')
  const vatAmount = isVatRegistered && configuredVat > 0 ? (grandTotal * configuredVat) / (100 + configuredVat) : 0
  const netOfVat = grandTotal - vatAmount

  // Current customer risk evaluation
  const custName = customer.split('·')[0].trim()
  const currentRisk = customerRiskData.find(r => r.name.toLowerCase() === custName.toLowerCase())
  const riskEval = currentRisk ? evaluateRisk(currentRisk, agingDaysThreshold) : null

  const filteredCatalog = useMemo(() => {
    return posCatalog.filter(p => {
      const matchQuery = p.name.toLowerCase().includes(invSearch.toLowerCase()) || p.sku.toLowerCase().includes(invSearch.toLowerCase())
      if (!matchQuery) return false
      if (invCategory !== 'All' && p.category !== invCategory) return false
      return true
    })
  }, [invSearch, invCategory])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  function handleAddToCart(p: PosInventoryProduct) {
    if (p.stock <= 0) return
    setPosCart(prev => {
      const existing = prev.find(i => i.sku === p.sku)
      if (existing) {
        if (existing.qty < p.stock) {
          return prev.map(i => (i.sku === p.sku ? { ...i, qty: i.qty + 1 } : i))
        }
        return prev
      }
      return [...prev, { sku: p.sku, name: p.name, category: p.category, price: p.price, qty: 1, stock: p.stock }]
    })
    showToast(`Added ${p.name} to invoice!`)
  }

  function handleIncrement(sku: string) {
    setPosCart(prev =>
      prev.map(i => {
        if (i.sku === sku && i.qty < i.stock) {
          return { ...i, qty: i.qty + 1 }
        }
        return i
      })
    )
  }

  function handleDecrement(sku: string) {
    setPosCart(prev => {
      const item = prev.find(i => i.sku === sku)
      if (item && item.qty <= 1) {
        return prev.filter(i => i.sku !== sku)
      }
      return prev.map(i => (i.sku === sku ? { ...i, qty: i.qty - 1 } : i))
    })
  }

  function handleRemoveCartItem(sku: string) {
    setPosCart(prev => prev.filter(i => i.sku !== sku))
    showToast('Removed item from invoice.')
  }

  function handleAddQuickCustomer(e: FormEvent) {
    e.preventDefault()
    const entry = `${newCustName} · Retail Buyer`
    setCustomerList([entry, ...customerList])
    setCustomer(entry)
    setNewCustomerModal(false)
    showToast(`Customer "${newCustName}" selected for checkout!`)
    setNewCustName('')
    setNewCustPhone('')
  }

  function handleCompleteSale() {
    if (cylinderCheck.isQuarantined) {
      showToast('Blocked! Cannot release a quarantined cylinder under safety law.')
      return
    }
    if (riskEval && riskEval.locked) {
      showToast('Transaction blocked — account is hard-locked. Resolve the outstanding violation first.')
      return
    }
    setInvoice(true)
    showToast(`Sale completed! Official BIR Invoice generated for ${custName}`)
  }

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}

      {/* Invoice Modal */}
      {invoice && (
        <InvoiceModal
          data={{
            invoiceNo: `${settings.invoicePrefix}0315`,
            customerName: custName,
            customerBiz: custName.includes('Restaurant') || custName.includes('Food') || custName.includes('Bakery') ? custName : '—',
            address: 'J. Catolico St., Brgy. Lagao, GenSan',
            contact: '0917 234 8891',
            tin: 'TIN-882-194',
            staffCode: 'ST001',
            staffName: 'Paolo Mendoza',
            paymentMethod: paymentMethod,
            amountPaid: paymentMethod === 'Paautang / Credit' ? 0 : grandTotal,
            creditOutstanding: paymentMethod === 'Paautang / Credit'
              ? (currentRisk?.currentBalance || 0)
              : 0,
            serial: outgoingSerial,
            brand: settings.brandName,
            netWeight: '11.0 kg',
            cylinderUnitPrice: basePrice,
            depositFee: depositFee,
            swapFee: swapFee,
            hasReturnedEmpty: type === 'Palit-Basyo',
            returnedSerial: swapCondition === 'offbrand' ? 'Off-Brand Shell (Non-SEAGAS)' : 'SG-11-003871',
            vatClassification: isVatRegistered ? 'vatable' : 'exempt',
            additionalItems: posCart.map(item => ({
              name: item.name,
              sku: item.sku,
              qty: item.qty,
              unitPrice: item.price,
            })),
          }}
          onClose={() => setInvoice(false)}
        />
      )}

      {/* Quick Add Customer Modal */}
      {newCustomerModal && (
        <div className="modal-backdrop" onMouseDown={() => setNewCustomerModal(false)}>
          <div className="modal payment-modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Quick Add Walk-In Customer</h2>
                <p>Register customer details for immediate receipting.</p>
              </div>
              <button onClick={() => setNewCustomerModal(false)}><Icon name="close"/></button>
            </div>
            <form onSubmit={handleAddQuickCustomer} style={{ padding: '16px 22px' }}>
              <div style={{ display: 'grid', gap: 12 }}>
                <label>
                  <span style={{ fontSize: 12, color: '#688299', fontWeight: 600 }}>Customer Full Name<b>*</b></span>
                  <input required value={newCustName} onChange={e => setNewCustName(e.target.value)} placeholder="e.g. Roberto Gomez" style={{ height: 38, padding: '0 10px', border: '1px solid #dce5ed', borderRadius: 6, fontSize: 13 }} />
                </label>
                <label>
                  <span style={{ fontSize: 12, color: '#688299', fontWeight: 600 }}>Mobile Phone Number<b>*</b></span>
                  <input required value={newCustPhone} onChange={e => setNewCustPhone(e.target.value)} placeholder="0917 000 0000" style={{ height: 38, padding: '0 10px', border: '1px solid #dce5ed', borderRadius: 6, fontSize: 13 }} />
                </label>
              </div>
              <div className="modal-actions" style={{ marginTop: 18 }}>
                <Button variant="secondary" onClick={() => setNewCustomerModal(false)}>Cancel</Button>
                <Button type="submit">Add & Select Customer</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MasterHeader
        title="Sales & Exchange POS"
        subtitle="Process walk-in transactions, exchanges (palit-basyo), new tank deposits, and off-brand swap fees."
        actions={<span className="register-status"><i /> Register Open · ST001 Paolo</span>}
      />
      <div className="pos-layout">
        <Card className="pos-builder">
          <CardTitle icon="swap" title="Order Builder" subtitle="Scan outgoing/incoming cylinder assets & select store inventory accessories" />

          {/* 1. Customer Selection */}
          <div className="pos-section">
            <label className="field-label">Customer Selection</label>
            <div className="inline-field">
              <select
                value={customer}
                onChange={e => setCustomer(e.target.value)}
              >
                {customerList.map(c => <option key={c}>{c}</option>)}
              </select>
              <Button variant="secondary" icon="plus" onClick={() => setNewCustomerModal(true)}>New Customer</Button>
            </div>

            {/* Real-time AR Risk Check Indicator */}
            {riskEval && (
              <>
                {riskEval.locked ? (
                  <div className="pos-risk-alert">
                    <div>
                      <strong>🔒 Account Hard-Locked — Cannot Process ({riskEval.reason === 'BOTH' ? 'Aging + Float Breach' : riskEval.reason === 'AGING' ? 'Overdue Invoice' : 'Float Limit Exceeded'})</strong>
                      <span>
                        {riskEval.reason === 'AGING' && `Oldest bill is ${currentRisk?.oldestInvoiceDays} days overdue (limit: ${agingDaysThreshold}d). Collect payment to clear the lock.`}
                        {riskEval.reason === 'FLOAT' && `Customer holds ${currentRisk?.currentFloat} unreturned tanks (max: ${currentRisk?.maxFloatLimit}). Require shell return to clear.`}
                        {riskEval.reason === 'BOTH' && `Both aging (${currentRisk?.oldestInvoiceDays}d) and float (${currentRisk?.currentFloat}/${currentRisk?.maxFloatLimit}) limits breached. Resolve both to unlock.`}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="pos-risk-ok" style={{ marginTop: 8 }}>
                    <Icon name="check" size={14} />
                    <span>Account in Good Standing · Lending Tier: <strong>{currentRisk?.lendingTier}</strong> (Float: {currentRisk?.currentFloat}/{currentRisk?.maxFloatLimit})</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 2. Transaction Type Switch */}
          <div className="pos-section">
            <label className="field-label">Transaction Type</label>
            <div className="type-switch">
              <button
                type="button"
                className={type === 'Palit-Basyo' ? 'active' : ''}
                onClick={() => setType('Palit-Basyo')}
              >
                <Icon name="swap" />
                <b>Palit-Basyo</b>
                <span>Gas charge only</span>
              </button>
              <button
                type="button"
                className={type === 'New Cylinder' ? 'active' : ''}
                onClick={() => setType('New Cylinder')}
              >
                <Icon name="cylinder" />
                <b>New Cylinder Purchase</b>
                <span>Gas + shell deposit</span>
              </button>
            </div>
          </div>

          {/* 3. Outgoing Full Tank */}
          <div className="pos-section">
            <div className="pos-section-title">
              <h3>Outgoing Full Tank (SEAGAS Fleet)</h3>
              <StatusChip tone={cylinderCheck.isQuarantined ? 'danger' : 'ok'}>
                {cylinderCheck.isQuarantined ? 'Quarantined · Blocked' : 'Full Stock · Ready'}
              </StatusChip>
            </div>
            <div className="pos-fields">
              <label>
                <span>Brand</span>
                <input value="SEAGAS (SEAOIL)" readOnly />
              </label>
              <label>
                <span>Size</span>
                <input value="11.0 kg" readOnly />
              </label>
              <label>
                <span>Valve System</span>
                <input value="POL Threaded" readOnly />
              </label>
              <label>
                <span>Serial Scanner</span>
                <input
                  value={outgoingSerial}
                  onChange={e => setOutgoingSerial(e.target.value)}
                  style={cylinderCheck.isQuarantined ? { borderColor: '#ef4444', background: '#fdf2f2', color: '#b91c1c', fontWeight: 'bold' } : {}}
                  placeholder="Scan or type SG-* serial"
                />
              </label>
            </div>

            {cylinderCheck.isQuarantined ? (
              <div className="quarantine-stop-alert">
                <Icon name="close" size={16} />
                <div>
                  <strong>⛔ CANNOT SELL: Cylinder is Quarantined</strong>
                  <span>{cylinderCheck.reason}</span>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#71839c' }}>Try quick test:</span>
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ height: 24, fontSize: 11, padding: '0 8px' }}
                  onClick={() => setOutgoingSerial('SG-11-004521')}
                >
                  ✓ Good Tank (SG-11-004521)
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ height: 24, fontSize: 11, padding: '0 8px', color: '#c64a50' }}
                  onClick={() => setOutgoingSerial('SG-11-002109')}
                >
                  ⚠ Quarantined Tank (SG-11-002109)
                </button>
              </div>
            )}
          </div>

          {/* 4. Incoming Empty Basyo (if Palit-Basyo) */}
          {type === 'Palit-Basyo' && (
            <div className="pos-section incoming">
              <div className="pos-section-title">
                <h3>Incoming Empty Basyo (SEAGAS Standard)</h3>
                <StatusChip tone="info">Shell Return</StatusChip>
              </div>
              <div className="pos-fields">
                {[
                  ['Brand Received', 'SEAGAS (SEAOIL)'],
                  ['Serial Stamped', 'SG-11-003871'],
                ].map((x) => (
                  <label key={x[0]}>
                    <span>{x[0]}</span>
                    <input value={x[1]} readOnly />
                  </label>
                ))}
              </div>

              <div className="swap-condition-selector">
                <span className="field-label" style={{ marginTop: 10, display: 'block' }}>Shell Inspection Status</span>
                <div className="condition-radios">
                  <label className={`condition-chip ${swapCondition === 'clean' ? 'active' : ''}`}>
                    <input type="radio" name="swap" checked={swapCondition === 'clean'} onChange={() => setSwapCondition('clean')} />
                    <span>✓ Standard SEAGAS Basyo Returned (₱0)</span>
                  </label>
                  <label className={`condition-chip ${swapCondition === 'requal' ? 'active' : ''}`}>
                    <input type="radio" name="swap" checked={swapCondition === 'requal'} onChange={() => setSwapCondition('requal')} />
                    <span>⚠ Expired / Due Requal (+₱80 BPS Test)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* 5. Inventory Items (Accessories & Hardware) */}
          <div className="pos-inventory-section">
            <div className="pos-inventory-header">
              <div>
                <h3><Icon name="receive" size={16} /> Inventory Items (Accessories & Parts)</h3>
                <p>Select safety regulators, reinforced hoses, burners, and store hardware</p>
              </div>
              <span className="pos-inventory-badge">{filteredCatalog.length} Products</span>
            </div>

            <div className="pos-inventory-controls">
              <div className="pos-inventory-search-wrap">
                <Icon name="search" size={14} />
                <input
                  type="text"
                  value={invSearch}
                  onChange={e => setInvSearch(e.target.value)}
                  placeholder="Search inventory items, SKU code, or parts..."
                />
              </div>
            </div>

            <div className="pos-inventory-filter-pills">
              {['All', 'Regulators', 'Hoses & Clamps', 'Stoves & Burners', 'Spare Parts'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`pos-pill-btn ${invCategory === cat ? 'active' : ''}`}
                  onClick={() => setInvCategory(cat)}
                >
                  {cat === 'All' ? 'All Categories' : cat}
                </button>
              ))}
            </div>

            <div className="pos-inventory-grid">
              {filteredCatalog.map(p => {
                const inCart = posCart.find(i => i.sku === p.sku)
                const qtyInCart = inCart?.qty || 0
                const isSelected = qtyInCart > 0
                const isOut = p.stock <= 0
                const isLow = p.stock > 0 && p.stock <= 10

                return (
                  <div
                    key={p.sku}
                    className={`pos-product-card ${isSelected ? 'selected' : ''} ${isOut ? 'out-of-stock' : ''}`}
                  >
                    <div className="pos-product-card-head">
                      <span className="pos-product-sku">{p.sku}</span>
                      <span className={`pos-stock-tag ${isOut ? 'out-of-stock' : isLow ? 'low-stock' : 'in-stock'}`}>
                        <i /> {isOut ? 'Out of Stock' : isLow ? `Low Stock (${p.stock})` : `In Stock (${p.stock})`}
                      </span>
                    </div>

                    <h4 className="pos-product-title" title={p.name}>{p.name}</h4>
                    <div className="pos-product-category-hint">{p.category} · {p.brand}</div>

                    <div className="pos-product-foot">
                      <span className="pos-product-price">₱{p.price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
                      {isSelected ? (
                        <div className="pos-stepper">
                          <button
                            type="button"
                            className="pos-stepper-btn"
                            onClick={() => handleDecrement(p.sku)}
                            title="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="pos-stepper-val">{qtyInCart}</span>
                          <button
                            type="button"
                            className="pos-stepper-btn"
                            onClick={() => handleIncrement(p.sku)}
                            disabled={qtyInCart >= p.stock}
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="pos-add-btn"
                          disabled={isOut}
                          onClick={() => handleAddToCart(p)}
                        >
                          <Icon name="plus" size={12} /> Add
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        {/* Right Column: Sticky Invoice & Checkout Panel */}
        <Card className="pos-invoice">
          <div className="pos-invoice-header">
            <div>
              <span className="pos-invoice-badge">Official BIR Invoice</span>
              <div className="pos-invoice-num">{'INV-2026-0315'}</div>
            </div>
            <div className="pos-invoice-meta">
              <strong>October 16, 2026</strong><br />
              <span>Cashier: ST001 Paolo Mendoza</span><br />
              <small style={{ color: '#078a76', fontWeight: 600 }}>{custName}</small>
            </div>
          </div>

          {/* 1. LPG Charges */}
          <div className="pos-invoice-section-label">
            1. LPG & Cylinder Assets
            <span>Cylinder Flow</span>
          </div>

          <div className="pos-invoice-row">
            <div className="pos-invoice-row-info">
              <strong>11.0 kg SEAGAS LPG Refill</strong>
              <span>Gas content · Serial {outgoingSerial}</span>
            </div>
            <span className="pos-invoice-row-amount">₱{basePrice.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
          </div>

          {type === 'Palit-Basyo' ? (
            <div className="pos-invoice-row" style={{ color: '#64748b' }}>
              <div className="pos-invoice-row-info">
                <strong>Empty Basyo Surrendered</strong>
                <span>{swapCondition === 'offbrand' ? 'Off-Brand Shell (Non-SEAGAS)' : 'SEAGAS Shell SG-11-003871'}</span>
              </div>
              <span className="pos-invoice-row-amount">-1 Shell (₱0.00)</span>
            </div>
          ) : (
            <div className="pos-invoice-row">
              <div className="pos-invoice-row-info">
                <strong>Cylinder Shell Deposit</strong>
                <span>Refundable metallic asset liability</span>
              </div>
              <span className="pos-invoice-row-amount">₱{depositFee.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
            </div>
          )}

          {swapFee > 0 && (
            <div className="pos-invoice-row" style={{ color: '#c06100' }}>
              <div className="pos-invoice-row-info">
                <strong>{swapCondition === 'offbrand' ? 'Ariglo / Off-Brand Swap Fee' : 'Expired Requal Surcharge'}</strong>
                <span>Official swap handling & testing</span>
              </div>
              <span className="pos-invoice-row-amount">+₱{swapFee.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
            </div>
          )}

          {/* 2. Store Inventory Items */}
          <div className="pos-invoice-section-label">
            2. Store Accessories & Hardware
            <span>{posCart.reduce((sum, item) => sum + item.qty, 0)} Items</span>
          </div>

          {posCart.length === 0 ? (
            <div className="pos-empty-cart-hint">
              No store accessories added yet.<br />Cashier may select regulators, hoses, or burners on the left.
            </div>
          ) : (
            posCart.map(item => (
              <div key={item.sku} className="pos-invoice-row">
                <div className="pos-invoice-row-info">
                  <strong>{item.name}</strong>
                  <span>{item.qty} pcs @ ₱{item.price.toFixed(2)} · {item.sku}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="pos-invoice-row-amount">₱{(item.price * item.qty).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
                  <button
                    type="button"
                    className="pos-remove-cart-btn"
                    onClick={() => handleRemoveCartItem(item.sku)}
                    title="Remove item"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}

          {/* 3. Totals & Tax Breakdown */}
          <div className="pos-invoice-totals">
            <div className="pos-totals-line">
              <span>LPG Cylinder Subtotal</span>
              <strong>₱{cylinderSubtotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
            </div>
            {accessoriesTotal > 0 && (
              <div className="pos-totals-line">
                <span>Hardware / Accessories Subtotal</span>
                <strong>₱{accessoriesTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
              </div>
            )}
            <div className="pos-totals-line">
              <span>12% EVAT Included</span>
              <strong>₱{vatAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
            </div>
            <div className="pos-totals-line">
              <span>Net Sales (ex-VAT)</span>
              <strong>₱{netOfVat.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
            </div>
            <div className="pos-totals-line grand">
              <span>Total Due</span>
              <strong>₱{grandTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
            </div>
          </div>

          {/* 4. Payment Method Selection */}
          <div className="pos-payment-block">
            <h4>Payment Method</h4>
            <div className="pos-payment-options">
              {['Cash', 'GCash / Maya', 'Paautang / Credit'].map(m => (
                <button
                  key={m}
                  type="button"
                  className={paymentMethod === m ? 'active' : ''}
                  onClick={() => setPaymentMethod(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Checkout Actions */}
          <div className="pos-checkout-actions">
            <Button
              variant="secondary"
              icon="file"
              onClick={() => setInvoice(true)}
              disabled={cylinderCheck.isQuarantined}
            >
              Print BIR Invoice
            </Button>
            <Button
              icon="check"
              onClick={handleCompleteSale}
              disabled={cylinderCheck.isQuarantined}
            >
              {cylinderCheck.isQuarantined ? 'Blocked: Quarantined Tank' : 'Complete & Release'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

function ReceivingQC() {
  const { settings } = useStationSettings()
  const [truckPlate, setTruckPlate] = useState('NDX-4821 (Isuzu 6-Wheeler Lorry)')
  const [driverName, setDriverName] = useState('Rodrigo "Digong" Cruz')
  const [originPlant, setOriginPlant] = useState(settings.depotHub)
  const [grossWeight, setGrossWeight] = useState('24.4')
  const [tareWeight, setTareWeight] = useState('13.4')
  const [confirmed, setConfirmed] = useState(false)
  const [supplierDr, setSupplierDr] = useState('DR-889102')
  const [fullCount, setFullCount] = useState('70')
  const [basyoCount, setBasyoCount] = useState('68')
  const [toast, setToast] = useState('')

  const gross = parseFloat(grossWeight) || 0
  const tare = parseFloat(tareWeight) || 0
  const netGas = (gross - tare).toFixed(2)
  const minNet = parseFloat(settings.minNetWeight11kg) || 10.9
  const maxNet = parseFloat(settings.maxNetWeight11kg) || 11.2
  const isWeightValid = parseFloat(netGas) >= minNet && parseFloat(netGas) <= maxNet

  const checks = [
    'Safety Seal Intact (Tamper-evident holographic cap verified)',
    `Weight Compliance (Spot-check: Gross − Tare = ${minNet}–${maxNet} kg net target)`,
    `${settings.requalYears}-Year Requalification Valid (Dates checked on collar)`,
    'No Rust, Bulging, or Valve Thread Damage',
  ]

  function handleConfirmIntake() {
    setConfirmed(true)
    setToast(`Stock intake verified from Truck ${truckPlate.split(' ')[0]}! 70 tanks added to inventory.`)
    setTimeout(() => setToast(''), 2800)
  }

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}
      <MasterHeader
        title="Receiving & Quality Control"
        subtitle="Record incoming supplier refilled cylinders, verify net gas weight vs tare weight, and document empty basyo returns."
      />
      <div className="receiving-layout">
        <Card className="receiving-form">
          <CardTitle icon="receive" title="Supplier Delivery & Empties Handover" />
          <div className="master-form">
            <label>
              <span>Supplier Name</span>
              <input value="SEAOIL SEAGAS Bulk Terminal (Makar, GenSan)" readOnly />
            </label>
            <label>
              <span>Supplier DR / Sales Invoice No.<b>*</b></span>
              <input value={supplierDr} onChange={e => setSupplierDr(e.target.value)} />
            </label>
            <label>
              <span>Delivery Truck Plate No. (DOE Registered)<b>*</b></span>
              <input
                value={truckPlate}
                onChange={e => setTruckPlate(e.target.value)}
                placeholder="e.g. NDX-4821"
              />
            </label>
            <label>
              <span>Plant Driver / Hauler Name<b>*</b></span>
              <input
                value={driverName}
                onChange={e => setDriverName(e.target.value)}
                placeholder="e.g. Rodrigo Cruz"
              />
            </label>
            <label>
              <span>Refilling Plant Origin</span>
              <input
                value={originPlant}
                onChange={e => setOriginPlant(e.target.value)}
              />
            </label>
            <label>
              <span>Delivery Date</span>
              <input value="October 16, 2026" readOnly />
            </label>
            <label>
              <span>Receiving Staff Code</span>
              <input value="ST004 · Cris Bautista" readOnly />
            </label>
            <label>
              <span>Supplier Collection Receipt (CR)</span>
              <input value="CR-5541 (Signed by Refiller Driver)" readOnly />
            </label>
            <label>
              <span>Incoming Full Cylinders (units)<b>*</b></span>
              <input value={fullCount} onChange={e => setFullCount(e.target.value)} />
            </label>
            <label>
              <span>Outgoing Empty Basyo Surrendered (units)<b>*</b></span>
              <input value={basyoCount} onChange={e => setBasyoCount(e.target.value)} />
            </label>
          </div>

          <div style={{ padding: '0 16px 16px' }}>
            <div className="spot-weight-calculator">
              <span className="field-label">Spot-Weighing Test (Scale Verification)</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 10, marginTop: 6 }}>
                <label>
                  <span style={{ fontSize: 11, color: '#71839c' }}>Gross Scale (kg)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={grossWeight}
                    onChange={(e) => setGrossWeight(e.target.value)}
                    style={{ height: 36, padding: '0 8px', border: '1px solid #dce5ed', borderRadius: 6, width: '100%', fontSize: 13 }}
                  />
                </label>
                <label>
                  <span style={{ fontSize: 11, color: '#71839c' }}>Stamped TW (kg)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={tareWeight}
                    onChange={(e) => setTareWeight(e.target.value)}
                    style={{ height: 36, padding: '0 8px', border: '1px solid #dce5ed', borderRadius: 6, width: '100%', fontSize: 13 }}
                  />
                </label>
                <div style={{ padding: '6px 10px', background: isWeightValid ? '#eaf8f5' : '#feebec', borderRadius: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ fontSize: 11, color: '#71839c' }}>Calculated Net Gas</span>
                  <strong style={{ fontSize: 14, color: isWeightValid ? '#087b69' : '#c64a50' }}>
                    {netGas} kg {isWeightValid ? '✓ Legal' : '⚠ Kulang'}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="qc-panel">
          <CardTitle icon="check" title="Safety & Weight Inspection" subtitle="All checks are required before signing supplier DR." />
          <div className="qc-list">
            {checks.map((x) => (
              <div key={x}>
                <span className="qc-check">✓</span>
                <div>
                  <strong>{x.split('(')[0]}</strong>
                  <small>({x.split('(')[1]}</small>
                </div>
                <Badge>Passed</Badge>
              </div>
            ))}
          </div>
          <div className="qc-summary">
            <span>Inspection Result</span>
            <strong>4 of 4 Checks Passed · {basyoCount} Empties Reconciled</strong>
          </div>
          <Button icon="check" onClick={handleConfirmIntake}>
            {confirmed ? 'Intake Re-Confirmed & Logged' : 'Confirm Stock Intake & Update Inventory'}
          </Button>
        </Card>
      </div>
    </div>
  )
}

function DispatchSettlement() {
  const initialDeliveries = [
    ['DEL-1018', 'ABC Restaurant', 'National Highway, Brgy. Labangal, GenSan', 'SG-11-004617 · SNP', 'ST003 · Mark Ramos', 'Credit DR', 'In Transit', 'View Slip'],
    ['DEL-1019', 'Maria Santos', 'J. Catolico St., Brgy. Lagao, GenSan', 'SG-11-004722 · POL', 'ST005 · Nilo Cruz', 'COD', 'Pending', 'View Slip'],
    ['DEL-1017', 'Ana Reyes', 'Aparente St., Brgy. City Heights, GenSan', 'SG-11-004305 · CMP', 'ST003 · Mark Ramos', 'Paid', 'Delivered', 'View Slip'],
    ['DEL-1020', 'LM Food House', 'Makar Junction, Brgy. Labangal, GenSan', 'SG-11-004812 · POL', 'ST003 · Mark Ramos', 'Credit DR', 'In Transit', 'View Slip'],
  ]

  const [tab, setTab] = useState('Active Deliveries & Dispatch')
  const [deliveries, setDeliveries] = useState(initialDeliveries)
  const [search, setSearch] = useState('')
  const [selectedSlip, setSelectedSlip] = useState<DeliverySlipData | null>(null)
  const [newDispatchModal, setNewDispatchModal] = useState(false)
  const [approved, setApproved] = useState(false)
  const [toast, setToast] = useState('')

  // New Dispatch Form Fields
  const [dCust, setDCust] = useState('ABC Restaurant')
  const [dAddress, setDAddress] = useState('National Highway, Brgy. Labangal, GenSan')
  const [dSerial, setDSerial] = useState('SG-11-004920 · POL')
  const [dDriver, setDDriver] = useState('ST003 · Mark Ramos')
  const [dPayment, setDPayment] = useState('Credit DR')

  const dSerialCheck = checkQuarantineStatus(dSerial)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  function handleCreateDispatch(e: FormEvent) {
    e.preventDefault()
    if (dSerialCheck.isQuarantined) {
      showToast('Blocked! Cannot dispatch a quarantined cylinder.')
      return
    }
    const newId = `DEL-${1021 + deliveries.length}`
    const newRow = [
      newId,
      dCust,
      dAddress,
      dSerial,
      dDriver,
      dPayment,
      'In Transit',
      'View Slip',
    ]
    setDeliveries([newRow, ...deliveries])
    setNewDispatchModal(false)
    showToast(`Dispatch ${newId} assigned to ${dDriver.split('·')[1]}!`)
  }

  function handleMarkDelivered(delId: string) {
    setDeliveries(deliveries.map(d => d[0] === delId ? [d[0], d[1], d[2], d[3], d[4], d[5], 'Delivered', d[7]] : d))
    showToast(`Delivery ${delId} marked as completed & customer signed!`)
  }

  const filteredDeliveries = useMemo(() => {
    return deliveries.filter(d => d.join(' ').toLowerCase().includes(search.toLowerCase()))
  }, [deliveries, search])

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}

      {/* Delivery Slip Modal */}
      {selectedSlip && (
        <DeliverySlipModal
          data={selectedSlip}
          onClose={() => setSelectedSlip(null)}
          onMarkDelivered={() => handleMarkDelivered(selectedSlip.deliveryId || '')}
        />
      )}

      {/* New Dispatch Modal */}
      {newDispatchModal && (
        <div className="modal-backdrop" onMouseDown={() => setNewDispatchModal(false)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Create Delivery Dispatch Manifest</h2>
                <p>Assign outgoing cylinder to rider, specify destination, and confirm payment terms.</p>
              </div>
              <button onClick={() => setNewDispatchModal(false)}><Icon name="close"/></button>
            </div>
            <form onSubmit={handleCreateDispatch}>
              <div className="form-grid">
                <label>
                  <span>Customer Name<b>*</b></span>
                  <input required value={dCust} onChange={e => setDCust(e.target.value)} placeholder="e.g. Maria Santos" />
                </label>
                <label>
                  <span>Delivery Address / Barangay<b>*</b></span>
                  <input required value={dAddress} onChange={e => setDAddress(e.target.value)} placeholder="e.g. Brgy. Lagao, GenSan" />
                </label>
                <label>
                  <span>Cylinder Serial & Valve System<b>*</b></span>
                  <input
                    required
                    value={dSerial}
                    onChange={e => setDSerial(e.target.value)}
                    placeholder="SG-11-004920 · POL"
                    style={dSerialCheck.isQuarantined ? { borderColor: '#ef4444', background: '#fdf2f2', color: '#b91c1c', fontWeight: 'bold' } : {}}
                  />
                </label>
                <label>
                  <span>Assigned Driver / Rider<b>*</b></span>
                  <select value={dDriver} onChange={e => setDDriver(e.target.value)} style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 13 }}>
                    <option>ST003 · Mark Ramos (Tricycle #03)</option>
                    <option>ST005 · Nilo Cruz (Multicab #01)</option>
                    <option>ST006 · Ronald David (Motorcycle #02)</option>
                  </select>
                </label>
                <label>
                  <span>Payment Terms</span>
                  <select value={dPayment} onChange={e => setDPayment(e.target.value)} style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 13 }}>
                    <option>COD (Cash on Delivery)</option>
                    <option>Credit DR (Paautang / Suki Term)</option>
                    <option>Paid (Online / Store Pre-paid)</option>
                  </select>
                </label>
              </div>

              {dSerialCheck.isQuarantined ? (
                <div className="quarantine-stop-alert" style={{ margin: '14px 0 6px 0' }}>
                  <Icon name="close" size={16} />
                  <div>
                    <strong>⛔ CANNOT DISPATCH: Cylinder is Quarantined</strong>
                    <span>{dSerialCheck.reason}</span>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 8, margin: '10px 0 4px 0', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: '#71839c' }}>Try quick test:</span>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    style={{ height: 24, fontSize: 11, padding: '0 8px' }}
                    onClick={() => setDSerial('SG-11-004920 · POL')}
                  >
                    ✓ Good Tank (SG-11-004920)
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    style={{ height: 24, fontSize: 11, padding: '0 8px', color: '#c64a50' }}
                    onClick={() => setDSerial('SG-11-007731 · POL')}
                  >
                    ⚠ Quarantined Tank (SG-11-007731)
                  </button>
                </div>
              )}

              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setNewDispatchModal(false)}>Cancel</Button>
                <Button type="submit" disabled={dSerialCheck.isQuarantined}>
                  {dSerialCheck.isQuarantined ? 'Blocked: Quarantined Tank' : 'Dispatch Trip'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MasterHeader
        title="Deliveries & Driver Trip Settlement"
        subtitle="Manage delivery dispatch, load manifests, customer drop-offs, and driver liquidation."
        actions={<Button icon="plus" onClick={() => setNewDispatchModal(true)}>New Dispatch</Button>}
      />
      <FilterTabs
        items={['Active Deliveries & Dispatch', 'Driver Trip Settlement & Remittance']}
        active={tab}
        onChange={setTab}
      />
      {tab.startsWith('Active') ? (
        <Card className="records-card master-table">
          <div className="toolbar">
            <SearchField value={search} onChange={setSearch} placeholder="Search delivery ID, customer, address, or driver..." />
            <Button variant="secondary" icon="filter">Filter Status</Button>
          </div>
          <DataTable
            columns={['Delivery ID', 'Customer', 'Barangay Address', 'Cylinder Serial & Valve', 'Assigned Rider', 'Payment Status', 'Status', 'Slip']}
            rows={filteredDeliveries}
            onRowClick={(row) => setSelectedSlip({
              deliveryId: row[0],
              customer: row[1],
              address: row[2],
              serial: row[3],
              driver: row[4],
              status: row[6],
            })}
          />
        </Card>
      ) : (
        <div className="settlement-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <Card>
            <CardTitle icon="cylinder" title="Tank Tally" subtitle="ST003 Mark Ramos · Tricycle #03" />
            {[
              ['Loaded Out', '15 Full Tanks (11kg)'],
              ['Delivered', '13 Full Tanks'],
              ['Returned Undelivered', '2 Full Tanks'],
              ['Empty Basyo Collected', '13 Basyo Tanks'],
            ].map((x) => (
              <div className="summary-row" key={x[0]}>
                <span>{x[0]}</span>
                <strong>{x[1]}</strong>
              </div>
            ))}
            <div className="balanced-box">
              <Icon name="check" />
              <span>Physical Tally</span>
              <strong>Balanced 15/15</strong>
            </div>
          </Card>

          <Card>
            <CardTitle icon="money" title="Cash Remittance" subtitle="Collections & Street Deductions" />
            {[
              ['Gross Cash Expected', '₱14,140.00'],
              ['Authorized Credit (Signed DR)', '-₱2,400.00'],
              ['Fuel Refill (Shell Receipt)', '-₱250.00'],
              ['Tire Vulcanizing (Bulkit)', '-₱80.00'],
              ['Net Remittance Due', '₱11,410.00'],
              ['Cash Remitted by Rider', '₱11,410.00'],
            ].map((x) => (
              <div className="summary-row" key={x[0]}>
                <span>{x[0]}</span>
                <strong style={{ color: x[1].startsWith('-') ? '#c64a50' : 'inherit' }}>{x[1]}</strong>
              </div>
            ))}
            <div className="settlement-total">
              <span>Variance</span>
              <strong>₱0.00</strong>
              <Badge>Exact Match</Badge>
            </div>
          </Card>

          <Card>
            <CardTitle icon="coins" title="Rider Commission" subtitle="Drop incentives & stairwell pay" />
            {[
              ['Delivered Drops (13 @ ₱25)', '₱325.00'],
              ['Akyat-Bahay Floor Fees (2 @ ₱40)', '₱80.00'],
              ['Total Driver Take-Home', '₱405.00'],
              ['Driver Status', approved ? 'Shift Closed & Paid' : 'Eligible for Payout'],
            ].map((x) => (
              <div className="summary-row" key={x[0]}>
                <span>{x[0]}</span>
                <strong style={{ color: x[0].includes('Total') ? '#078d7a' : 'inherit' }}>{x[1]}</strong>
              </div>
            ))}
            <div className="settlement-actions" style={{ marginTop: 24 }}>
              <Button variant="secondary" icon="file" onClick={() => showToast('Settlement voucher printed for ST003!')}>
                Print Voucher
              </Button>
              <Button icon="check" onClick={() => { setApproved(true); showToast('Driver shift settlement approved and closed!'); }}>
                {approved ? 'Shift Finalized' : 'Approve & Close Shift'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

function OperationalExpenses() {
  const initialExpenses = [
    ['EV-2026-0812', 'Oct 16 · 11:42 AM', 'Fuel', 'Shell fuel refill · Delivery Tricycle #03', '₱1,500.00', 'ST001', 'Receipt-0812.jpg', 'Approved'],
    ['EV-2026-0811', 'Oct 16 · 10:15 AM', 'Salaries & Allowances', 'Driver daily cash meal allowance (ST003 Mark Ramos)', '₱1,200.00', 'ST001', 'Voucher-signed.pdf', 'Approved'],
    ['EV-2026-0810', 'Oct 16 · 09:28 AM', 'Utilities', 'GenSan Maynilad / water utility bill (Warehouse)', '₱480.00', 'ST002', 'Receipt-0810.pdf', 'Approved'],
    ['EV-2026-0809', 'Oct 16 · 08:30 AM', 'Maintenance', 'Replacement POL valve O-rings & Teflon rolls (5 units)', '₱500.00', 'ST002', 'Receipt-0809.jpg', 'Approved'],
  ]

  const categories = ['Cost of LPG', 'Loan Interest', 'Fuel', 'Salaries & Allowances', 'Rent', 'Utilities', 'Maintenance', 'Others']

  const [expenses, setExpenses] = useState(initialExpenses)
  const [selectedCat, setSelectedCat] = useState('All')
  const [search, setSearch] = useState('')
  const [newExpenseModal, setNewExpenseModal] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState<string[] | null>(null)
  const [toast, setToast] = useState('')

  // Expense form
  const [eCat, setECat] = useState('Fuel')
  const [eDesc, setEDesc] = useState('')
  const [eAmt, setEAmt] = useState('500')
  const [eStaff, setEStaff] = useState('ST001 · Paolo Mendoza')
  const [eReceipt, setEReceipt] = useState('Receipt-manual.jpg')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  function handleCreateExpense(e: FormEvent) {
    e.preventDefault()
    const amt = parseFloat(eAmt) || 0
    const newId = `EV-2026-${0 + 813 + expenses.length}`
    const staffCode = eStaff.split('·')[0].trim()
    const newRow = [
      newId,
      'Oct 16 · Just now',
      eCat,
      eDesc,
      `₱${amt.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
      staffCode,
      eReceipt,
      'Approved',
    ]
    setExpenses([newRow, ...expenses])
    setNewExpenseModal(false)
    showToast(`Expense voucher ${newId} recorded & approved!`)
    setEDesc('')
    setEAmt('')
  }

  const filteredExpenses = useMemo(() => {
    return expenses.filter(e => {
      const matchCat = selectedCat === 'All' || e[2] === selectedCat
      const matchSearch = e.join(' ').toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [expenses, selectedCat, search])

  const todayTotal = useMemo(() => {
    return expenses.reduce((acc, row) => {
      const val = parseFloat(row[4].replace(/[₱,]/g, '')) || 0
      return acc + val
    }, 0)
  }, [expenses])

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}

      {/* New Expense Modal */}
      {newExpenseModal && (
        <div className="modal-backdrop" onMouseDown={() => setNewExpenseModal(false)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Create Expense Voucher</h2>
                <p>Record daily operational spending, petty cash, fuel, or vehicle maintenance.</p>
              </div>
              <button onClick={() => setNewExpenseModal(false)}><Icon name="close"/></button>
            </div>
            <form onSubmit={handleCreateExpense}>
              <div className="form-grid">
                <label>
                  <span>Category<b>*</b></span>
                  <select value={eCat} onChange={e => setECat(e.target.value)} style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 13 }}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label>
                  <span>Disbursed Amount (₱)<b>*</b></span>
                  <input type="number" required value={eAmt} onChange={e => setEAmt(e.target.value)} placeholder="1500" />
                </label>
                <label>
                  <span>Staff / Cashier Code<b>*</b></span>
                  <select value={eStaff} onChange={e => setEStaff(e.target.value)} style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 13 }}>
                    <option>ST001 · Paolo Mendoza</option>
                    <option>ST002 · Leah Villanueva</option>
                    <option>ST003 · Mark Ramos</option>
                    <option>ST004 · Cris Bautista</option>
                  </select>
                </label>
                <label>
                  <span>Official Receipt / Voucher Reference</span>
                  <input value={eReceipt} onChange={e => setEReceipt(e.target.value)} placeholder="e.g. Shell-OR-9912.pdf" />
                </label>
              </div>
              <label className="full-field">
                <span>Description / Reason<b>*</b></span>
                <textarea required value={eDesc} onChange={e => setEDesc(e.target.value)} placeholder="Detailed reason for operational cash disbursement..." />
              </label>
              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setNewExpenseModal(false)}>Cancel</Button>
                <Button type="submit">Authorize Voucher</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Voucher Modal */}
      {selectedVoucher && (
        <div className="modal-backdrop" onMouseDown={() => setSelectedVoucher(null)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Expense Voucher Details</h2>
                <p>Reference: {selectedVoucher[0]} · Station Operating Fund</p>
              </div>
              <button onClick={() => setSelectedVoucher(null)}><Icon name="close"/></button>
            </div>
            <div className="detail-list">
              <div><span>Voucher Number</span><strong className="cell-mono">{selectedVoucher[0]}</strong></div>
              <div><span>Date & Time</span><strong>{selectedVoucher[1]}</strong></div>
              <div><span>Expense Category</span><Badge>{selectedVoucher[2]}</Badge></div>
              <div><span>Disbursed Amount</span><strong style={{ color: '#c64a50', fontSize: 16 }}>{selectedVoucher[4]}</strong></div>
              <div><span>Authorizing Staff</span><strong>{selectedVoucher[5]}</strong></div>
              <div><span>Receipt Attachment</span><strong className="cell-mono" style={{ color: '#1877c9' }}>{selectedVoucher[6]}</strong></div>
              <div><span>Approval Status</span><StatusChip tone="ok">{selectedVoucher[7]}</StatusChip></div>
              <div style={{ marginTop: 8, padding: '10px 14px', background: '#f8fafc', borderRadius: 6, fontSize: 13, border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: 11, color: '#64748b', display: 'block', marginBottom: 3 }}>Description & Operational Context:</span>
                <strong>{selectedVoucher[3]}</strong>
              </div>
              <div className="modal-actions">
                <Button variant="secondary" icon="file" onClick={() => { showToast(`Printed Voucher ${selectedVoucher[0]}`); setSelectedVoucher(null); }}>
                  Print Voucher
                </Button>
                <Button onClick={() => setSelectedVoucher(null)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Pattern 1: Page Header ── */}
      <MasterHeader
        title="Operational Expenses"
        subtitle="Record daily operational disbursements with required expense categories and receipt attachments."
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              variant="secondary"
              icon="download"
              onClick={() => showToast('Expense ledger exported: Expenses_Oct16_2026.xlsx')}
            >
              Export Ledger
            </Button>
            <Button icon="plus" onClick={() => setNewExpenseModal(true)}>New Expense Voucher</Button>
          </div>
        }
      />

      {/* ── Pattern 2: Stat Strip (One surface, equal cells, hairline dividers) ── */}
      <StatStrip
        stats={[
          {
            label: "Today's Cash Outflow",
            value: `₱${todayTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
            sub: 'Petty cash & driver vouchers',
            status: 'info',
          },
          {
            label: 'Approved Vouchers',
            value: `${expenses.length} Vouchers`,
            sub: 'Audited & signed today',
            status: 'ok',
          },
          {
            label: 'Highest Disbursement',
            value: 'Fuel (41%)',
            sub: '₱1,500.00 for Delivery Tricycle #03',
            status: 'warning',
          },
          {
            label: 'Active Disbursing Staff',
            value: '2 Cashiers',
            sub: 'ST001 Paolo, ST002 Leah on shift',
            status: 'neutral',
          },
        ]}
      />

      {/* ── Pattern 5: Table with Fixed Column Spec ── */}
      <Card className="records-card master-table">
        {/* Pattern 4: Toolbar (36px controls, search takes free space) */}
        <div className="toolbar">
          <SearchField value={search} onChange={setSearch} placeholder="Search voucher #, description, staff, or receipt..." />
          <select
            value={selectedCat}
            onChange={e => setSelectedCat(e.target.value)}
            style={{ width: 190, height: 36 }}
          >
            <option value="All">All Categories ({expenses.length})</option>
            {categories.map(c => {
              const count = expenses.filter(x => x[2] === c).length
              return <option key={c} value={c}>{c} ({count})</option>
            })}
          </select>
          {selectedCat !== 'All' && (
            <Button variant="ghost" onClick={() => setSelectedCat('All')}>Clear Filter</Button>
          )}
        </div>

        <div className="ops-table-wrap">
          <table className="ops-table-fixed">
            <colgroup>
              <col style={{ width: '140px' }} />
              <col style={{ width: '160px' }} />
              <col style={{ width: '170px' }} />
              <col /> {/* flexible: description */}
              <col style={{ width: '110px' }} />
              <col style={{ width: '160px' }} />
              <col style={{ width: '130px' }} />
              <col style={{ width: '110px' }} />
            </colgroup>
            <thead>
              <tr>
                <th className="text-left">Voucher #</th>
                <th className="text-left">Date & Time</th>
                <th className="text-left">Category</th>
                <th className="text-left">Description / Reason</th>
                <th className="text-left">Staff Code</th>
                <th className="text-left">Receipt Attached</th>
                <th className="text-right">Amount</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((row) => (
                <tr
                  key={row[0]}
                  onClick={() => setSelectedVoucher(row)}
                  className="clickable"
                >
                  <td className="cell-mono" style={{ color: '#1877c9', fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ color: '#64748b', fontSize: 13 }}>{row[1]}</td>
                  <td>
                    <Badge>{row[2]}</Badge>
                  </td>
                  <td className="cell-truncate" title={row[3]}>
                    <strong style={{ color: '#0f172a' }}>{row[3]}</strong>
                  </td>
                  <td>
                    <span className="cell-mono">{row[5]}</span>
                  </td>
                  <td className="cell-truncate cell-mono" style={{ color: '#64748b', fontSize: 12 }} title={row[6]}>
                    {row[6]}
                  </td>
                  <td className="text-right tabular-nums">
                    <strong style={{ color: '#c64a50' }}>{row[4]}</strong>
                  </td>
                  <td>
                    <StatusChip tone="ok">{row[7]}</StatusChip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span>Showing {filteredExpenses.length} of {expenses.length} expense records · Today's Total: ₱{todayTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
          <div>
            <button disabled>‹</button>
            <button className="current">1</button>
            <button disabled>›</button>
          </div>
        </div>
      </Card>
    </div>
  )
}

function DailyClosingEOD() {
  const { settings } = useStationSettings()
  const [mode, setMode] = useState<'denom' | 'manual'>('denom')
  const [denoms, setDenoms] = useState<{ [key: string]: number }>({
    1000: 20, // ₱20,000
    500: 15,  // ₱7,500
    200: 8,   // ₱1,600
    100: 12,  // ₱1,200
    50: 4,    // ₱200
    20: 5,    // ₱100
    coins: 20 // ₱20.00 (Total = ₱30,620.00 -> ₱50 shortage)
  })
  const [manualCash, setManualCash] = useState('30620.00')
  const [varianceReason, setVarianceReason] = useState('change')
  const [varianceNotes, setVarianceNotes] = useState('Rider Junjun had ₱50 short change during emergency rush delivery at Brgy. Rosario.')
  const [ownerPin, setOwnerPin] = useState(settings.closingPin)
  const [finalized, setFinalized] = useState(false)
  const [toast, setToast] = useState('')
  const [showZReading, setShowZReading] = useState(false)
  const [checklistState, setChecklistState] = useState<boolean[]>([true, true, true, true, true, true])
  const [eodTab, setEodTab] = useState('1. Cash & Denominations')

  const morningFloat = parseFloat(settings.morningFloat) || 5000
  const expectedCash = 30670.00

  // Compute counted cash from denomination sheet or manual entry
  const denomSum = (denoms[1000] * 1000) +
    (denoms[500] * 500) +
    (denoms[200] * 200) +
    (denoms[100] * 100) +
    (denoms[50] * 50) +
    (denoms[20] * 20) +
    (denoms.coins || 0)

  const counted = mode === 'denom' ? denomSum : (parseFloat(manualCash) || 0)
  const variance = counted - expectedCash
  const netTurnover = Math.max(0, counted - morningFloat) // Less configured morning float for tomorrow
  const checksCompleted = checklistState.filter(Boolean).length

  function updateDenom(key: string, delta: number) {
    if (finalized) return
    setDenoms(prev => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) + delta)
    }))
  }

  function setDenomQty(key: string, val: string) {
    if (finalized) return
    const num = parseFloat(val) || 0
    setDenoms(prev => ({
      ...prev,
      [key]: Math.max(0, num)
    }))
  }

  function handleQuickMatch() {
    if (finalized) return
    // Adjust coins to 70 so total reaches exactly ₱30,670.00 (₱0 variance)
    setDenoms(prev => ({
      ...prev,
      coins: 70
    }))
    setManualCash('30670.00')
    setToast('Count adjusted to match Expected Cash exactly (₱30,670.00)!')
    setTimeout(() => setToast(''), 2500)
  }

  function handleResetDefaults() {
    if (finalized) return
    setDenoms({ 1000: 20, 500: 15, 200: 8, 100: 12, 50: 4, 20: 5, coins: 20 })
    setManualCash('30620.00')
    setToast('Reset to original shift cashier counts.')
    setTimeout(() => setToast(''), 2500)
  }

  function toggleCheck(index: number) {
    if (finalized) return
    setChecklistState(prev => prev.map((c, i) => i === index ? !c : c))
  }

  function handleFinalize() {
    if (ownerPin !== settings.closingPin) {
      setToast(`Invalid Owner PIN! Configured authorization code is ${settings.closingPin}.`)
      setTimeout(() => setToast(''), 2800)
      return
    }
    setFinalized(true)
    setToast('Shift finalized, register locked, and Z-Reading report generated!')
    setTimeout(() => setToast(''), 2800)
  }

  function handleUnlock() {
    setFinalized(false)
    setToast('Register unlocked for adjustments by Owner Dexter.')
    setTimeout(() => setToast(''), 2800)
  }

  const checklistItems = [
    'Physical cash drawer & coin denomination sheet verified',
    'Customer credit collection receipts matched with Suki passbooks',
    'Petty cash disbursements & rider fuel vouchers audited',
    'Yard SEAGAS full cylinder inventory physically counted by SKU & valve',
    'Empty palit-basyo returns balanced against delivery trip manifests',
    'Quarantine cage (dented, rusty, or requal cylinders) locked'
  ]

  const cylinderTally = [
    { sku: '11kg SEAGAS POL Standard', valve: 'POL Threaded', begF: 140, inF: 50, outF: 40, endF: 150, physF: 150, begE: 30, inE: 40, outE: 30, endE: 40, physE: 40 },
    { sku: '11kg SEAGAS Snap-On', valve: 'Compact 20mm', begF: 128, inF: 20, outF: 22, endF: 126, physF: 126, begE: 42, inE: 22, outE: 20, endE: 44, physE: 44 },
    { sku: '50kg SEAGAS Industrial Heavy', valve: 'POL Heavy (SRV)', begF: 64, inF: 10, outF: 3, endF: 71, physF: 71, begE: 63, inE: 3, outE: 20, endE: 46, physE: 46 },
    { sku: '2.7kg SEAGAS Camping Tank', valve: 'Compact Camping', begF: 96, inF: 0, outF: 15, endF: 81, physF: 81, begE: 28, inE: 15, outE: 10, endE: 33, physE: 33 },
  ]

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}

      {/* Master Header */}
      <MasterHeader
        title="Daily Closing & Cash Reconciliation (EOD)"
        subtitle="End-of-day register balancing, physical cash denomination tally, yard cylinder reconciliation, and owner Z-Reading sign-off."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Badge>{finalized ? 'Register Locked & Closed' : 'October 16, 2026 · Shift #1 Open'}</Badge>
            <Button variant="secondary" icon="receipt" onClick={() => setShowZReading(true)}>
              Preview Z-Reading
            </Button>
            {finalized ? (
              <Button variant="ghost" onClick={handleUnlock}>
                Unlock Register
              </Button>
            ) : null}
          </div>
        }
      />

      {/* Locked Shift Alert Banner */}
      {finalized ? (
        <div className="eod-banner locked">
          <div>
            <strong>✓ Shift Finalized & Register Locked at 7:45 PM</strong>
            <span>Authorized by Dexter Mendoza (Owner PIN: 4829) · Remittance / Cash Drop of ₱{netTurnover.toLocaleString('en-PH', { minimumFractionDigits: 2 })} transferred to main office safe.</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost" onClick={() => setShowZReading(true)}>
              Print Z-Reading Slip
            </Button>
            <Badge>Locked</Badge>
          </div>
        </div>
      ) : (
        <div className="eod-banner">
          <div>
            <strong>End-of-Day Shift Audit in Progress — GenSan Terminal</strong>
            <span>Count physical bills & coins, verify physical yard cylinder basyo counts, and obtain Owner Dexter sign-off before closing register.</span>
          </div>
          <Button variant="ghost" onClick={handleQuickMatch}>
            Quick Match Exact (₱30,670)
          </Button>
        </div>
      )}

      {/* EOD Stat Strip (Ops Data Layout — One surface, hairline divided) */}
      <StatStrip
        stats={[
          {
            label: 'Expected Ending Drawer',
            value: `₱${expectedCash.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
            sub: 'Beg. ₱5k + Sales ₱24.8k + Coll ₱4.5k − Exp ₱3.68k',
          },
          {
            label: 'Actual Physical Cash Counted',
            value: `₱${counted.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
            sub: mode === 'denom' ? 'Live sum of 6 bills + coins' : 'Manual cash drawer entry',
            status: variance === 0 ? 'ok' : variance < 0 ? 'danger' : 'warning',
          },
          {
            label: 'Short / Over Variance',
            value: variance === 0 ? '₱0.00' : variance < 0 ? `-₱${Math.abs(variance).toFixed(2)}` : `+₱${variance.toFixed(2)}`,
            sub: variance === 0 ? '✓ Balanced (Exact Match)' : variance < 0 ? '⚠ Shortage Variance' : '⚠ Overage Variance',
            status: variance === 0 ? 'ok' : variance < 0 ? 'danger' : 'warning',
          },
          {
            label: 'Physical Yard Tally',
            value: '591 Cylinders',
            sub: '428 Full + 163 Basyo · 0 Missing',
            status: 'ok',
          },
        ]}
      />

      {/* Modern Stepper Workflow Navigation */}
      <nav className="eod-stepper-header" aria-label="End-of-day closing steps">
        {[
          { id: '1. Cash & Denominations', step: '1', title: 'Cash Drawer', desc: 'Denominations & variance' },
          { id: '2. Yard Fleet Tally', step: '2', title: 'Yard Fleet', desc: 'Full vs empty basyo' },
          { id: '3. EOD Checklist', step: '3', title: 'Closing Checklist', desc: 'Safety & compliance' },
          { id: '4. Owner Remittance & Z-Reading', step: '4', title: 'Owner Remittance', desc: 'Safe drop & Z-Reading' },
        ].map(s => {
          const isActive = eodTab === s.id
          const isDone = (s.step === '1' && variance === 0) || (s.step === '2') || (s.step === '3' && checksCompleted === 6) || (s.step === '4' && finalized)
          return (
            <button
              key={s.id}
              type="button"
              className={`eod-step-pill ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
              onClick={() => setEodTab(s.id)}
            >
              <div className="eod-step-badge">{isDone && !isActive ? '✓' : s.step}</div>
              <div className="eod-step-meta">
                <span className="eod-step-title">{s.title}</span>
                <span className="eod-step-desc">{s.desc}</span>
              </div>
            </button>
          )
        })}
      </nav>

      {/* ── TAB 1: CASH & DENOMINATIONS ── */}
      {eodTab === '1. Cash & Denominations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Visual Cash Formula Audit Trail */}
          <Card>
            <CardTitle
              icon="coins"
              title="Cash Drawer Balancing Formula"
              subtitle="Auditable formula reconciling beginning float, today's POS sales inflows, Suki credit collections, and petty cash disbursements"
              action={<Badge>{variance === 0 ? 'Exact Match' : variance < 0 ? 'Shortage Alert' : 'Overage Alert'}</Badge>}
            />
            <div className="formula-strip">
              <div className="formula-item">
                <span>Beginning Cash Float</span>
                <strong>₱5,000.00</strong>
              </div>
              <div className="formula-item">
                <span>+ Cash Inflows (POS)</span>
                <strong>₱24,850.00</strong>
              </div>
              <div className="formula-item">
                <span>+ Suki Collections</span>
                <strong>₱4,500.00</strong>
              </div>
              <div className="formula-item">
                <span>− Daily Expenses</span>
                <strong style={{ color: '#b23942' }}>₱3,680.00</strong>
              </div>
              <div className="formula-item expected">
                <span>= Expected Ending Drawer</span>
                <strong>₱{expectedCash.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
              </div>
            </div>
          </Card>

          {/* Side-by-Side: Cash Count Sheet (Left) vs. Variance & Discrepancy Protocol (Right) */}
          <div className="eod-cash-layout">
            {/* Left: Denomination Sheet */}
            <Card>
              <div className="denom-header">
                <div>
                  <strong style={{ fontSize: 14, color: '#112849' }}>Physical Cash Count Sheet</strong>
                  <p style={{ fontSize: 12, color: '#71839c', margin: '3px 0 0' }}>
                    Itemize physical bills and coins currently in the store cash drawer
                  </p>
                </div>
                <div className="denom-switch">
                  <button
                    type="button"
                    className={mode === 'denom' ? 'active' : ''}
                    onClick={() => setMode('denom')}
                  >
                    Denominations
                  </button>
                  <button
                    type="button"
                    className={mode === 'manual' ? 'active' : ''}
                    onClick={() => setMode('manual')}
                  >
                    Direct Flat Total
                  </button>
                </div>
              </div>

              {mode === 'denom' ? (
                <div>
                  <div className="denom-table-wrap" style={{ overflowX: 'auto', padding: 0 }}>
                    <table className="denom-compact-table">
                      <thead>
                        <tr>
                          <th className="text-left" style={{ width: '38%' }}>Denomination</th>
                          <th className="text-center" style={{ width: '32%' }}>Quantity (Pcs)</th>
                          <th className="text-right" style={{ width: '30%' }}>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: '1000', label: '₱1,000 Bill', class: 'p1000', mult: 1000 },
                          { key: '500', label: '₱500 Bill', class: 'p500', mult: 500 },
                          { key: '200', label: '₱200 Bill', class: 'p200', mult: 200 },
                          { key: '100', label: '₱100 Bill', class: 'p100', mult: 100 },
                          { key: '50', label: '₱50 Bill', class: 'p50', mult: 50 },
                          { key: '20', label: '₱20 Bill', class: 'p20', mult: 20 },
                        ].map(d => (
                          <tr key={d.key}>
                            <td>
                              <span className={`denom-pill ${d.class}`}>{d.label}</span>
                            </td>
                            <td className="text-center">
                              <div className="denom-stepper" style={{ justifyContent: 'center' }}>
                                <button
                                  type="button"
                                  className="denom-btn"
                                  disabled={finalized}
                                  onClick={() => updateDenom(d.key, -1)}
                                  aria-label={`Decrease ${d.label}`}
                                >
                                  −
                                </button>
                                <input
                                  type="number"
                                  min="0"
                                  className="denom-qty-input tabular-nums"
                                  disabled={finalized}
                                  value={denoms[d.key] ?? 0}
                                  onChange={(e) => setDenomQty(d.key, e.target.value)}
                                />
                                <button
                                  type="button"
                                  className="denom-btn"
                                  disabled={finalized}
                                  onClick={() => updateDenom(d.key, 1)}
                                  aria-label={`Increase ${d.label}`}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="text-right tabular-nums denom-subtotal">
                              ₱{((denoms[d.key] || 0) * d.mult).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td>
                            <span className="denom-pill coin">Coins (₱20, ₱10, ₱5, ₱1, 25¢)</span>
                          </td>
                          <td className="text-center">
                            <input
                              type="number"
                              min="0"
                              step="0.25"
                              className="denom-qty-input tabular-nums"
                              style={{ width: 90 }}
                              disabled={finalized}
                              value={denoms.coins ?? 0}
                              onChange={(e) => setDenomQty('coins', e.target.value)}
                            />
                          </td>
                          <td className="text-right tabular-nums denom-subtotal">
                            ₱{(denoms.coins || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="denom-total-bar">
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button variant="ghost" onClick={handleQuickMatch} disabled={finalized}>
                        Match Exact (₱30,670)
                      </Button>
                      <Button variant="ghost" onClick={handleResetDefaults} disabled={finalized}>
                        Reset Counts
                      </Button>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: 11, color: '#71839c', display: 'block' }}>Total Physical Cash Counted</span>
                      <strong className="tabular-nums" style={{ fontSize: 20, color: '#078a76' }}>
                        ₱{denomSum.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                      </strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '20px' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#33506c' }}>Direct Cash Till Count (₱)</span>
                    <input
                      type="number"
                      step="0.01"
                      value={manualCash}
                      disabled={finalized}
                      onChange={(e) => setManualCash(e.target.value)}
                      style={{ height: 42, fontSize: 16, fontWeight: 'bold', padding: '0 12px', borderRadius: 8, border: '1px solid #c9d8e5', color: '#0d2b45' }}
                    />
                  </label>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <Button variant="ghost" onClick={() => setManualCash('30670.00')} disabled={finalized}>
                      Exact Expected (₱30,670.00)
                    </Button>
                    <Button variant="ghost" onClick={() => setManualCash('30620.00')} disabled={finalized}>
                      With ₱50 Shortage (₱30,620.00)
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Right: Variance Analysis & Mandatory Discrepancy Protocol */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Card>
                <CardTitle
                  icon="coins"
                  title="Cash Till Variance Status"
                  subtitle="Live comparison between expected ending drawer and actual physical count"
                />
                <div className={`variance-card ${variance === 0 ? 'balanced' : variance < 0 ? 'shortage' : 'overage'}`} style={{ margin: '14px 18px' }}>
                  <div>
                    <strong style={{ fontSize: 14, display: 'block' }}>
                      {variance === 0 ? '✓ Perfect Cash Balancing (0 Discrepancy)' : variance < 0 ? '⚠ Cash Drawer Shortage' : '⚠ Cash Drawer Overage'}
                    </strong>
                    <span style={{ fontSize: 12, opacity: 0.9 }}>
                      {variance === 0
                        ? 'Physical cash drawer matches the expected formula till 100%.'
                        : variance < 0
                        ? `Physical count is ₱${Math.abs(variance).toFixed(2)} less than the expected system amount.`
                        : `Physical count has ₱${variance.toFixed(2)} surplus cash above the expected amount.`}
                    </span>
                  </div>
                  <strong style={{ fontSize: 22 }} className="tabular-nums">
                    {variance === 0 ? '₱0.00' : variance < 0 ? `-₱${Math.abs(variance).toFixed(2)}` : `+₱${variance.toFixed(2)}`}
                  </strong>
                </div>

                {variance !== 0 ? (
                  <div className="discrepancy-box">
                    <span className="field-label" style={{ color: '#b13840' }}>
                      Mandatory Discrepancy Audit Log (Required by Station Policy)
                    </span>
                    <label>
                      <span style={{ fontSize: 12, color: '#71839c' }}>Reason Code</span>
                      <select
                        value={varianceReason}
                        disabled={finalized}
                        onChange={(e) => setVarianceReason(e.target.value)}
                        style={{ height: 36 }}
                      >
                        <option value="change">Rapid Street Change Discrepancy (Rider gave loose change to suki)</option>
                        <option value="advance">Unrecorded Rider Fuel Advance (Gasoline receipt pending from rider)</option>
                        <option value="swap">Unlogged Ariglo / Valve Swap Surcharge Rounding</option>
                        <option value="other">Pre-authorized by Owner Dexter (Remarks logged)</option>
                      </select>
                    </label>
                    <label>
                      <span style={{ fontSize: 12, color: '#71839c' }}>Cashier Explanatory Remarks</span>
                      <textarea
                        rows={3}
                        value={varianceNotes}
                        disabled={finalized}
                        onChange={(e) => setVarianceNotes(e.target.value)}
                        placeholder="Enter details explaining the variance..."
                      />
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                      <span style={{ fontSize: 11, color: '#71839c' }}>
                        Closing Cashier: Christopher Jude Ramos · ID #EMP-004
                      </span>
                      <span style={{ fontSize: 11, color: '#b13840', fontWeight: 600 }}>
                        Shortage recorded to audit trail
                      </span>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '16px 20px', color: '#078a76', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, background: '#f0fdfa', borderTop: '1px solid #ccfbf1' }}>
                    <span style={{ fontSize: 18 }}>✓</span> Cash drawer is completely balanced. No discrepancy logging required.
                  </div>
                )}
              </Card>

              {/* Station Context */}
              <Card>
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Closing Shift Operator</span>
                    <strong style={{ color: '#0f172a' }}>Christopher Jude Ramos (EMP-004)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Store Terminal</span>
                    <strong style={{ color: '#0f172a' }}>REG-01 (Store Front POS)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Shift Operating Hours</span>
                    <span style={{ color: '#334155', fontWeight: 600 }}>07:00 AM – 07:30 PM (Shift #1)</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Step Navigation Bar */}
          <div className="eod-step-nav">
            <span style={{ fontSize: 12, color: '#64748b' }}>Step 1 of 4: Cash Drawer Balancing Complete</span>
            <Button icon="arrow-right" onClick={() => setEodTab('2. Yard Fleet Tally')}>
              Proceed to Yard Fleet Tally →
            </Button>
          </div>
        </div>
      )}

      {/* ── TAB 2: YARD FLEET TALLY ── */}
      {eodTab === '2. Yard Fleet Tally' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="compliance-banner">
            <Icon name="check" />
            <div>
              <strong>Shift Physical Yard Reconciliation — SEAGAS Fleet (Oct 16, 2026)</strong>
              <span>Compare system stock records from POS Palit-Basyo exchanges, delivery dispatch tickets, and supplier receiving against actual physical yard count.</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Badge>591 Units Balanced</Badge>
              <Badge>0 Missing</Badge>
            </div>
          </div>

          <Card>
            <CardTitle
              icon="cylinder"
              title="Physical Yard Cylinder Stock Tally (Beginning vs. Ending)"
              subtitle="Breakdown of physical yard count vs. system ledger by cylinder SKU and valve specification"
              action={<Badge>591 Tanks Balanced</Badge>}
            />
            <div className="ops-table-wrap">
              <table className="ops-table-fixed">
                <colgroup>
                  <col style={{ width: '220px' }} />
                  <col style={{ width: '130px' }} />
                  <col style={{ width: '100px' }} />
                  <col style={{ width: '100px' }} />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '110px' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className="text-left">SKU & Valve Specification</th>
                    <th className="text-right">Opening (F / E)</th>
                    <th className="text-right">Supplier In</th>
                    <th className="text-right">Sold / Disp.</th>
                    <th className="text-right">Full (Phys / Sys)</th>
                    <th className="text-right">Empty (Phys / Sys)</th>
                    <th className="text-center">Tally Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cylinderTally.map(row => (
                    <tr key={row.sku}>
                      <td>
                        <strong style={{ display: 'block', color: '#163652' }}>{row.sku}</strong>
                        <span className="ops-cell-sub">{row.valve}</span>
                      </td>
                      <td className="text-right tabular-nums" style={{ color: '#64748b' }}>
                        {row.begF} F / {row.begE} E
                      </td>
                      <td className="text-right tabular-nums" style={{ color: '#078a76', fontWeight: 600 }}>
                        +{row.inF} F
                      </td>
                      <td className="text-right tabular-nums" style={{ color: '#b23942' }}>
                        −{row.outF} F
                      </td>
                      <td className="text-right tabular-nums">
                        <strong style={{ color: '#078a76' }}>{row.physF}</strong>
                        <span style={{ color: '#94a3b8', fontSize: 12 }}> / {row.endF}</span>
                      </td>
                      <td className="text-right tabular-nums">
                        <strong style={{ color: '#1877c9' }}>{row.physE}</strong>
                        <span style={{ color: '#94a3b8', fontSize: 12 }}> / {row.endE}</span>
                      </td>
                      <td className="text-center">
                        <StatusChip tone="ok">✓ Matched</StatusChip>
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f8fafc', fontWeight: 600 }}>
                    <td>Total Yard Inventory</td>
                    <td className="text-right tabular-nums" style={{ color: '#64748b' }}>428 F / 163 E</td>
                    <td className="text-right tabular-nums" style={{ color: '#078a76' }}>+80 F</td>
                    <td className="text-right tabular-nums" style={{ color: '#b23942' }}>−70 F</td>
                    <td className="text-right tabular-nums" style={{ color: '#078a76' }}>428 Full</td>
                    <td className="text-right tabular-nums" style={{ color: '#1877c9' }}>163 Basyo</td>
                    <td className="text-center">
                      <StatusChip tone="ok">0 Missing</StatusChip>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Supplementary Yard Fleet Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Card>
              <CardTitle
                icon="shield"
                title="Quarantine Defective Bay (RA 11592)"
                subtitle="Cylinders locked for inspection, requalification, or scrapping"
              />
              <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b' }}>Quarantined Shells (Dented/Rusty)</span>
                  <strong style={{ color: '#b76307' }}>4 Tanks</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b' }}>Hydrostatic 5-Year Requal Status</span>
                  <StatusChip tone="warning">Awaiting Depot Transfer</StatusChip>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b' }}>Quarantine Cage Physical Security</span>
                  <StatusChip tone="ok">✓ Padlocked & Tagged</StatusChip>
                </div>
                <div style={{ borderTop: '1px solid #eef2f6', paddingTop: 8, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#475569', fontWeight: 600 }}>Total Fleet Inventory (Yard + Cage)</span>
                  <strong style={{ color: '#078a76' }}>595 Tanks Total</strong>
                </div>
              </div>
            </Card>

            <Card>
              <CardTitle
                icon="receipt"
                title="Palit-Basyo Retrieval Audit"
                subtitle="Balance between outgoing full cylinders and retrieved empty shells"
              />
              <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b' }}>Full Cylinders Dispatched</span>
                  <strong style={{ color: '#0f172a' }}>70 Tanks</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b' }}>Empty Basyo Retrieved</span>
                  <strong style={{ color: '#078a76' }}>70 Tanks</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b' }}>Retrieval Balance Ratio</span>
                  <strong style={{ color: '#078a76' }}>100.0% (Zero Shell Loss)</strong>
                </div>
                <div style={{ borderTop: '1px solid #eef2f6', paddingTop: 8, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#475569', fontWeight: 600 }}>Cylinder Fleet Drift</span>
                  <StatusChip tone="ok">✓ 0 Drift Detected</StatusChip>
                </div>
              </div>
            </Card>
          </div>

          {/* Step Navigation Bar */}
          <div className="eod-step-nav">
            <Button variant="secondary" onClick={() => setEodTab('1. Cash & Denominations')}>
              ← Back to Cash Drawer
            </Button>
            <Button icon="arrow-right" onClick={() => setEodTab('3. EOD Checklist')}>
              Proceed to EOD Checklist →
            </Button>
          </div>
        </div>
      )}

      {/* ── TAB 3: EOD CHECKLIST ── */}
      {eodTab === '3. EOD Checklist' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <CardTitle
              icon="check"
              title="End-of-Day Store Closing & Compliance Checklist"
              subtitle="Mandatory store verification protocol to be certified by the shift lead before owner safe drop"
              action={<Badge>{checksCompleted}/6 Checks Completed</Badge>}
            />

            {/* Checklist progress bar */}
            <div style={{ padding: '0 20px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginBottom: 6 }}>
                <span>Closing Protocol Completion Progress</span>
                <strong style={{ color: checksCompleted === 6 ? '#078a76' : '#b76307' }}>
                  {Math.round((checksCompleted / 6) * 100)}% Complete ({checksCompleted}/6)
                </strong>
              </div>
              <div style={{ height: 8, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${(checksCompleted / 6) * 100}%`,
                    background: checksCompleted === 6 ? '#078a76' : '#1877c9',
                    borderRadius: 4,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* Interactive Checklist Grid */}
            <div className="eod-checklist-grid">
              {checklistItems.map((item, index) => {
                const isChecked = checklistState[index]
                return (
                  <div
                    key={item}
                    className={`eod-check-card ${isChecked ? 'done' : ''}`}
                    onClick={() => toggleCheck(index)}
                  >
                    <div className="eod-check-box">
                      {isChecked ? '✓' : ''}
                    </div>
                    <div className="eod-check-info">
                      <strong>Check #{index + 1}</strong>
                      <span>{item}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ margin: '0 20px 20px', padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
              <span style={{ color: '#475569' }}>
                Certified by Shift Lead: <strong>Christopher Jude Ramos · EMP-004</strong>
              </span>
              <span style={{ color: checksCompleted === 6 ? '#078a76' : '#c64a50', fontWeight: 600 }}>
                {checksCompleted === 6 ? '✓ Ready for Owner Sign-Off' : '⚠ All 6 items required before shift lock'}
              </span>
            </div>
          </Card>

          {/* Step Navigation Bar */}
          <div className="eod-step-nav">
            <Button variant="secondary" onClick={() => setEodTab('2. Yard Fleet Tally')}>
              ← Back to Yard Fleet
            </Button>
            <Button
              icon="arrow-right"
              disabled={checksCompleted < 6}
              onClick={() => setEodTab('4. Owner Remittance & Z-Reading')}
            >
              Proceed to Owner Sign-Off & Z-Reading →
            </Button>
          </div>
        </div>
      )}

      {/* ── TAB 4: OWNER REMITTANCE & Z-READING ── */}
      {eodTab === '4. Owner Remittance & Z-Reading' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="eod-zreading-layout">
            {/* Left Column: Remittance Breakdown & Owner Gate */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Remittance Breakdown */}
              <Card>
                <CardTitle
                  icon="coins"
                  title="Cash Safe Remittance & Deposit Drop"
                  subtitle="Net cash transferred to main office drop safe after retaining tomorrow's starting float"
                />
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: '#64748b' }}>Total Physical Cash Counted</span>
                    <strong className="tabular-nums" style={{ color: '#0f172a' }}>
                      ₱{counted.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: '#64748b' }}>Less Morning Shift Starting Float</span>
                    <span className="tabular-nums" style={{ color: '#b23942', fontWeight: 600 }}>
                      −₱5,000.00
                    </span>
                  </div>
                  <div style={{ borderTop: '2px dashed #e2e8f0', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: 14, color: '#0f172a', display: 'block' }}>Net Cash Remittance to Safe</strong>
                      <span style={{ fontSize: 11, color: '#64748b' }}>Cashier drop envelope #REM-20261016</span>
                    </div>
                    <strong className="tabular-nums" style={{ fontSize: 22, color: '#078a76' }}>
                      ₱{netTurnover.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                </div>
              </Card>

              {/* Owner PIN Authorization */}
              <Card>
                <CardTitle
                  icon="check"
                  title="Owner Shift Authorization Gate"
                  subtitle="Authorize shift closure, lock terminal till register, and generate permanent Z-Reading"
                />
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <span style={{ fontSize: 12, color: '#64748b' }}>Owner / Station Supervisor</span>
                      <input
                        type="text"
                        value="Dexter Mendoza (Owner)"
                        readOnly
                        style={{ height: 36, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 6, padding: '0 10px', fontSize: 13, color: '#0f172a' }}
                      />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <span style={{ fontSize: 12, color: '#64748b' }}>Owner PIN (Default: 4829)</span>
                      <input
                        type="password"
                        disabled={finalized}
                        value={ownerPin}
                        onChange={(e) => setOwnerPin(e.target.value)}
                        style={{ height: 36, background: finalized ? '#f8fafc' : '#ffffff', border: '1px solid #cbd5e1', borderRadius: 6, padding: '0 10px', fontSize: 13, fontWeight: 'bold', color: '#0f172a' }}
                      />
                    </label>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <Button
                      icon="check"
                      disabled={finalized || checksCompleted < 6}
                      onClick={handleFinalize}
                      style={{ height: 38 }}
                    >
                      {finalized ? '✓ Shift Finalized & Register Locked' : 'Authorize & Lock Daily Closing'}
                    </Button>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button
                        variant="secondary"
                        style={{ flex: 1, height: 36 }}
                        onClick={() => {
                          setToast('Sending Z-Reading summary to thermal POS printer...')
                          setTimeout(() => setToast(''), 2500)
                        }}
                      >
                        Print Thermal Slip
                      </Button>
                      <Button
                        variant="secondary"
                        style={{ flex: 1, height: 36 }}
                        onClick={() => {
                          setToast('Exported official Z-Reading report (PDF)!')
                          setTimeout(() => setToast(''), 2500)
                        }}
                      >
                        Export PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Embedded Official Z-Reading Report */}
            <div className="z-embedded-card">
              <div className="z-receipt">
                <div className="z-receipt-header">
                  <h2>SEAGAS LPG OPERATIONS & CONTROL SYSTEM</h2>
                  <p>SEAOIL SEAGAS GenSan Operation · J. Catolico Ave., General Santos City</p>
                  <p>TIN: 294-819-041-000 Non-VAT · DOE Permit: R12-DOE-LPG-0914</p>
                  <p style={{ marginTop: 6, fontWeight: 'bold', letterSpacing: 1 }}>
                    *** OFFICIAL END-OF-DAY Z-READING SUMMARY ***
                  </p>
                  <p>Report #: Z-20261016-01 · Terminal: REG-01 (Store Front)</p>
                  <p>Shift: Oct 16, 2026 · 07:00 AM – 07:30 PM</p>
                </div>

                {/* Sales Revenue Section */}
                <div className="z-section">
                  <div className="z-section-title">1. Gross Revenue & Collections</div>
                  <div className="z-row">
                    <span>Cash POS Sales (Counter + COD)</span>
                    <strong className="tabular-nums">₱24,850.00</strong>
                  </div>
                  <div className="z-row">
                    <span>Suki Credit Collections (Aling Nena, etc.)</span>
                    <strong className="tabular-nums">₱4,500.00</strong>
                  </div>
                  <div className="z-row">
                    <span>GCash & Bank Transfers (Non-Cash)</span>
                    <strong className="tabular-nums">₱3,200.00</strong>
                  </div>
                  <div className="z-row">
                    <span>New Paautang / Accounts Receivable</span>
                    <strong className="tabular-nums">₱1,960.00</strong>
                  </div>
                  <div className="z-row total">
                    <span>TOTAL GROSS REVENUE TODAY</span>
                    <strong className="tabular-nums" style={{ color: '#078a76' }}>₱34,510.00</strong>
                  </div>
                </div>

                {/* Cash Reconciliation Section */}
                <div className="z-section">
                  <div className="z-section-title">2. Cash Drawer Reconciliation (Ending vs. Beginning)</div>
                  <div className="z-row">
                    <span>Beginning Cash Float</span>
                    <span className="tabular-nums">₱5,000.00</span>
                  </div>
                  <div className="z-row">
                    <span>Cash Inflow (Sales + Collections)</span>
                    <span className="tabular-nums">+₱29,350.00</span>
                  </div>
                  <div className="z-row">
                    <span>Operating Expenses (Petty Cash Disbursed)</span>
                    <span className="tabular-nums" style={{ color: '#b13840' }}>−₱3,680.00</span>
                  </div>
                  <div className="z-row">
                    <span>Expected Ending Drawer Balance</span>
                    <strong className="tabular-nums">₱{expectedCash.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
                  </div>
                  <div className="z-row" style={{ marginTop: 4 }}>
                    <span>Actual Physical Cash Counted</span>
                    <strong className="tabular-nums" style={{ color: variance === 0 ? '#078a76' : '#b13840' }}>
                      ₱{counted.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                  <div className="z-row total">
                    <span>SHORT / OVER VARIANCE</span>
                    <strong className="tabular-nums" style={{ color: variance === 0 ? '#078a76' : variance < 0 ? '#b13840' : '#b76307' }}>
                      {variance === 0 ? '₱0.00 (EXACT MATCH)' : variance < 0 ? `-₱${Math.abs(variance).toFixed(2)} (SHORTAGE)` : `+₱${variance.toFixed(2)} (OVERAGE)`}
                    </strong>
                  </div>
                  {variance !== 0 && (
                    <p style={{ fontSize: 11, color: '#71839c', margin: '5px 0 0', fontStyle: 'italic' }}>
                      Reason: {varianceReason} · Notes: "{varianceNotes}"
                    </p>
                  )}
                </div>

                {/* Denomination Breakdown */}
                <div className="z-section">
                  <div className="z-section-title">3. Denomination Count Audit</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', fontSize: 12 }}>
                    <div>₱1,000 × {denoms[1000]} = ₱{(denoms[1000] * 1000).toLocaleString('en-PH')}</div>
                    <div>₱500 × {denoms[500]} = ₱{(denoms[500] * 500).toLocaleString('en-PH')}</div>
                    <div>₱200 × {denoms[200]} = ₱{(denoms[200] * 200).toLocaleString('en-PH')}</div>
                    <div>₱100 × {denoms[100]} = ₱{(denoms[100] * 100).toLocaleString('en-PH')}</div>
                    <div>₱50 × {denoms[50]} = ₱{(denoms[50] * 50).toLocaleString('en-PH')}</div>
                    <div>₱20 × {denoms[20]} = ₱{(denoms[20] * 20).toLocaleString('en-PH')}</div>
                    <div style={{ gridColumn: '1/-1' }}>Loose Coins = ₱{(denoms.coins || 0).toFixed(2)}</div>
                  </div>
                </div>

                {/* Cylinder Movement Summary */}
                <div className="z-section">
                  <div className="z-section-title">4. Physical Yard Tally (SEAGAS Fleet)</div>
                  <div className="z-row">
                    <span>Full SEAGAS Cylinders Dispatched</span>
                    <span>70 Tanks</span>
                  </div>
                  <div className="z-row">
                    <span>Empty SEAGAS Basyo Retrieved</span>
                    <span>70 Tanks</span>
                  </div>
                  <div className="z-row">
                    <span>Closing Physical Yard Stock</span>
                    <strong>428 Full / 163 Empty (591 Total)</strong>
                  </div>
                  <div className="z-row">
                    <span>Physical Variance / Shrinkage</span>
                    <strong style={{ color: '#078a76' }}>0 TANKS (100% BALANCED)</strong>
                  </div>
                </div>

                {/* Remittance / Cash Drop */}
                <div className="z-section" style={{ background: '#f5fbf9', padding: '10px', borderRadius: 6, margin: '10px 0' }}>
                  <div className="z-row">
                    <span>Total Physical Cash Counted</span>
                    <span className="tabular-nums">₱{counted.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="z-row">
                    <span>Less Retained Float (For Tomorrow Morning)</span>
                    <span className="tabular-nums">−₱5,000.00</span>
                  </div>
                  <div className="z-row total" style={{ fontSize: 14 }}>
                    <span>NET REMITTANCE / CASH DROP (OWNER SAFE)</span>
                    <strong className="tabular-nums" style={{ color: '#078a76' }}>
                      ₱{netTurnover.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                </div>

                {/* Signatures */}
                <div className="z-signatures">
                  <div>
                    <div className="z-sig-line">Christopher Jude Ramos</div>
                    <span>Closing Shift Lead</span>
                  </div>
                  <div>
                    <div className="z-sig-line">Dexter Mendoza</div>
                    <span>Owner / Operations Head (GenSan)</span>
                  </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: 18, fontSize: 11, color: '#71839c' }}>
                  SEAGAS LPG Operations Control System · GenSan Distribution Terminal
                </div>
              </div>
            </div>
          </div>

          {/* Step Navigation Bar */}
          <div className="eod-step-nav">
            <Button variant="secondary" onClick={() => setEodTab('3. EOD Checklist')}>
              ← Back to Checklist
            </Button>
            {finalized ? (
              <Badge>✓ Shift Finalized & Register Locked</Badge>
            ) : (
              <Button icon="receipt" onClick={() => setShowZReading(true)}>
                Open Floating Z-Reading Slip
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Official Z-Reading Report Modal */}
      {showZReading && (
        <div className="modal-backdrop document-backdrop" onClick={() => setShowZReading(false)}>
          <div className="document-modal z-modal" onClick={(e) => e.stopPropagation()}>
            <button className="document-close" onClick={() => setShowZReading(false)} aria-label="Close Z-Reading Preview">✕</button>

            <div className="z-receipt">
              <div className="z-receipt-header">
                <h2>SEAGAS LPG OPERATIONS & CONTROL SYSTEM</h2>
                <p>SEAOIL SEAGAS GenSan Operation · J. Catolico Ave., General Santos City</p>
                <p>TIN: 294-819-041-000 Non-VAT · DOE Permit: R12-DOE-LPG-0914</p>
                <p style={{ marginTop: 6, fontWeight: 'bold', letterSpacing: 1 }}>
                  *** OFFICIAL END-OF-DAY Z-READING SUMMARY ***
                </p>
                <p>Report #: Z-20261016-01 · Terminal: REG-01 (Store Front)</p>
                <p>Shift: Oct 16, 2026 · 07:00 AM – 07:30 PM</p>
              </div>

              {/* Sales Revenue Section */}
              <div className="z-section">
                <div className="z-section-title">1. Gross Revenue & Collections</div>
                <div className="z-row">
                  <span>Cash POS Sales (Counter + COD)</span>
                  <strong>₱24,850.00</strong>
                </div>
                <div className="z-row">
                  <span>Suki Credit Collections (Aling Nena, etc.)</span>
                  <strong>₱4,500.00</strong>
                </div>
                <div className="z-row">
                  <span>GCash & Bank Transfers (Non-Cash)</span>
                  <strong>₱3,200.00</strong>
                </div>
                <div className="z-row">
                  <span>New Paautang / Accounts Receivable</span>
                  <strong>₱1,960.00</strong>
                </div>
                <div className="z-row total">
                  <span>TOTAL GROSS REVENUE TODAY</span>
                  <strong style={{ color: '#078a76' }}>₱34,510.00</strong>
                </div>
              </div>

              {/* Cash Reconciliation Section */}
              <div className="z-section">
                <div className="z-section-title">2. Cash Drawer Reconciliation (Ending vs. Beginning)</div>
                <div className="z-row">
                  <span>Beginning Cash Float</span>
                  <span>₱5,000.00</span>
                </div>
                <div className="z-row">
                  <span>Cash Inflow (Sales + Collections)</span>
                  <span>+₱29,350.00</span>
                </div>
                <div className="z-row">
                  <span>Operating Expenses (Petty Cash Disbursed)</span>
                  <span style={{ color: '#b13840' }}>−₱3,680.00</span>
                </div>
                <div className="z-row">
                  <span>Expected Ending Drawer Balance</span>
                  <strong>₱{expectedCash.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
                </div>
                <div className="z-row" style={{ marginTop: 4 }}>
                  <span>Actual Physical Cash Counted</span>
                  <strong style={{ color: variance === 0 ? '#078a76' : '#b13840' }}>
                    ₱{counted.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </strong>
                </div>
                <div className="z-row total">
                  <span>SHORT / OVER VARIANCE</span>
                  <strong style={{ color: variance === 0 ? '#078a76' : variance < 0 ? '#b13840' : '#b76307' }}>
                    {variance === 0 ? '₱0.00 (EXACT MATCH)' : variance < 0 ? `-₱${Math.abs(variance).toFixed(2)} (SHORTAGE)` : `+₱${variance.toFixed(2)} (OVERAGE)`}
                  </strong>
                </div>
                {variance !== 0 && (
                  <p style={{ fontSize: 11, color: '#71839c', margin: '5px 0 0', fontStyle: 'italic' }}>
                    Reason: {varianceReason} · Notes: "{varianceNotes}"
                  </p>
                )}
              </div>

              {/* Denomination Breakdown */}
              <div className="z-section">
                <div className="z-section-title">3. Denomination Count Audit</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', fontSize: 12 }}>
                  <div>₱1,000 × {denoms[1000]} = ₱{(denoms[1000] * 1000).toLocaleString('en-PH')}</div>
                  <div>₱500 × {denoms[500]} = ₱{(denoms[500] * 500).toLocaleString('en-PH')}</div>
                  <div>₱200 × {denoms[200]} = ₱{(denoms[200] * 200).toLocaleString('en-PH')}</div>
                  <div>₱100 × {denoms[100]} = ₱{(denoms[100] * 100).toLocaleString('en-PH')}</div>
                  <div>₱50 × {denoms[50]} = ₱{(denoms[50] * 50).toLocaleString('en-PH')}</div>
                  <div>₱20 × {denoms[20]} = ₱{(denoms[20] * 20).toLocaleString('en-PH')}</div>
                  <div style={{ gridColumn: '1/-1' }}>Loose Coins = ₱{(denoms.coins || 0).toFixed(2)}</div>
                </div>
              </div>

              {/* Cylinder Movement Summary */}
              <div className="z-section">
                <div className="z-section-title">4. Physical Yard Tally (SEAGAS Fleet)</div>
                <div className="z-row">
                  <span>Full SEAGAS Cylinders Dispatched</span>
                  <span>70 Tanks</span>
                </div>
                <div className="z-row">
                  <span>Empty SEAGAS Basyo Retrieved</span>
                  <span>70 Tanks</span>
                </div>
                <div className="z-row">
                  <span>Closing Physical Yard Stock</span>
                  <strong>428 Full / 163 Empty (591 Total)</strong>
                </div>
                <div className="z-row">
                  <span>Physical Variance / Shrinkage</span>
                  <strong style={{ color: '#078a76' }}>0 TANKS (100% BALANCED)</strong>
                </div>
              </div>

              {/* Remittance / Cash Drop */}
              <div className="z-section" style={{ background: '#f5fbf9', padding: '10px', borderRadius: 6, margin: '10px 0' }}>
                <div className="z-row">
                  <span>Total Physical Cash Counted</span>
                  <span>₱{counted.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="z-row">
                  <span>Less Retained Float (For Tomorrow Morning)</span>
                  <span>−₱5,000.00</span>
                </div>
                <div className="z-row total" style={{ fontSize: 14 }}>
                  <span>NET REMITTANCE / CASH DROP (OWNER SAFE)</span>
                  <strong style={{ color: '#078a76' }}>
                    ₱{netTurnover.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </strong>
                </div>
              </div>

              {/* Signatures */}
              <div className="z-signatures">
                <div>
                  <div className="z-sig-line">Christopher Jude Ramos</div>
                  <span>Closing Shift Lead</span>
                </div>
                <div>
                  <div className="z-sig-line">Dexter Mendoza</div>
                  <span>Owner / Operations Head (GenSan)</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: 18, fontSize: 11, color: '#71839c' }}>
                SEAGAS LPG Operations Control System · GenSan Distribution Terminal
              </div>
            </div>

            <div className="modal-actions" style={{ padding: '12px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button
                variant="ghost"
                onClick={() => {
                  setToast('Sending Z-Reading summary to thermal POS printer...')
                  setTimeout(() => setToast(''), 2500)
                }}
              >
                Print Thermal Slip
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setToast('Z-Reading report exported as PDF (Oct-16-EOD.pdf)!')
                  setTimeout(() => setToast(''), 2500)
                }}
              >
                Export PDF
              </Button>
              <Button onClick={() => setShowZReading(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


function StockMovementReport() {
  const [toast, setToast] = useState('')
  const rows = [
    ['11kg SEAGAS POL Standard', 'POL Threaded', '140 F / 30 E', '+50 F', '-22 F', '-18 F', '+40 E', '-30 E', '150 F / 40 E', '0 · OK'],
    ['11kg SEAGAS Snap-On', 'Compact 20mm', '128 F / 42 E', '+20 F', '-12 F', '-10 F', '+22 E', '-20 E', '126 F / 44 E', '0 · OK'],
    ['50kg SEAGAS Industrial Heavy', 'POL Heavy (SRV)', '64 F / 63 E', '+10 F', '-3 F', '—', '+3 E', '-20 E', '71 F / 46 E', '0 · OK'],
  ]

  function handleExport() {
    setToast('Downloaded: Official_DOE_LPG_Stock_Movement_Report.xlsx')
    setTimeout(() => setToast(''), 2500)
  }

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}
      <MasterHeader
        title="Daily Stock Movement Report"
        subtitle="Official beginning-to-ending daily movement audit per brand and SKU."
        actions={
          <>
            <button className="date-button"><Icon name="calendar" size={17} />October 16, 2026<Icon name="chevron" size={14} /></button>
            <Button icon="download" onClick={handleExport}>Export Official DOE / LTO Report</Button>
          </>
        }
      />
      <div className="compliance-banner">
        <Icon name="check" />
        <div>
          <strong>Daily Movement Balanced</strong>
          <span>All SKUs reconcile with zero audit variance. Report is ready for regulatory export.</span>
        </div>
        <Badge>DOE Compliant</Badge>
      </div>
      <Card className="records-card master-table compliance-table">
        <CardTitle icon="chart" title="Beginning-to-Ending Stock Movement" subtitle="Quantities shown as Full (F) and Empty (E) cylinders" />
        <DataTable
          columns={['SKU & Brand', 'Valve Spec', 'Opening Full / Empty', 'Supplier In', 'Walk-in Sold', 'Delivery Sold', 'Empties In', 'Empties to Plant', 'Ending Full / Empty', 'Audit Variance']}
          rows={rows}
        />
      </Card>
    </div>
  )
}

function MovementLog() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All Movements')
  const [toast, setToast] = useState('')
  const rows = [
    ['08:24 AM', 'SG-11-004521', 'SEAGAS (SEAOIL)', 'Sale', 'Maria Santos', 'ST001', 'GenSan Main Yard', 'With Customer'],
    ['09:15 AM', 'SG-11-003998', 'SEAGAS (SEAOIL)', 'Exchange', 'Juan Dela Cruz', 'ST002', 'With Customer', 'GenSan Main Yard'],
    ['10:02 AM', 'SG-11-004617', 'SEAGAS (SEAOIL)', 'Delivery', 'ABC Restaurant', 'ST003', 'GenSan Main Yard', 'Multi-cab 03'],
    ['11:37 AM', 'SG-11-004305', 'SEAGAS (SEAOIL)', 'Sale', 'Ana Reyes', 'ST001', 'GenSan Main Yard', 'With Customer'],
    ['01:18 PM', 'SG-11-004112', 'SEAGAS (SEAOIL)', 'Received', '—', 'ST004', 'SEAOIL Depot', 'GenSan Main Yard'],
  ]
  const shown = rows.filter(row => row.join(' ').toLowerCase().includes(query.toLowerCase()) && (filter === 'All Movements' || row[3] === filter.replace('Sold', 'Sale').replace('Delivered', 'Delivery').replace('Exchanged', 'Exchange')))

  return (
    <div className="page module-page movement-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}
      <div className="page-heading">
        <div><h1>Daily Cylinder Movement Log</h1><p>Track all cylinder movements for the selected date.</p></div>
      </div>
      <div className="movement-toolbar">
        <button className="date-button"><Icon name="calendar" size={17} /><span>October 16, 2026</span><Icon name="chevron" size={14} /></button>
        <SearchField value={query} onChange={setQuery} placeholder="Search by serial, customer, or staff code..." />
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          {['All Movements', 'Received', 'Sold', 'Exchanged', 'Delivered', 'Returned'].map(x => <option key={x}>{x}</option>)}
        </select>
        <Button variant="secondary" icon="download" onClick={() => { setToast('Movement log exported: Daily_Movement_Log.xlsx'); setTimeout(() => setToast(''), 2500); }}>Export</Button>
      </div>
      <div className="mini-stats movement-stats">
        {[['Received', '32', 'receive'], ['Sold / Exchanged', '18', 'swap'], ['Delivered', '12', 'truck'], ['Returned Empty', '14', 'cylinder']].map((s, i) => (
          <Card key={s[0]}>
            <span className={`stat-mark movement-mark-${i}`}><Icon name={s[2] as IconName} /></span>
            <div><small>{s[0]}</small><strong>{s[1]}</strong></div>
          </Card>
        ))}
      </div>
      <Card className="records-card">
        <CardTitle icon="swap" title="Movement Records" />
        <DataTable columns={['Time', 'Cylinder Serial', 'Brand', 'Movement Type', 'Customer', 'Staff Code', 'From Location', 'To Location']} rows={shown} />
        {shown.length === 0 && <div className="empty-state"><Icon name="search" size={30} /><strong>No matching movements</strong><span>Try another search or movement type.</span></div>}
        <div className="pagination"><span>Showing {shown.length} of 38 records</span><div><button>‹</button><button className="current">1</button><button>2</button><button>3</button><button>›</button></div></div>
      </Card>
    </div>
  )
}

function ARRiskControl() {
  const { settings } = useStationSettings()
  const [auditLog, setAuditLog] = useState<{ time: string; arId: string; customer: string; action: string; supervisor: string; reason: string }[]>([
    { time: 'Oct 14, 2026 · 02:15 PM', arId: 'AR-882104', customer: 'ABC Restaurant', action: 'Exception Logged', supervisor: 'ST001 Paolo', reason: 'Aging 35 days — Delivery proceeded under signed repayment agreement, logged in audit' },
    { time: 'Oct 10, 2026 · 10:45 AM', arId: 'AR-771059', customer: 'LM Food House', action: 'Transaction Blocked', supervisor: 'ST002 Maria', reason: 'Float 11 tanks — Order blocked at POS; customer advised to return shells' },
  ])

  const [toast, setToast] = useState('')
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('Active Risk & Float Ledger')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Hard-Locked' | 'At-Risk' | 'Good Standing'>('All')

  const agingDaysThreshold = parseInt(settings.agingLockDays, 10) || 30
  const warnDaysThreshold = parseInt(settings.agingWarnDays, 10) || 15

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const lockedAccounts = customerRiskData.filter(c => evaluateRisk(c, agingDaysThreshold).locked)
  const atRiskAccounts = customerRiskData.filter(c => {
    const r = evaluateRisk(c, agingDaysThreshold)
    return !r.locked && (c.oldestInvoiceDays >= warnDaysThreshold || c.currentFloat >= c.maxFloatLimit - 1)
  })

  const filteredData = customerRiskData.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false
    const { locked } = evaluateRisk(c, agingDaysThreshold)
    if (statusFilter === 'Hard-Locked') return locked
    if (statusFilter === 'At-Risk') return !locked && (c.oldestInvoiceDays >= warnDaysThreshold || c.currentFloat >= c.maxFloatLimit - 1)
    if (statusFilter === 'Good Standing') return !locked && c.oldestInvoiceDays < warnDaysThreshold && c.currentFloat < c.maxFloatLimit - 1
    return true
  })

  const totalOverdue = customerRiskData
    .flatMap(c => c.overdueInvoices)
    .reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[₱,]/g, '')), 0)

  const totalFloat = customerRiskData.reduce((sum, c) => sum + c.currentFloat, 0)

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}
      {/* ── 1. PAGE HEADER (Ops Data Layout Pattern 1) ── */}
      <MasterHeader
        title="AR & Credit Risk Control"
        subtitle={`Dual-ledger credit governance: ${agingDaysThreshold}-day invoice aging lock & steel cylinder float limits.`}
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="date-button">
              <Icon name="calendar" size={17} />October 16, 2026<Icon name="chevron" size={14} />
            </button>
            <Button
              variant="secondary"
              icon="download"
              onClick={() => showToast('AR Risk Ledger exported: AR_Risk_Report_Oct16.xlsx')}
            >
              Export Report
            </Button>

          </div>
        }
      />

      {/* ── 2. STAT STRIP (Ops Data Layout Pattern 2: One surface, 4 equal cells, hairline dividers) ── */}
      <StatStrip
        stats={[
          {
            label: 'Hard-Locked Accounts',
            value: `${lockedAccounts.length}`,
            sub: 'POS & dispatch release blocked',
            status: lockedAccounts.length > 0 ? 'danger' : 'ok',
          },
          {
            label: `Accounts At-Risk (${warnDaysThreshold}–${agingDaysThreshold - 1}d)`,
            value: `${atRiskAccounts.length}`,
            sub: `Approaching ${agingDaysThreshold}-day aging limit`,
            status: atRiskAccounts.length > 0 ? 'warning' : 'ok',
          },
          {
            label: 'Total Overdue Exposure',
            value: `₱${totalOverdue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
            sub: `Unpaid invoices past ${agingDaysThreshold} days`,
            status: totalOverdue > 0 ? 'danger' : 'ok',
          },
          {
            label: 'Active Cylinder Float',
            value: `${totalFloat} Tanks`,
            sub: 'Shells out across commercial accounts',
            status: 'info',
          },
        ]}
      />

      {/* ── 3. EMERGENCY LOCK STRIP (Pattern 1 Page Frame: full-width, shared edges) ── */}
      {lockedAccounts.length > 0 && (
        <div className="ar-lock-banner">
          <div className="ar-lock-banner-icon">
            <Icon name="close" size={20} />
          </div>
          <div className="ar-lock-banner-text">
            <strong>{lockedAccounts.length} Accounts Hard-Locked — POS Checkout & Dispatch Blocked</strong>
            <p>
              {lockedAccounts.map(c => c.name).join(' and ')} breached risk governance thresholds. Accounts remain locked until violations are resolved — outstanding invoices must be settled or cylinders returned. See the AR Audit Log for full history.
            </p>
          </div>

        </div>
      )}

      {/* ── 4. TABS (Ops Data Layout Pattern 3) ── */}
      <FilterTabs
        items={['Active Risk & Float Ledger', 'AR Exception Audit Log', 'Credit Policy & Lending Rules']}
        active={activeTab}
        onChange={setActiveTab}
      />

      {/* ── TAB 1: MASTER RISK & FLOAT LEDGER ── */}
      {activeTab === 'Active Risk & Float Ledger' && (
        <Card className="records-card master-table">
          {/* Pattern 4: Toolbar (36px controls, search takes free space) */}
          <div className="toolbar">
            <SearchField value={search} onChange={setSearch} placeholder="Search customer, business, or risk tier..." />
            <div style={{ display: 'flex', gap: 6 }}>
              {(['All', 'Hard-Locked', 'At-Risk', 'Good Standing'] as const).map(t => (
                <button
                  key={t}
                  className={`btn ${statusFilter === t ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ height: 36, fontSize: 12, padding: '0 12px' }}
                  onClick={() => setStatusFilter(t)}
                >
                  {t}
                  {t === 'Hard-Locked' && lockedAccounts.length > 0 && ` (${lockedAccounts.length})`}
                  {t === 'At-Risk' && atRiskAccounts.length > 0 && ` (${atRiskAccounts.length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Pattern 5 & 7: Table with Fixed Column Spec */}
          <div className="ops-table-wrap">
            <table className="ops-table-fixed">
              <colgroup>
                <col style={{ width: '220px' }} />
                <col style={{ width: '130px' }} />
                <col style={{ width: '170px' }} />
                <col style={{ width: '190px' }} />
                <col style={{ width: '170px' }} />
                <col style={{ width: '140px' }} />
                <col style={{ width: '110px' }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="text-left">Customer / Business</th>
                  <th className="text-left">Lending Tier</th>
                  <th className="text-right">Credit Aging</th>
                  <th className="text-right">Paautang Balance</th>
                  <th className="text-right">Cylinder Float</th>
                  <th className="text-left">Risk Status</th>
                  <th className="text-right"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(c => {
                  const { locked, reason, agingBreach, floatBreach } = evaluateRisk(c, agingDaysThreshold)
                  const isAtRisk = !locked && (c.oldestInvoiceDays >= warnDaysThreshold || c.currentFloat >= c.maxFloatLimit - 1)
                  const agingPct = Math.min(100, (c.oldestInvoiceDays / agingDaysThreshold) * 100)
                  const floatPct = Math.min(100, (c.currentFloat / c.maxFloatLimit) * 100)
                  const utilPct = Math.round((c.currentBalance / c.creditLimit) * 100)

                  return (
                    <tr key={c.name} className={locked ? 'clickable' : ''}>
                      {/* Customer / Business */}
                      <td className="cell-truncate">
                        <strong style={{ color: '#0f172a' }}>{c.name}</strong>
                        {c.overdueInvoices.length > 0 && (
                          <span className="ops-cell-sub danger">
                            {c.overdueInvoices.length} overdue bill{c.overdueInvoices.length > 1 ? 's' : ''} ({c.overdueInvoices[0].id})
                          </span>
                        )}
                      </td>

                      {/* Lending Tier */}
                      <td>
                        <Badge>{c.lendingTier}</Badge>
                      </td>

                      {/* Credit Aging (Right aligned with tabular nums + mini bar) */}
                      <td className="text-right tabular-nums">
                        <div>
                          <strong style={{ color: agingBreach ? '#dc2626' : c.oldestInvoiceDays >= warnDaysThreshold ? '#d97706' : '#078a76' }}>
                            {c.oldestInvoiceDays}d
                          </strong>
                          <span style={{ color: '#64748b', fontSize: 11 }}> / {agingDaysThreshold}d max</span>
                        </div>
                        <div className="ops-mini-bar">
                          <div
                            className={`ops-mini-bar-fill ${agingBreach ? 'danger' : c.oldestInvoiceDays >= warnDaysThreshold ? 'warn' : 'ok'}`}
                            style={{ width: `${agingPct}%` }}
                          />
                        </div>
                      </td>

                      {/* Paautang Balance (Right aligned with tabular nums) */}
                      <td className="text-right tabular-nums">
                        <div>
                          <strong>₱{c.currentBalance.toLocaleString('en-PH')}</strong>
                          <span style={{ color: '#64748b', fontSize: 11 }}> / ₱{(c.creditLimit / 1000).toFixed(0)}k</span>
                        </div>
                        <span className={`ops-cell-sub ${utilPct > 80 ? 'danger' : 'ok'}`}>
                          {utilPct}% credit utilised
                        </span>
                      </td>

                      {/* Cylinder Float (Right aligned with tabular nums + mini bar) */}
                      <td className="text-right tabular-nums">
                        <div>
                          <strong style={{ color: floatBreach ? '#dc2626' : '#0f172a' }}>
                            {c.currentFloat}
                          </strong>
                          <span style={{ color: '#64748b', fontSize: 11 }}> / {c.maxFloatLimit} tanks</span>
                        </div>
                        <div className="ops-mini-bar">
                          <div
                            className={`ops-mini-bar-fill ${floatBreach ? 'danger' : c.currentFloat >= c.maxFloatLimit - 1 ? 'warn' : 'ok'}`}
                            style={{ width: `${floatPct}%` }}
                          />
                        </div>
                      </td>

                      {/* Risk Status (Quiet dot-plus-text StatusChip) */}
                      <td>
                        <StatusChip tone={locked ? 'danger' : isAtRisk ? 'warn' : 'ok'}>
                          {locked
                            ? (reason === 'BOTH' ? 'Aging + Float' : reason === 'AGING' ? '30-Day Lock' : 'Float Breach')
                            : isAtRisk ? 'At Risk' : 'Clear'}
                        </StatusChip>
                      </td>

                      {/* Lock indicator */}
                      <td className="text-right">
                        <span style={{ fontSize: 12, color: locked ? '#dc2626' : '#64748b', fontWeight: locked ? 700 : 400 }}>
                          {locked ? '🔒 Locked' : 'Clear'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span>Showing {filteredData.length} of {customerRiskData.length} monitored commercial suki accounts</span>
            <div>
              <button disabled>‹</button>
              <button className="current">1</button>
              <button disabled>›</button>
            </div>
          </div>
        </Card>
      )}

      {/* ── TAB 2: AR EXCEPTION AUDIT LOG ── */}
      {activeTab === 'AR Exception Audit Log' && (
        <Card className="records-card master-table">
          <div className="toolbar">
            <SearchField value={search} onChange={setSearch} placeholder="Search by ref, customer, or staff..." />
            <Button
              variant="secondary"
              icon="download"
              onClick={() => showToast('Audit log exported: AR_Exception_Log_Oct16.csv')}
            >
              Export Audit Trail
            </Button>
          </div>

          <div className="ops-table-wrap">
            <table className="ops-table-fixed">
              <colgroup>
                <col style={{ width: '180px' }} />
                <col style={{ width: '130px' }} />
                <col style={{ width: '180px' }} />
                <col style={{ width: '130px' }} />
                <col style={{ width: '170px' }} />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th className="text-left">Timestamp</th>
                  <th className="text-left">Exception Ref</th>
                  <th className="text-left">Customer</th>
                  <th className="text-left">Decision</th>
                  <th className="text-left">Logged By</th>
                  <th className="text-left">Reason / Context</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.filter(e => e.customer.toLowerCase().includes(search.toLowerCase()) || e.arId.toLowerCase().includes(search.toLowerCase())).map((entry, idx) => {
                  const approved = entry.action.includes('Approved')
                  return (
                    <tr key={idx}>
                      <td style={{ color: '#64748b', fontSize: 12 }}>{entry.time}</td>
                      <td className="cell-mono" style={{ color: '#1877c9', fontWeight: 600 }}>{entry.arId}</td>
                      <td style={{ fontWeight: 600 }}>{entry.customer}</td>
                      <td>
                        <StatusChip tone={approved ? 'ok' : 'danger'}>
                          {approved ? 'Approved' : 'Rejected'}
                        </StatusChip>
                      </td>
                      <td><strong>{entry.supervisor}</strong></td>
                      <td className="cell-truncate" style={{ fontSize: 12, color: '#475569' }} title={entry.reason}>
                        {entry.reason}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ── TAB 3: CREDIT POLICY & LENDING RULES ── */}
      {activeTab === 'Credit Policy & Lending Rules' && (
        <div className="ar-policy-grid">
          {/* Card 1: Dual-Breach Governance Rules */}
          <Card>
            <CardTitle
              icon="receipt"
              title="Dual-Breach Governance Rules"
              subtitle="Algorithmic lock conditions governing POS checkout and dispatch releases"
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="ar-rule-row">
                <span className="ar-rule-tag danger">Aging ≥ 30d</span>
                <div className="ar-rule-content">
                  <strong>Automatic Credit Aging Lock</strong>
                  <p>
                    Any customer holding an unpaid delivery invoice older than 30 calendar days is immediately blocked from generating sales orders, palit-basyo exchanges, or dispatch trip manifests.
                  </p>
                </div>
              </div>
              <div className="ar-rule-row">
                <span className="ar-rule-tag danger">Float &gt; Limit</span>
                <div className="ar-rule-content">
                  <strong>Steel Cylinder Float Ceiling Breach</strong>
                  <p>
                    Triggered when unreturned empty basyo cylinders in customer custody exceed their lending tier limit. Releases of new full tanks are halted to protect station steel assets.
                  </p>
                </div>
              </div>
              <div className="ar-rule-row">
                <span className="ar-rule-tag warn">{warnDaysThreshold}–{agingDaysThreshold - 1} Days</span>
                <div className="ar-rule-content">
                  <strong>At-Risk Account Warning</strong>
                  <p>
                    Accounts approaching the {agingDaysThreshold}-day threshold display visual caution alerts on all terminals to prompt cashier collection before hard-lock activation.
                  </p>
                </div>
              </div>
              <div className="ar-rule-row">
                <span className="ar-rule-tag ok">Audit Trail</span>
                <div className="ar-rule-content">
                  <strong>Immutable AR Audit Log</strong>
                  <p>
                    Every transaction attempted on a locked account is automatically recorded in the AR Exception Audit Log — timestamp, customer, staff code, and reason. The supervisor reviews the log; no override mechanism exists. Violations must be resolved at source to clear the lock.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Card 2: Commercial Lending Tier Matrix */}
          <Card>
            <CardTitle
              icon="coins"
              title="Lending Tier & Collateral Matrix"
              subtitle="Pre-configured credit ceilings and allowed cylinder float by customer tier"
            />
            <table className="ar-tier-table">
              <thead>
                <tr>
                  <th>Lending Tier</th>
                  <th>Collateral Required</th>
                  <th>Credit Limit</th>
                  <th>Float Ceiling</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong style={{ color: '#078a76' }}>Full Deposit</strong>
                    <span className="ops-cell-sub">Residential & Walk-in</span>
                  </td>
                  <td>100% Cash Deposit</td>
                  <td className="tabular-nums">₱2,500.00</td>
                  <td className="tabular-nums">3 Tanks</td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ color: '#1877c9' }}>Mutual Agreement</strong>
                    <span className="ops-cell-sub">High-Volume Commercial</span>
                  </td>
                  <td>Signed MOA / Bank PDC</td>
                  <td className="tabular-nums">₱80,000.00</td>
                  <td className="tabular-nums">10 Tanks</td>
                </tr>
                <tr>
                  <td>
                    <strong style={{ color: '#b76307' }}>Partial Deposit</strong>
                    <span className="ops-cell-sub">Suki Bakeries & Carinderia</span>
                  </td>
                  <td>50% Cash Deposit + Trust</td>
                  <td className="tabular-nums">₱30,000.00</td>
                  <td className="tabular-nums">6 Tanks</td>
                </tr>
              </tbody>
            </table>
            <div style={{ padding: '14px 18px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: 12, color: '#64748b' }}>
              ℹ Tier parameters can be re-calibrated in <strong>Settings → Credit & Float Ceilings</strong>.
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

function ReportsAndAudit({ setPage }: { setPage: (page: string) => void }) {
  const { settings } = useStationSettings()
  const [tab, setTab] = useState('P&L & Financial Summary')
  const [period, setPeriod] = useState<'October 2026' | 'September 2026' | 'Q3 2026' | 'YTD 2026'>('October 2026')
  const [search, setSearch] = useState('')
  const [auditCategory, setAuditCategory] = useState('All')
  const [inspectingEvent, setInspectingEvent] = useState<any | null>(null)
  const [toast, setToast] = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2600)
  }

  // Monthly performance dataset
  const chartData = [
    { month: 'May', sales: 470000, expenses: 155000, cogs: 284000 },
    { month: 'Jun', sales: 520000, expenses: 165000, cogs: 312000 },
    { month: 'Jul', sales: 480000, expenses: 148000, cogs: 289000 },
    { month: 'Aug', sales: 590000, expenses: 175000, cogs: 356000 },
    { month: 'Sep', sales: 620000, expenses: 182000, cogs: 374000 },
    { month: 'Oct', sales: 684250, expenses: 189460, cogs: 412800 },
  ]

  // DOE RA 11592 comprehensive fleet movement rows
  const stockRows = [
    { sku: '11kg SEAGAS POL Standard', valve: 'POL Threaded 22mm', begF: 140, begE: 30, depotIn: 50, counterOut: 22, deliveryOut: 18, emptiesIn: 40, plantOut: 30, endF: 150, endE: 40, status: '0 · Balanced' },
    { sku: '11kg SEAGAS Snap-On', valve: 'Compact 20mm Quick-On', begF: 128, begE: 42, depotIn: 20, counterOut: 12, deliveryOut: 10, emptiesIn: 22, plantOut: 20, endF: 126, endE: 44, status: '0 · Balanced' },
    { sku: '50kg SEAGAS Industrial Heavy', valve: 'POL Heavy (SRV)', begF: 64, begE: 63, depotIn: 10, counterOut: 1, deliveryOut: 2, emptiesIn: 3, plantOut: 20, endF: 71, endE: 46, status: '0 · Balanced' },
    { sku: '2.7kg SEAGAS Camping Tank', valve: 'Compact Camping Valve', begF: 96, begE: 28, depotIn: 0, counterOut: 8, deliveryOut: 7, emptiesIn: 15, plantOut: 10, endF: 81, endE: 33, status: '0 · Balanced' },
    { sku: 'Trapped Cross-Brand Basyo', valve: 'Mixed (Gasul/Solane)', begF: 0, begE: 14, depotIn: 0, counterOut: 0, deliveryOut: 0, emptiesIn: 18, plantOut: 15, endF: 0, endE: 17, status: 'Swapped / Held' },
    { sku: 'Quarantine / Requal Bay', valve: 'Dented / 5-Yr Requal Hold', begF: 0, begE: 4, depotIn: 0, counterOut: 0, deliveryOut: 0, emptiesIn: 0, plantOut: 0, endF: 0, endE: 4, status: 'Locked (RA 11592)' },
  ]

  // Rich immutable audit dataset (14 operational records)
  const auditEntries = [
    { time: 'Oct 16, 2026 · 07:45 PM', staffCode: 'OWNER', staffName: 'Dexter Mendoza', category: 'EOD Closing', action: 'Daily Shift Locked', ref: 'Z-20261016-01', counterparty: 'Store Register REG-01', details: 'Shift #1 closed, till drawer locked with ₱25,620.00 safe remittance drop. PIN authorization verified.', hash: '8f4c91a02b489c...d31e92' },
    { time: 'Oct 16, 2026 · 07:28 PM', staffCode: 'EMP-004', staffName: 'Christopher Jude', category: 'EOD Closing', action: 'Till Denomination Tally', ref: 'EOD-20261016', counterparty: 'Cash Drawer REG-01', details: 'Itemized 6 bill denominations + coins. Counted ₱30,620.00 vs expected ₱30,670.00 (-₱50 variance logged).', hash: '3e12fa89b1772c...c498ae' },
    { time: 'Oct 16, 2026 · 03:40 PM', staffCode: 'OWNER', staffName: 'Dexter Mendoza', category: 'AR Overrides', action: 'Supervisor Unlock Approved', ref: 'OVR-2026-081', counterparty: 'LM Food House', details: 'Overrode Float Ceiling Lock (12/10 tanks) for 2 emergency 11kg tanks on signed PDC guarantee #78192.', hash: '9b740ef1a8904e...42cd09' },
    { time: 'Oct 16, 2026 · 01:18 PM', staffCode: 'ST002', staffName: 'Maria Lopez', category: 'POS Sales', action: 'Invoice & Swap Created', ref: 'INV-2026-0315', counterparty: 'LM Food House', details: 'Palit-basyo sale: 1x 11kg SEAGAS POL (₱600). Sound SG-11-004112 returned. Paid cash on counter.', hash: '12a9bc412389fe...59eb01' },
    { time: 'Oct 16, 2026 · 12:05 PM', staffCode: 'ST004', staffName: 'Ramon Bautista', category: 'Receiving QC', action: 'Depot Stock Accepted', ref: 'REC-2026-104', counterparty: 'SEAOIL Makar Depot', details: 'QC pass: 80x 11kg SEAGAS full cylinders. Spot weights 25.8–26.1 kg verified compliant (11.0 kg net gas).', hash: '56fe019a3b821c...77dd81' },
    { time: 'Oct 16, 2026 · 11:42 AM', staffCode: 'ST001', staffName: 'Christopher Jude', category: 'Operational OPEX', action: 'Expense Recorded', ref: 'EXP-0812', counterparty: 'Petron Calumpang', details: 'Disbursed petty cash ₱1,500.00 for Delivery Multicab fuel (Plate #KAA-9182). Official receipt attached.', hash: '7c89a012de432b...99ff24' },
    { time: 'Oct 16, 2026 · 10:28 AM', staffCode: 'ST003', staffName: 'Junjun Morales', category: 'Dispatches', action: 'Delivery Dispatched & Paid', ref: 'DEL-1017', counterparty: 'ABC Restaurant', details: 'Dispatched 4x 50kg Heavy cylinders. COD collection ₱19,000.00 cash remitted. Out: SG-50-001092..95.', hash: 'f4129bc87a110e...33ee11' },
    { time: 'Oct 16, 2026 · 09:15 AM', staffCode: 'ST002', staffName: 'Maria Lopez', category: 'POS Sales', action: 'Walk-in Palit-Basyo', ref: 'INV-2026-0314', counterparty: 'Juan Dela Cruz', details: 'Exchanged 1x 11kg Snap-On with cross-brand Prycegas shell. ₱50 off-brand inspection surcharge applied.', hash: '88de0914fb672a...11aa34' },
    { time: 'Oct 16, 2026 · 08:30 AM', staffCode: 'ST001', staffName: 'Christopher Jude', category: 'Dispatches', action: 'Route Manifest Assigned', ref: 'TRIP-2026-042', counterparty: 'Driver Junjun (Rider #1)', details: 'Loaded 18x 11kg POL tanks and 4x 50kg tanks for Labangal-Calumpang route delivery manifest.', hash: '44cd1298ef789c...66bb55' },
    { time: 'Oct 16, 2026 · 08:00 AM', staffCode: 'ST001', staffName: 'Christopher Jude', category: 'EOD Closing', action: 'Morning Till Opened', ref: 'OPEN-20261016', counterparty: 'Cash Drawer REG-01', details: 'Beginning cash float verified: ₱5,000.00 (4x ₱1k, 1x ₱500, 2x ₱200, 1x ₱100). Register opened.', hash: '09a41b52ef341d...88ff72' },
    { time: 'Oct 15, 2026 · 04:15 PM', staffCode: 'OWNER', staffName: 'Dexter Mendoza', category: 'AR Overrides', action: 'Supervisor Unlock Rejected', ref: 'OVR-2026-080', counterparty: 'ABC Restaurant', details: 'Rejected dispatch release: 38-day aging invoice (₱22,500.00) unpaid. Required 50% cashier collection first.', hash: 'aa14ef98cd7812...22ee44' },
    { time: 'Oct 15, 2026 · 02:10 PM', staffCode: 'ST002', staffName: 'Maria Lopez', category: 'POS Sales', action: 'New Cylinder Released', ref: 'DEP-2026-092', counterparty: 'Elena Bautista', details: 'New 11kg SEAGAS cylinder released with ₱1,800.00 refundable deposit slip #DS-1092 issued to customer.', hash: '55bc0912fa349c...77dd33' },
    { time: 'Oct 15, 2026 · 11:20 AM', staffCode: 'ST004', staffName: 'Ramon Bautista', category: 'Receiving QC', action: 'Quarantine Bay Transfer', ref: 'QC-SEG-019', counterparty: 'Yard Custody', details: 'Segregated 2x corroded 11kg shells past 5-year BPS hydrostatic requalification. Moved to locked cage.', hash: '22ef77aa89452b...00bb11' },
    { time: 'Oct 15, 2026 · 09:40 AM', staffCode: 'ST003', staffName: 'Junjun Morales', category: 'Dispatches', action: 'Suki Credit Payment', ref: 'COLL-2026-044', counterparty: "Aling Nena's Carinderia", details: 'Collected ₱4,500.00 partial credit settlement for 3x 11kg refill passbook ledger #KART-019.', hash: '66ff11dd88341a...44aa22' },
  ]

  const filteredAudit = auditEntries.filter(entry => {
    const matchesSearch = search === '' ||
      entry.details.toLowerCase().includes(search.toLowerCase()) ||
      entry.ref.toLowerCase().includes(search.toLowerCase()) ||
      entry.staffName.toLowerCase().includes(search.toLowerCase()) ||
      entry.counterparty.toLowerCase().includes(search.toLowerCase()) ||
      entry.action.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = auditCategory === 'All' || entry.category.includes(auditCategory)
    return matchesSearch && matchesCategory
  })

  // Suki credit exposure dataset
  const creditExposureData = [
    { name: 'ABC Restaurant', tier: 'Mutual Agreement', creditLimit: 50000, balance: 38200, oldestDays: 38, float: 14, maxFloat: 10, status: 'Locked (Aging ≥30d)' },
    { name: 'LM Food House', tier: 'Mutual Agreement', creditLimit: 30000, balance: 14500, oldestDays: 18, float: 12, maxFloat: 10, status: 'Locked (Float >10)' },
    { name: 'Golden Dragon Restaurant', tier: 'Mutual Agreement', creditLimit: 80000, balance: 42000, oldestDays: 12, float: 8, maxFloat: 10, status: 'Healthy' },
    { name: 'Villa Rose Bakery', tier: 'Partial Deposit', creditLimit: 25000, balance: 8500, oldestDays: 8, float: 4, maxFloat: 6, status: 'Healthy' },
    { name: "Aling Nena's Carinderia", tier: 'Full Deposit', creditLimit: 5000, balance: 1200, oldestDays: 4, float: 2, maxFloat: 3, status: 'Healthy' },
  ]

  const maxValue = 750000
  const chartHeight = 220
  const chartWidth = 520
  const leftPad = 42
  const bottomPad = 28
  const topPad = 16
  const usableHeight = chartHeight - topPad - bottomPad
  const groupWidth = 68
  const barWidth = 14

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}

      <MasterHeader
        title="Reports, P&L & Audit Controls"
        subtitle="Executive financial performance, audited statement of profit & loss, DOE RA 11592 compliance logs, and immutable cryptographic audit trails."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <select
              value={period}
              onChange={(e) => {
                setPeriod(e.target.value as any)
                showToast(`Switched active reporting period to ${e.target.value}`)
              }}
              style={{
                height: 36,
                padding: '0 12px',
                border: '1px solid #cbd5e1',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                color: '#0f172a',
                background: 'white',
              }}
            >
              <option value="October 2026">October 2026 (MTD)</option>
              <option value="September 2026">September 2026</option>
              <option value="Q3 2026">Q3 2026 (Jul–Sep)</option>
              <option value="YTD 2026">Full Year 2026 (YTD)</option>
            </select>
            <Button
              variant="secondary"
              icon="receipt"
              onClick={() => showToast('Generating official Station Financial Package (PDF)...')}
            >
              Print Summary
            </Button>
            <Button
              icon="download"
              onClick={() => showToast(`Downloaded: SEAGAS_${period.replace(/\s+/g, '_')}_Financial_Report.xlsx`)}
            >
              Export Report
            </Button>
          </div>
        }
      />

      <FilterTabs
        items={[
          'P&L & Financial Summary',
          'DOE Stock Movement (RA 11592)',
          'Immutable Audit Trail',
          'Credit Exposure & Liabilities',
        ]}
        active={tab}
        onChange={setTab}
      />

      {/* ── TAB 1: P&L & FINANCIAL SUMMARY ── */}
      {tab === 'P&L & Financial Summary' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Executive Stat Strip */}
          <StatStrip
            stats={[
              {
                label: 'Gross LPG Revenue',
                value: '₱684,250.00',
                sub: `+12.5% MTD vs. Sep · ${period}`,
                status: 'ok',
              },
              {
                label: 'Cost of Goods Sold (COGS)',
                value: '₱412,800.00',
                sub: '60.3% SEAOIL Depot Procurement',
                status: 'info',
              },
              {
                label: 'Operational Overhead (OPEX)',
                value: '₱189,460.00',
                sub: '-3.1% OPEX Control · Fuel & Payroll',
                status: 'ok',
              },
              {
                label: 'Net Station Operating Profit',
                value: '₱81,990.00',
                sub: '12.0% Net Margin · ₱2,644/day run rate',
                status: 'ok',
              },
            ]}
          />

          <div className="reports-grid">
            {/* Left Column: Visual Revenue Charts & SKU Distribution */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Monthly Bar Chart */}
              <Card>
                <CardTitle
                  icon="chart"
                  title="Revenue, COGS & Expense Progression (2026)"
                  subtitle="Monthly trend comparing Gross Sales, Terminal Procurement COGS, and Store OPEX"
                />

                <div className="line-chart" style={{ padding: '8px 0 0' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 16,
                      marginBottom: 8,
                      fontSize: 12,
                      color: '#71839c',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: '#12a995', display: 'inline-block' }} />
                      <span>Gross Sales</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: '#0d2b45', display: 'inline-block' }} />
                      <span>COGS</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: '#1877c9', display: 'inline-block' }} />
                      <span>OPEX</span>
                    </div>
                  </div>

                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    width="100%"
                    height="220"
                    role="img"
                    aria-label="Sales, COGS and expenses chart"
                  >
                    {[0, 1, 2, 3, 4].map((i) => {
                      const y = topPad + (usableHeight / 4) * i
                      return (
                        <line
                          key={i}
                          x1={leftPad}
                          y1={y}
                          x2={chartWidth - 8}
                          y2={y}
                          stroke="#E7EEF6"
                          strokeWidth="1"
                        />
                      )
                    })}

                    {[750000, 500000, 250000, 0].map((value, i) => {
                      const y = topPad + (usableHeight / 3) * i
                      return (
                        <text
                          key={value}
                          x={4}
                          y={y + 4}
                          fontSize="11"
                          fill="#71839C"
                        >
                          ₱{value === 0 ? '0' : `${value / 1000}k`}
                        </text>
                      )
                    })}

                    {chartData.map((item, i) => {
                      const x = leftPad + i * groupWidth + 14
                      const salesHeight = (item.sales / maxValue) * usableHeight
                      const cogsHeight = (item.cogs / maxValue) * usableHeight
                      const expensesHeight = (item.expenses / maxValue) * usableHeight
                      const salesY = topPad + usableHeight - salesHeight
                      const cogsY = topPad + usableHeight - cogsHeight
                      const expensesY = topPad + usableHeight - expensesHeight

                      return (
                        <g key={item.month}>
                          {/* Sales Bar */}
                          <rect
                            x={x}
                            y={salesY}
                            width={barWidth}
                            height={salesHeight}
                            rx={3}
                            fill="#12A995"
                          >
                            <title>{`Sales (${item.month}): ₱${item.sales.toLocaleString('en-PH')}`}</title>
                          </rect>

                          {/* COGS Bar */}
                          <rect
                            x={x + barWidth + 3}
                            y={cogsY}
                            width={barWidth}
                            height={cogsHeight}
                            rx={3}
                            fill="#0d2b45"
                          >
                            <title>{`COGS (${item.month}): ₱${item.cogs.toLocaleString('en-PH')}`}</title>
                          </rect>

                          {/* Expenses Bar */}
                          <rect
                            x={x + (barWidth * 2) + 6}
                            y={expensesY}
                            width={barWidth}
                            height={expensesHeight}
                            rx={3}
                            fill="#1877C9"
                          >
                            <title>{`OPEX (${item.month}): ₱${item.expenses.toLocaleString('en-PH')}`}</title>
                          </rect>

                          <text
                            x={x + barWidth + 6}
                            y={chartHeight - 6}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#71839C"
                          >
                            {item.month}
                          </text>
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </Card>

              {/* SKU Revenue Mix */}
              <Card>
                <CardTitle
                  icon="coins"
                  title="Revenue Contribution by Product SKU"
                  subtitle="Percentage and volume contribution to total gross monthly revenue"
                />
                <div style={{ padding: '0 20px 20px' }}>
                  <div className="sku-progress-bar">
                    <div className="sku-progress-segment" style={{ width: '64.0%', background: '#12a995' }} title="11kg Household: 64.0%" />
                    <div className="sku-progress-segment" style={{ width: '26.1%', background: '#1877c9' }} title="50kg Industrial: 26.1%" />
                    <div className="sku-progress-segment" style={{ width: '6.2%', background: '#f59e0b' }} title="2.7kg Camping: 6.2%" />
                    <div className="sku-progress-segment" style={{ width: '2.2%', background: '#8b5cf6' }} title="Off-Brand Swap: 2.2%" />
                    <div className="sku-progress-segment" style={{ width: '1.5%', background: '#64748b' }} title="Accessories: 1.5%" />
                  </div>

                  <div className="sku-legend-grid">
                    <div className="sku-legend-item">
                      <span className="sku-legend-dot" style={{ background: '#12a995' }} />
                      <div>
                        <strong>₱438,200 (64.0%)</strong>
                        <span className="ops-cell-sub">11kg Standard Refill</span>
                      </div>
                    </div>
                    <div className="sku-legend-item">
                      <span className="sku-legend-dot" style={{ background: '#1877c9' }} />
                      <div>
                        <strong>₱178,500 (26.1%)</strong>
                        <span className="ops-cell-sub">50kg Industrial Tanks</span>
                      </div>
                    </div>
                    <div className="sku-legend-item">
                      <span className="sku-legend-dot" style={{ background: '#f59e0b' }} />
                      <div>
                        <strong>₱42,350 (6.2%)</strong>
                        <span className="ops-cell-sub">2.7kg Camping Tanks</span>
                      </div>
                    </div>
                    <div className="sku-legend-item">
                      <span className="sku-legend-dot" style={{ background: '#8b5cf6' }} />
                      <div>
                        <strong>₱15,200 (2.2%)</strong>
                        <span className="ops-cell-sub">Swap Surcharges</span>
                      </div>
                    </div>
                    <div className="sku-legend-item">
                      <span className="sku-legend-dot" style={{ background: '#64748b' }} />
                      <div>
                        <strong>₱10,000 (1.5%)</strong>
                        <span className="ops-cell-sub">Accessories & Hoses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Audited Statement of Profit & Loss (P&L) */}
            <Card>
              <CardTitle
                icon="receipt"
                title={`Statement of Profit & Loss (${period})`}
                subtitle="Audited operational financial statement for SEAGAS General Santos Station"
                action={<Badge>Audited Book</Badge>}
              />

              <table className="pl-table">
                <tbody>
                  {/* Revenue Section */}
                  <tr className="pl-header">
                    <td>1. Gross Operating Revenue</td>
                    <td className="text-right">Amount (₱)</td>
                  </tr>
                  <tr className="pl-row">
                    <td className="indent">Walk-in Counter POS Sales</td>
                    <td className="text-right tabular-nums">₱312,400.00</td>
                  </tr>
                  <tr className="pl-row">
                    <td className="indent">Delivery Route Dispatches (COD & Suki)</td>
                    <td className="text-right tabular-nums">₱321,850.00</td>
                  </tr>
                  <tr className="pl-row">
                    <td className="indent">Suki Credit Account Collections</td>
                    <td className="text-right tabular-nums">₱50,000.00</td>
                  </tr>
                  <tr className="pl-subtotal">
                    <td>TOTAL OPERATING REVENUE</td>
                    <td className="text-right tabular-nums" style={{ color: '#078a76', fontWeight: 700 }}>
                      ₱684,250.00
                    </td>
                  </tr>

                  {/* COGS Section */}
                  <tr className="pl-header">
                    <td>2. Cost of Goods Sold (COGS)</td>
                    <td className="text-right">Amount (₱)</td>
                  </tr>
                  <tr className="pl-row">
                    <td className="indent">SEAOIL Makar Bulk Terminal Purchases</td>
                    <td className="text-right tabular-nums">₱394,600.00</td>
                  </tr>
                  <tr className="pl-row">
                    <td className="indent">Terminal Freight, Hauling & Pumping Fee</td>
                    <td className="text-right tabular-nums">₱18,200.00</td>
                  </tr>
                  <tr className="pl-subtotal">
                    <td>TOTAL COST OF SALES</td>
                    <td className="text-right tabular-nums" style={{ color: '#b23942', fontWeight: 700 }}>
                      ₱412,800.00
                    </td>
                  </tr>
                  <tr className="pl-subtotal" style={{ background: '#f8fafc' }}>
                    <td>GROSS OPERATING MARGIN (39.7%)</td>
                    <td className="text-right tabular-nums" style={{ color: '#0f172a', fontWeight: 700 }}>
                      ₱271,450.00
                    </td>
                  </tr>

                  {/* Operating Expenses Section */}
                  <tr className="pl-header">
                    <td>3. Operating Expenses (OPEX)</td>
                    <td className="text-right">Amount (₱)</td>
                  </tr>
                  <tr className="pl-row">
                    <td className="indent">Rider Fuel Advances & Fleet Maintenance</td>
                    <td className="text-right tabular-nums">₱54,200.00</td>
                  </tr>
                  <tr className="pl-row">
                    <td className="indent">Station Staff Salaries & Daily Allowances</td>
                    <td className="text-right tabular-nums">₱98,000.00</td>
                  </tr>
                  <tr className="pl-row">
                    <td className="indent">Terminal Electricity, Utilities & Facility Rent</td>
                    <td className="text-right tabular-nums">₱24,500.00</td>
                  </tr>
                  <tr className="pl-row">
                    <td className="indent">DOE Permits, BIR Seals & BPS Requal Fees</td>
                    <td className="text-right tabular-nums">₱12,760.00</td>
                  </tr>
                  <tr className="pl-subtotal">
                    <td>TOTAL OPERATING OVERHEAD</td>
                    <td className="text-right tabular-nums" style={{ color: '#b23942', fontWeight: 700 }}>
                      ₱189,460.00
                    </td>
                  </tr>

                  {/* Net Operating Income */}
                  <tr className="pl-net">
                    <td>NET STATION PROFIT (12.0% Margin)</td>
                    <td className="text-right tabular-nums" style={{ fontSize: 16 }}>
                      ₱81,990.00
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style={{ padding: '14px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#64748b' }}>
                  Certified by: {settings.stationOwner} (Owner & Station Licensee) · BIR TIN {settings.stationTin} · DOE Permit: {settings.doePermit}
                </span>
                <Button
                  variant="ghost"
                  onClick={() => showToast('Exported official P&L spreadsheet (Excel)!')}
                >
                  Export P&L
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ── TAB 2: DOE STOCK MOVEMENT REPORT (RA 11592) ── */}
      {tab === 'DOE Stock Movement (RA 11592)' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="compliance-banner">
            <Icon name="check" />
            <div>
              <strong>Official DOE RA 11592 Cylinder Fleet Reconciliation — Region XII</strong>
              <span>
                Mandatory monthly report required under Philippine LPG Safety Law. Tracks full cylinder inflows from SEAOIL Makar Terminal, counter/dispatch sales, empty basyo retrieval, and plant returns.
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Badge>Permit: R12-DOE-LPG-0914</Badge>
              <Badge>0 Drift · Compliant</Badge>
            </div>
          </div>

          <Card className="records-card master-table compliance-table">
            <CardTitle
              icon="chart"
              title={`Department of Energy Monthly Stock Reconciliation (${period})`}
              subtitle="All counts verified against physical yard logs, dispatch trip tickets, and depot delivery receipts"
              action={
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button
                    variant="secondary"
                    icon="receipt"
                    onClick={() => showToast('Printing DOE Form Annex B Official Certificate...')}
                  >
                    Print DOE Return
                  </Button>
                  <Button
                    icon="download"
                    onClick={() => showToast('Downloaded: DOE_Annex_B_LPG_Monthly_Report.csv')}
                  >
                    Export DOE Form
                  </Button>
                </div>
              }
            />

            <div className="ops-table-wrap">
              <table className="ops-table-fixed">
                <colgroup>
                  <col style={{ width: '220px' }} />
                  <col style={{ width: '130px' }} />
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '90px' }} />
                  <col style={{ width: '95px' }} />
                  <col style={{ width: '95px' }} />
                  <col style={{ width: '90px' }} />
                  <col style={{ width: '105px' }} />
                  <col style={{ width: '115px' }} />
                  <col style={{ width: '115px' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className="text-left">SKU & Cylinder Class</th>
                    <th className="text-left">Valve Specification</th>
                    <th className="text-right">Opening (F / E)</th>
                    <th className="text-right">Depot In</th>
                    <th className="text-right">Counter Out</th>
                    <th className="text-right">Delivery Out</th>
                    <th className="text-right">Empties In</th>
                    <th className="text-right">Plant Return</th>
                    <th className="text-right">Ending (F / E)</th>
                    <th className="text-center">Audit Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stockRows.map((r, i) => (
                    <tr key={i}>
                      <td>
                        <strong style={{ color: '#163652', display: 'block' }}>{r.sku}</strong>
                      </td>
                      <td style={{ color: '#64748b', fontSize: 12 }}>{r.valve}</td>
                      <td className="text-right tabular-nums">{r.begF} F / {r.begE} E</td>
                      <td className="text-right tabular-nums" style={{ color: '#078a76', fontWeight: 600 }}>
                        {r.depotIn > 0 ? `+${r.depotIn} F` : '—'}
                      </td>
                      <td className="text-right tabular-nums" style={{ color: '#b23942' }}>
                        {r.counterOut > 0 ? `−${r.counterOut} F` : '—'}
                      </td>
                      <td className="text-right tabular-nums" style={{ color: '#b23942' }}>
                        {r.deliveryOut > 0 ? `−${r.deliveryOut} F` : '—'}
                      </td>
                      <td className="text-right tabular-nums" style={{ color: '#1877c9', fontWeight: 600 }}>
                        {r.emptiesIn > 0 ? `+${r.emptiesIn} E` : '—'}
                      </td>
                      <td className="text-right tabular-nums" style={{ color: '#6b51ad' }}>
                        {r.plantOut > 0 ? `−${r.plantOut} E` : '—'}
                      </td>
                      <td className="text-right tabular-nums" style={{ fontWeight: 700, color: '#0e2b45' }}>
                        {r.endF} F / {r.endE} E
                      </td>
                      <td className="text-center">
                        <StatusChip tone={r.status.includes('Balanced') ? 'ok' : r.status.includes('Locked') ? 'danger' : 'warning'}>
                          {r.status}
                        </StatusChip>
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f8fafc', fontWeight: 700 }}>
                    <td>Total Station Fleet Inventory</td>
                    <td>Official Tally</td>
                    <td className="text-right tabular-nums">428 F / 195 E</td>
                    <td className="text-right tabular-nums" style={{ color: '#078a76' }}>+80 F</td>
                    <td className="text-right tabular-nums" style={{ color: '#b23942' }}>−43 F</td>
                    <td className="text-right tabular-nums" style={{ color: '#b23942' }}>−37 F</td>
                    <td className="text-right tabular-nums" style={{ color: '#1877c9' }}>+95 E</td>
                    <td className="text-right tabular-nums" style={{ color: '#6b51ad' }}>−95 E</td>
                    <td className="text-right tabular-nums" style={{ color: '#078a76' }}>428 F / 170 E</td>
                    <td className="text-center">
                      <StatusChip tone="ok">✓ 0 Drift</StatusChip>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, margin: '14px 20px 20px' }}>
              <div style={{ padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12 }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: 4 }}>
                  BPS 5-Year Hydrostatic Requalification Check
                </strong>
                <span style={{ color: '#64748b' }}>
                  All 428 full tanks hold valid collar test stamps (2023–2025). 4 quarantined empty shells segregated in locked holding bay awaiting terminal hydro-testing.
                </span>
              </div>
              <div style={{ padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12 }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: 4 }}>
                  DOE Regional Office Verification
                </strong>
                <span style={{ color: '#64748b' }}>
                  Report certified under penalty of license revocation pursuant to Section 18 of Republic Act No. 11592. GenSan Terminal Inspector: Engr. R. Alcantara (DOE-R12).
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ── TAB 3: IMMUTABLE AUDIT TRAIL ── */}
      {tab === 'Immutable Audit Trail' && (
        <Card className="records-card master-table">
          <CardTitle
            icon="shield"
            title="Permanent Station Operational Audit Trail"
            subtitle="Immutable event logs recording all invoices, trip manifests, AR lock overrides, QC receiving inspections, and EOD closings"
            action={<Badge>{filteredAudit.length} Verified Records</Badge>}
          />

          {/* Search & Category Filter Toolbar */}
          <div style={{ padding: '12px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <SearchField
                value={search}
                onChange={setSearch}
                placeholder="Search audit trail by operator, action, record ref, or customer..."
              />
              <Button
                variant="secondary"
                icon="download"
                onClick={() => showToast('Downloaded: Complete_Audit_Trail_Ledger.csv')}
              >
                Export Audit Trail
              </Button>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[
                { key: 'All', label: 'All Events', count: auditEntries.length },
                { key: 'POS Sales', label: 'Counter Sales', count: auditEntries.filter(e => e.category === 'POS Sales').length },
                { key: 'Dispatches', label: 'Route Deliveries', count: auditEntries.filter(e => e.category === 'Dispatches').length },
                { key: 'AR Overrides', label: 'Supervisor Overrides', count: auditEntries.filter(e => e.category === 'AR Overrides').length },
                { key: 'Receiving QC', label: 'Stock Receiving QC', count: auditEntries.filter(e => e.category === 'Receiving QC').length },
                { key: 'EOD Closing', label: 'Daily EOD Closings', count: auditEntries.filter(e => e.category === 'EOD Closing').length },
              ].map(cat => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setAuditCategory(cat.key)}
                  style={{
                    height: 28,
                    padding: '0 10px',
                    borderRadius: 5,
                    border: '1px solid',
                    borderColor: auditCategory === cat.key ? '#078a76' : '#dce5ed',
                    background: auditCategory === cat.key ? '#eaf8f5' : 'white',
                    color: auditCategory === cat.key ? '#078a76' : '#475569',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>{cat.label}</span>
                  <span style={{ opacity: 0.7, fontSize: 10 }}>({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="ops-table-wrap">
            <table className="ops-table-fixed">
              <colgroup>
                <col style={{ width: '150px' }} />
                <col style={{ width: '130px' }} />
                <col style={{ width: '170px' }} />
                <col style={{ width: '130px' }} />
                <col style={{ width: '150px' }} />
                <col />
                <col style={{ width: '90px' }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="text-left">Timestamp</th>
                  <th className="text-left">Operator</th>
                  <th className="text-left">Event Action</th>
                  <th className="text-left">Record Ref</th>
                  <th className="text-left">Counterparty / Hub</th>
                  <th className="text-left">Transaction & Audit Context</th>
                  <th className="text-center">Inspector</th>
                </tr>
              </thead>
              <tbody>
                {filteredAudit.map((r, i) => (
                  <tr key={i} style={{ cursor: 'pointer' }} onClick={() => setInspectingEvent(r)}>
                    <td style={{ color: '#64748b', fontSize: 12 }}>{r.time}</td>
                    <td>
                      <strong style={{ color: '#0f172a', display: 'block', fontSize: 12 }}>{r.staffName}</strong>
                      <span className="cell-mono" style={{ color: '#64748b', fontSize: 10 }}>{r.staffCode}</span>
                    </td>
                    <td>
                      <StatusChip tone={r.category === 'AR Overrides' ? 'warning' : r.category === 'EOD Closing' ? 'ok' : 'neutral'}>
                        {r.action}
                      </StatusChip>
                    </td>
                    <td className="cell-mono" style={{ color: '#1877c9', fontWeight: 600 }}>{r.ref}</td>
                    <td style={{ fontWeight: 600, fontSize: 12, color: '#334155' }}>{r.counterparty}</td>
                    <td className="cell-truncate" style={{ color: '#475569', fontSize: 12 }} title={r.details}>
                      {r.details}
                    </td>
                    <td className="text-center">
                      <Button
                        variant="ghost"
                        style={{ height: 26, fontSize: 11, padding: '0 8px' }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setInspectingEvent(r)
                        }}
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ── TAB 4: CREDIT EXPOSURE & LIABILITIES ── */}
      {tab === 'Credit Exposure & Liabilities' && (
        <div className="credit-exposure-page">

          {/* ── TIER 1: KPI STRIP ── */}
          <StatStrip
            stats={[
              { label: 'Total Credit Receivables', value: '₱184,500.00', sub: '18 commercial suki accounts', status: 'info' },
              { label: 'Overdue ≥30 Days', value: '₱22,500.00', sub: 'ABC Restaurant · Auto Hard-Locked', status: 'danger' },
              { label: 'Cylinder Float on Street', value: '48 Tanks', sub: '2 accounts over float limit', status: 'warning' },
              { label: 'Deposit Escrow Liability', value: '₱1,843,200.00', sub: '100% cash-backed trust reserve', status: 'ok' },
            ]}
          />

          {/* ── BREACH ALERT BANNER ── */}
          {creditExposureData.filter(c => c.status.includes('Locked')).length > 0 && (
            <div className="exposure-breach-banner">
              <div className="exposure-breach-icon"><Icon name="shield" size={18} /></div>
              <div className="exposure-breach-body">
                <strong>{creditExposureData.filter(c => c.status.includes('Locked')).length} Accounts in Hard-Lock</strong>
                <span>{creditExposureData.filter(c => c.status.includes('Locked')).map(c => c.name).join(' · ')} — POS & dispatch release blocked until violations resolved.</span>
              </div>
              <button className="btn btn-sm" style={{ flexShrink: 0, fontSize: 11 }} onClick={() => setPage('AR & Credit Risk Control')}>
                View AR Risk Engine →
              </button>
            </div>
          )}

          {/* ── TIER 2: FULL-WIDTH EXPOSURE TABLE ── */}
          <Card>
            <CardTitle
              icon="coins"
              title="Commercial Credit Exposure Ledger"
              subtitle="Dual-breach monitoring — invoice aging lock & steel cylinder float limits"
              action={<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Badge>{creditExposureData.filter(c => c.status.includes('Locked')).length} Locked</Badge>
                <Badge>{creditExposureData.length} Accounts</Badge>
              </div>}
            />
            <div className="ops-table-wrap">
              <table className="ops-table-fixed">
                <colgroup>
                  <col style={{ width: '200px' }} />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '220px' }} />
                  <col style={{ width: '100px' }} />
                  <col style={{ width: '130px' }} />
                  <col style={{ width: '120px' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className="text-left">Customer / Tier</th>
                    <th className="text-right">Outstanding</th>
                    <th className="text-left" style={{ paddingLeft: 14 }}>Credit Utilization</th>
                    <th className="text-right">Aging</th>
                    <th className="text-right">Float / Limit</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {creditExposureData.map((c, i) => {
                    const utilPct = Math.min(100, Math.round((c.balance / c.creditLimit) * 100))
                    const isLocked = c.status.includes('Locked')
                    const isAgingBreach = c.oldestDays >= 30
                    const isFloatBreach = c.float > c.maxFloat
                    return (
                      <tr key={i} className={isLocked ? 'exposure-row-locked' : ''}>
                        <td>
                          <strong style={{ color: '#0f172a', display: 'block', fontSize: 13 }}>{c.name}</strong>
                          <span className="ops-cell-sub">{c.tier}</span>
                        </td>
                        <td className="text-right tabular-nums" style={{ fontWeight: 700, fontSize: 13 }}>
                          ₱{c.balance.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                        </td>
                        <td style={{ paddingLeft: 14 }}>
                          <div className="exposure-util-wrap">
                            <div className="exposure-util-bar">
                              <div
                                className={`exposure-util-fill ${utilPct >= 80 ? 'danger' : utilPct >= 60 ? 'warn' : 'ok'}`}
                                style={{ width: `${utilPct}%` }}
                              />
                            </div>
                            <span className="exposure-util-label">
                              {utilPct}% of ₱{(c.creditLimit / 1000).toFixed(0)}K limit
                            </span>
                          </div>
                        </td>
                        <td className="text-right tabular-nums">
                          <span className={`exposure-aging-badge ${isAgingBreach ? 'breach' : c.oldestDays >= 15 ? 'warn' : 'ok'}`}>
                            {c.oldestDays}d
                          </span>
                        </td>
                        <td className="text-right tabular-nums">
                          <div className="exposure-float-cell">
                            <span className={isFloatBreach ? 'exposure-float-breach' : ''}>{c.float}</span>
                            <span className="exposure-float-max">/ {c.maxFloat}</span>
                          </div>
                        </td>
                        <td className="text-center">
                          <StatusChip tone={isLocked ? 'danger' : 'ok'}>
                            {isLocked ? (isAgingBreach && isFloatBreach ? 'Dual Breach' : isAgingBreach ? 'Aging Lock' : 'Float Lock') : 'Good'}
                          </StatusChip>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="exposure-totals-row">
                    <td><strong>Total Exposure</strong></td>
                    <td className="text-right tabular-nums">
                      <strong>₱{creditExposureData.reduce((s,c) => s + c.balance, 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
                    </td>
                    <td colSpan={4} style={{ paddingLeft: 14, color: '#64748b', fontSize: 11 }}>
                      Combined credit limit: ₱{creditExposureData.reduce((s,c) => s + c.creditLimit, 0).toLocaleString('en-PH')} · Avg utilization: {Math.round(creditExposureData.reduce((s,c) => s + (c.balance/c.creditLimit)*100, 0) / creditExposureData.length)}%
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>

          {/* ── TIER 3: BOTTOM 2-COL — AGING WATERFALL + ESCROW TRUST ── */}
          <div className="exposure-bottom-grid">

            {/* Aging Bucket Waterfall */}
            <Card>
              <CardTitle
                icon="clock"
                title="Receivables Aging Waterfall"
                subtitle="Invoice aging buckets — overdue concentration by days outstanding"
              />
              <div className="aging-waterfall">
                {[
                  { label: 'Current (0–14d)', amount: 104200, pct: 56, tone: 'ok' },
                  { label: '15–29 Days', amount: 58000, pct: 31, tone: 'warn' },
                  { label: '30–44 Days', amount: 16500, pct: 9, tone: 'danger' },
                  { label: '45+ Days (Doubtful)', amount: 5800, pct: 3, tone: 'danger' },
                ].map((bucket, i) => (
                  <div key={i} className="aging-bucket-row">
                    <div className="aging-bucket-label">
                      <span>{bucket.label}</span>
                      <strong className="tabular-nums">₱{bucket.amount.toLocaleString('en-PH')}</strong>
                    </div>
                    <div className="aging-bucket-track">
                      <div className={`aging-bucket-fill ${bucket.tone}`} style={{ width: `${bucket.pct}%` }} />
                    </div>
                    <span className={`aging-bucket-pct ${bucket.tone}`}>{bucket.pct}%</span>
                  </div>
                ))}
                <div className="aging-waterfall-total">
                  <span>Total AR Receivables</span>
                  <strong className="tabular-nums">₱184,500.00</strong>
                </div>
              </div>
            </Card>

            {/* Cylinder Deposit Escrow Trust */}
            <Card>
              <CardTitle
                icon="cylinder"
                title="Cylinder Deposit Escrow Trust"
                subtitle="Refundable cash held in segregated trust — never recognized as revenue"
                action={<span className="status-chip" style={{ background: '#f0fdf4', color: '#15803d', borderColor: '#86efac' }}>✓ Fully Backed</span>}
              />
              <div className="escrow-trust-body">
                {[
                  { label: '11.0 kg Household Shells', count: 824, unit: '₱1,800', total: 1483200 },
                  { label: '50.0 kg Industrial Heavy', count: 68, unit: '₱4,500', total: 306000 },
                  { label: '2.7 kg Camping Compact', count: 57, unit: '₱950', total: 54150 },
                ].map((row, i) => (
                  <div key={i} className="escrow-line">
                    <div className="escrow-line-meta">
                      <Icon name="cylinder" size={13} />
                      <div>
                        <strong>{row.label}</strong>
                        <span>{row.count} cylinders × {row.unit} escrow value</span>
                      </div>
                    </div>
                    <strong className="tabular-nums escrow-line-amount">
                      ₱{row.total.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                ))}

                <div className="escrow-trust-total">
                  <div>
                    <strong>Total Deposit Escrow Liability</strong>
                    <span>BDO GenSan Escrow Acct #104-982-119</span>
                  </div>
                  <strong className="tabular-nums" style={{ fontSize: 22, color: '#0f766e' }}>₱1,843,350.00</strong>
                </div>

                <div className="escrow-trust-notice">
                  <Icon name="check" size={14} />
                  <span>All deposits held in a segregated fund. 100% refundable upon cylinder return. Never co-mingled with operating cash.</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ── AUDIT LOG INTEGRITY & EVENT INSPECTOR MODAL ── */}
      {inspectingEvent && (
        <div className="modal-backdrop document-backdrop" onClick={() => setInspectingEvent(null)}>
          <div className="document-modal audit-inspector-modal" onClick={(e) => e.stopPropagation()}>
            <button className="document-close" onClick={() => setInspectingEvent(null)} aria-label="Close Audit Inspector">✕</button>

            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon name="shield" size={20} />
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, color: '#0f172a' }}>Immutable Audit Event Inspector</h3>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Cryptographic verification of station operations log</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14, fontSize: 13 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <span style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Event Timestamp</span>
                  <div style={{ fontWeight: 600, color: '#0f172a', marginTop: 3 }}>{inspectingEvent.time}</div>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Record Reference</span>
                  <div className="cell-mono" style={{ fontWeight: 700, color: '#1877c9', marginTop: 3 }}>{inspectingEvent.ref}</div>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Operator Attribution</span>
                  <div style={{ fontWeight: 600, color: '#0f172a', marginTop: 3 }}>{inspectingEvent.staffName} ({inspectingEvent.staffCode})</div>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Event Classification</span>
                  <div style={{ marginTop: 3 }}>
                    <StatusChip tone="ok">{inspectingEvent.action}</StatusChip>
                  </div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Counterparty / Terminal Node</span>
                <div style={{ fontWeight: 600, color: '#0f172a', marginTop: 3 }}>{inspectingEvent.counterparty}</div>
              </div>

              <div>
                <span style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Event Context & Audit Payload</span>
                <div style={{ padding: '12px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, color: '#334155', marginTop: 4, lineHeight: 1.5 }}>
                  {inspectingEvent.details}
                </div>
              </div>

              <div>
                <span style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>SHA-256 Ledger Cryptographic Hash</span>
                <code className="audit-hash-badge" style={{ marginTop: 4 }}>
                  {inspectingEvent.hash} · [BLOCK #841920 · MERKLE ROOT VALID]
                </code>
              </div>
            </div>

            <div style={{ padding: '14px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#078a76', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>✓</span> Tamper-Evident Ledger Integrity Confirmed
              </span>
              <Button onClick={() => setInspectingEvent(null)}>Close Inspector</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StationSettings() {
  const { settings, setSettings } = useStationSettings()
  const [initialSettings, setInitialSettings] = useState(settings)
  const [tab, setTab] = useState('Pricing & Delivery')
  const [toast, setToast] = useState('')
  const [showPin, setShowPin] = useState(false)

  const isDirty = useMemo(() => {
    return JSON.stringify(settings) !== JSON.stringify(initialSettings)
  }, [settings, initialSettings])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  function handleUpdate(field: keyof StationSettingsData, val: string) {
    setSettings(prev => ({ ...prev, [field]: val }))
  }

  function handleSave(e: FormEvent) {
    e.preventDefault()
    setInitialSettings(settings)
    showToast('All station parameters, VAT rates, credit terms, and credentials saved successfully!')
  }

  function handleCancel() {
    setSettings(initialSettings)
    showToast('Changes discarded.')
  }

  function handleReset() {
    setSettings(defaultStationSettings)
    showToast('Parameters reset to default station standards.')
  }


  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}

      <MasterHeader
        title="Settings & System Configuration"
        subtitle="Manage official LPG refill pricing, VAT and tax rates, credit aging days, cylinder safety tolerances, and station security credentials."
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            {isDirty && (
              <Button variant="secondary" onClick={handleCancel}>Discard Changes</Button>
            )}
            <Button variant="secondary" onClick={handleReset}>Reset Defaults</Button>
            <Button icon="check" onClick={handleSave} disabled={!isDirty}>Save Settings</Button>
          </div>
        }
      />

      <StatStrip
        stats={[
          {
            label: '11kg Standard Refill',
            value: `₱${settings.refill11kg}`,
            sub: 'DOE Regulated Household Benchmark',
            status: 'ok',
          },
          {
            label: 'Tax & VAT Treatment',
            value: settings.taxRegistration.includes('Non-VAT') ? 'Non-VAT (0%)' : `VAT (${settings.vatRate}%)`,
            sub: `${settings.statutoryDiscount}% Senior/PWD Discount`,
            status: 'info',
          },
          {
            label: 'Credit Aging Hard-Lock',
            value: `${settings.agingLockDays} Days`,
            sub: `Warning alert at ${settings.agingWarnDays} days`,
            status: 'danger',
          },
          {
            label: 'Safety Requalification',
            value: `${settings.requalYears} Years (RA 11592)`,
            sub: `${settings.minNetWeight11kg}–${settings.maxNetWeight11kg} kg Net Gas`,
            status: 'ok',
          },
        ]}
      />



      {isDirty && (
        <div className="unsaved-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="clock" size={16} />
            <strong>You have unsaved changes to station parameters.</strong>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" onClick={handleCancel} style={{ height: 28, fontSize: 12, padding: '0 10px' }}>Cancel</Button>
            <Button onClick={handleSave} style={{ height: 28, fontSize: 12, padding: '0 10px' }}>Save Now</Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSave}>
      <div className="settings-modern-container">
        <aside className="settings-nav-panel">
          {[
            { id: 'Pricing & Delivery', label: 'Pricing & Delivery', icon: 'receipt' as const },
            { id: 'Cylinder Deposits', label: 'Cylinder Deposits', icon: 'cylinder' as const },
            { id: 'Tax, VAT & Invoicing', label: 'Tax, VAT & Invoicing', icon: 'coins' as const },
            { id: 'Credit Terms & Days', label: 'Credit Terms & Days', icon: 'shield' as const },
            { id: 'Safety & RA 11592 QC', label: 'Safety & RA 11592 QC', icon: 'check' as const },
            { id: 'Station & Security PINs', label: 'Station & Security PINs', icon: 'user' as const },
          ].map(item => (
            <button
              key={item.id}
              type="button"
              className={`settings-nav-item ${tab === item.id ? 'active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              <span className="settings-nav-icon"><Icon name={item.icon} size={16} /></span>
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        <main className="settings-content-pane">
          {/* Card 1: Standard Retail Refill Prices & Delivery Fees */}
          {tab === 'Pricing & Delivery' && (
            <Card className="settings-section-card">
              <CardTitle
                icon="receipt"
                title="Refill Pricing & Logistics Fees"
                subtitle="Regulated consumer prices per cylinder SKU and route delivery fees"
              />
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>11.0 kg Household Refill (POL & Snap-On)</strong>
                  <span>Standard consumer retail refill price</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`₱${settings.refill11kg}`}
                  onChange={e => handleUpdate('refill11kg', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>50.0 kg Industrial Heavy Refill</strong>
                  <span>Commercial restaurants & bakeries bulk refill</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`₱${settings.refill50kg}`}
                  onChange={e => handleUpdate('refill50kg', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>2.7 kg Camping Refill</strong>
                  <span>Compact portable camping tank refills</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`₱${settings.refill2kg}`}
                  onChange={e => handleUpdate('refill2kg', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Cross-Brand Palit-Basyo Surcharge</strong>
                  <span>Inspection & swapping fee for non-SEAGAS basyo</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`₱${settings.offBrandFee}`}
                  onChange={e => handleUpdate('offBrandFee', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Standard Delivery Drop Service Fee</strong>
                  <span>Applied per delivery ticket (free for contracted suki)</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`₱${settings.deliveryFee}`}
                  onChange={e => handleUpdate('deliveryFee', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Retained Morning Till Cash Float</strong>
                  <span>Standard float retained in drawer after EOD cash drop</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`₱${settings.morningFloat}`}
                  onChange={e => handleUpdate('morningFloat', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
            </Card>
          )}

          {/* Card 2: Cylinder Deposit Replacement Values */}
          {tab === 'Cylinder Deposits' && (
            <Card className="settings-section-card">
              <CardTitle
                icon="cylinder"
                title="Cylinder Deposit Replacement Values"
                subtitle="Cash deposit liabilities held in escrow for new cylinder releases"
              />
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>11.0 kg Steel Shell Deposit</strong>
                  <span>100% refundable upon surrender of sound shell</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`₱${settings.deposit11kg}`}
                  onChange={e => handleUpdate('deposit11kg', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>50.0 kg Industrial Shell Deposit</strong>
                  <span>Commercial deposit held in segregated escrow</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`₱${settings.deposit50kg}`}
                  onChange={e => handleUpdate('deposit50kg', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>2.7 kg Camping Shell Deposit</strong>
                  <span>Portable tank replacement liability</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`₱${settings.deposit2kg}`}
                  onChange={e => handleUpdate('deposit2kg', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Damaged / Scrapped Shell Deduction</strong>
                  <span>Deduction applied to unserviceable returned shells</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`₱${settings.scrapPenalty}`}
                  onChange={e => handleUpdate('scrapPenalty', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
            </Card>
          )}

          {/* Card 3: Tax, VAT Rates & Official Invoicing Rules */}
          {tab === 'Tax, VAT & Invoicing' && (
            <Card className="settings-section-card">
              <CardTitle
                icon="coins"
                title="Tax, VAT Rates & Invoicing Rules"
                subtitle="Configure BIR tax classification, statutory discounts, and document numbering"
              />
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Tax Registration Classification</strong>
                  <span>Determines whether VAT is applied on invoices</span>
                </div>
                <select
                  className="settings-field-input"
                  style={{ width: 160, textAlign: 'left', height: 36 }}
                  value={settings.taxRegistration}
                  onChange={e => {
                    handleUpdate('taxRegistration', e.target.value)
                    if (e.target.value === '12% VAT Registered') {
                      handleUpdate('vatRate', '12.00')
                    } else {
                      handleUpdate('vatRate', '0.00')
                    }
                  }}
                >
                  <option value="Non-VAT Registered">Non-VAT Registered (0%)</option>
                  <option value="12% VAT Registered">12% VAT Registered</option>
                </select>
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Applicable VAT Rate (%)</strong>
                  <span>Standard Philippine Value Added Tax rate</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`${settings.vatRate}%`}
                  onChange={e => handleUpdate('vatRate', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Senior Citizen / PWD LPG Discount (%)</strong>
                  <span>Statutory 5% discount on 11kg household LPG (RA 9994/RA 10754)</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`${settings.statutoryDiscount}%`}
                  onChange={e => handleUpdate('statutoryDiscount', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Official Sales Invoice Prefix</strong>
                  <span>Series prefix printed on counter POS receipts</span>
                </div>
                <input
                  className="settings-field-input"
                  style={{ textAlign: 'left', width: 130 }}
                  value={settings.invoicePrefix}
                  onChange={e => handleUpdate('invoicePrefix', e.target.value)}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Delivery Receipt (DR) Prefix</strong>
                  <span>Series prefix printed on route dispatch trip manifests</span>
                </div>
                <input
                  className="settings-field-input"
                  style={{ textAlign: 'left', width: 130 }}
                  value={settings.deliveryReceiptPrefix}
                  onChange={e => handleUpdate('deliveryReceiptPrefix', e.target.value)}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Official Deposit Slip (DS) Prefix</strong>
                  <span>Issued when a customer rents a new cylinder shell</span>
                </div>
                <input
                  className="settings-field-input"
                  style={{ textAlign: 'left', width: 130 }}
                  value={settings.depositSlipPrefix}
                  onChange={e => handleUpdate('depositSlipPrefix', e.target.value)}
                />
              </div>
            </Card>
          )}

          {/* Card 4: Credit Terms, Aging & Float Days */}
          {tab === 'Credit Terms & Days' && (
            <Card className="settings-section-card">
              <CardTitle
                icon="shield"
                title="Credit Terms, Aging Thresholds & Float Days"
                subtitle="Governs automated lock conditions, grace periods, and credit limits"
              />
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Credit Aging Hard-Lock Threshold (Days)</strong>
                  <span>Invoices older than this threshold trigger auto-lock on POS & Dispatch</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`${settings.agingLockDays} Days`}
                  onChange={e => handleUpdate('agingLockDays', e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Overdue Account Warning Threshold (Days)</strong>
                  <span>Accounts approaching lock display caution alerts on cashier screens</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`${settings.agingWarnDays} Days`}
                  onChange={e => handleUpdate('agingWarnDays', e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Maximum Cylinder Basyo Return Window (Days)</strong>
                  <span>Maximum allowed days for customer or driver to hold empty basyo</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`${settings.maxFloatReturnDays} Days`}
                  onChange={e => handleUpdate('maxFloatReturnDays', e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Commercial Default Credit Limit (₱)</strong>
                  <span>Default credit ceiling for restaurants and commercial accounts</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`₱${settings.commCreditLimit}`}
                  onChange={e => handleUpdate('commCreditLimit', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Residential Suki Credit Limit (₱)</strong>
                  <span>Neighborhood walk-in passbook accounts</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`₱${settings.retailCreditLimit}`}
                  onChange={e => handleUpdate('retailCreditLimit', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Commercial Loaned Float Ceiling (Tanks)</strong>
                  <span>Maximum steel tanks commercial accounts can hold without deposit</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`${settings.defaultFloatLimit} tanks`}
                  onChange={e => handleUpdate('defaultFloatLimit', e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Residential Loaned Float Ceiling (Tanks)</strong>
                  <span>Maximum steel tanks residential customers can hold</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`${settings.retailFloatLimit} tanks`}
                  onChange={e => handleUpdate('retailFloatLimit', e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
            </Card>
          )}

          {/* Card 5: Cylinder Safety & QC Tolerances (RA 11592) */}
          {tab === 'Safety & RA 11592 QC' && (
            <Card className="settings-section-card">
              <CardTitle
                icon="check"
                title="Cylinder Safety & QC Tolerances (RA 11592)"
                subtitle="Department of Energy safety law standards and scale compliance ranges"
              />
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Mandatory Hydrostatic Requalification Cycle</strong>
                  <span>Years between mandatory collar testing under PNS 03 / RA 11592</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`${settings.requalYears} Years`}
                  onChange={e => handleUpdate('requalYears', e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>11.0 kg Net Gas Weight Minimum Tolerance</strong>
                  <span>Cylinders below this weight are rejected at receiving</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`${settings.minNetWeight11kg} kg`}
                  onChange={e => handleUpdate('minNetWeight11kg', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>11.0 kg Net Gas Weight Maximum Tolerance</strong>
                  <span>Cylinders above this weight are held for overfilling hazard</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`${settings.maxNetWeight11kg} kg`}
                  onChange={e => handleUpdate('maxNetWeight11kg', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Spot Weight Scale Drift Tolerance</strong>
                  <span>Maximum acceptable scale variance on spot weight checks</span>
                </div>
                <input
                  className="settings-field-input tabular-nums"
                  value={`±${settings.scaleTolerance} kg`}
                  onChange={e => handleUpdate('scaleTolerance', e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
            </Card>
          )}

          {/* Card 6: Station Permits, Identity & Security Credentials */}
          {tab === 'Station & Security PINs' && (
            <Card className="settings-section-card">
              <CardTitle
                icon="user"
                title="Station Identity, Permits & Security PINs"
                subtitle="Official station permits, license numbers, and supervisor override codes"
              />
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Station Registered Business Name</strong>
                  <span>Printed on invoices, reports, and delivery receipts</span>
                </div>
                <input
                  className="settings-field-input"
                  style={{ textAlign: 'left', width: 220 }}
                  value={settings.stationName}
                  onChange={e => handleUpdate('stationName', e.target.value)}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Station Physical Address</strong>
                  <span>Terminal operating facility address</span>
                </div>
                <input
                  className="settings-field-input"
                  style={{ textAlign: 'left', width: 260, fontSize: 11 }}
                  value={settings.stationAddress}
                  onChange={e => handleUpdate('stationAddress', e.target.value)}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Station Owner & Licensee</strong>
                  <span>Authorized signatory for DOE reports and P&L</span>
                </div>
                <input
                  className="settings-field-input"
                  style={{ textAlign: 'left', width: 160 }}
                  value={settings.stationOwner}
                  onChange={e => handleUpdate('stationOwner', e.target.value)}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Station BIR Non-VAT TIN</strong>
                  <span>Printed on official BIR invoices and receipts</span>
                </div>
                <input
                  className="settings-field-input"
                  style={{ textAlign: 'left', fontSize: 12, width: 160 }}
                  value={settings.stationTin}
                  onChange={e => handleUpdate('stationTin', e.target.value)}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>DOE LPG Standards Compliance Permit</strong>
                  <span>Official Department of Energy regional permit number</span>
                </div>
                <input
                  className="settings-field-input"
                  style={{ textAlign: 'left', fontSize: 12, width: 160 }}
                  value={settings.doePermit}
                  onChange={e => handleUpdate('doePermit', e.target.value)}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Primary Bulk Depot Terminal Hub</strong>
                  <span>Source hub for safety seals and receiving QC</span>
                </div>
                <input
                  className="settings-field-input"
                  style={{ textAlign: 'left', width: 240, fontSize: 11 }}
                  value={settings.depotHub}
                  onChange={e => handleUpdate('depotHub', e.target.value)}
                />
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Supervisor Approval Gate PIN</strong>
                  <span>Used to override AR & credit hard-locks (Demo: OWNER1234)</span>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input
                    type={showPin ? 'text' : 'password'}
                    className="settings-field-input"
                    style={{ width: 110 }}
                    value={settings.supervisorPin}
                    onChange={e => handleUpdate('supervisorPin', e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-ghost"
                    style={{ height: 36, padding: '0 12px', fontSize: 12 }}
                    onClick={() => setShowPin(!showPin)}
                  >
                    {showPin ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div className="settings-field-row">
                <div className="settings-field-label">
                  <strong>Daily Closing Sign-Off PIN</strong>
                  <span>Used by owner to finalize shift and lock drawer (4829)</span>
                </div>
                <input
                  type="password"
                  className="settings-field-input"
                  value={settings.closingPin}
                  onChange={e => handleUpdate('closingPin', e.target.value)}
                />
              </div>
            </Card>
          )}
        </main>
      </div>
      </form>
    </div>
  )
}

function Topbar({ globalSearch, setGlobalSearch, setPage }: { globalSearch: string; setGlobalSearch: (v: string) => void; setPage: (p: string) => void }) {
  const searchResults = useMemo(() => {
    if (!globalSearch.trim() || globalSearch.length < 2) return []
    const q = globalSearch.toLowerCase()
    const results: { label: string; sub: string; category: string; targetPage: string }[] = []

    if ('maria santos'.includes(q) || 'lagao'.includes(q)) results.push({ label: 'Maria Santos', sub: 'Brgy. Lagao, GenSan · Suki Regular', category: 'Customer', targetPage: 'Customers & Suki' })
    if ('abc restaurant'.includes(q) || 'labangal'.includes(q)) results.push({ label: 'ABC Restaurant', sub: 'National Highway, Brgy. Labangal, GenSan · Suki Commercial', category: 'Customer', targetPage: 'Customers & Suki' })
    if ('aling nena'.includes(q) || 'carinderia'.includes(q)) results.push({ label: "Aling Nena's Carinderia", sub: 'Brgy. City Heights, GenSan', category: 'Customer', targetPage: 'Customers & Suki' })

    if ('sg-11-004521'.includes(q) || 'seagas'.includes(q)) results.push({ label: 'SG-11-004521', sub: 'SEAGAS 11kg · Circulating Float', category: 'Cylinder', targetPage: 'Cylinder Fleet' })
    if ('sg-11-003998'.includes(q) || 'seagas'.includes(q)) results.push({ label: 'SG-11-003998', sub: 'SEAGAS 11kg CMP · Empty in Yard', category: 'Cylinder', targetPage: 'Cylinder Fleet' })
    if ('sg-11-004617'.includes(q) || 'seagas'.includes(q)) results.push({ label: 'SG-11-004617', sub: 'SEAGAS 11kg SNP · On Truck 03', category: 'Cylinder', targetPage: 'Cylinder Fleet' })

    if ('del-1018'.includes(q) || 'delivery'.includes(q)) results.push({ label: 'DEL-1018', sub: 'ABC Restaurant · Mark Ramos (ST003)', category: 'Delivery', targetPage: 'Deliveries & Dispatch' })
    if ('del-1019'.includes(q)) results.push({ label: 'DEL-1019', sub: 'Maria Santos · Nilo Cruz (ST005)', category: 'Delivery', targetPage: 'Deliveries & Dispatch' })

    if ('inv-2026-0315'.includes(q) || 'invoice'.includes(q)) results.push({ label: 'INV-2026-0315', sub: '₱1,200 · Maria Santos · Cash', category: 'Invoice', targetPage: 'POS (Sales & Exchange)' })
    if ('reg-cmp-01'.includes(q) || 'regulator'.includes(q)) results.push({ label: 'SEAGAS Snap-On Regulator', sub: 'REG-CMP-01 · 28 pcs', category: 'Inventory', targetPage: 'Store Inventory' })
    if ('ar risk'.includes(q) || 'aging'.includes(q) || 'risk'.includes(q) || 'override'.includes(q) || 'gate'.includes(q)) results.push({ label: 'AR & Credit Risk Control', sub: 'Aging Hard Lock & Float Monitor (Supervisor Gate)', category: 'Risk Engine', targetPage: 'AR & Risk Control' })

    return results
  }, [globalSearch])

  return (
    <header className="topbar">
      <div style={{ position: 'relative', flex: 1, maxWidth: 520 }}>
        <SearchField value={globalSearch} onChange={setGlobalSearch} placeholder="Search serials, customer, DR#, invoice, or staff..." />
        {searchResults.length > 0 && (
          <div className="search-results-dropdown">
            <div className="search-result-group">Quick Results ({searchResults.length})</div>
            {searchResults.map((r, i) => (
              <div
                key={i}
                className="search-result-item"
                onClick={() => {
                  setPage(r.targetPage)
                  setGlobalSearch('')
                }}
              >
                <div>
                  <strong>{r.label}</strong>
                  <small>{r.sub}</small>
                </div>
                <Badge>{r.category}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="top-actions">
        <button className="date-button">
          <Icon name="calendar" size={17} />
          <span>October 16, 2026</span>
          <Icon name="chevron" size={14} />
        </button>
        <button className="icon-button" aria-label="Notifications">
          <Icon name="bell" />
          <b>3</b>
        </button>
        <div className="user-menu">
          <span className="avatar">O</span>
          <div>
            <strong>Dexter (Owner)</strong>
            <small>Administrator</small>
          </div>
          <Icon name="chevron" size={14} />
        </div>
      </div>
    </header>
  )
}

export default function App() {
  const [page, setPage] = useState('Dashboard')
  const [globalSearch, setGlobalSearch] = useState('')
  const [settings, setSettings] = useState<StationSettingsData>(defaultStationSettings)

  function updateSetting(field: keyof StationSettingsData, val: string) {
    setSettings(prev => ({ ...prev, [field]: val }))
  }

  function saveSettings(newSettings: StationSettingsData) {
    setSettings(newSettings)
  }

  function resetSettings() {
    setSettings(defaultStationSettings)
  }

  let screen: ReactNode
  if (page === 'Dashboard') screen = <Dashboard setPage={setPage} />
  else if (page === 'POS (Sales & Exchange)' || page === 'Sales & Exchange') screen = <SalesPOS />
  else if (page === 'Deliveries & Dispatch') screen = <DispatchSettlement />
  else if (page === 'Receiving & Stock In' || page === 'Receiving') screen = <ReceivingQC />
  else if (page === 'Cylinder Fleet' || page === 'Cylinders & Tanks' || page === 'Cylinders' || page === 'Daily Cylinder Movement Log') screen = <CylinderFleet setPage={setPage} />
  else if (page === 'Store Inventory') screen = <StoreInventory />
  else if (page === 'Customers & Suki' || page === 'Customer Credit') screen = <CustomersSuki setPage={setPage} />
  else if (page === 'Staff & Riders') screen = <ModulePage page="Staff" setPage={setPage} />
  else if (page === 'AR & Risk Control') screen = <ARRiskControl />
  else if (page === 'Expenses') screen = <OperationalExpenses />
  else if (page === 'Daily Closing') screen = <DailyClosingEOD />
  else if (page === 'Reports & Audit' || page === 'Reports & Analytics' || page === 'Daily Stock Movement Report' || page === 'Audit Logs') screen = <ReportsAndAudit setPage={setPage} />
  else if (page === 'Settings') screen = <StationSettings />
  else screen = <ModulePage page={page} setPage={setPage} />

  return (
    <SettingsContext.Provider value={{ settings, setSettings, updateSetting, saveSettings, resetSettings }}>
      <div className="app-shell">
        <Sidebar page={page} setPage={setPage} />
        <main>
          <Topbar globalSearch={globalSearch} setGlobalSearch={setGlobalSearch} setPage={setPage} />
          <div className="content">{screen}</div>
        </main>
      </div>
    </SettingsContext.Provider>
  )
}

