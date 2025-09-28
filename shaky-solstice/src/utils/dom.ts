// domUtils.ts - TypeScript-safe DOM utilities

/**
 * Safely get element by ID with type assertion
 */
export function getElementById<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

/**
 * Safely query selector with type assertion
 */
export function querySelector<T extends Element>(selector: string): T | null {
  return document.querySelector(selector) as T | null;
}

/**
 * Safely query selector all with type assertion
 */
export function querySelectorAll<T extends Element>(selector: string): NodeListOf<T> {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}

/**
 * Safely get input value with null check
 */
export function getInputValue(id: string): string {
  const element = getElementById<HTMLInputElement>(id);
  return element?.value || '';
}

/**
 * Safely set input value with null check
 */
export function setInputValue(id: string, value: string): boolean {
  const element = getElementById<HTMLInputElement>(id);
  if (element) {
    element.value = value;
    return true;
  }
  return false;
}

/**
 * Safely get textarea value with null check
 */
export function getTextareaValue(id: string): string {
  const element = getElementById<HTMLTextAreaElement>(id);
  return element?.value || '';
}

/**
 * Safely set textarea value with null check
 */
export function setTextareaValue(id: string, value: string): boolean {
  const element = getElementById<HTMLTextAreaElement>(id);
  if (element) {
    element.value = value;
    return true;
  }
  return false;
}

/**
 * Safely get checkbox checked state
 */
export function getCheckboxValue(id: string): boolean {
  const element = getElementById<HTMLInputElement>(id);
  return element?.checked || false;
}

/**
 * Safely set checkbox checked state
 */
export function setCheckboxValue(id: string, checked: boolean): boolean {
  const element = getElementById<HTMLInputElement>(id);
  if (element) {
    element.checked = checked;
    return true;
  }
  return false;
}

/**
 * Safely get text content with null check
 */
export function getTextContent(id: string): string {
  const element = getElementById(id);
  return element?.textContent || '';
}

/**
 * Safely set text content with null check
 */
export function setTextContent(id: string, text: string): boolean {
  const element = getElementById(id);
  if (element) {
    element.textContent = text;
    return true;
  }
  return false;
}

/**
 * Safely get image src with null check
 */
export function getImageSrc(id: string): string {
  const element = getElementById<HTMLImageElement>(id);
  return element?.src || '';
}

/**
 * Safely set image src with null check
 */
export function setImageSrc(id: string, src: string): boolean {
  const element = getElementById<HTMLImageElement>(id);
  if (element) {
    element.src = src;
    return true;
  }
  return false;
}

/**
 * Safely add class with null check
 */
export function addClass(id: string, className: string): boolean {
  const element = getElementById(id);
  if (element) {
    element.classList.add(className);
    return true;
  }
  return false;
}

/**
 * Safely remove class with null check
 */
export function removeClass(id: string, className: string): boolean {
  const element = getElementById(id);
  if (element) {
    element.classList.remove(className);
    return true;
  }
  return false;
}

/**
 * Safely toggle class with null check
 */
export function toggleClass(id: string, className: string): boolean {
  const element = getElementById(id);
  if (element) {
    element.classList.toggle(className);
    return true;
  }
  return false;
}

/**
 * Safely check if element has class
 */
export function hasClass(id: string, className: string): boolean {
  const element = getElementById(id);
  return element?.classList.contains(className) || false;
}

/**
 * Show notification with auto-remove
 */
export function showNotification(
  message: string, 
  type: 'success' | 'error' | 'warning' = 'success',
  duration: number = 3000
): void {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500'
  };

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-triangle',
    warning: 'fa-exclamation-triangle'
  };

  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300`;
  notification.innerHTML = `
    <div class="flex items-center">
      <i class="fas ${icons[type]} mr-2"></i>
      ${message}
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after duration
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.parentNode?.removeChild(notification);
      }, 300);
    }
  }, duration);
}

/**
 * Safely handle file input change with preview
 */
export function handleImagePreview(
  fileInputId: string, 
  previewImageId: string,
  callback?: (src: string) => void
): void {
  const fileInput = getElementById<HTMLInputElement>(fileInputId);
  const previewImage = getElementById<HTMLImageElement>(previewImageId);
  
  if (!fileInput || !previewImage) return;
  
  fileInput.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          previewImage.src = result;
          callback?.(result);
        }
      };
      reader.readAsDataURL(file);
    }
  });
}

/**
 * Safely handle modal operations
 */
export const ModalUtils = {
  show(modalId: string): boolean {
    const modal = getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      return true;
    }
    return false;
  },

  hide(modalId: string): boolean {
    const modal = getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
      return true;
    }
    return false;
  },

  setupClickOutside(modalId: string, closeCallback: () => void): void {
    const modal = getElementById(modalId);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeCallback();
        }
      });
    }
  },

  setupEscapeKey(closeCallback: () => void): void {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCallback();
      }
    });
  }
};

/**
 * Form validation utilities
 */
export const FormUtils = {
  validateRequired(ids: string[]): { isValid: boolean; missingFields: string[] } {
    const missingFields: string[] = [];
    
    for (const id of ids) {
      const value = getInputValue(id).trim();
      if (!value) {
        missingFields.push(id);
      }
    }
    
    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  },

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePassword(password: string, minLength: number = 8): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < minLength) {
      errors.push(`Password minimal ${minLength} karakter`);
    }
    
    if (!/[A-Za-z]/.test(password)) {
      errors.push('Password harus mengandung huruf');
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('Password harus mengandung angka');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  validatePasswordMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }
};

/**
 * Loading state utilities
 */
export const LoadingUtils = {
  setButtonLoading(buttonId: string, loadingText: string = 'Loading...'): { restore: () => void } | null {
    const button = getElementById<HTMLButtonElement>(buttonId);
    if (!button) return null;
    
    const originalText = button.innerHTML;
    const wasDisabled = button.disabled;
    
    button.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>${loadingText}`;
    button.disabled = true;
    
    return {
      restore: () => {
        button.innerHTML = originalText;
        button.disabled = wasDisabled;
      }
    };
  },

  setElementLoading(elementId: string, loadingText: string = 'Loading...'): { restore: () => void } | null {
    const element = getElementById(elementId);
    if (!element) return null;
    
    const originalContent = element.innerHTML;
    
    element.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>${loadingText}`;
    
    return {
      restore: () => {
        element.innerHTML = originalContent;
      }
    };
  }
};

/**
 * Local storage utilities with error handling
 */
export const StorageUtils = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  set(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },

  remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  getJSON<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
      return null;
    }
  },

  setJSON<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error storing JSON to localStorage:', error);
      return false;
    }
  }
};

/**
 * Animation utilities
 */
export const AnimationUtils = {
  fadeIn(elementId: string, duration: number = 300): void {
    const element = getElementById(elementId);
    if (element) {
      element.style.opacity = '0';
      element.style.transition = `opacity ${duration}ms ease`;
      element.classList.remove('hidden');
      
      setTimeout(() => {
        element.style.opacity = '1';
      }, 10);
    }
  },

  fadeOut(elementId: string, duration: number = 300, hideAfter: boolean = true): void {
    const element = getElementById(elementId);
    if (element) {
      element.style.transition = `opacity ${duration}ms ease`;
      element.style.opacity = '0';
      
      if (hideAfter) {
        setTimeout(() => {
          element.classList.add('hidden');
        }, duration);
      }
    }
  },

  slideUp(elementId: string, duration: number = 300): void {
    const element = getElementById(elementId);
    if (element) {
      element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
      element.style.transform = 'translateY(-20px)';
      element.style.opacity = '0';
      
      setTimeout(() => {
        element.classList.add('hidden');
      }, duration);
    }
  }
};

/**
 * Type definitions for common form data
 */
export interface ProfileFormData {
  fullName: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  twoFactorAuth: boolean;
  profileImage?: string;
}

export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Profile form utilities
 */
export const ProfileFormUtils = {
  getFormData(): ProfileFormData {
    return {
      fullName: getInputValue('modalFullName'),
      position: getInputValue('modalPosition'),
      email: getInputValue('modalEmail'),
      phone: getInputValue('modalPhone'),
      location: getInputValue('modalLocation'),
      address: getTextareaValue('modalAddress'),
      twoFactorAuth: getCheckboxValue('modalTwoFactorAuth'),
      profileImage: getImageSrc('modalProfileImage')
    };
  },

  setFormData(data: Partial<ProfileFormData>): void {
    if (data.fullName) setInputValue('modalFullName', data.fullName);
    if (data.position) setInputValue('modalPosition', data.position);
    if (data.email) setInputValue('modalEmail', data.email);
    if (data.phone) setInputValue('modalPhone', data.phone);
    if (data.location) setInputValue('modalLocation', data.location);
    if (data.address) setTextareaValue('modalAddress', data.address);
    if (data.twoFactorAuth !== undefined) setCheckboxValue('modalTwoFactorAuth', data.twoFactorAuth);
    if (data.profileImage) setImageSrc('modalProfileImage', data.profileImage);
  },

  validateForm(data: ProfileFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!data.fullName.trim()) errors.push('Nama lengkap wajib diisi');
    if (!data.position.trim()) errors.push('Jabatan wajib diisi');
    if (!data.email.trim()) errors.push('Email wajib diisi');
    if (!data.phone.trim()) errors.push('Nomor telepon wajib diisi');
    
    if (data.email && !FormUtils.validateEmail(data.email)) {
      errors.push('Format email tidak valid');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};