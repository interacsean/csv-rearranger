import React from 'react';
import { useRecoilState } from 'recoil';
import { formState } from '../../state/formState';

export function useFormStateUpdater(fileContents: string[][] | null) {
  const { 1: setForm } = useRecoilState(formState);

  React.useEffect(
    () => {
      if (fileContents) {
        setForm((curVal) => ({ ...curVal, csvData: fileContents }));
      }
    },
    [fileContents],
  );
}
