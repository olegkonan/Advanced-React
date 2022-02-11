import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { RESET_MUTATION } from '../graphql/mutations';
import useFrom from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

export function Reset({ token }) {
  const { inputs, handleChange, resetFrom } = useFrom({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, resetError }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reset();
    resetFrom();
  };

  const error =
    data?.redeemUserPasswordResetToken?.code &&
    data.redeemUserPasswordResetToken;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error || resetError} />
      <h2>Reset your password</h2>
      {data?.redeemUserPasswordResetToken === null && (
        <p>You can now sign in</p>
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
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">Request Reset</button>
    </Form>
  );
}

Reset.propTypes = {
  token: PropTypes.string,
};
