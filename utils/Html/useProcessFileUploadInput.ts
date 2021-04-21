import { ChangeEvent, useCallback, useState } from 'react';

type ReturnTriple = [
  boolean,
  string | null,
  (e: ChangeEvent<HTMLInputElement>) => void,
];

const useProcessFileUploadInput = (): ReturnTriple => {
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ fileContents, setFileContents ] = useState<string | null>(null);

  const handleFileUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      const reader = new FileReader();
      reader.onloadstart = () => {
        setIsProcessing(true);
      }
      reader.onload = (evt) => {
        setIsProcessing(false);
        const bstr = evt.target?.result;
        if (typeof bstr === 'string') {
          setFileContents(bstr);
        } else {
          console.warn('Unknown content type')
        }
      };
      reader.onerror = () => {
        setIsProcessing(false);
      }
      if (file) {
        reader.readAsBinaryString(file);
      }
    },
    [setFileContents, setIsProcessing]
  )

  return [
    isProcessing,
    fileContents,
    handleFileUpload,
  ]
}

export default useProcessFileUploadInput;
