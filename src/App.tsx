import { useMemo, useState, type FormEvent, type ReactNode } from 'react'

type IconName =
  | 'grid' | 'users' | 'user' | 'cylinder' | 'receive' | 'swap' | 'truck'
  | 'coins' | 'receipt' | 'check' | 'chart' | 'file' | 'settings' | 'search'
  | 'calendar' | 'bell' | 'chevron' | 'plus' | 'filter' | 'download' | 'close'
  | 'money' | 'clock' | 'location' | 'phone' | 'eye' | 'flame'

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
      { label: 'Cylinders & Tanks', icon: 'cylinder' },
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
      { label: 'Expenses', icon: 'receipt' },
      { label: 'Daily Closing', icon: 'check' },
      { label: 'Reports & Audit', icon: 'chart' },
      { label: 'Settings', icon: 'settings' },
    ],
  },
]

const transactions = [
  ['08:24 AM', 'Maria Santos', 'Sale', 'LPG-004521', '₱1,200', 'ST001'],
  ['09:15 AM', 'Juan Dela Cruz', 'Exchange', 'LPG-003998', '₱600', 'ST002'],
  ['10:02 AM', 'ABC Restaurant', 'Delivery', 'LPG-004617', '₱2,400', 'ST003'],
  ['11:37 AM', 'Ana Reyes', 'Sale', 'LPG-004305', '₱1,200', 'ST001'],
  ['01:18 PM', 'LM Food House', 'Exchange', 'LPG-004112', '₱600', 'ST002'],
]

const pageData: Record<string, { subtitle: string; columns: string[]; rows: string[][]; action: string }> = {
  Customers: { subtitle: 'Manage customer profiles and transaction relationships.', action: 'Add Customer', columns: ['Customer', 'Company Name','Contact', 'Address', 'Tax No.', 'Preferred Brand', 'Status'], rows: [
    ['Maria Santos', '0917 234 8891', 'Mabini St., Makati', 'TIN-882-194', 'Petron Gasul', 'Active'],
    ['Juan Dela Cruz', '0928 441 2098', 'P. Burgos St., Pasig', 'TIN-342-818', 'Solane', 'Active'],
    ['ABC Restaurant', '0918 309 1204', 'Ortigas Ave., Mandaluyong', 'TIN-119-822', 'Petron Gasul', 'Business'],
    ['Ana Reyes', '0915 779 6214', 'J.P. Rizal, Makati', '—', 'Solane', 'Active'],
    ['LM Food House', '0998 232 6180', 'Shaw Blvd., Mandaluyong', 'TIN-441-512', 'Phoenix Super LPG', 'Business'],
  ]},
  Staff: { subtitle: 'Manage team details, roles, and system access.', action: 'Add Staff Member', columns: ['Staff Code', 'Full Name', 'Position', 'Contact', 'Date Started', 'Status'], rows: [
    ['ST001', 'Paolo Mendoza', 'Cashier', '0917 555 0101', 'Jan 12, 2024', 'Active'],
    ['ST002', 'Leah Villanueva', 'Office Staff', '0917 555 0102', 'Mar 04, 2024', 'Active'],
    ['ST003', 'Mark Ramos', 'Delivery Driver', '0917 555 0103', 'Jun 18, 2025', 'On delivery'],
    ['ST004', 'Cris Bautista', 'Inventory Staff', '0917 555 0104', 'Sep 08, 2025', 'Active'],
  ]},
  'Cylinder Inventory': { subtitle: 'Track every cylinder across locations and movements.', action: 'Register Cylinder', columns: ['Serial Number', 'Brand', 'Tare Weight', 'Status', 'Location', 'Linked Customer'], rows: [
    ['LPG-004521', 'Petron Gasul', '13.4 kg', 'With Customer', 'Makati', 'Maria Santos'],
    ['LPG-003998', 'Solane', '12.8 kg', 'Empty', 'Main Warehouse', '—'],
    ['LPG-004617', 'Petron Gasul', '13.2 kg', 'On delivery', 'Truck 03', 'ABC Restaurant'],
    ['LPG-004305', 'Solane', '12.9 kg', 'Full', 'Main Warehouse', '—'],
    ['LPG-004112', 'Phoenix Super LPG', '13.1 kg', 'Damaged', 'Inspection Bay', '—'],
  ]},
  Deliveries: { subtitle: 'Assign, monitor, and complete customer deliveries.', action: 'New Delivery', columns: ['Delivery ID', 'Customer', 'Address', 'Cylinder', 'Driver', 'Status'], rows: [
    ['DEL-1018', 'ABC Restaurant', 'Ortigas Ave., Mandaluyong', 'LPG-004617', 'ST003 · Mark Ramos', 'In transit'],
    ['DEL-1019', 'Maria Santos', 'Mabini St., Makati', 'LPG-004722', 'ST005 · Nilo Cruz', 'Pending'],
    ['DEL-1020', 'LM Food House', 'Shaw Blvd., Mandaluyong', 'LPG-004811', 'Unassigned', 'Pending'],
    ['DEL-1017', 'Ana Reyes', 'J.P. Rizal, Makati', 'LPG-004305', 'ST003 · Mark Ramos', 'Completed'],
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

function DataTable({ columns, rows, onRowClick }: { columns: string[]; rows: string[][]; onRowClick?: (row: string[]) => void }) {
  return <div className="table-wrap"><table><thead><tr>{columns.map(c => <th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={`${row[0]}-${i}`} onClick={() => onRowClick?.(row)} className={onRowClick ? 'clickable' : ''}>{row.map((cell, j) => <td key={j}>{j === 0 && columns[0] === 'Customer' ? <span className="customer-cell"><span className="mini-avatar">{cell.split(' ').map(x => x[0]).slice(0, 2).join('')}</span>{cell}</span> : (columns[j].includes('Status') || columns[j].includes('Requal') || columns[j] === 'Suki Badge' ? <Badge>{cell}</Badge> : columns[j] === 'Movement Type' ? <span className={`movement-badge movement-${cell.toLowerCase()}`}>{cell}</span> : cell)}</td>)}</tr>)}</tbody></table></div>
}

function Sidebar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark"><Icon name="flame" size={27}/></div><div><strong>LPG Pro</strong><span>Operations System</span></div></div>
    <nav aria-label="Primary navigation">
      {navSections.map(sec => (
        <div key={sec.group} className="nav-group">
          <div className="nav-group-label">{sec.group}</div>
          {sec.items.map(item => {
            const isActive =
              page === item.label ||
              (item.label === 'Cylinders & Tanks' && (page === 'Daily Cylinder Movement Log' || page === 'Cylinders')) ||
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
    <div className="sidebar-art"><div className="cylinder-art"><Icon name="cylinder" size={46}/></div><strong>Safe Fuel</strong><span>Brighter Tomorrows</span><i></i><small>Version 1.0.0</small></div>
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
  const entries = [['01:18 PM','Invoice created (INV-2026-0315)','by ST002 · LM Food House · ₱600'],['11:42 AM','Expense recorded','by ST001 · Fuel · ₱1,500'],['10:28 AM','Delivery completed','by ST003 · LPG-004617 · ABC Restaurant'],['09:15 AM','Exchange transaction','by ST002 · LPG-003998 · Juan Dela Cruz'],['08:24 AM','Invoice created (INV-2026-0314)','by ST001 · Maria Santos · ₱1,200']]
  return <Card className="audit-card"><CardTitle icon="file" title="Audit Activity" action={<Button variant="ghost">View All <span>→</span></Button>}/><div className="timeline">{entries.map((e,i) => <div className="timeline-row" key={e[0]}><i className={`timeline-dot dot-${i}`}/><time>{e[0]}</time><div><strong>{e[1]}</strong><span>{e[2]}</span></div></div>)}</div></Card>
}

interface InvoiceData {
  invoiceNo?: string
  date?: string
  customerName?: string
  address?: string
  contact?: string
  tin?: string
  staffCode?: string
  staffName?: string
  paymentMethod?: string
  serial?: string
  brand?: string
  netWeight?: string
  amount?: string
  subtotal?: string
  swapFee?: string
  depositFee?: string
  returnedSerial?: string
  hasReturnedEmpty?: boolean
}

function InvoiceModal({ data, onClose }: { data?: InvoiceData; onClose: () => void }) {
  const [toast, setToast] = useState('')
  const inv = {
    invoiceNo: data?.invoiceNo || 'INV-2026-0315',
    date: data?.date || 'October 16, 2026',
    customerName: data?.customerName || 'Maria Santos',
    address: data?.address || 'Mabini St., Makati',
    contact: data?.contact || '0917 234 8891',
    tin: data?.tin || 'TIN-882-194',
    staffCode: data?.staffCode || 'ST001',
    staffName: data?.staffName || 'Paolo Mendoza',
    paymentMethod: data?.paymentMethod || 'Cash',
    serial: data?.serial || 'LPG-004521',
    brand: data?.brand || 'Petron Gasul',
    netWeight: data?.netWeight || '11.0 kg',
    amount: data?.amount || '₱1,200.00',
    subtotal: data?.subtotal || '₱1,200.00',
    returnedSerial: data?.returnedSerial || 'LPG-003871',
    hasReturnedEmpty: data?.hasReturnedEmpty !== undefined ? data.hasReturnedEmpty : true,
  }

  function handlePrint() {
    setToast(`Sent ${inv.invoiceNo} to EPSON POS Receipt Printer!`)
    setTimeout(() => setToast(''), 2500)
  }

  return (
    <div className="modal-backdrop document-backdrop" onMouseDown={onClose}>
      {toast && <div className="toast"><span>✓</span>{toast}</div>}
      <article className="document-modal invoice-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="document-close" aria-label="Close invoice" onClick={onClose}>
          <Icon name="close" />
        </button>
        <header className="invoice-head">
          <div className="invoice-brand">
            <span><Icon name="flame" size={24} /></span>
            <div>
              <strong>LPG Pro</strong>
              <small>Operations Management System</small>
            </div>
          </div>
          <div>
            <strong>{inv.invoiceNo}</strong>
            <span>{inv.date}</span>
          </div>
        </header>

        <div className="document-columns">
          <section>
            <h3>Billed To</h3>
            <dl>
              <dt>Customer Name</dt>
              <dd>{inv.customerName}</dd>
              <dt>Address</dt>
              <dd>{inv.address}</dd>
              <dt>Contact</dt>
              <dd>{inv.contact}</dd>
              <dt>Tax Number</dt>
              <dd>{inv.tin}</dd>
            </dl>
          </section>
          <section>
            <h3>Processed By</h3>
            <dl>
              <dt>Staff Code</dt>
              <dd>{inv.staffCode}</dd>
              <dt>Staff Name</dt>
              <dd>{inv.staffName}</dd>
              <dt>Date & Time</dt>
              <dd>{inv.date} · 08:24 AM</dd>
              <dt>Payment Method</dt>
              <dd><Badge>{inv.paymentMethod}</Badge></dd>
            </dl>
          </section>
        </div>

        <div className="document-table">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Brand</th>
                <th>Cylinder Serial</th>
                <th>Net Weight</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Full LPG Cylinder Refill</td>
                <td>{inv.brand}</td>
                <td>{inv.serial}</td>
                <td>{inv.netWeight}</td>
                <td>{inv.subtotal}</td>
                <td>{inv.subtotal}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="invoice-summary">
          <div className="return-info">
            <h3>Empty Cylinder Surrender</h3>
            <p>
              <span>Empty Cylinder Returned</span>
              <strong>{inv.hasReturnedEmpty ? 'Yes (Basyo Received)' : 'No (New Shell Purchase)'}</strong>
            </p>
            {inv.hasReturnedEmpty && (
              <p>
                <span>Returned Serial</span>
                <strong>{inv.returnedSerial}</strong>
              </p>
            )}
          </div>
          <div className="invoice-totals">
            <p>
              <span>Subtotal</span>
              <strong>{inv.subtotal}</strong>
            </p>
            <p>
              <span>VAT (12%)</span>
              <strong>Included</strong>
            </p>
            <p className="grand-total">
              <span>Total Amount</span>
              <strong>{inv.amount}</strong>
            </p>
          </div>
        </div>

        <footer className="document-footer">
          <em>This official receipt is system-generated and valid under BIR RR regulations.</em>
          <div>
            <Button variant="secondary" icon="file" onClick={handlePrint}>Print Invoice</Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </footer>
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
    address: data?.address || 'Ortigas Ave., Mandaluyong',
    contact: data?.contact || '0918 309 1204',
    serial: data?.serial || 'LPG-004617',
    brand: data?.brand || 'Petron Gasul (11kg)',
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
            <span className="eyebrow">LPG Pro Operations System</span>
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
    <div className="kpi-grid"><KpiCard icon="cylinder" label="Full Cylinders" value="428" change="+12%" tone="teal"/><KpiCard icon="cylinder" label="Empty Cylinders" value="163" change="+5%" tone="blue"/><KpiCard icon="money" label="Today's Sales" value="₱24,850" change="+18%" tone="green"/><KpiCard icon="truck" label="Pending Deliveries" value="12" change="+33%" tone="orange"/></div>
    <div className="dashboard-grid"><MovementChart/><InventoryStatus/>
      <Card className="transactions-card"><CardTitle icon="file" title="Recent Transactions" action={<Button variant="ghost" onClick={() => setPage('POS (Sales & Exchange)')}>View All <span>→</span></Button>}/><DataTable columns={['Time','Customer','Transaction','Cylinder Serial','Amount','Staff Code']} rows={transactions} onRowClick={() => setInvoiceOpen(true)}/></Card>
      <ClosingChecklist checked={checked} toggle={i => setChecked(c => c.map((v,x) => x === i ? !v : v))}/>
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
        {page === 'Cylinder Inventory' && <Button variant="secondary" icon="swap" onClick={() => setPage('Cylinders & Tanks')}>Movement Log</Button>}
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

function CustomersSuki() {
  const initialCustomers = [
    ['Maria Santos', '—', '0917 234 8891', 'Mabini St., Makati', 'TIN-882-194', 'Petron Gasul (POL)', 'Suki Regular', '₱0 / ₱2,500', '1 Tank (₱1,800)', 'View Kartilya'],
    ['ABC Restaurant', 'ABC Food Corp.', '0918 309 1204', 'Ortigas Ave., Pasig', 'TIN-119-822', 'Solane (Compact 20mm)', 'Suki Commercial', '₱62,000 / ₱80,000', '8 Tanks (₱16,000)', 'View Kartilya'],
    ['Aling Nena', "Nena's Carinderia", '0928 441 2098', 'P. Burgos, Pasig', 'TIN-342-818', 'Phoenix Super LPG (SNP)', 'Suki Regular', '₱4,800 / ₱5,000', '2 Tanks (₱3,500)', 'View Kartilya'],
    ['LM Food House', 'LM Ventures Inc.', '0998 232 6180', 'Shaw Blvd., Mandaluyong', 'TIN-441-512', 'Phoenix Super LPG (SNP)', 'Suki Commercial', '₱42,000 / ₱60,000', '6 Tanks (₱10,500)', 'View Kartilya'],
    ['Nanay Gloria Bakery', "Gloria's Panaderya", '0917 889 1234', 'Boni Ave., Mandaluyong', 'TIN-552-199', 'Petron Gasul (50kg POL)', 'Suki Commercial', '₱18,500 / ₱30,000', '4 Tanks (₱8,000)', 'View Kartilya'],
  ]

  const initialCreditRows = [
    ['ABC Restaurant', 'Suki Commercial', '0918 309 1204 · Ortigas, Pasig', '₱80,000', '₱62,000', 'Oct 08, 2026', 'Oct 18, 2026', 'View Kartilya'],
    ["Nena's Carinderia", 'Suki Regular', '0928 441 2098 · P. Burgos, Pasig', '₱5,000', '₱4,800', 'Sep 12, 2026', 'Oct 16, 2026', 'View Kartilya'],
    ['LM Food House', 'Suki Commercial', '0998 232 6180 · Shaw Blvd.', '₱60,000', '₱42,000', 'Oct 01, 2026', 'Oct 20, 2026', 'View Kartilya'],
    ["Gloria's Panaderya", 'Suki Commercial', '0917 889 1234 · Boni Ave.', '₱30,000', '₱18,500', 'Oct 10, 2026', 'Oct 25, 2026', 'View Kartilya'],
  ]

  const [tab, setTab] = useState('All Customers')
  const [customerList, setCustomerList] = useState(initialCustomers)
  const [creditList, setCreditList] = useState(initialCreditRows)
  const [search, setSearch] = useState('')
  const [drawer, setDrawer] = useState<string[] | null>(null)
  const [kartilya, setKartilya] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [paymentModal, setPaymentModal] = useState(false)
  const [toast, setToast] = useState('')

  // Add Customer Form Fields
  const [cName, setCName] = useState('')
  const [cCompany, setCCompany] = useState('')
  const [cPhone, setCPhone] = useState('')
  const [cAddress, setCAddress] = useState('')
  const [cTin, setCTin] = useState('')
  const [cBrand, setCBrand] = useState('Petron Gasul (POL)')
  const [cTier, setCTier] = useState('Suki Regular')
  const [cCreditLimit, setCCreditLimit] = useState('5000')

  // Payment Form Fields
  const [payAmount, setPayAmount] = useState('5000')
  const [payOrNo, setPayOrNo] = useState('OR-0892')
  const [payMethod, setPayMethod] = useState('Cash')

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
                  <input required value={cAddress} onChange={e => setCAddress(e.target.value)} placeholder="e.g. 45 Rizal St., Brgy. Poblacion, Makati" />
                </label>
                <label>
                  <span>Tax ID (TIN for Invoicing)</span>
                  <input value={cTin} onChange={e => setCTin(e.target.value)} placeholder="TIN-000-000" />
                </label>
                <label>
                  <span>Preferred Brand & Valve System</span>
                  <select value={cBrand} onChange={e => setCBrand(e.target.value)} style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 11 }}>
                    <option>Petron Gasul (POL Threaded)</option>
                    <option>Solane (Compact 20mm Snap-On)</option>
                    <option>Phoenix Super LPG (SNP Auto-Lock)</option>
                    <option>Petron Gasul 50kg Industrial (SRV)</option>
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
                <p>ABC Restaurant · Account #SUKI-0082 · Pasig Branch</p>
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

      <MasterHeader
        title="Customers & Suki Management"
        subtitle="Manage customer profiles, suki relationships, credit standing (paautang), and digital kartilya."
        actions={<Button icon="plus" onClick={() => setAddModal(true)}>Add Customer</Button>}
      />
      <FilterTabs
        items={['All Customers', 'Suki Accounts', 'Commercial / Business', 'Credit & Paautang (Kartilya)']}
        active={tab}
        onChange={setTab}
      />

      {tab === 'Credit & Paautang (Kartilya)' ? (
        <>
          <div className="report-kpis credit-kpis">
            {[
              ['Total Outstanding Paautang', '₱134,000', '28 accounts'],
              ['Due for Collection', '₱68,500', 'Oct 15–18'],
              ['Overdue > 30 Days', '₱18,200', 'Red alert'],
              ['Collected This Week', '₱42,300', '+18% vs last week'],
            ].map((x, i) => (
              <Card key={x[0]} className={`credit-${i}`}>
                <span>{x[0]}</span>
                <strong>{x[1]}</strong>
                <small>{x[2]}</small>
              </Card>
            ))}
          </div>
          <Card className="records-card master-table">
            <div className="toolbar">
              <SearchField value={search} onChange={setSearch} placeholder="Search customer, business, or account..." />
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
            columns={['Customer Name', 'Company Name', 'Contact #', 'Address / Barangay', 'TIN', 'Preferred Brand & Valve', 'Suki Status', 'Credit / Limit', 'Active Deposits', 'Actions']}
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
    ['PG-11-004521', 'Petron Gasul', '11.0 kg', 'POL Threaded', '13.4 kg', 'With Customer', 'Maria Santos', 'Mar 2028 · Valid', 'Inspect / Transfer'],
    ['SL-11-003998', 'Solane', '11.0 kg', 'Compact (Snap-On)', '12.8 kg', 'Empty Basyo (Yard)', 'Main Warehouse Yard', 'Dec 2027 · Valid', 'Inspect / Transfer'],
    ['PH-11-004617', 'Phoenix Super LPG', '11.0 kg', 'Snap-On (SNP)', '13.1 kg', 'On Truck', 'Truck 03 · Mark Ramos', 'Jun 2029 · Valid', 'Inspect / Transfer'],
    ['PG-50-001004', 'Petron Gasul', '50.0 kg', 'POL Heavy', '48.5 kg', 'Full (Warehouse)', 'Main Warehouse', 'Oct 2026 · Due Soon', 'Inspect / Transfer'],
    ['SL-11-002109', 'Solane', '11.0 kg', 'Compact (Snap-On)', '13.0 kg', 'Quarantine Bay', 'Damaged Footring / Leaking', 'Expired · Due Requal', 'Inspect / Transfer'],
    ['PG-11-008122', 'Petron Gasul', '11.0 kg', 'POL Threaded', '13.5 kg', 'Full (Warehouse)', 'Main Warehouse', 'Aug 2029 · Valid', 'Inspect / Transfer'],
    ['PX-11-005120', 'Prycegas', '11.0 kg', 'POL Threaded', '13.2 kg', 'Cross-Brand Swap Cage', 'Held for RA 11592 Center', 'Nov 2027 · Valid', 'Inspect / Transfer'],
    ['SL-50-001923', 'Solane', '50.0 kg', 'POL Heavy', '49.2 kg', 'With Customer', 'Kusina Ni Nanay (Commercial)', 'Jan 2028 · Valid', 'Inspect / Transfer'],
    ['PG-11-007731', 'Petron Gasul', '11.0 kg', 'POL Threaded', '13.3 kg', 'Quarantine Bay', 'BPS Expired (2019 Stamp)', 'Expired · Illegal to Refill', 'Inspect / Transfer'],
    ['PH-11-006240', 'Phoenix Super LPG', '11.0 kg', 'Snap-On (SNP)', '13.0 kg', 'Empty Basyo (Yard)', 'Main Yard Staging', 'May 2029 · Valid', 'Inspect / Transfer'],
    ['PG-02-000881', 'Petron Gasul', '2.7 kg', 'Camping Valve', '4.2 kg', 'Full (Warehouse)', 'Main Warehouse', 'Jul 2028 · Valid', 'Inspect / Transfer'],
  ]

  const initialMovements = [
    ['08:24 AM', 'PG-11-004521', 'Petron Gasul', 'POS Walk-In Sale', 'Maria Santos', 'ST001', 'Main Warehouse', 'With Customer', 'Completed'],
    ['09:15 AM', 'SL-11-003998', 'Solane', 'Palit-Basyo Return', 'Juan Dela Cruz', 'ST002', 'With Customer', 'Empty Basyo (Yard)', 'Completed'],
    ['10:02 AM', 'PH-11-004617', 'Phoenix Super LPG', 'Delivery Dispatch', 'ABC Restaurant', 'ST003', 'Main Warehouse', 'Truck 03 (En Route)', 'In Transit'],
    ['11:37 AM', 'SL-11-002109', 'Solane', 'Quarantine Quarantine', 'Store Inspector', 'ST001', 'Yard Staging', 'Quarantine Bay', 'Quarantined'],
    ['01:18 PM', 'PG-50-001004', 'Petron Gasul', 'Supplier Refill Intake', 'Petron Plant', 'ST004', 'Supplier Truck', 'Full (Warehouse)', 'Completed'],
    ['03:40 PM', 'PX-11-005120', 'Prycegas', 'Cross-Brand Swap In', 'Walk-in Customer', 'ST002', 'Counter Exchange', 'Cross-Brand Cage', 'Held (RA 11592)'],
  ]

  const initialDeposits = [
    ['DEP-2026-089', 'Maria Santos', 'PG-11-004521', '11kg POL Threaded', '₱1,800.00', 'Oct 02, 2026', '14 Days', 'Active Deposit'],
    ['DEP-2026-044', 'Juan Dela Cruz', 'SL-11-003810', '11kg Compact (CMP)', '₱2,000.00', 'Aug 15, 2026', '62 Days', 'Overdue Review'],
    ['DEP-2026-012', 'Kusina Ni Nanay', 'PG-50-001004', '50kg POL Industrial', '₱0.00 (Owner Approved)', 'Jul 10, 2026', '98 Days', 'Zero-Deposit Suki'],
    ['DEP-2026-095', 'ABC Restaurant', 'PH-11-004617', '11kg Snap-On (SNP)', '₱1,750.00', 'Oct 14, 2026', '2 Days', 'Active Deposit'],
    ['DEP-2026-077', 'Tatay Boying Bakery', 'PG-50-001099', '50kg POL Industrial', '₱4,500.00', 'Sep 18, 2026', '28 Days', 'Active Deposit'],
  ]

  const [tab, setTab] = useState('Master Fleet Register')
  const [fleet, setFleet] = useState(initialFleet)
  const [movements, setMovements] = useState(initialMovements)
  const [deposits, setDeposits] = useState(initialDeposits)
  const [search, setSearch] = useState('')
  const [filterSize, setFilterSize] = useState('All')
  const [filterValve, setFilterValve] = useState('All')
  const [filterLocation, setFilterLocation] = useState('All')
  const [filterRequal, setFilterRequal] = useState('All')
  const [toast, setToast] = useState('')

  // Modals state
  const [registerOpen, setRegisterOpen] = useState(false)
  const [inspectorCylinder, setInspectorCylinder] = useState<string[] | null>(null)
  const [issueDepositOpen, setIssueDepositOpen] = useState(false)
  const [refundModalItem, setRefundModalItem] = useState<string[] | null>(null)
  const [dispatchRequalOpen, setDispatchRequalOpen] = useState(false)
  const [manualTransferOpen, setManualTransferOpen] = useState(false)

  // Inspector form fields (for editing location & custody)
  const [editLocation, setEditLocation] = useState('Full (Warehouse)')
  const [editCustodian, setEditCustodian] = useState('Main Warehouse')

  // Register cylinder form fields
  const [regSerial, setRegSerial] = useState('PG-11-009845')
  const [regBrand, setRegBrand] = useState('Petron Gasul')
  const [regSize, setRegSize] = useState('11.0 kg')
  const [regValve, setRegValve] = useState('POL Threaded')
  const [regTare, setRegTare] = useState('13.3 kg')
  const [regStatus, setRegStatus] = useState('Full (Warehouse)')
  const [regRequal, setRegRequal] = useState('Oct 2031 · Valid')

  // Issue deposit form fields
  const [depCustomer, setDepCustomer] = useState('Aling Nena Carinderia')
  const [depSerial, setDepSerial] = useState('PG-11-008122')
  const [depSize, setDepSize] = useState('11.0 kg POL')
  const [depAmount, setDepAmount] = useState('1800')

  // Manual transfer fields
  const [transferSerial, setTransferSerial] = useState('SL-11-003998')
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
    setRegSerial(`PG-11-00${Math.floor(1000 + Math.random() * 9000)}`)
  }

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

    // Move associated cylinder back to Empty Basyo in Yard
    setFleet(prev => prev.map(tank => {
      if (tank[0] === refundModalItem[2]) {
        return [tank[0], tank[1], tank[2], tank[3], tank[4], 'Empty Basyo (Yard)', 'Main Yard Staging', tank[7], tank[8]]
      }
      return tank
    }))

    const slip = refundModalItem[0]
    const amount = refundModalItem[4]
    setRefundModalItem(null)
    showToast(`Deposit ${slip} refunded (${amount}) and empty cylinder restocked in yard!`)
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
      'Petron Gasul',
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
                  <input required value={regSerial} onChange={e => setRegSerial(e.target.value)} placeholder="e.g. PG-11-008912" />
                </label>
                <label>
                  <span>Brand Name<b>*</b></span>
                  <select value={regBrand} onChange={e => setRegBrand(e.target.value)} style={{ height: 38, border: '1px solid #dce5ed', borderRadius: 7, padding: '0 10px', fontSize: 11 }}>
                    <option>Petron Gasul</option>
                    <option>Solane</option>
                    <option>Phoenix Super LPG</option>
                    <option>Prycegas</option>
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
                    <option>Compact (Snap-On 20mm Solane)</option>
                    <option>SNP Auto-Lock (Phoenix)</option>
                    <option>POL Heavy (SRV)</option>
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

      {/* Issue Deposit Slip Modal */}
      {issueDepositOpen && (
        <div className="modal-backdrop" onMouseDown={() => setIssueDepositOpen(false)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Issue Customer Cylinder Deposit Slip</h2>
                <p>Record cash deposit liability held in trust for loaned cylinder shell.</p>
              </div>
              <button onClick={() => setIssueDepositOpen(false)}><Icon name="close"/></button>
            </div>
            <form onSubmit={handleIssueDeposit}>
              <div className="form-grid">
                <label>
                  <span>Customer Name<b>*</b></span>
                  <input required value={depCustomer} onChange={e => setDepCustomer(e.target.value)} placeholder="e.g. Aling Nena Carinderia" />
                </label>
                <label>
                  <span>Cylinder Serial<b>*</b></span>
                  <input required value={depSerial} onChange={e => setDepSerial(e.target.value)} placeholder="e.g. PG-11-008122" />
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
                <span>ℹ</span> Deposit amount will be held in the store deposit liability account and is 100% refundable upon surrender of this shell.
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
                <span>✓</span> Shell inspected: Footring solid, valve intact. Surrender confirmed. ₱{refundModalItem[4]} will be disbursed from drawer.
              </div>

              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setRefundModalItem(null)}>Cancel</Button>
                <Button onClick={handleApproveRefund}>Approve & Refund Cash</Button>
              </div>
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
        title="Cylinders & Tanks Management"
        subtitle="Master fleet inventory, forensic collar inspection, DOE RA 11592 quarantine bay, and customer deposit liabilities."
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
        items={['Master Fleet Register', 'Quarantine & DOE Requalification (RA 11592)', 'Customer Deposits & Paautang Shells', 'Daily Movement & Transfer Log']}
        active={tab}
        onChange={setTab}
      />

      {/* TAB 1: MASTER FLEET REGISTER */}
      {tab === 'Master Fleet Register' && (
        <>
          {/* Fleet Metrics Strip */}
          <div className="fleet-metrics">
            {[
              ['Total Fleet Size', '1,024 Tanks'],
              ['Full Ready (Warehouse)', '428'],
              ['Empty Basyo (Yard)', '163'],
              ['With Customer / Suki', '290'],
              ['On Delivery Trucks', '78'],
              ['Quarantine / Requal Bay', '65'],
            ].map((x, i) => (
              <Card key={x[0]}>
                <i className={`metric-dot tone-${i}`} />
                <span>{x[0]}</span>
                <strong>{x[1]}</strong>
              </Card>
            ))}
          </div>

          <Card className="records-card master-table">
            <div className="toolbar filter-toolbar">
              <SearchField value={search} onChange={setSearch} placeholder="Search cylinder serial, brand, or customer..." />
              <select value={filterSize} onChange={e => setFilterSize(e.target.value)}>
                <option value="All">Size: All</option>
                <option value="11.0 kg">11.0 kg Household</option>
                <option value="50.0 kg">50.0 kg Industrial</option>
                <option value="2.7 kg">2.7 kg Camping</option>
              </select>
              <select value={filterValve} onChange={e => setFilterValve(e.target.value)}>
                <option value="All">Valve: All</option>
                <option value="POL">POL Threaded</option>
                <option value="Compact">Compact Snap-On</option>
                <option value="SNP">SNP Auto-Lock</option>
              </select>
              <select value={filterLocation} onChange={e => setFilterLocation(e.target.value)}>
                <option value="All">Location: All</option>
                <option value="Warehouse">Full (Warehouse)</option>
                <option value="Yard">Empty Basyo (Yard)</option>
                <option value="Customer">With Customer</option>
                <option value="Truck">On Truck</option>
                <option value="Quarantine">Quarantine Bay</option>
                <option value="Cross-Brand">Cross-Brand Cage</option>
              </select>
              <select value={filterRequal} onChange={e => setFilterRequal(e.target.value)}>
                <option value="All">BPS Requal: All</option>
                <option value="Valid">Valid Certified</option>
                <option value="Due Soon">Due Soon</option>
                <option value="Expired">Expired (Illegal)</option>
              </select>
            </div>

            <DataTable
              columns={[
                'Serial Number',
                'Brand',
                'Size',
                'Valve Type',
                'Tare Weight (TW)',
                'Current Status & Location',
                'Linked Custody / Truck',
                '5-Yr Requal. Due',
                'Quick Actions',
              ]}
              rows={filteredFleet}
              onRowClick={handleOpenInspector}
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

      {/* TAB 3: CUSTOMER DEPOSITS & PAUTANG SHELLS */}
      {tab === 'Customer Deposits & Paautang Shells' && (
        <>
          <div className="deposit-kpis">
            <Card>
              <span>Total Deposit Liability Held</span>
              <strong>₱522,000.00</strong>
              <small>Refundable cash trust fund</small>
            </Card>
            <Card>
              <span>Active Deposit Slips</span>
              <strong style={{ color: '#078a76' }}>290 Slips</strong>
              <small>Customers holding shells</small>
            </Card>
            <Card>
              <span>Overdue Review (&gt;60 Days)</span>
              <strong style={{ color: '#c64a50' }}>18 Cylinders</strong>
              <small>Risk of missing basyo</small>
            </Card>
            <Card>
              <span>Zero-Deposit Suki Accounts</span>
              <strong style={{ color: '#b78103' }}>8 Accounts</strong>
              <small>Owner authorized paautang</small>
            </Card>
          </div>

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
      )}

      {/* TAB 4: DAILY MOVEMENT & TRANSFER LOG */}
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
    ['REG-CMP-01', 'Solane Snap-On Safety Regulator (20mm)', 'Regulators', 'Solane / Isla LPG', '28 pcs', '₱480.00', '₱650.00', '26%', 'In Stock'],
    ['REG-POL-01', 'Heavy Duty Brass POL Screw Regulator', 'Regulators', 'Gasul / Generic', '15 pcs', '₱380.00', '₱520.00', '27%', 'In Stock'],
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
                  <input required value={pName} onChange={e => setPName(e.target.value)} placeholder="e.g. Solane High Pressure Hose (3m)" />
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


function SalesPOS() {
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

  const basePrice = 1040
  const swapFee = swapCondition === 'offbrand' ? 150 : swapCondition === 'requal' ? 80 : 0
  const depositFee = type === 'New Cylinder' ? 1800 : 0
  const totalAmount = basePrice + swapFee + depositFee

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
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
    setInvoice(true)
    showToast(`Sale completed! Official BIR Invoice generated for ${customer.split('·')[0].trim()}`)
  }

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}

      {/* Invoice Modal */}
      {invoice && (
        <InvoiceModal
          data={{
            invoiceNo: 'INV-2026-0315',
            customerName: customer.split('·')[0].trim(),
            address: 'Mabini St., Makati',
            contact: '0917 234 8891',
            tin: 'TIN-882-194',
            staffCode: 'ST001',
            staffName: 'Paolo Mendoza',
            paymentMethod,
            serial: 'PG-11-004521',
            brand: 'Petron Gasul',
            netWeight: '11.0 kg',
            subtotal: `₱${basePrice.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
            amount: `₱${totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
            hasReturnedEmpty: type === 'Palit-Basyo',
            returnedSerial: swapCondition === 'offbrand' ? 'Solane Shell (Off-Brand Ariglo)' : 'PG-11-003871',
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
          <CardTitle icon="swap" title="Order Builder" subtitle="Scan outgoing and incoming cylinder assets" />

          <div className="pos-section">
            <label className="field-label">Customer Selection</label>
            <div className="inline-field">
              <select value={customer} onChange={e => setCustomer(e.target.value)}>
                {customerList.map(c => <option key={c}>{c}</option>)}
              </select>
              <Button variant="secondary" icon="plus" onClick={() => setNewCustomerModal(true)}>New Customer</Button>
            </div>
          </div>

          <div className="pos-section">
            <label className="field-label">Transaction Type</label>
            <div className="type-switch">
              <button
                className={type === 'Palit-Basyo' ? 'active' : ''}
                onClick={() => setType('Palit-Basyo')}
              >
                <Icon name="swap" />
                <b>Palit-Basyo</b>
                <span>Gas charge only</span>
              </button>
              <button
                className={type === 'New Cylinder' ? 'active' : ''}
                onClick={() => setType('New Cylinder')}
              >
                <Icon name="cylinder" />
                <b>New Cylinder Purchase</b>
                <span>Gas + shell deposit</span>
              </button>
            </div>
          </div>

          <div className="pos-section">
            <h3>Outgoing Full Tank</h3>
            <div className="pos-fields">
              {[
                ['Brand', 'Petron Gasul'],
                ['Size', '11.0 kg'],
                ['Valve System', 'POL Threaded'],
                ['Serial Scanner', 'PG-11-004521'],
              ].map((x) => (
                <label key={x[0]}>
                  <span>{x[0]}</span>
                  <input value={x[1]} readOnly />
                </label>
              ))}
            </div>
          </div>

          {type === 'Palit-Basyo' && (
            <div className="pos-section incoming" style={{ borderBottom: 'none' }}>
              <h3>Incoming Empty Basyo Condition & Ariglo</h3>
              <div className="pos-fields">
                {[
                  ['Brand Received', swapCondition === 'offbrand' ? 'Solane (Competitor Tank)' : 'Petron Gasul'],
                  ['Serial Stamped', 'PG-11-003871'],
                ].map((x) => (
                  <label key={x[0]}>
                    <span>{x[0]}</span>
                    <input value={x[1]} readOnly />
                  </label>
                ))}
              </div>

              <div className="swap-condition-selector">
                <span className="field-label" style={{ marginTop: 10, display: 'block' }}>Shell Inspection & Swap Surcharge</span>
                <div className="condition-radios">
                  <label className={`condition-chip ${swapCondition === 'clean' ? 'active' : ''}`}>
                    <input type="radio" name="swap" checked={swapCondition === 'clean'} onChange={() => setSwapCondition('clean')} />
                    <span>✓ Clean Matching Tank (₱0)</span>
                  </label>
                  <label className={`condition-chip ${swapCondition === 'offbrand' ? 'active' : ''}`}>
                    <input type="radio" name="swap" checked={swapCondition === 'offbrand'} onChange={() => setSwapCondition('offbrand')} />
                    <span>⚠ Off-Brand Tank (+₱150 Ariglo)</span>
                  </label>
                  <label className={`condition-chip ${swapCondition === 'requal' ? 'active' : ''}`}>
                    <input type="radio" name="swap" checked={swapCondition === 'requal'} onChange={() => setSwapCondition('requal')} />
                    <span>⚠ Expired / Requal (+₱80)</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card className="pos-invoice">
          <div className="invoice-preview-head">
            <div>
              <span>INVOICE</span>
              <strong>INV-2026-0315</strong>
            </div>
            <small>
              Oct 16, 2026<br />
              Cashier ST001 · Paolo Mendoza
            </small>
          </div>

          <div className="invoice-line">
            <div>
              <strong>11kg Petron Gasul Refill</strong>
              <span>Gas Content · PG-11-004521</span>
            </div>
            <b>₱{basePrice.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</b>
          </div>

          {type === 'Palit-Basyo' ? (
            <div className="invoice-line muted-line">
              <div>
                <strong>Empty Basyo Surrendered</strong>
                <span>{swapCondition === 'offbrand' ? 'Solane Shell (Off-Brand Ariglo)' : 'PG-11-003871'}</span>
              </div>
              <b>-1 unit</b>
            </div>
          ) : (
            <div className="invoice-line">
              <div>
                <strong>Cylinder Shell Deposit</strong>
                <span>Refundable metal liability</span>
              </div>
              <b>₱{depositFee.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</b>
            </div>
          )}

          {swapFee > 0 && (
            <div className="invoice-line" style={{ color: '#c06100' }}>
              <div>
                <strong>{swapCondition === 'offbrand' ? 'Ariglo / Off-Brand Swap Fee' : 'Expired Requal Surcharge'}</strong>
                <span>Official swap handling</span>
              </div>
              <b>+₱{swapFee.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</b>
            </div>
          )}

          <div className="pos-totals">
            <p>
              <span>Subtotal</span>
              <strong>₱{totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
            </p>
            <p>
              <span>VAT (12%)</span>
              <strong>Included</strong>
            </p>
            <p>
              <span>Total Due</span>
              <strong>₱{totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
            </p>
          </div>

          <h3>Payment Method</h3>
          <div className="payment-methods">
            {['Cash', 'GCash / Maya', 'Paautang / Credit'].map(m => (
              <button
                key={m}
                className={paymentMethod === m ? 'active' : ''}
                onClick={() => setPaymentMethod(m)}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="pos-actions">
            <Button variant="secondary" icon="file" onClick={() => setInvoice(true)}>
              Print BIR Invoice
            </Button>
            <Button icon="check" onClick={handleCompleteSale}>
              Complete & Release
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

function ReceivingQC() {
  const [truckPlate, setTruckPlate] = useState('NDX-4821 (Isuzu 6-Wheeler Lorry)')
  const [driverName, setDriverName] = useState('Rodrigo "Digong" Cruz')
  const [originPlant, setOriginPlant] = useState('Petron Pandacan Bulk Terminal')
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
  const isWeightValid = parseFloat(netGas) >= 10.9 && parseFloat(netGas) <= 11.2

  const checks = [
    'Safety Seal Intact (Tamper-evident holographic cap verified)',
    'Weight Compliance (Spot-check: Gross − Tare = 11.0 kg net target)',
    '5-Year Requalification Valid (Dates checked on collar)',
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
              <input value="Petron Corporation / Isla LPG" readOnly />
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
    ['DEL-1018', 'ABC Restaurant', 'Ortigas Ave., Pasig', 'PH-11-004617 · SNP', 'ST003 · Mark Ramos', 'Credit DR', 'In Transit', 'View Slip'],
    ['DEL-1019', 'Maria Santos', 'Mabini St., Makati', 'PG-11-004722 · POL', 'ST005 · Nilo Cruz', 'COD', 'Pending', 'View Slip'],
    ['DEL-1017', 'Ana Reyes', 'J.P. Rizal, Makati', 'SL-11-004305 · CMP', 'ST003 · Mark Ramos', 'Paid', 'Delivered', 'View Slip'],
    ['DEL-1020', 'LM Food House', 'Shaw Blvd., Mandaluyong', 'PG-11-004812 · POL', 'ST003 · Mark Ramos', 'Credit DR', 'In Transit', 'View Slip'],
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
  const [dAddress, setDAddress] = useState('Ortigas Ave., Pasig')
  const [dSerial, setDSerial] = useState('PG-11-004920 · POL')
  const [dDriver, setDDriver] = useState('ST003 · Mark Ramos')
  const [dPayment, setDPayment] = useState('Credit DR')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  function handleCreateDispatch(e: FormEvent) {
    e.preventDefault()
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
                  <input required value={dAddress} onChange={e => setDAddress(e.target.value)} placeholder="e.g. Brgy. San Antonio, Pasig" />
                </label>
                <label>
                  <span>Cylinder Serial & Valve System<b>*</b></span>
                  <input required value={dSerial} onChange={e => setDSerial(e.target.value)} placeholder="PG-11-004920 · POL" />
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
              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setNewDispatchModal(false)}>Cancel</Button>
                <Button type="submit">Dispatch Trip</Button>
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
    ['EV-2026-0812', 'Oct 16 · 11:42 AM', 'Fuel', 'Shell fuel · Tricycle #03', '₱1,500.00', 'ST001', 'Receipt-0812.jpg', 'Approved'],
    ['EV-2026-0811', 'Oct 16 · 10:15 AM', 'Salaries & Allowances', 'Driver cash allowance', '₱1,200.00', 'ST001', 'Voucher signed', 'Approved'],
    ['EV-2026-0810', 'Oct 16 · 09:28 AM', 'Utilities', 'Maynilad water bill', '₱480.00', 'ST002', 'Receipt-0810.pdf', 'Approved'],
    ['EV-2026-0809', 'Oct 16 · 08:30 AM', 'Maintenance', 'Replacement valve O-rings', '₱500.00', 'ST002', 'Receipt-0809.jpg', 'Approved'],
  ]

  const categories = ['Cost of LPG', 'Loan Interest', 'Fuel', 'Salaries & Allowances', 'Rent', 'Utilities', 'Maintenance', 'Others']

  const [expenses, setExpenses] = useState(initialExpenses)
  const [selectedCat, setSelectedCat] = useState('All')
  const [newExpenseModal, setNewExpenseModal] = useState(false)
  const [toast, setToast] = useState('')

  // Expense form
  const [eCat, setECat] = useState('Fuel')
  const [eDesc, setEDesc] = useState('')
  const [eAmt, setEAmt] = useState('500')
  const [eStaff, setEStaff] = useState('ST001')
  const [eReceipt, setEReceipt] = useState('Receipt-manual.jpg')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  function handleCreateExpense(e: FormEvent) {
    e.preventDefault()
    const amt = parseFloat(eAmt) || 0
    const newId = `EV-2026-${0 + 813 + expenses.length}`
    const newRow = [
      newId,
      'Oct 16 · Just now',
      eCat,
      eDesc,
      `₱${amt.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
      eStaff,
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
    return expenses.filter(e => selectedCat === 'All' || e[2] === selectedCat)
  }, [expenses, selectedCat])

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

      <MasterHeader
        title="Operational Expenses"
        subtitle="Record daily operational disbursements with required expense categories and receipt attachments."
        actions={<Button icon="plus" onClick={() => setNewExpenseModal(true)}>New Expense Voucher</Button>}
      />

      <div className="category-grid">
        {categories.map((x, i) => (
          <button
            key={x}
            className={selectedCat === x ? 'active' : ''}
            onClick={() => setSelectedCat(selectedCat === x ? 'All' : x)}
          >
            <span><Icon name={i === 2 ? 'truck' : i === 6 ? 'settings' : i === 3 ? 'users' : 'receipt'}/></span>
            <b>{x}</b>
            <small>{['Supplier refills', 'Financing costs', 'Delivery vehicles', 'Drivers, staff, kargador', 'Yard and store lease', 'Power and water', 'Repairs and valves', 'Petty cash'][i]}</small>
          </button>
        ))}
      </div>

      <Card className="records-card master-table">
        <CardTitle
          icon="receipt"
          title={selectedCat === 'All' ? 'All Expense Vouchers' : `${selectedCat} Expenses`}
          action={
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {selectedCat !== 'All' && (
                <Button variant="ghost" onClick={() => setSelectedCat('All')}>Clear Filter</Button>
              )}
              <span className="card-total">
                Today · ₱{todayTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </span>
            </div>
          }
        />
        <DataTable
          columns={['Voucher #', 'Date & Time', 'Category', 'Description', 'Amount (₱)', 'Staff Code', 'Receipt Attached', 'Status']}
          rows={filteredExpenses}
        />
      </Card>
    </div>
  )
}

function DailyClosingEOD() {
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
  const [ownerPin, setOwnerPin] = useState('4829')
  const [finalized, setFinalized] = useState(false)
  const [toast, setToast] = useState('')
  const [showZReading, setShowZReading] = useState(false)
  const [checklistState, setChecklistState] = useState<boolean[]>([true, true, true, true, true, true])

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
  const netTurnover = Math.max(0, counted - 5000) // Less ₱5,000 opening float for tomorrow
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
    if (ownerPin !== '4829') {
      setToast('Invalid Owner PIN! Default authorization code is 4829.')
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
    'Yard full cylinder inventory physically counted by SKU & valve',
    'Empty palit-basyo returns balanced against delivery trip manifests',
    'Quarantine cage (dented, rusty, or requal cylinders) locked'
  ]

  const cylinderTally = [
    { sku: '11kg Petron Gasul (POL)', valve: 'POL Standard', begF: 140, inF: 50, outF: 40, endF: 150, physF: 150, begE: 30, inE: 40, outE: 30, endE: 40, physE: 40 },
    { sku: '11kg Solane Compact', valve: 'Compact 20mm', begF: 128, inF: 20, outF: 22, endF: 126, physF: 126, begE: 42, inE: 22, outE: 20, endE: 44, physE: 44 },
    { sku: '11kg Phoenix Super LPG', valve: 'SNP Auto-Lock', begF: 96, inF: 0, outF: 15, endF: 81, physF: 81, begE: 28, inE: 15, outE: 10, endE: 33, physE: 33 },
    { sku: '50kg Industrial Gasul', valve: 'POL Heavy', begF: 64, inF: 10, outF: 3, endF: 71, physF: 71, begE: 63, inE: 3, outE: 20, endE: 46, physE: 46 },
  ]

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}

      {/* Master Header */}
      <MasterHeader
        title="Daily Closing & Reconciliation (EOD)"
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
            <span>Authorized by Dexter Espiritu (Owner PIN: 4829) · Net cash turnover of ₱{netTurnover.toLocaleString('en-PH', { minimumFractionDigits: 2 })} transferred to main office safe.</span>
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
            <strong>End-of-Day Shift Audit in Progress</strong>
            <span>Count physical bills & coins, verify yard cylinder basyo counts, and obtain Owner Dexter sign-off before closing register.</span>
          </div>
          <Button variant="ghost" onClick={handleQuickMatch}>
            Quick Match Exact (₱30,670)
          </Button>
        </div>
      )}

      {/* Top 4 KPI Metrics */}
      <div className="eod-kpis">
        <Card>
          <span>Expected Cash Till</span>
          <strong>₱{expectedCash.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
          <small>Float ₱5k + Sales ₱24.8k + Coll ₱4.5k − Exp ₱3.68k</small>
        </Card>

        <Card>
          <span>Actual Physical Cash Counted</span>
          <strong style={{ color: variance === 0 ? '#078a76' : variance < 0 ? '#c64a50' : '#b76307' }}>
            ₱{counted.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </strong>
          <small>{mode === 'denom' ? 'Live sum of 6 bill types + coins' : 'Manual cash drawer entry'}</small>
        </Card>

        <Card>
          <span>Day-End Till Variance</span>
          <strong style={{ color: variance === 0 ? '#078a76' : variance < 0 ? '#c64a50' : '#b76307' }}>
            {variance === 0 ? '₱0.00' : variance < 0 ? `-₱${Math.abs(variance).toFixed(2)}` : `+₱${variance.toFixed(2)}`}
          </strong>
          <span className={`kpi-tag ${variance === 0 ? 'balanced' : variance < 0 ? 'shortage' : 'overage'}`}>
            {variance === 0 ? '✓ 100% Balanced' : variance < 0 ? '⚠ Cash Shortage' : '⚠ Cash Overage'}
          </span>
        </Card>

        <Card>
          <span>Yard Cylinders Balanced</span>
          <strong style={{ color: '#078a76' }}>591 Units</strong>
          <small>428 Full Tanks + 163 Empty Basyo · 0 Missing</small>
        </Card>
      </div>

      {/* Main Two-Column Layout */}
      <div className="eod-grid">
        {/* Left Column: Cash Drawer Reconciliation & Denomination Sheet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Card 1: Visual Cash Formula Audit Trail */}
          <Card>
            <CardTitle
              icon="coins"
              title="Cash Drawer Reconciliation Formula"
              action={<Badge>{variance === 0 ? 'Exact Match' : variance < 0 ? 'Shortage Alert' : 'Overage Alert'}</Badge>}
            />
            <div className="formula-strip">
              <div className="formula-item">
                <span>Opening Cash Float</span>
                <strong>₱5,000.00</strong>
              </div>
              <div className="formula-item">
                <span>+ Cash POS Sales</span>
                <strong>₱24,850.00</strong>
              </div>
              <div className="formula-item">
                <span>+ Suki Collections</span>
                <strong>₱4,500.00</strong>
              </div>
              <div className="formula-item">
                <span>− Disbursed Expenses</span>
                <strong style={{ color: '#b23942' }}>₱3,680.00</strong>
              </div>
              <div className="formula-item expected">
                <span>= Expected Cash Till</span>
                <strong>₱{expectedCash.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
              </div>
            </div>

            {/* Denomination Counter Header */}
            <div className="denom-header">
              <div>
                <strong style={{ fontSize: 14, color: '#112849' }}>Physical Cash Count Sheet</strong>
                <p style={{ fontSize: 12, color: '#71839c', margin: '3px 0 0' }}>
                  Itemize physical bills and coins currently in the store cash drawer
                </p>
              </div>
              <div className="denom-switch">
                <button
                  className={mode === 'denom' ? 'active' : ''}
                  onClick={() => setMode('denom')}
                >
                  Denominations (Bills & Coins)
                </button>
                <button
                  className={mode === 'manual' ? 'active' : ''}
                  onClick={() => setMode('manual')}
                >
                  Direct Flat Total
                </button>
              </div>
            </div>

            {/* Denomination Input Table */}
            {mode === 'denom' ? (
              <div>
                <div className="denom-table-wrap">
                  <table className="denom-table">
                    <thead>
                      <tr>
                        <th>Denomination</th>
                        <th style={{ width: 140 }}>Quantity (Pcs)</th>
                        <th style={{ textAlign: 'right' }}>Subtotal (₱)</th>
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
                          <td>
                            <div className="denom-stepper">
                              <button
                                className="denom-btn"
                                disabled={finalized}
                                onClick={() => updateDenom(d.key, -1)}
                              >
                                −
                              </button>
                              <input
                                type="number"
                                min="0"
                                className="denom-qty-input"
                                disabled={finalized}
                                value={denoms[d.key] ?? 0}
                                onChange={(e) => setDenomQty(d.key, e.target.value)}
                              />
                              <button
                                className="denom-btn"
                                disabled={finalized}
                                onClick={() => updateDenom(d.key, 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="denom-subtotal">
                            ₱{((denoms[d.key] || 0) * d.mult).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <span className="denom-pill coin">Coins (₱20, ₱10, ₱5, ₱1, 25¢)</span>
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            step="0.25"
                            className="denom-qty-input"
                            style={{ width: 90 }}
                            disabled={finalized}
                            value={denoms.coins ?? 0}
                            onChange={(e) => setDenomQty('coins', e.target.value)}
                          />
                        </td>
                        <td className="denom-subtotal">
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
                    <strong>₱{denomSum.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '16px 20px' }}>
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
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <Button variant="ghost" onClick={() => setManualCash('30670.00')} disabled={finalized}>
                    Exact Expected (₱30,670.00)
                  </Button>
                  <Button variant="ghost" onClick={() => setManualCash('30620.00')} disabled={finalized}>
                    With ₱50 Shortage (₱30,620.00)
                  </Button>
                </div>
              </div>
            )}

            {/* Variance Highlight Box */}
            <div className={`variance-card ${variance === 0 ? 'balanced' : variance < 0 ? 'shortage' : 'overage'}`}>
              <div>
                <strong style={{ fontSize: 14, display: 'block' }}>
                  {variance === 0 ? '✓ Perfect Reconciliation (No Discrepancy)' : variance < 0 ? '⚠ Cash Drawer Shortage' : '⚠ Cash Drawer Overage'}
                </strong>
                <span style={{ fontSize: 12, opacity: 0.9 }}>
                  {variance === 0
                    ? 'Physical cash drawer matches the expected formula till 100%.'
                    : variance < 0
                    ? `Physical count is ₱${Math.abs(variance).toFixed(2)} less than the expected system amount.`
                    : `Physical count has ₱${variance.toFixed(2)} surplus cash above the expected amount.`}
                </span>
              </div>
              <strong style={{ fontSize: 20 }}>
                {variance === 0 ? '₱0.00' : variance < 0 ? `-₱${Math.abs(variance).toFixed(2)}` : `+₱${variance.toFixed(2)}`}
              </strong>
            </div>

            {/* Mandatory Discrepancy Protocol */}
            {variance !== 0 ? (
              <div className="discrepancy-box">
                <span className="field-label" style={{ color: '#b13840' }}>
                  Mandatory Discrepancy Audit Log (Required by Store Policy)
                </span>
                <label>
                  <span style={{ fontSize: 12, color: '#71839c' }}>Reason Code</span>
                  <select
                    value={varianceReason}
                    disabled={finalized}
                    onChange={(e) => setVarianceReason(e.target.value)}
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
                    rows={2}
                    value={varianceNotes}
                    disabled={finalized}
                    onChange={(e) => setVarianceNotes(e.target.value)}
                    placeholder="Enter details explaining the variance..."
                  />
                </label>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: '#71839c' }}>
                    Closing Cashier: Christopher Jude Espiritu · ID #EMP-004
                  </span>
                  <span style={{ fontSize: 11, color: '#b13840', fontWeight: 600 }}>
                    Shortage will be audited against cashier daily quota
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ padding: '10px 18px 15px', color: '#078a76', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>✓</span> Cash drawer is fully reconciled. No discrepancy logging required.
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Yard Cylinder Stock Movement & Owner Sign-Off */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Card 2: Yard Palit-Basyo Cylinder Stock Tally */}
          <Card>
            <CardTitle
              icon="cylinder"
              title="Physical Yard Cylinder Stock Tally"
              action={<Badge>591 Tanks Balanced</Badge>}
            />
            <div className="yard-tally">
              <table>
                <thead>
                  <tr>
                    <th>SKU / Brand</th>
                    <th>Full (Sys / Phys)</th>
                    <th>Empty (Sys / Phys)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cylinderTally.map(row => (
                    <tr key={row.sku}>
                      <td>
                        <strong style={{ display: 'block', color: '#163652' }}>{row.sku}</strong>
                        <small style={{ color: '#71839c' }}>{row.valve}</small>
                      </td>
                      <td>
                        <strong>{row.physF}</strong>
                        <span style={{ color: '#71839c', fontSize: 11 }}> / {row.endF}</span>
                      </td>
                      <td>
                        <strong>{row.physE}</strong>
                        <span style={{ color: '#71839c', fontSize: 11 }}> / {row.endE}</span>
                      </td>
                      <td>
                        <span className="status-pill-ok">✓ Matched</span>
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f5f9fc', fontWeight: 'bold' }}>
                    <td>Total Yard Inventory</td>
                    <td style={{ color: '#078a76' }}>428 Full Tanks</td>
                    <td style={{ color: '#1877c9' }}>163 Empty Basyo</td>
                    <td>
                      <span className="status-pill-ok">0 Missing</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, padding: '10px 12px', background: '#f4f8fb', borderRadius: 6, fontSize: 12 }}>
                <span style={{ color: '#59738c' }}>
                  Quarantine Defective Cage: <strong>4 Tanks</strong> (Dented/Rusty awaiting requalification)
                </span>
                <span style={{ color: '#078a76', fontWeight: 600 }}>
                  Grand Total: 595 Total Store Cylinders
                </span>
              </div>
            </div>
          </Card>

          {/* Card 3: EOD Control Checklist & Owner Sign-off */}
          <Card>
            <CardTitle
              icon="check"
              title="End-of-Day Checklist & Owner Sign-Off"
              action={<Badge>{checksCompleted}/6 Completed</Badge>}
            />

            {/* Checklist items */}
            <div className="eod-checklist">
              {checklistItems.map((item, index) => {
                const isChecked = checklistState[index]
                return (
                  <div
                    key={item}
                    className={`eod-check-item ${isChecked ? 'done' : ''}`}
                    onClick={() => toggleCheck(index)}
                  >
                    <div className="eod-check-box">
                      {isChecked ? '✓' : ''}
                    </div>
                    <span>{item}</span>
                  </div>
                )
              })}
            </div>

            {/* Owner Authorization & Sign-Off Section */}
            <div className="owner-signoff">
              {/* Turnover Summary */}
              <div className="turnover-summary">
                <div>
                  <span style={{ display: 'block' }}>Net Cash Turnover to Owner Safe</span>
                  <small style={{ fontSize: 12, color: '#59738c' }}>
                    Total Counted ₱{counted.toLocaleString('en-PH', { minimumFractionDigits: 2 })} − ₱5,000 Next Shift Float
                  </small>
                </div>
                <strong>₱{netTurnover.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ fontSize: 12, color: '#71839c' }}>Owner / Shift Supervisor</span>
                  <input
                    type="text"
                    value="Dexter Espiritu (Owner)"
                    readOnly
                    style={{ height: 38, background: '#f6f9fc', border: '1px solid #dce5ed', borderRadius: 6, padding: '0 10px', fontSize: 13, color: '#173650' }}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ fontSize: 12, color: '#71839c' }}>Owner Authorization PIN</span>
                  <input
                    type="password"
                    disabled={finalized}
                    value={ownerPin}
                    onChange={(e) => setOwnerPin(e.target.value)}
                    style={{ height: 38, background: finalized ? '#f6f9fc' : '#ffffff', border: '1px solid #dce5ed', borderRadius: 6, padding: '0 10px', fontSize: 13, fontWeight: 'bold', color: '#173650' }}
                  />
                </label>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Button
                  icon="check"
                  disabled={finalized || checksCompleted < 6}
                  onClick={handleFinalize}
                >
                  {finalized ? '✓ Shift Finalized & Register Locked' : 'Finalize & Lock Daily Closing'}
                </Button>
                <Button
                  variant="ghost"
                  icon="receipt"
                  onClick={() => setShowZReading(true)}
                >
                  Preview Z-Reading Daily Summary Report
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Official Z-Reading Report Modal */}
      {showZReading && (
        <div className="modal-backdrop document-backdrop" onClick={() => setShowZReading(false)}>
          <div className="document-modal z-modal" onClick={(e) => e.stopPropagation()}>
            <button className="document-close" onClick={() => setShowZReading(false)}>✕</button>

            <div className="z-receipt">
              <div className="z-receipt-header">
                <h2>DEXTER LPG TRADING & DISTRIBUTION</h2>
                <p>184 Caruncho Ave, Brgy. San Antonio, Pasig City, Metro Manila</p>
                <p>TIN: 294-819-041-000 Non-VAT · DOE Permit: NCR-DOE-LPG-0881</p>
                <p style={{ marginTop: 6, fontWeight: 'bold', letterSpacing: 1 }}>
                  *** OFFICIAL END-OF-DAY Z-READING REPORT ***
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
                <div className="z-section-title">2. Cash Drawer Reconciliation</div>
                <div className="z-row">
                  <span>Opening Cash Float</span>
                  <span>₱5,000.00</span>
                </div>
                <div className="z-row">
                  <span>Cash Inflow (Sales + Collections)</span>
                  <span>+₱29,350.00</span>
                </div>
                <div className="z-row">
                  <span>Petty Cash Disbursements / Expenses</span>
                  <span style={{ color: '#b13840' }}>−₱3,680.00</span>
                </div>
                <div className="z-row">
                  <span>Expected Drawer Cash Balance</span>
                  <strong>₱{expectedCash.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
                </div>
                <div className="z-row" style={{ marginTop: 4 }}>
                  <span>Actual Physical Cash Counted</span>
                  <strong style={{ color: variance === 0 ? '#078a76' : '#b13840' }}>
                    ₱{counted.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </strong>
                </div>
                <div className="z-row total">
                  <span>CLOSING CASH VARIANCE</span>
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
                <div className="z-section-title">4. Palit-Basyo Cylinder Movements</div>
                <div className="z-row">
                  <span>Full Cylinders Sold / Dispatched</span>
                  <span>70 Tanks</span>
                </div>
                <div className="z-row">
                  <span>Empty Basyo Retrieved from Customers</span>
                  <span>70 Tanks</span>
                </div>
                <div className="z-row">
                  <span>Closing Yard Stock</span>
                  <strong>428 Full / 163 Empty (591 Total)</strong>
                </div>
                <div className="z-row">
                  <span>Stock Discrepancy / Shrinkage</span>
                  <strong style={{ color: '#078a76' }}>0 TANKS (BALANCED)</strong>
                </div>
              </div>

              {/* Cash Turnover to Owner Safe */}
              <div className="z-section" style={{ background: '#f5fbf9', padding: '10px', borderRadius: 6, margin: '10px 0' }}>
                <div className="z-row">
                  <span>Total Physical Cash Counted</span>
                  <span>₱{counted.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="z-row">
                  <span>Less Retained Float (For Oct 17 Morning)</span>
                  <span>−₱5,000.00</span>
                </div>
                <div className="z-row total" style={{ fontSize: 14 }}>
                  <span>NET CASH TURNED OVER TO OWNER</span>
                  <strong style={{ color: '#078a76' }}>
                    ₱{netTurnover.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </strong>
                </div>
              </div>

              {/* Signatures */}
              <div className="z-signatures">
                <div>
                  <div className="z-sig-line">Christopher Jude Espiritu</div>
                  <span>Closing Cashier (Shift Lead)</span>
                </div>
                <div>
                  <div className="z-sig-line">Dexter Espiritu</div>
                  <span>Owner / Operations Head</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: 18, fontSize: 11, color: '#71839c' }}>
                Generated electronically by LPG Operations Management System v2.4 · Compliant with DOE RA 11592
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
    ['11kg Petron Gasul (POL)', 'POL', '140 F / 30 E', '+50 F', '-22 F', '-18 F', '+40 E', '-30 E', '150 F / 40 E', '0 · OK'],
    ['11kg Solane Compact', 'Compact 20mm', '128 F / 42 E', '+20 F', '-12 F', '-10 F', '+22 E', '-20 E', '126 F / 44 E', '0 · OK'],
    ['11kg Phoenix Super LPG', 'SNP Auto-Lock', '96 F / 28 E', '—', '-8 F', '-7 F', '+15 E', '-10 E', '81 F / 33 E', '0 · OK'],
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
    ['08:24 AM', 'LPG-004521', 'Petron Gasul', 'Sale', 'Maria Santos', 'ST001', 'Main Warehouse', 'With Customer'],
    ['09:15 AM', 'LPG-003998', 'Solane', 'Exchange', 'Juan Dela Cruz', 'ST002', 'With Customer', 'Main Warehouse'],
    ['10:02 AM', 'LPG-004617', 'Petron Gasul', 'Delivery', 'ABC Restaurant', 'ST003', 'Main Warehouse', 'Truck 03'],
    ['11:37 AM', 'LPG-004305', 'Solane', 'Sale', 'Ana Reyes', 'ST001', 'Main Warehouse', 'With Customer'],
    ['01:18 PM', 'LPG-004112', 'Phoenix Super LPG', 'Received', '—', 'ST004', 'Supplier', 'Main Warehouse'],
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

function ReportsAndAudit({ setPage }: { setPage: (page: string) => void }) {
  const [tab, setTab] = useState('Monthly Summary')
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')

  const chartData = [
    { month: 'May', sales: 470000, expenses: 155000 },
    { month: 'Jun', sales: 520000, expenses: 165000 },
    { month: 'Jul', sales: 480000, expenses: 148000 },
    { month: 'Aug', sales: 590000, expenses: 175000 },
    { month: 'Sep', sales: 620000, expenses: 182000 },
    { month: 'Oct', sales: 684250, expenses: 189460 },
  ]
  const stockRows = [
    ['11kg Petron Gasul (POL)', 'POL', '140 F / 30 E', '+50 F', '-22 F', '-18 F', '+40 E', '-30 E', '150 F / 40 E', '0 · OK'],
    ['11kg Solane Compact', 'Compact 20mm', '128 F / 42 E', '+20 F', '-12 F', '-10 F', '+22 E', '-20 E', '126 F / 44 E', '0 · OK'],
    ['11kg Phoenix Super LPG', 'SNP Auto-Lock', '96 F / 28 E', '—', '-8 F', '-7 F', '+15 E', '-10 E', '81 F / 33 E', '0 · OK'],
  ]
  const auditRows = [
    ['Oct 16, 2026', '01:18 PM', 'ST002', 'Invoice created', 'LM Food House · ₱600', 'INV-2026-0315'],
    ['Oct 16, 2026', '11:42 AM', 'ST001', 'Expense recorded', 'Fuel · ₱1,500', 'EXP-0812'],
    ['Oct 16, 2026', '10:28 AM', 'ST003', 'Delivery completed', 'ABC Restaurant', 'DEL-1017'],
    ['Oct 16, 2026', '09:15 AM', 'ST002', 'Exchange transaction', 'Juan Dela Cruz', 'INV-2026-0314'],
  ]

  const filteredAudit = auditRows.filter(r => r.join(' ').toLowerCase().includes(search.toLowerCase()))

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const maxValue = 750000
  const chartHeight = 220
  const chartWidth = 520
  const leftPad = 42
  const bottomPad = 28
  const topPad = 16
  const usableHeight = chartHeight - topPad - bottomPad
  const groupWidth = 68
  const barWidth = 16

  return (
    <div className="page module-page">
      {toast && <div className="toast"><span>✓</span>{toast}</div>}
      <MasterHeader
        title="Reports & Audit Controls"
        subtitle="Monthly financial summary, DOE regulatory stock movement, and permanent read-only audit trails."
        actions={
          <div className="heading-actions">
            <button className="date-button">
              <Icon name="calendar" size={17} />
              October 2026
              <Icon name="chevron" size={14} />
            </button>
            <Button icon="download" onClick={() => showToast('Downloaded: Monthly_Financial_Summary_Oct2026.xlsx')}>
              Export Report
            </Button>
          </div>
        }
      />
      <FilterTabs
        items={['Monthly Summary', 'DOE Stock Movement Report', 'Audit Logs (Read-Only)']}
        active={tab}
        onChange={setTab}
      />

      {tab === 'Monthly Summary' ? (
        <>
          <div className="report-kpis">
            {[
              ['Total Sales', '₱684,250', '+12.5%'],
              ['Cylinders Received', '1,248', '+8.2%'],
              ['Total Expenses', '₱189,460', '-3.1%'],
              ['Simple Profit', '₱494,790', '+18.8%'],
            ].map((x, i) => (
              <Card key={x[0]}>
                <span>{x[0]}</span>
                <strong>{x[1]}</strong>
                <small className={i === 2 ? 'negative' : ''}>
                  {x[2]} vs. September
                </small>
              </Card>
            ))}
          </div>

          <div className="reports-grid">
            <Card>
              <CardTitle
                icon="chart"
                title="Sales & Expenses"
                subtitle="Monthly performance for 2026"
              />

              <div
                className="line-chart"
                style={{
                  padding: '8px 0 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 16,
                    marginBottom: 8,
                    fontSize: 12,
                    color: '#71839C',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        background: '#12A995',
                        display: 'inline-block',
                      }}
                    />
                    <span>Sales</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        background: '#1877C9',
                        display: 'inline-block',
                      }}
                    />
                    <span>Expenses</span>
                  </div>
                </div>

                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  width="100%"
                  height="220"
                  role="img"
                  aria-label="Sales and expenses bar chart"
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
                    const x = leftPad + i * groupWidth + 18
                    const salesHeight = (item.sales / maxValue) * usableHeight
                    const expensesHeight = (item.expenses / maxValue) * usableHeight
                    const salesY = topPad + usableHeight - salesHeight
                    const expensesY = topPad + usableHeight - expensesHeight

                    return (
                      <g key={item.month}>
                        <rect
                          x={x}
                          y={salesY}
                          width={barWidth}
                          height={salesHeight}
                          rx={4}
                          fill="#12A995"
                        >
                          <title>{`Sales (${item.month}): ₱${item.sales.toLocaleString('en-PH')}`}</title>
                        </rect>

                        <rect
                          x={x + barWidth + 6}
                          y={expensesY}
                          width={barWidth}
                          height={expensesHeight}
                          rx={4}
                          fill="#1877C9"
                        >
                          <title>{`Expenses (${item.month}): ₱${item.expenses.toLocaleString('en-PH')}`}</title>
                        </rect>

                        <text
                          x={x + barWidth + 3}
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

            <Card>
              <CardTitle title="Operational Summary" />
              {[
                ['Ending Cylinder Inventory', '1,024'],
                ['Sold / Exchanged', '836'],
                ['Outstanding Loan Balance', '₱120,000'],
                ['Interest Paid', '₱8,450'],
                ['Active Staff', '12'],
              ].map((x) => (
                <div className="summary-row" key={x[0]}>
                  <span>{x[0]}</span>
                  <strong>{x[1]}</strong>
                </div>
              ))}
            </Card>
          </div>
        </>
      ) : tab === 'DOE Stock Movement Report' ? (
        <>
          <div className="compliance-banner">
            <Icon name="check" />
            <div>
              <strong>Daily Movement Balanced</strong>
              <span>All SKUs reconcile with zero audit variance. Report is ready for regulatory submission.</span>
            </div>
            <Badge>DOE Compliant</Badge>
          </div>
          <Card className="records-card master-table compliance-table">
            <CardTitle icon="chart" title="Beginning-to-Ending Stock Movement" subtitle="Quantities shown as Full (F) and Empty (E) cylinders" />
            <DataTable
              columns={[
                'SKU & Brand',
                'Valve Spec',
                'Opening Full / Empty',
                'Supplier In',
                'Walk-in Sold',
                'Delivery Sold',
                'Empties In',
                'Empties to Plant',
                'Ending Full / Empty',
                'Audit Variance',
              ]}
              rows={stockRows}
            />
          </Card>
        </>
      ) : (
        <Card className="records-card master-table">
          <div className="toolbar">
            <SearchField value={search} onChange={setSearch} placeholder="Search audit logs by staff or action..." />
            <Button variant="secondary" icon="download" onClick={() => showToast('Downloaded: Audit_Logs_Export.csv')}>
              Export Audit Trail
            </Button>
          </div>
          <DataTable
            columns={['Date', 'Time', 'Staff Code', 'Action Type', 'Details', 'Record']}
            rows={filteredAudit}
          />
        </Card>
      )}
    </div>
  )
}

function Topbar({ globalSearch, setGlobalSearch, setPage }: { globalSearch: string; setGlobalSearch: (v: string) => void; setPage: (p: string) => void }) {
  const searchResults = useMemo(() => {
    if (!globalSearch.trim() || globalSearch.length < 2) return []
    const q = globalSearch.toLowerCase()
    const results: { label: string; sub: string; category: string; targetPage: string }[] = []

    if ('maria santos'.includes(q) || 'makati'.includes(q)) results.push({ label: 'Maria Santos', sub: 'Mabini St., Makati · Suki Regular', category: 'Customer', targetPage: 'Customers & Suki' })
    if ('abc restaurant'.includes(q) || 'ortigas'.includes(q)) results.push({ label: 'ABC Restaurant', sub: 'Ortigas Ave., Pasig · Suki Commercial', category: 'Customer', targetPage: 'Customers & Suki' })
    if ('aling nena'.includes(q) || 'carinderia'.includes(q)) results.push({ label: "Aling Nena's Carinderia", sub: 'P. Burgos, Pasig', category: 'Customer', targetPage: 'Customers & Suki' })

    if ('pg-11-004521'.includes(q) || 'petron'.includes(q)) results.push({ label: 'PG-11-004521', sub: 'Petron Gasul 11kg · With Maria Santos', category: 'Cylinder', targetPage: 'Cylinders & Tanks' })
    if ('sl-11-003998'.includes(q) || 'solane'.includes(q)) results.push({ label: 'SL-11-003998', sub: 'Solane 11kg CMP · Empty in Yard', category: 'Cylinder', targetPage: 'Cylinders & Tanks' })
    if ('ph-11-004617'.includes(q) || 'phoenix'.includes(q)) results.push({ label: 'PH-11-004617', sub: 'Phoenix 11kg SNP · On Truck 03', category: 'Cylinder', targetPage: 'Cylinders & Tanks' })

    if ('del-1018'.includes(q) || 'delivery'.includes(q)) results.push({ label: 'DEL-1018', sub: 'ABC Restaurant · Mark Ramos (ST003)', category: 'Delivery', targetPage: 'Deliveries & Dispatch' })
    if ('del-1019'.includes(q)) results.push({ label: 'DEL-1019', sub: 'Maria Santos · Nilo Cruz (ST005)', category: 'Delivery', targetPage: 'Deliveries & Dispatch' })

    if ('inv-2026-0315'.includes(q) || 'invoice'.includes(q)) results.push({ label: 'INV-2026-0315', sub: '₱1,200 · Maria Santos · Cash', category: 'Invoice', targetPage: 'POS (Sales & Exchange)' })
    if ('reg-cmp-01'.includes(q) || 'regulator'.includes(q)) results.push({ label: 'Solane Snap-On Regulator', sub: 'REG-CMP-01 · 28 pcs', category: 'Inventory', targetPage: 'Store Inventory' })

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

  let screen: ReactNode
  if (page === 'Dashboard') screen = <Dashboard setPage={setPage} />
  else if (page === 'POS (Sales & Exchange)' || page === 'Sales & Exchange') screen = <SalesPOS />
  else if (page === 'Deliveries & Dispatch') screen = <DispatchSettlement />
  else if (page === 'Receiving & Stock In' || page === 'Receiving') screen = <ReceivingQC />
  else if (page === 'Cylinders & Tanks' || page === 'Cylinders' || page === 'Daily Cylinder Movement Log') screen = <CylinderFleet setPage={setPage} />
  else if (page === 'Store Inventory') screen = <StoreInventory />
  else if (page === 'Customers & Suki' || page === 'Customer Credit') screen = <CustomersSuki />
  else if (page === 'Staff & Riders') screen = <ModulePage page="Staff" setPage={setPage} />
  else if (page === 'Expenses') screen = <OperationalExpenses />
  else if (page === 'Daily Closing') screen = <DailyClosingEOD />
  else if (page === 'Reports & Audit' || page === 'Reports & Analytics' || page === 'Daily Stock Movement Report' || page === 'Audit Logs') screen = <ReportsAndAudit setPage={setPage} />
  else if (page === 'Settings') screen = <OperationsForm page="Settings" />
  else screen = <ModulePage page={page} setPage={setPage} />

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} />
      <main>
        <Topbar globalSearch={globalSearch} setGlobalSearch={setGlobalSearch} setPage={setPage} />
        <div className="content">{screen}</div>
      </main>
    </div>
  )
}

