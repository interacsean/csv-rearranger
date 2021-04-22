import { useRecoilState } from 'recoil';
import { headers as headersState } from '../../state/headers';
import { csvData as csvDataState } from '../../state/csvData';
import { useRouter } from 'next/router';
import React from 'react';

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default function useConfigureLogic() {
  const [headers, setHeaderState] = useRecoilState(headersState);
  const [csvData] = useRecoilState(csvDataState);

  const router = useRouter();
  React.useEffect(
    function redirectToHomeOnEmptyForm() {
      if (csvData.length === 0) {
        router.replace('/');
      }
    },
    [csvData],
  );

  React.useEffect(
    function saveInitialHeaders() {
      if (!headers.length) {
        setHeaderState(
          csvData && csvData[0] ? Object.keys(csvData[0]).map(
            name => ({ name, enabled: true }),
          ) : [],
        );
      }
    },
    [!headers.length && csvData.length],
  );

  const onDragEnd = React.useCallback(
    (result) => {
      setHeaderState(reorder(
        headers,
        result.source.index,
        result.destination.index
      ))
    },
    [headers],
  );

  return {
    headers,
    onDragEnd,
  }
}