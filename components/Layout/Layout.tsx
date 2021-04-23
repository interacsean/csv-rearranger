import React, { ReactNode } from 'react'
import Head from 'next/head'
import Box from '../Box/Box';

import css from './Layout.module.scss';
import Card from '../Card/Card';
import Section from '../Section/Section';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap" rel="stylesheet" />
    </Head>
    <Section noVPad>
      <Box flex-col flex-sec="stretch" className={css.container}>
        <Card className={css._card} no-pad>
          {children}
        </Card>
      </Box>
    </Section>
  </>
)

export default Layout
