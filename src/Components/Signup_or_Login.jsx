import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/useAuth'
import { validateEmail, validatePassword, validateName } from '../utils/authValidation'

const initialErrors = () => ({
  name: '',
  email: '',
  password: '',
  form: '',
})

const Signup_or_Login = () => {
  const { login, signup, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState(initialErrors)

  useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true })
  }, [isLoggedIn, navigate])

  const clearFieldError = (key) => {
    setErrors((prev) => ({ ...prev, [key]: '', form: '' }))
  }

  const switchMode = () => {
    setIsLogin((v) => !v)
    setName('')
    setEmail('')
    setPassword('')
    setErrors(initialErrors())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = initialErrors()
    let hasError = false

    const emailErr = validateEmail(email)
    if (emailErr) {
      next.email = emailErr
      hasError = true
    }

    const passOpts = { strict: !isLogin }
    const passErr = validatePassword(password, passOpts)
    if (passErr) {
      next.password = passErr
      hasError = true
    }

    if (!isLogin) {
      const nameErr = validateName(name)
      if (nameErr) {
        next.name = nameErr
        hasError = true
      }
    }

    if (hasError) {
      setErrors(next)
      return
    }

    if (isLogin) {
      const result = login(email, password)
      if (!result.ok) {
        setErrors({ ...initialErrors(), form: result.message })
        return
      }
    } else {
      const result = signup(name, email, password)
      if (!result.ok) {
        setErrors({ ...initialErrors(), form: result.message })
        return
      }
    }

    navigate('/', { replace: true })
  }

  return (
    <div className="auth-page">
      <div className="auth-page__inner">
        <Link to="/" className="auth-page__back" aria-label="Back to menu">
          ← Menu
        </Link>

        <div className="auth-card">
          <div className="auth-card__brand">☕</div>
          <h1 className="auth-card__title">{isLogin ? 'Welcome back' : 'Create account'}</h1>
          <p className="auth-card__subtitle">
            {isLogin
              ? 'Sign in with your email. We keep you signed in on this device.'
              : 'Join Brew — passwords must be 8–64 characters with a letter and a number.'}
          </p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {!isLogin && (
              <label className="auth-field">
                <span className="auth-field__label">Full name</span>
                <input
                  type="text"
                  name="name"
                  className={`auth-input ${errors.name ? 'auth-input--error' : ''}`}
                  placeholder="Alex Bean"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    clearFieldError('name')
                  }}
                  autoComplete="name"
                />
                {errors.name && <span className="auth-field__error">{errors.name}</span>}
              </label>
            )}

            <label className="auth-field">
              <span className="auth-field__label">Email</span>
              <input
                type="email"
                name="email"
                className={`auth-input ${errors.email ? 'auth-input--error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearFieldError('email')
                }}
                autoComplete="email"
                inputMode="email"
              />
              {errors.email && <span className="auth-field__error">{errors.email}</span>}
            </label>

            <label className="auth-field">
              <span className="auth-field__label">Password</span>
              <div className="auth-password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={`auth-input auth-input--with-toggle ${errors.password ? 'auth-input--error' : ''}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    clearFieldError('password')
                  }}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="auth-field__hint">
                {isLogin
                  ? '8–64 characters.'
                  : '8–64 characters, at least one letter and one number.'}
              </p>
              {errors.password && <span className="auth-field__error">{errors.password}</span>}
            </label>

            {errors.form && (
              <div className="auth-form__banner" role="alert">
                {errors.form}
              </div>
            )}

            <button type="submit" className="auth-submit">
              {isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="auth-switch">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button type="button" className="auth-switch__btn" onClick={switchMode}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <p className="auth-legal">
            Accounts are stored in this browser (localStorage) for demo purposes. Use a test email and password.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup_or_Login
