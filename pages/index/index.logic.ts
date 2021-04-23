import { ChangeEvent, useCallback, useState } from 'react';
import csvParse from 'csv-parse';
import { useRecoilState } from 'recoil';
import mapCsvDataTableHeaders from '../../utils/Data/mapCsvDataTableHeaders';
import { csvDataState } from '../../state/csvData';
import { fileNameState } from '../../state/fileName';

function isNestedArray(data: any): data is any[][] {
  return Array.isArray(data) &&
    data.length > 0 &&
    data.every(ele => Array.isArray(ele) && ele.length > 0);
}

export default function useUploadLogic() {
  const [ fileContents, setCsvDataState ] = useRecoilState(csvDataState);
  const { 1: setFileNameState } = useRecoilState(fileNameState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleFileUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file !== undefined) {
        const reader = new FileReader();
        reader.onloadstart = () => {
          setIsProcessing(true);
          setIsError(false);
        }
        reader.onload = (evt) => {
          setIsProcessing(false);
          const bstr = evt.target?.result;
          if (typeof bstr === 'string') {
            csvParse(bstr, (err, csvDataTable) => {
              if (err || !isNestedArray(csvDataTable)) {
                setIsError(true);
                return;
              }
              const csvData = mapCsvDataTableHeaders(csvDataTable);
              if (!csvData) {
                setIsError(true);
                return;
              }
              setFileNameState('file');
              setCsvDataState(csvData);
              setFileNameState(file?.name || 'file.csv')
            });
          } else {
            console.warn('Unknown content type');
            setIsError(true);
          }
        };
        reader.onerror = () => {
          setIsProcessing(false);
          setIsError(true);
        }
        reader.readAsBinaryString(file);
      }
    },
    [setCsvDataState, setFileNameState, setIsProcessing],
  )

  return {
    isProcessing,
    isError,
    fileContents,
    handleFileUpload,
  }
}
