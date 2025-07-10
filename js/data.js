const STORAGE_KEY = 'kasliteData';

export function simpanData(dataBaru) {
  const dataLama = ambilSemuaData();
  dataLama.push({
    ...dataBaru,
    id: Date.now() // kasih ID unik
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataLama));
}

export function ambilSemuaData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function updateData(id, dataBaru) {
  const semua = ambilSemuaData();
  const index = semua.findIndex(item => item.id === id);
  if (index !== -1) {
    semua[index] = { ...semua[index], ...dataBaru };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(semua));
  }
}

export function hapusData(id) {
  const semua = ambilSemuaData();
  const baru = semua.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(baru));
}