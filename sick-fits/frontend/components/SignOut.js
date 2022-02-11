import { useMutation } from '@apollo/client';
import { SIGNOUT_MUTATION } from '../graphql/mutations';
import { CURRENT_USER_QUERY } from '../graphql/queries';

export default function SignOut({ children }) {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button type="button" onClick={signout}>
      Sign out
    </button>
  );
}
