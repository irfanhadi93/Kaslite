import { ambilSemuaData } from './data.js';

export function init() {
  perbaruiRingkasan();
}

export function perbaruiRingkasan() {
  const semua = ambilSemuaData();

  const sekarang = new Date();
  const hariIni = sekarang.toISOString().slice(0, 10); // YYYY-MM-DD
  const bulanIni = sekarang.toISOString().slice(0, 7);  // YYYY-MM
  const tahunIni = sekarang.getFullYear();             // YYYY

  let total = {
    harian: { pemasukan: 0, pengeluaran: 0 },
    bulanan: { pemasukan: 0, pengeluaran: 0 },
    tahunan: { pemasukan: 0, pengeluaran: 0 }
  };

  semua.forEach(item => {
    const tgl = new Date(item.waktu);
    const ymd = tgl.toISOString().slice(0, 10);
    const ym = tgl.toISOString().slice(0, 7);
    const y = tgl.getFullYear();
    const nilai = item.jumlah;

    if (ymd === hariIni) total.harian[item.jenis] += nilai;
    if (ym === bulanIni) total.bulanan[item.jenis] += nilai;
    if (y === tahunIni) total.tahunan[item.jenis] += nilai;
  });

  // Tampilkan ke HTML
  tampilRingkasan("ringkasan-harian", "Hari Ini", total.harian);
  tampilRingkasan("ringkasan-bulanan", "Bulan Ini", total.bulanan);
  tampilRingkasan("ringkasan-tahunan", "Tahun Ini", total.tahunan);
}

function tampilRingkasan(id, label, data) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = `
    <h3>${label}</h3>
    <p>Pemasukan: <strong>Rp${data.pemasukan.toLocaleString()}</strong></p>
    <p>Pengeluaran: <strong>Rp${data.pengeluaran.toLocaleString()}</strong></p>
    <p><em>Selisih: Rp${(data.pemasukan - data.pengeluaran).toLocaleString()}</em></p>
  `;
}