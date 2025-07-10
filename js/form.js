import { simpanData, updateData } from './data.js';
import { tampilkanData } from './tampil.js';
import { perbaruiRingkasan } from './ringkasan.js';

export function init() {
  const lokasiForm = document.getElementById("form-section");
  if (!lokasiForm) return;

  // Buat form-nya (gambar bangunan)
  lokasiForm.innerHTML = `
    <form id="formulir-transaksi">
      <select name="jenis" required>
        <option value="pemasukan">Pemasukan</option>
        <option value="pengeluaran">Pengeluaran</option>
      </select>
      <input type="number" name="jumlah" placeholder="Jumlah" required />
      <input type="text" name="keterangan" placeholder="Keterangan" required />
      <button type="submit">Simpan</button>
    </form>
  `;

  const form = document.getElementById("formulir-transaksi");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const jenis = form.jenis.value;
    const jumlah = parseFloat(form.jumlah.value);
    const keterangan = form.keterangan.value;

    if (!jenis || isNaN(jumlah) || !keterangan) {
      alert("Isi semua data dengan benar!");
      return;
    }

    const idEdit = form.dataset.editId;

    if (idEdit) {
      // Mode edit
      updateData(parseInt(idEdit), { jenis, jumlah, keterangan });
      delete form.dataset.editId;
    } else {
      // Mode tambah
      const transaksiBaru = {
        jenis,
        jumlah,
        keterangan,
        waktu: new Date().toISOString()
      };
      simpanData(transaksiBaru);
    }

    form.reset();
    tampilkanData();
    perbaruiRingkasan();
  });
}

// Fungsi bantu tukang tampil untuk kirim data ke sini saat tombol Edit diklik
export function isiFormUntukEdit(data) {
  const form = document.getElementById("formulir-transaksi");
  if (!form) return;

  form.jenis.value = data.jenis;
  form.jumlah.value = data.jumlah;
  form.keterangan.value = data.keterangan;
  form.dataset.editId = data.id;
}