import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Cek apakah token atau status login tersedia
  const isAuthenticated = localStorage.getItem('token'); // Sesuaikan dengan mekanisme autentikasi Anda

  // Jika tidak autentikasi, arahkan ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Jika autentikasi berhasil, render child komponen
  return children;
};

export default ProtectedRoute;
