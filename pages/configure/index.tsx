import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout/Layout'
import useConfigureLogic from './configure.logic';

export default function ConfigurePage() {
  const { csvData } = useConfigureLogic();

  return (
    <Layout title="Sample processor">
      <Link href={'/'}>
        <a>&lt; Back</a>
      </Link>
      <h1>Configure data</h1>
      <p>
        Select the fields you would like to use.
      </p>
      {csvData}
    </Layout>
  );
}
