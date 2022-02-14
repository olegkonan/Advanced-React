import styled from 'styled-components';
import PropTypes from 'prop-types';

const Dot = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

export function CartCount({ count }) {
  return <Dot>{count}</Dot>;
}

CartCount.propTypes = {
  count: PropTypes.number,
};
