import { ambilSemuaData, hapusData } from './data.js';
import { isiFormUntukEdit } from './form.js';

export function init() {
  tampilkanData();
}

export function tampilkanData() {
  const daftar = document.getElementById("daftar-transaksi");
  if (!daftar) return;

  const semua = ambilSemuaData();
  daftar.innerHTML = "";

  if (semua.length === 0) {
    daftar.innerHTML = "<li>Belum ada transaksi.</li>";
    return;
  }

  semua.forEach(item => {
    const li = document.createElement("li");
    li.className = item.jenis === "pemasukan" ? "masuk" : "keluar";

    li.innerHTML = `
      <strong>${item.keterangan}</strong><br/>
      Rp${item.jumlah.toLocaleString()} - ${item.jenis}<br/>
      <small>${new Date(item.waktu).toLocaleDateString()}</small>
      <div class="opsi">
        <button data-id="${item.id}" class="edit">Edit</button>
        <button data-id="${item.id}" class="hapus">Hapus</button>
      </div>
    `;

    daftar.appendChild(li);
  });

  // Event listener untuk tombol Edit dan Hapus
  daftar.querySelectorAll(".edit").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const data = ambilSemuaData().find(d => d.id === id);
      if (data) isiFormUntukEdit(data);
    });
  });

  daftar.querySelectorAll(".hapus").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      if (confirm("Yakin hapus transaksi ini?")) {
        hapusData(id);
        tampilkanData();
      }
    });
  });
}