import { ChangeEvent, useCallback, useState } from 'react';
import csvParse from 'csv-parse';

function isNestedArray(data: any): data is string[][] {
  return Array.isArray(data) &&
    data.length > 0 &&
    Array.isArray(data[0]) &&
    data[0].length > 0;
}

export default function useProcessFileUploadInput() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fileContents, setFileContents] = useState<string[][] | null>(null);

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
          csvParse(bstr, (err, csvData) => {
            if (err || !isNestedArray(csvData)) {
              setIsError(true);
              return;
            }
            setFileContents(csvData);
          });
        } else {
          console.warn('Unknown content type')
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
