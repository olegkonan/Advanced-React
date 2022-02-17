import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import Head from 'next/head';
import DisplayError from '../../components/ErrorMessage';
import { SINGLE_ORDER_QUERY } from '../../graphql/queries';
import OrderStyles from '../../components/styles/OrderStyles';
import { formatMoney } from '../../lib/formatMoney';

export default function SingleOrderPage({ query }) {
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { order } = data;

  return (
    <OrderStyles>
      <Head>
        <title>Sick-Fits | {order.id}</title>
      </Head>
      <p>
        <span>Order id: </span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge: </span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order total: </span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item count: </span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>{item.quantity}</p>
              <p>Each {formatMoney(item.price)}</p>
              <p>Sub total: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}

SingleOrderPage.propTypes = {
  query: PropTypes.object,
};
