import { parseJsonString } from "./common-utils";

export enum LocalStorageKeys {
  AUTHENTICATED_USER = "pb_user",
  META = "meta",
}
export const persistToLocalStorage = <T>(key: LocalStorageKeys, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = <T>(key: LocalStorageKeys) => {
  const dataFromStorage = localStorage.getItem(key);
  if (!dataFromStorage) {
    return null;
  }
  return parseJsonString<T>(dataFromStorage);
};

export const removeFromLocalStorage = (key: LocalStorageKeys) => {
  localStorage.removeItem(key);
};
