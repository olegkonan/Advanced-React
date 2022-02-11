import { useMutation } from '@apollo/client';
import PropType from 'prop-types';
import { DELETE_PRODUCT_MUTATION } from '../graphql/mutations';

const update = (cache, payload) => {
  console.log(cache, payload);
  cache.evict(cache.identify(payload.data.deleteProduct));
};
export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });

  return (
    <button
      type="button"
      onClick={() => {
        if (window.confirm('Are you sure you wont to delete item')) {
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
      disabled={loading}
    >
      {children}
    </button>
  );
}

DeleteProduct.propTypes = {
  id: PropType.string,
  children: PropType.node,
};
