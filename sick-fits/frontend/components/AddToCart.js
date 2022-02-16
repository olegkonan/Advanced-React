import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { ADD_TO_CART_MUTATION } from '../graphql/mutations';
import { CURRENT_USER_QUERY } from '../graphql/queries';

export function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button type="button" onClick={addToCart} disabled={loading}>
      Add{loading && 'ing'} to cart 🛍
    </button>
  );
}

AddToCart.propTypes = {
  id: PropTypes.string,
};
