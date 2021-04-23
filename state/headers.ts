import { atom } from 'recoil';

export type Header = { name: string, enabled: boolean };

export const headers = atom<Header[]>({
  key: 'headers',
  default: [],
});
