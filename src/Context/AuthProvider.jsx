import { useState, useEffect, useCallback, useMemo } from 'react'
import { AuthContext } from './AuthContext'
import {
  registerUser,
  verifyLogin,
  loadSession,
  persistSession,
  clearSession,
  normalizeEmail,
} from '../utils/authStorage'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = loadSession()
    if (session) setUser(session)
  }, [])

  const login = useCallback((email, password) => {
    const result = verifyLogin(email, password)
    if (!result.ok) return result
    const session = { email: result.user.email, name: result.user.name }
    persistSession(session)
    setUser(session)
    return { ok: true }
  }, [])

  const signup = useCallback((name, email, password) => {
    const result = registerUser({ name, email, password })
    if (!result.ok) return result
    const session = { email: normalizeEmail(email), name: name.trim() }
    persistSession(session)
    setUser(session)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, login, signup, logout, isLoggedIn: !!user }),
    [user, login, signup, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
