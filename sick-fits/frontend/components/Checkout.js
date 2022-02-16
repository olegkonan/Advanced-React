import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from './CheckoutForm';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export function Checkout() {
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
}
