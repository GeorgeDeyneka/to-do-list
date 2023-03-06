export class LocalStorage {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  getData() {
    if (localStorage.getItem(this.key) != null) {
      return JSON.parse(localStorage.getItem(this.key)!);
    }
    return [];
  }

  setData(data: any) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
