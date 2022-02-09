import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange, clearFrom, resetFrom } = useForm();

  return (
    <form>
      <label htmlFor="name">
        Name
        <input
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
          type="number"
          id="price"
          name="price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={clearFrom}>
        Clear form
      </button>
      <button type="button" onClick={resetFrom}>
        Clear form
      </button>
    </form>
  );
}
