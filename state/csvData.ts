import { atom } from 'recoil';

export const csvDataState = atom<{ [k: string]: string | number }[]>({
  key: 'csvData',
  default: [],
});
