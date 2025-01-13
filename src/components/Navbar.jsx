import React, {useState} from 'react'
import logoImg from '../assets/Logo.png';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoading(true);
        toast.error('Logout berhasil!', { position: "top-right", autoClose: 3000 });
        setTimeout(() => {
            setLoading(false); // Hentikan loading setelah 2 detik
            navigate('/login');
        }, 1500);
      };

  return (
    <div className='w-full h-12 bg-white shadow-md top-0 fixed z-10 flex justify-between items-center px-4'>
        <div className="flex items-center gap-x-2">
        <img src={logoImg} className='w-8' alt="" />
        <h1 className='font-bold text-lg'>Konfirmasi Pengajar</h1>
        </div>
        <div className="flex">
        <button title='Log Out?' className='bg-red-500 text-white font-bold text-2xl px-3 flex items-center py-1 rounded-xl justify-center transition-all transform hover:scale-95 duration-300' onClick={handleLogout}><span className='font-normal text-lg mr-2'>Logout</span><ion-icon name="log-out-outline"></ion-icon></button>
        </div>
    </div>
  )
}

export default Navbar