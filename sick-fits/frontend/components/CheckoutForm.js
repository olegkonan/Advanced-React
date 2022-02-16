import styled from 'styled-components';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import nProgress from 'nprogress';
import { useMutation } from '@apollo/client';
import SickButton from './styles/SickButton';
import { CREATE_ORDER_MUTATION } from '../graphql/mutations';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkout, { error: gqlError }] = useMutation(CREATE_ORDER_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    nProgress.start();
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      setError(error);
    } else {
      setError(null);
      const order = await checkout({
        variables: {
          token: paymentMethod.id,
        },
      });
      console.log(order);
    }
    setLoading(false);
    nProgress.done();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {gqlError && <p style={{ fontSize: 12 }}>{gqlError.message}</p>}
      <CardElement />
      <SickButton>Checkout now</SickButton>
    </CheckoutFormStyles>
  );
}
