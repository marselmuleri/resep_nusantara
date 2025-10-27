// src/pages/ProfilePage.jsx
export default function ProfilePage() {
  const kelompok = {
    namaKelompok: "Kelompok 8",
    anggota: [
      { nim: "21120122140154", nama: "LOUIS DAVID VERGES TARIGAN" },
      { nim: "21120123140161", nama: "RABELVA EVAN LIGAR" },
      { nim: "21120123120009", nama: "MARSEL MULERI" },
      { nim: "21120123140124", nama: "ASROFI ANAM MAHENDRA" },
    ],
  };

  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Profil Kelompok Praktikum
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {kelompok.namaKelompok}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">NIM</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Nama</th>
              </tr>
            </thead>
            <tbody>
              {kelompok.anggota.map((anggota, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{anggota.nim}</td>
                  <td className="border border-gray-300 px-4 py-2">{anggota.nama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}