import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // 1. useLocation add kiya
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Feature from './pages/Feature';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Predict from './pages/Predict';
import Result from './pages/Result';
import AdminDashboard from './pages/AdminDashboard'; 
import './index.css';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// Navbar aur Footer ko control karne ke liye ek alag component
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  
  // Jis page par Navbar/Footer nahi dikhana uska path yahan likhein
  const isAdminPage = location.pathname === '/admin';

  return (
    <>
      {!isAdminPage && <Navbar />} 
      <main>
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </>
  );
};

const AppContent = () => {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/predict" element={
            <ProtectedRoute><Predict /></ProtectedRoute>
          } />
          <Route path="/result" element={
            <ProtectedRoute><Result /></ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;