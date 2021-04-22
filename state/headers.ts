import { atom } from 'recoil';

export const headers = atom({
  key: 'headers',
  default: [] as { name: string, enabled: boolean }[],
});
