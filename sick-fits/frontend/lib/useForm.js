import { useState } from 'react';

export default function useFrom(init = {}) {
  const [inputs, setInputs] = useState(init);

  function handleChange(e) {
    let { value, name, type } = e.target;

    if (type === 'number') value = parseInt(value);
    if (type === 'file') value[0] = e.target.files;

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetFrom() {
    setInputs(init);
  }

  function clearFrom() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, null])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetFrom,
    clearFrom,
  };
}
