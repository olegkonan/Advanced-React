import { useMutation } from '@apollo/client';
import { REQUEST_RESET_MUTATION } from '../graphql/mutations';
import useFrom from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

export function RequestReset() {
  const { inputs, handleChange, resetFrom } = useFrom({
    email: '',
  });
  const [sendRequest, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    resetFrom();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <h2>Request a password reset</h2>
      {data?.sendUserPasswordResetLink === null && (
        <p>Success check your email for a link</p>
      )}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">Request Reset</button>
    </Form>
  );
}
