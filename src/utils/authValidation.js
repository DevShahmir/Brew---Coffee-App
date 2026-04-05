export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value) {
  const v = value.trim()
  if (!v) return 'Email is required.'
  if (!EMAIL_REGEX.test(v)) {
    return 'Enter a valid email (include @ and a domain, e.g. you@email.com).'
  }
  return null
}

export function validatePassword(value, { strict = false } = {}) {
  if (!value) return 'Password is required.'
  if (value.length < 8) return 'Use at least 8 characters.'
  if (value.length > 64) return 'Use at most 64 characters.'
  if (strict) {
    if (!/[a-zA-Z]/.test(value)) return 'Include at least one letter.'
    if (!/[0-9]/.test(value)) return 'Include at least one number.'
  }
  return null
}

export function validateName(value) {
  const v = value.trim()
  if (!v) return 'Name is required.'
  if (v.length < 2) return 'Use at least 2 characters.'
  if (v.length > 80) return 'Name is too long.'
  return null
}
