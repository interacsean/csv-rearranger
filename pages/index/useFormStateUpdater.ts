import React from 'react';
import { useRecoilState } from 'recoil';
import { csvData } from '../../state/csvData';

export function useFormStateUpdater(fileContents: {}[] | null) {
  const { 1: setForm } = useRecoilState(csvData);

  React.useEffect(
    () => {
      if (fileContents) {
        setForm(fileContents);
      }
    },
    [fileContents],
  );
}
