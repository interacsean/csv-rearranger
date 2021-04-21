import Link from 'next/link';
import React from 'react';
import { useRecoilState } from 'recoil';

import Layout from '../components/Layout/Layout'
import { formState } from '../state/formState';

import css from './index.module.scss';

const IndexPage = () => {
  const [ form ] = useRecoilState(formState);

  return (
    <Layout title="Sample processor">
      <Link href={'/'}>
        <a>&lt; Back</a>
      </Link>
      <h1>Configure data</h1>
      <p>
        Select the fields you would like to use.
      </p>
      {form.csv}
    </Layout>
  );
}

export default IndexPage
