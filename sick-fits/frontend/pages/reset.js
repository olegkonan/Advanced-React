import PropTypes from 'prop-types';
import { RequestReset } from '../components/RequestReset';
import { Reset } from '../components/Reset';

export default function ResetPage({ query }) {
  const { token } = query;
  if (!token) {
    return (
      <div>
        <p>You must supply a token</p>
        <RequestReset />
      </div>
    );
  }

  return (
    <div>
      <Reset token={query?.token} />
    </div>
  );
}

ResetPage.propTypes = {
  query: PropTypes.object,
};
