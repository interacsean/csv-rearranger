import { ChangeEvent, useCallback, useState } from 'react';
import csvParse from 'csv-parse';
import mapCsvDataTableHeaders from '../../utils/Data/mapCsvDataTableHeaders';

function isNestedArray(data: any): data is any[][] {
  return Array.isArray(data) &&
    data.length > 0 &&
    data.every(ele => Array.isArray(ele) && ele.length > 0);
}

export default function useProcessFileUploadInput() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fileContents, setFileContents] = useState<{}[] | null>(null);

  const handleFileUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
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
            setFileContents(csvData);
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
      if (file !== undefined) {
        reader.readAsBinaryString(file);
      }
    },
    [setFileContents, setIsProcessing],
  )

  return {
    isProcessing,
    isError,
    fileContents,
    handleFileUpload,
  }
}
