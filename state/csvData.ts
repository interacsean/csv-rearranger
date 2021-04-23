import { atom } from 'recoil';

export const csvData = atom<{}[]>({
  key: 'formState',
  default: [],
});
