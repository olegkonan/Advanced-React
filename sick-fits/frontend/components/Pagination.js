import Head from 'next/head';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import { PAGINATION_QUERY } from '../graphql/queries';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

export default function Pagination({ page }) {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);

  if (loading) return null;
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits | Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>◀ Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>▶ Next</a>
      </Link>
    </PaginationStyles>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
};
