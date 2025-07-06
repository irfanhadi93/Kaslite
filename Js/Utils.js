// Format angka ke format Rupiah
export function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
}

// Ambil tanggal hari ini dalam format YYYY-MM-DD
export function formatTanggalHariIni() {
  const now = new Date();
  return now.toISOString().split('T')[0]; // hasil: "2025-07-06"
}

// Buat ID unik sederhana
export function buatIdUnik() {
  return 'id-' + Math.random().toString(36).substr(2, 9);
}
