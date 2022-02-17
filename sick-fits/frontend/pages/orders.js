import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Link from 'next/link';
import DisplayError from '../components/ErrorMessage';
import { USER_ORDERS_QUERY } from '../graphql/queries';
import { formatMoney } from '../lib/formatMoney';
import OrderItemStyles from '../components/styles/OrderItemStyles';

const OrderList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const orderItemsCount = (order) =>
  order.items.reduce((tally, item) => tally + item.quantity, 0);

export default function OrdersPage() {
  const { data, loading, error } = useQuery(USER_ORDERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { allOrders } = data;

  return (
    <div>
      <h2>You have {allOrders.length} orders</h2>
      <OrderList>
        {allOrders.map((order) => (
          <OrderItemStyles>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>{orderItemsCount(order)} items</p>
                  <p>
                    {order.items.length} product{order.items.length ? 's' : ''}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={`img-${item.id}`}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item?.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderList>
    </div>
  );
}
