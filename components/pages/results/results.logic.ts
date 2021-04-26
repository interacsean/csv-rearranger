import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { headersState } from '../../../state/headers';
import { csvDataState } from '../../../state/csvData';
import { useRouter } from 'next/router';
import download from '../../../utils/Html/downloadClientFile';
import { makeCsvFileContent } from '../../../utils/Html/makeCsvFileContent';
import { fileNameState } from '../../../state/fileName';

export default function useResultsLogic() {
  const router = useRouter();

  const [ headers ] = useRecoilState(headersState);
  const [ fileName ] = useRecoilState(fileNameState);
  const [ csvData ] = useRecoilState(csvDataState);
  const enabledHeaders = useMemo(() => headers.filter(h => h.enabled).map(h => h.name), [headers]);

  const newCsv = useMemo(
    () => {
      return csvData.map(
        csvRow => Object.fromEntries(
          enabledHeaders.map(header => [header, csvRow[header]]),
        ),
      );
    },
    [enabledHeaders, csvData],
  );

  const getCSV = useCallback(() => {
    download(fileName.replace('.csv', ' (re-arranged).csv'), makeCsvFileContent(enabledHeaders, newCsv));
  }, [fileName, enabledHeaders, newCsv])

  const back = useCallback(
    () => router.replace('/configure'),
    [router],
  );

  return {
    getCSV,
    back,
  }
}
