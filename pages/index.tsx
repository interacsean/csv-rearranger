import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout'
import Button from '../components/Button';
import Box from '../components/Box/Box';
import css from './index/index.module.scss';
import useUploadLogic from './index/index.logic';

export default function IndexPage() {
  const {
    isProcessing,
    isError,
    fileContents,
    handleFileUpload,
  } = useUploadLogic()

  const router = useRouter();
  const onNextClick = React.useCallback(() => router.push('/configure'), []);

  return (
    <Layout title="CSV re-arranger">
      <h1>Select a file</h1>
      <p className="mb-1-2">
        Select a CSV file to be re-arranged:
      </p>
      <p className="mt-1-2">(<a href="/sample.csv">Download a test csv file here</a>)</p>
      <Box mv={2}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={isProcessing}
        />
        {isError ? (
          <Box tagName="p" mt={1 / 3} className={css.errorText}>&times; Please check you have selected a valid CSV file</Box>
        ) : isProcessing ? (
          <p>Processing...</p>
        ) : !!fileContents && (
          <Box tagName="p" mt={1 / 3} className={css.successText}>&#10003; Successfully loaded sheet</Box>
        )}
      </Box>
      <Box mv={1}>
        <Button disabled={!fileContents || isError} onClick={onNextClick} full-width-mobile>
          Next
        </Button>
      </Box>
      <p className={css.securityMsg}>
        &#128274; Files are securely processed without ever leaving your browser
      </p>
    </Layout>
  );
}
