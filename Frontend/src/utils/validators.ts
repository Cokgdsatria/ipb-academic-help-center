// ============================================================
// ✅ VALIDATORS - Input Validation Functions
// ============================================================

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push('Password minimal 6 karakter');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateNIM = (nim: string): boolean => {
  // Format: XXX.XXX.XXX (9 digit)
  const nimRegex = /^\d{3}\.\d{3}\.\d{3}$/;
  return nimRegex.test(nim);
};

export const validateForm = (
  data: Record<string, any>
): {
  valid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};

  // Check required fields
  Object.entries(data).forEach(([key, value]) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors[key] = `${key} tidak boleh kosong`;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
