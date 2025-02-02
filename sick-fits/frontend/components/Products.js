import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { perPage } from '../config';
import { ALL_PRODUCTS_QUERY } from '../graphql/queries';
import Product from './Product';

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      first: perPage,
      skip: page * perPage - perPage,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ProductsList>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsList>
    </div>
  );
}

Products.propTypes = {
  page: PropTypes.number,
};
