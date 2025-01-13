import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [formData, setFormData] = useState({
    salutation: "mas",
    namaPengajar: "",
    hariTanggal: "",
    jadwal: [
      { kelas: "", mapel: "", jam: "", cabang: "YK-19" }, // Default satu jadwal
    ],
    jenis: "(REG)",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJadwalChange = (index, e) => {
    const newJadwal = [...formData.jadwal];
    newJadwal[index][e.target.name] = e.target.value;
    setFormData({ ...formData, jadwal: newJadwal });
  };

  const addJadwal = () => {
    setFormData({
      ...formData,
      jadwal: [...formData.jadwal, { kelas: "", mapel: "", jam: "", cabang: "YK-19" }],
      jenis: "(REG)",
    });
  };

  const removeJadwal = (index) => {
    const newJadwal = [...formData.jadwal];
    newJadwal.splice(index, 1);
    setFormData({ ...formData, jadwal: newJadwal });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      salutation: formData.salutation,
      namaPengajar: formData.namaPengajar,
      hariTanggal: formData.hariTanggal,
      jenis: formData.jenis,
      jadwal: formData.jadwal
        .map((j) => `- ${j.kelas}, mapel ${j.mapel} jam ${j.jam} cabang ${j.cabang}`)
        .join("\n"),
      jenis: formData.jenis,
    };

    emailjs
      .send(
        "service_kxgfz6k", // Ganti dengan Service ID Anda
        "template_tod47oj", // Ganti dengan Template ID Anda
        templateParams,
        "dlEiKdsR1o48OGlOZ" // Ganti dengan User ID Anda
      )
      .then(
        (response) => {
        toast.success('Email berhasil dikirim!', { position: "top-right", autoClose: 3000 });
          setFormData({
            salutation: "mas",
            namaPengajar: "",
            hariTanggal: "",
            jadwal: [{ kelas: "", mapel: "", jam: "", cabang: "YK-19" }],
            jenis: "(REG)",
          });
        },
        (error) => {
            toast.error(`Terjadi kesalahan: ${error.text}`, { position: "top-right", autoClose: 3000 });
        }
      );
  };

  return (
    <>
    

    <Navbar />
    <ToastContainer />
    <div className="h-screen overflow-y-hidden w-screen flex items-center justify-center bg-gradient-to-r from-teal-500 via-sky-500 to-purple-500 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-b from-white via-white/50 to-white/20 lg:p-8 mt-20 rounded-xl shadow-lg w-full max-w-6xl overflow-y-hidden"
      >
        <h1 className="text-2xl text-center font-bold mb-2 text-gray-800">
          Form Konfirmasi Pengajar✨
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* nama */}
        <div className="overflow-y-hidden px-2">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Salam</label>
          <select
            name="salutation"
            value={formData.salutation}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="mas">Mas</option>
            <option value="mbak">Mbak</option>
            <option value="pak">Pak</option>
            <option value="ibu">Ibu</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Nama Pengajar</label>
          <input
            type="text"
            name="namaPengajar"
            value={formData.namaPengajar}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nama Pengajar"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Hari dan Tanggal</label>
          <input
            type="text"
            name="hariTanggal"
            value={formData.hariTanggal}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: Rabu, 18 Desember 2024"
            required
          />
        </div>


        </div>
          {/* jadwal */}
        <div className="overflow-y-auto max-h-[calc(80vh-130px)] p-8">
        {formData.jadwal.map((jadwal, index) => (
          <div key={index} className="mb-6 bg-gray-50 p-6 border border-gray-300 rounded-lg shadow-md shadow-sky-400">
            <h2 className="text-gray-700 font-semibold mb-4">Jadwal {index + 1}</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Kelas</label>
              <input
                type="text"
                name="kelas"
                value={jadwal.kelas}
                onChange={(e) => handleJadwalChange(index, e)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: XI IPA 2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Mapel</label>
              <input
                type="text"
                name="mapel"
                value={jadwal.mapel}
                onChange={(e) => handleJadwalChange(index, e)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Matematika"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Jam Mengajar</label>
              <input
                type="text"
                name="jam"
                value={jadwal.jam}
                onChange={(e) => handleJadwalChange(index, e)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: 08:00 - 09:30"
                required
              />
            </div>

            {formData.jadwal.length > 1 && (
              <button
                type="button"
                onClick={() => removeJadwal(index)}
                className="text-red-600 text-sm mt-2"
              >
                Hapus Jadwal
              </button>
            )}
          </div>
        ))}

      </div>  
        <button
          type="button"
          onClick={addJadwal}
          className="w-full transition-all font-bold transform duration-300 hover:scale-95 bg-gray-200 text-gray-700 p-3 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Tambah Jadwal
        </button>

        <button
          type="submit"
          className="w-full transition-all font-bold transform duration-300 hover:scale-95 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Kirim Konfirmasi
        </button>
        </div>
      </form>
    </div>
</>
  );
}

export default Home;
