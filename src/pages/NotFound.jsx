import React from 'react';
import { Link } from 'react-router-dom';
import lucuImg from '../assets/lucu.jpg'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white p-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold tracking-tight mb-4 animate-pulse">404</h1>
        <p className="text-2xl md:text-3xl font-medium mb-8">
          Oops! Halaman yang Anda cari tidak ditemukan.
        </p>
        <div className="mb-8">
          <img
            src={lucuImg}
            alt="Lost astronaut"
            className="w-64 mx-auto rounded-lg shadow-xl"
          />
        </div>
        <Link
          to="/"
          className="transition-all transform duration-300 hover:scale-105 bg-white text-purple-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
