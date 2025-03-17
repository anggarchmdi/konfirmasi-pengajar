import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

function Home() {
  const [formData, setFormData] = useState({
    salutation: "mas",
    namaPengajar: "",
    namaPengirim: "",
    hariTanggal: "",
    nomorTujuan: "", // Tambahkan nomor tujuan di state
    jadwal: [
      { kelas: "", mapel: "", jam: "", cabang: "YK-19" }, // Default satu jadwal
    ],
    program: "",
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
      program: "(REG)",
    });
  };

  const removeJadwal = (index) => {
    const newJadwal = [...formData.jadwal];
    newJadwal.splice(index, 1);
    setFormData({ ...formData, jadwal: newJadwal });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format pesan WhatsApp
    const message = `Assalamualaikum ${formData.salutation} ${formData.namaPengajar},\n` +
    `Mohon maaf mengganggu waktunya, saya ${formData.namaPengirim} dari Neutron YK-19.\n\n` +
    `Mau konfirmasi jadwal mengajar:\n` +
    `*${formData.hariTanggal}*\n\n` +
    `${formData.jadwal.map((j) => 
      `- *${j.kelas}*,\n Mapel: ${j.mapel},\n Jam: ${j.jam} wib,\n di Cabang: ${j.cabang}\n` +
      `(${formData.program})\n`
    ).join("\n")}\n` +
    `Mohon di _cross-check_ kembali apabila jadwal tidak sesuai seperti biasanya atau bertabrakan dengan cabang yang lain.\n\n` +
    `Di tunggu konfirmasinya.\nMatur nuwun.`;

    // Nomor WhatsApp tujuan dari input pengguna
    const waNumber = formData.nomorTujuan;

    if (!waNumber) {
      toast.error("Nomor tujuan tidak boleh kosong!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Redirect ke WhatsApp
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");

    toast.success("Pesan berhasil dikirim ke WhatsApp!", {
      position: "top-right",
      autoClose: 3000,
    });

    // Reset form setelah submit
    setFormData({
      salutation: "mas",
      namaPengajar: "",
      namaPengirim: "",
      hariTanggal: "",
      nomorTujuan: "", // Reset nomor tujuan juga
      jadwal: [{ kelas: "", mapel: "", jam: "", cabang: "YK-19" }],
      program: "",
    });
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="h-screen overflow-y-hidden w-screen flex items-center justify-center bg-gradient-to-r from-teal-500 via-sky-500 to-purple-500 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-b from-white via-white/50 to-white/20 lg:p-8 mt-10 rounded-xl shadow-lg w-full max-w-6xl overflow-y-hidden"
        >
          <h1 className="text-2xl text-center font-bold mb-2 text-gray-800">
            Form Konfirmasi Pengajar✨
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                <label className="block text-gray-700 font-medium">Nama Pengirim</label>
                <input
                  type="text"
                  name="namaPengirim"
                  value={formData.namaPengirim}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nama Pengirim"
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

              <div className="mb-6">
                <label className="block text-gray-700 font-medium">Nomor Tujuan</label>
                <input
                  type="text"
                  name="nomorTujuan"
                  value={formData.nomorTujuan}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: 6281234567890"
                  required
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(80vh-80px)] p-8">
              {formData.jadwal.map((jadwal, index) => (
                <div
                  key={index}
                  className="mb-6 bg-gray-50 p-6 border border-gray-300 rounded-lg shadow-md shadow-sky-400"
                >
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


                  <div className="mb-4">
                    <label className="block text-gray-700">Program</label>
                    <input
                      type="text"
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="REG / PIKPU / TAMBAHAN / KUPAS TUNTAS"
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
          </div>
          <div className="flex gap-4 ">



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
      <Footer />
    </>
  );
}

export default Home;
