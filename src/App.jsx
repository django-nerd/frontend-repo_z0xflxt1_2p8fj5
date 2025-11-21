import AuthForm from './components/AuthForm'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-5">
              <img src="/flame-icon.svg" alt="Flames" className="w-16 h-16 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Blood Bank Access</h1>
            <p className="text-blue-200 mt-2">Register or login to manage donations and requests</p>
          </div>

          <AuthForm />

          <p className="text-center text-blue-300/70 text-xs mt-6">By continuing you agree to our terms and privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default App
