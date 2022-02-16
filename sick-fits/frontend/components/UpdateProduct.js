import { useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { UPDATE_PRODUCT_MUTATION } from '../graphql/mutations';
import { SINGLE_PRODUCT_QUERY } from '../graphql/queries';
import useFrom from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

export default function UpdateProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  const initialValues = {
    name: data?.Product.name || '',
    description: data?.Product.description || '',
    price: data?.Product.price || 0,
  };
  const { inputs, handleChange } = useFrom(initialValues);
  const [updateProduct, updateResult] = useMutation(UPDATE_PRODUCT_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct({
      variables: {
        id,
        data: {
          name: inputs.name,
          description: inputs.description,
          price: inputs.price,
        },
      },
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error || updateResult.error} />
      <fieldset
        disabled={updateResult.loading}
        aria-busy={updateResult.loading}
      >
        <label htmlFor="name">
          Name
          <input
            required
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            required
            type="number"
            id="price"
            name="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            required
            id="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}

UpdateProduct.propTypes = {
  id: PropTypes.string,
};
