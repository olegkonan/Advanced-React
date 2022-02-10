import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT_MUTATION } from '../graphql/mutations';

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
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
