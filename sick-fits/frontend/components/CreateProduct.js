import { useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { CREATE_PRODUCT_MUTATION } from '../graphql/mutations';
import { ALL_PRODUCTS_QUERY } from '../graphql/queries';

export default function CreateProduct() {
  const { inputs, handleChange, clearFrom, resetFrom } = useForm();
  const [createProduct, { loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await createProduct();
    clearFrom();
    Router.push({
      pathname: `/product/${data.createProduct.id}`,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
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

        <button type="submit">+ Add Product</button>
        <button type="button" onClick={clearFrom}>
          Clear form
        </button>
        <button type="button" onClick={resetFrom}>
          Clear form
        </button>
      </fieldset>
    </Form>
  );
}
