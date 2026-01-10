import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Auth
import { AuthProvider } from './contexts/AuthContext'
import { WebSocketProvider } from './contexts/WebSocketContext'
import SignIn from './pages/SignIn'

// Layout
import Layout from './components/Layout'

// Pages
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Funds from './pages/Funds'
import TradingRules from './pages/TradingRules'
import Reports from './pages/Reports'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import ConnectionTest from './components/ConnectionTest'

function App() {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/signin" element={<SignIn />} />

            {/* Protected Routes */}
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="clients" element={<Clients />} />
              <Route path="funds" element={<Funds />} />
              <Route path="trading-rules" element={<TradingRules />} />
              <Route path="reports" element={<Reports />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
              <Route path="connection-test" element={<ConnectionTest />} />
            </Route>

            {/* Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </WebSocketProvider>
    </AuthProvider>
  )
}

export default App
