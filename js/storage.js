const STORAGE_KEY = 'kaslite_data';

export function simpanData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function ambilData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}