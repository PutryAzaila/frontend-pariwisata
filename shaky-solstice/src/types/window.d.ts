declare global {
  interface Window {
    toggleSidebar: () => void;
    toggleTheme: () => void;
    togglePassword: () => void;
    toggleProfileDropdown: () => void;
    printItem: (itemId: string | number) => void;
    message: (msg: string) => void;
    showLogoutModal: () => void;
    closeLogoutModal: () => void;
    proceedLogout: () => void;
    reloadSidebar: () => void;
    notificationType: (type: 'success' | 'error' | 'info', message: string) => void;
    exportBUMDesData?: (...args: any[]) => void;
    printBUMDesReport?: (...args: any[]) => void;
    addSampleTransaction?: (...args: any[]) => void;
    authToken : any;
    $: any;
    jQuery: any;
    handleLogin: any;

    EditProfileModal: typeof EditProfileModal;
    ChangePasswordModal: typeof ChangePasswordModal;
  }

  // Tambahin ini biar TS nggak rewel soal DataTables
  interface JQuery {
    DataTable(options?: any): any;
  }

  // Kalau perlu buttons
  interface DataTableOptions {
    buttons?: string[] | any[];
    dom?: string;
    responsive?: boolean;
    pageLength?: number;
    language?: Record<string, any>;
  }
}

export {};
