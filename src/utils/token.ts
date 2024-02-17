import localforage from "localforage"


localforage.config({
    name: 'Ing-Web'
});

export async function getToken(key: string): Promise<unknown> {
  const value = await localforage.getItem(key);
  //console.log(value)
  return value;
}

export function setToken(key: string, value: string) {
  return localforage.setItem(key, value)
}

export function clearItemToken(key:string) {
  return localforage.removeItem(key)
}

export function clearToken() {
  return localforage.clear()
}
