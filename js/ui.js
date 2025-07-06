import {
  tambahPengeluaran,
  ambilSemuaPengeluaran,
  hapusPengeluaran,
  ubahPengeluaran
} from './data.js';

import {
  formatRupiah,
  formatTanggalHariIni
} from './utils.js';

export function initForm() {
  const formSection = document.getElementById('form-input');
  formSection.innerHTML = `
    <h2>Catat Pengeluaran</h2>
    <input type="text" id="nama" placeholder="Nama pengeluaran">
    <input type="number" id="jumlah" placeholder="Jumlah (Rp)">
    <button id="tombolSimpan">Simpan</button>
  `;

  const tombol = document.getElementById('tombolSimpan');

  tombol.addEventListener('click', () => {
    const nama = document.getElementById('nama').value.trim();
    const jumlah = parseInt(document.getElementById('jumlah').value);

    if (!nama || isNaN(jumlah) || jumlah <= 0) {
      alert('Isi nama dan jumlah dengan benar!');
      return;
    }

    const idEdit = tombol.dataset.editing;

    if (idEdit) {
      // Mode Edit
      ubahPengeluaran(idEdit, { nama, jumlah });
      tombol.textContent = 'Simpan';
      delete tombol.dataset.editing;
    } else {
      // Mode Tambah
      tambahPengeluaran({
        nama,
        jumlah,
        tanggal: formatTanggalHariIni()
      });
    }

    // Reset input
    document.getElementById('nama').value = '';
    document.getElementById('jumlah').value = '';

    tampilkanDaftar();
    tampilkanTotal();
  });
}

export function tampilkanDaftar() {
  const data = ambilSemuaPengeluaran();
  const riwayat = document.getElementById('riwayat-pengeluaran');
  riwayat.innerHTML = '<h2>Riwayat Pengeluaran</h2>';

  if (data.length === 0) {
    riwayat.innerHTML += '<p>Belum ada pengeluaran.</p>';
    return;
  }

  const list = document.createElement('ul');
  data.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nama} - ${formatRupiah(item.jumlah)} (${item.tanggal})
      <button class="edit" data-id="${item.id}">Edit</button>
      <button class="hapus" data-id="${item.id}">Hapus</button>
    `;
    list.appendChild(li);
  });

  riwayat.appendChild(list);

  // Event Hapus
  document.querySelectorAll('.hapus').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      hapusPengeluaran(id);
      tampilkanDaftar();
      tampilkanTotal();
    });
  });

  // Event Edit
  document.querySelectorAll('.edit').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const item = ambilSemuaPengeluaran().find(p => p.id === id);
      if (!item) return;

      document.getElementById('nama').value = item.nama;
      document.getElementById('jumlah').value = item.jumlah;

      const tombol = document.getElementById('tombolSimpan');
      tombol.textContent = 'Update';
      tombol.dataset.editing = id;
    });
  });
}

export function tampilkanTotal() {
  const data = ambilSemuaPengeluaran();
  const total = data.reduce((acc, item) => acc + item.jumlah, 0);
  document.getElementById('total').textContent = formatRupiah(total);
}