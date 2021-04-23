import {
  atom,
} from 'recoil';

export const formState = atom({
  key: 'formState',
  default: {
    csvData: [] as string[][],
  },
});
