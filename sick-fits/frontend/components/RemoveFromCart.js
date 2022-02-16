import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { REMOVE_FROM_CART_MUTATION } from '../graphql/mutations';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: none;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

function update(cache, payload) {
  console.log({ cache, payload });
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
  });

  return (
    <BigButton
      type="button"
      title="Remove this item from the cart"
      onClick={removeFromCart}
      disabled={loading}
    >
      &times;
    </BigButton>
  );
}

RemoveFromCart.propTypes = {
  id: PropTypes.number,
};
