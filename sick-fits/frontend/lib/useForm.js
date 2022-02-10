import { useEffect, useState } from 'react';

export default function useFrom(init = {}) {
  const [inputs, setInputs] = useState(init);
  const initialValues = Object.values(init).join(' ');

  useEffect(() => {
    setInputs(init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;

    if (type === 'number') value = parseInt(value);
    if (type === 'file') [value] = e.target.files;

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
      Object.entries(inputs).map(([key]) => [key, ''])
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
