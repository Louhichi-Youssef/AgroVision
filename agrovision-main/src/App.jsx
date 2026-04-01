import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Hero from "./components/Hero"
import Documentation from "./pages/Documentation"
import Contact from "./pages/Contact"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Welcome from "./pages/Welcome"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"

import Testimonials from "./components/Testimonials"
import AboutUs from "./components/AboutUs"
import DownloadApp from "./components/DownloadApp"
import AgroBot from "./pages/AgroBot"
import Weather from "./pages/Weather"
import Marketplace from "./pages/Marketplace"
import PlantScanner from "./pages/PlantScanner"
import Profile from "./pages/Profile"
import AuthGateway from "./pages/AuthGateway"
import AdminDashboard from "./pages/AdminDashboard"
import { LanguageProvider } from "./context/LanguageContext"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"

export default function App() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

  useEffect(() => {
    // Seed admin user automatically for testing
    const seedAdmin = async () => {
      try {
        // Seed default admin
        await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: 'Administrator',
            email: 'admin',
            password: 'admin',
            role: 'admin'
          })
        });

        // Seed Youssef's admin account
        await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: 'youssefAdmin',
            email: 'youssef@admin.com',
            password: 'admin', // Mot de passe par défaut
            role: 'admin'
          })
        });
      } catch (e) { }
    };
    seedAdmin();
  }, [API_BASE_URL]);

  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />

          <Routes>
            {/* Auth pages without Header */}
            <Route path="/auth" element={<AuthGateway />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Main pages with Header and background */}
            <Route path="/*" element={
              <div className="relative overflow-hidden">
                {/* Background Gradient */}
                <img className="absolute top-0 right-0 opacity-60 -z-10"
                  src="/gradient.png" alt="Gradient" />
                <div className="h-0 w-[40rem] absolute top-[20%]
                right-[-5%] shadow-[0_0_900px_40px_#4CAF50]
                -rotate-[30deg] -z-10"></div>

                <Header />

                <Routes>
                  <Route path="/" element={<><Hero /><AboutUs /><DownloadApp /><Testimonials /><Footer /></>} />
                  <Route path="/documentation" element={<Documentation />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/meteo" element={<Weather />} />

                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/scanner" element={<PlantScanner />} />
                  <Route path="/profile" element={<Profile />} />
                  {/* Added /:id to AgroBot route to support chat persistence on refresh */}
                  <Route path="/AgroBot" element={<AgroBot />} />
                  <Route path="/AgroBot/:id" element={<AgroBot />} />
                </Routes>
              </div>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}