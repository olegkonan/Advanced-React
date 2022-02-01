/* eslint-disable react/prop-types */

import Nprogress from 'nprogress';
import Router from 'next/router';
import Layout from '../components/Layout';
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());

/* eslint-disable react/jsx-props-no-spreading */
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
