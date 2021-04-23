import React from 'react';
import useResultsLogic from './results.logic';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import Box from '../../components/Box';
import css from './results.module.scss';

export default function ResultsPage() {
  const logic = useResultsLogic();

  return (
    <Layout title="Get your results - CSV re-arranger">
      <h1>Download re-arranged CSV</h1>
      <p>Click below to retrieve the new version of your CSV file.</p>
      <Box mt={3} flex>
        <Box className={css.buttonCtnr}>
          <Button outline onClick={logic.back} full-width>Back</Button>
        </Box>
        <Box ml={1} />
        <Box className={css.buttonCtnr}>
          <Button onClick={logic.getCSV} full-width>Download</Button>
        </Box>
      </Box>
    </Layout>
  )

}