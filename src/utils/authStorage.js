const USERS_KEY = 'brew-app-users'
const SESSION_KEY = 'brew-app-session'

export const normalizeEmail = (email) => email.trim().toLowerCase()

export const loadUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const findUserByEmail = (email) => {
  const e = normalizeEmail(email)
  return loadUsers().find((u) => u.email === e) ?? null
}

export const registerUser = ({ name, email, password }) => {
  const users = loadUsers()
  const e = normalizeEmail(email)
  if (users.some((u) => u.email === e)) {
    return { ok: false, message: 'This email is already registered.' }
  }
  users.push({
    email: e,
    name: name.trim(),
    password,
  })
  saveUsers(users)
  return { ok: true }
}

export const verifyLogin = (email, password) => {
  const user = findUserByEmail(email)
  if (!user || user.password !== password) {
    return { ok: false, message: 'Invalid email or password.' }
  }
  return { ok: true, user: { email: user.email, name: user.name } }
}

export const loadSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const s = JSON.parse(raw)
    if (s && typeof s.email === 'string' && typeof s.name === 'string') {
      return { email: s.email, name: s.name }
    }
    return null
  } catch {
    return null
  }
}

export const persistSession = (session) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY)
}
