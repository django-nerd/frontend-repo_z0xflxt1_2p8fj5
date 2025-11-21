import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function AuthForm() {
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    blood_group: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register'
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          mode === 'login'
            ? { email: form.email, password: form.password }
            : {
                name: form.name,
                email: form.email,
                password: form.password,
                phone: form.phone,
                city: form.city,
                blood_group: form.blood_group,
              }
        ),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Something went wrong')

      setUser(data.user)
      setMessage(data.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setError('')
    setMessage('')
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 backdrop-blur shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-semibold">
            {mode === 'login' ? 'Login to Blood Bank' : 'Create your account'}
          </h2>
          <button
            onClick={switchMode}
            className="text-sm text-blue-300 hover:text-blue-200"
          >
            {mode === 'login' ? 'Need an account?' : 'Have an account?'}
          </button>
        </div>

        {user ? (
          <div className="text-blue-100">
            <p className="mb-2">{message}</p>
            <div className="text-sm opacity-80">
              <div>Name: {user.name}</div>
              <div>Email: {user.email}</div>
              {user.city && <div>City: {user.city}</div>}
              {user.blood_group && <div>Blood Group: {user.blood_group}</div>}
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-blue-200 text-sm mb-1">Full name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-blue-200 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-blue-200 text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            {mode === 'register' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-blue-200 text-sm mb-1">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 text-sm mb-1">City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="New York"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-blue-200 text-sm mb-1">Blood Group</label>
                  <select
                    name="blood_group"
                    value={form.blood_group}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}
            {message && (
              <div className="text-green-400 text-sm">{message}</div>
            )}

            <button
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition disabled:opacity-70"
            >
              {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create account'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
