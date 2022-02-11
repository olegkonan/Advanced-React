import { useMutation } from '@apollo/client';
import { SIGNIN_MUTATION } from '../graphql/mutations';
import { CURRENT_USER_QUERY } from '../graphql/queries';
import useFrom from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

export default function SignIn() {
  const { inputs, handleChange, resetFrom } = useFrom({
    email: '',
    password: '',
  });
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin();
    resetFrom();
  };

  const error =
    data?.authenticateUserWithPassword?.__typename ===
      'UserAuthenticationWithPasswordFailure' &&
    data.authenticateUserWithPassword;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error || null} />
      <h2>Sing into your account</h2>
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
      <button type="submit">Sign in</button>
    </Form>
  );
}
