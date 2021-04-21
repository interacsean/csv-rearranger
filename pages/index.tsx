import React from 'react';
import { useRecoilState } from 'recoil';

import Layout from '../components/Layout/Layout'
import useProcessFileUploadInput from '../utils/Html/useProcessFileUploadInput';
import Button from '../components/Button/Button';
import Box from '../components/Box/Box';
import { formState } from '../state/formState';

import css from './index.module.scss';
import { useRouter } from 'next/router';

const useFormStateUpdater = (fileContents: string | null) => {
  const { 1: setForm } = useRecoilState(formState);

  React.useEffect(
    () => {
      if (fileContents) {
        console.log('setting file conents')
        setForm((curVal) => ({ ...curVal, csv: fileContents }));
      }
    },
    [fileContents],
  );
}

const IndexPage = () => {
  const [isFileProcessing, fileContents, handleFileUpload] = useProcessFileUploadInput()
  useFormStateUpdater(fileContents);

  const router = useRouter();
  const onNextClick = React.useCallback(() => router.push('/configure'), []);

  return (
    <Layout title="Sample processor">
      <h1>File upload</h1>
      <p className="mb-1-2">
        Select a CSV/TSV file to upload:
      </p>
      <p className="mt-1-2">(<a href="/sample.csv">Download a test csv file here</a>)</p>
      <Box mv={2}>
        <input
          type="file"
          accept=".csv,.tsv"
          onChange={handleFileUpload}
          disabled={isFileProcessing}
        />
        {isFileProcessing ? (
          <p>Processing...</p>
        ) : !!fileContents && (
          <Box tagName="p" mt={1 / 3} className={css.successText}>&#10003; Successfully loaded sheet</Box>
        )}
      </Box>
      <Box mv={1}>
        <Button disabled={!fileContents} onClick={onNextClick}>Next</Button>
      </Box>
      <p className={css.securityMsg}>&#128274; Your file will be securely processed on your browser</p>
    </Layout>
  );
}

export default IndexPage
