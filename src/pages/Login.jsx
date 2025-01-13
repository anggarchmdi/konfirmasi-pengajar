import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import guruImg from '../assets/Guru.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    // Data statis untuk verify login
    const staticUser = {
        username: 'neutron',
        password: 'neutronparis19',
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        if (username === staticUser.username && password === staticUser.password) {
            // login berhasil
            toast.success('Login berhasil!', { position: "top-right", autoClose: 3000 });
            localStorage.setItem('token', 'dummy-token');
            setTimeout(() => {
                setLoading(false); // Hentikan loading setelah 2 detik
                navigate('/');
            }, 1500);
        } else {
            // login gagal
            toast.error('Username atau password salah!', { position: "top-right", autoClose: 3000 });
            setError('username atau password salah!');
        }
    };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-70% via-sky-400'>

        <div className="flex justify-center rounded-xl shadow-md w-full max-w-3xl">
            <div className="grid lg:grid-cols-2">
                {/* form */}
            <div className="bg-sky-900/20 lg:bg-sky-900 p-6 z-20 w-full absolute md:relative rounded-bl-lg rounded-tl-xl">
            <h1 className='text-2xl font-bold mb-4 text-center text-white'>Login</h1>
            <form action="" onSubmit={handleLogin} className='space-y-4'>
                <div className="">
                <label htmlFor="username" className="block text-sm text-white font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded p-2 mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='masukkan username'
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded p-2 mt-1 mb-24"
              placeholder='masukkan password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full  bg-yellow-500 text-white py-2 px-4 rounded-xl hover:bg-yellow-600 transition-all transform hover:scale-95 duration-300"
          >
            Login
          </button>
        </form>
        </div>
    
    {/* gambar */}
      <div className="bg-sky-700 rounded-br-xl rounded-tr-xl flex justify-center items-center">
    <div className="absolute backdrop-filter backdrop-blur-xl w-96 h-96 z-10 rounded-r-xl"></div>
        <div className="absolute bg-sky-600 w-80 h-80 rounded-full"></div>
        <div className="absolute bg-sky-500 w-64 h-64 rounded-full"></div>
        <div className="absolute bg-sky-400 w-44 h-44 rounded-full"></div>
        <img src={guruImg} className='p-8 z-10' alt="" />
      </div>
      </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login