export class LocalStorage {
  key;

  constructor(key) {
    this.key = key;
  }

  getData() {
    if (localStorage.getItem(this.key) != null) {
      return JSON.parse(localStorage.getItem(this.key));
    }
    return [];
  }

  setData(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
