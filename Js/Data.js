import { simpanData, ambilData } from './storage.js';
import { buatIdUnik } from './utils.js';

let daftarPengeluaran = ambilData(); // Ambil dari localStorage saat pertama kali

export function tambahPengeluaran(item) {
  const pengeluaranBaru = {
    id: buatIdUnik(),
    nama: item.nama,
    jumlah: item.jumlah,
    tanggal: item.tanggal
  };

  daftarPengeluaran.push(pengeluaranBaru);
  simpanData(daftarPengeluaran);
}

export function ambilSemuaPengeluaran() {
  return daftarPengeluaran;
}

export function hapusPengeluaran(id) {
  daftarPengeluaran = daftarPengeluaran.filter(item => item.id !== id);
  simpanData(daftarPengeluaran);
}

export function ubahPengeluaran(id, dataBaru) {
  const index = daftarPengeluaran.findIndex(item => item.id === id);
  if (index !== -1) {
    daftarPengeluaran[index].nama = dataBaru.nama;
    daftarPengeluaran[index].jumlah = dataBaru.jumlah;
    simpanData(daftarPengeluaran);
  }
}
