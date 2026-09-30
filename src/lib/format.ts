export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
export const fmtDateShort = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
