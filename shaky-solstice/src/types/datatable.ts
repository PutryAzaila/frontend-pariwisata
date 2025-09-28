// Tipe kolom untuk DataTable
export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  type?: "text" | "number" | "currency" | "date";
}

// Data baris tabel
export interface TableData {
  [key: string]: any;
  id?: string | number;
}

// Konfigurasi aksi custom
export interface CustomAction {
  label: string;
  onClick: (row: TableData) => void;
  className?: string;
  icon?: string;
}

// Konfigurasi actions DataTable
export interface ActionsConfig {
  edit?: boolean;
  delete?: boolean;
  view?: boolean;
  custom?: CustomAction[];
}
