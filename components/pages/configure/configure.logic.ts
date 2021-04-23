import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { headersState as headersState } from '../../../state/headers';
import { csvDataState as csvDataState } from '../../../state/csvData';

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
function sinkDisabled<T extends { enabled: boolean }>(a: T, b: T) {
  return a.enabled && !b.enabled ? -1
    : !a.enabled && b.enabled ? 1
    : 0;
}

export default function useConfigureLogic() {
  const [headers, setHeaderState] = useRecoilState(headersState);
  const [csvData] = useRecoilState(csvDataState);

  const router = useRouter();
  useEffect(
    function redirectToHomeOnEmptyForm() {
      if (csvData.length === 0) {
        router.replace('/');
      }
    },
    [csvData],
  );

  useEffect(
    function saveInitialHeaders() {
      setHeaderState(
        csvData && csvData[0] ? Object.keys(csvData[0]).map(
          name => ({ name, enabled: true }),
        ) : [],
      );
    },
    [csvData],
  );

  const onDragEnd = useCallback(
    (result) => {
      setHeaderState(reorder(
        headers,
        result.source.index,
        result.destination.index
      ).sort(sinkDisabled));
    },
    [headers, setHeaderState],
  );

  const toggleOption = useCallback(
    (header: typeof headers[0]) => {
      setHeaderState(headers.map(
        tHeader => tHeader.name !== header.name
          ? tHeader
          : {
            name: tHeader.name,
            enabled: !header.enabled,
          }
      ).sort(sinkDisabled));
    },
    [setHeaderState, headers],
  );

  const next = useCallback(
    () => router.push('/results'),
    [router],
  );
  const back = useCallback(
    () => router.replace('/'),
    [router],
  );

  return {
    headers,
    onDragEnd,
    toggleOption,
    next,
    back,
  }
}