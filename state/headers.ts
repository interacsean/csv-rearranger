import { atom } from 'recoil';

export type HeaderConfig = { name: string, enabled: boolean };

export const headersState = atom<HeaderConfig[]>({
  key: 'headers',
  default: [],
});
