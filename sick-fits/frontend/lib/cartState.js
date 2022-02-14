import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const LocalStateContext = createContext();

const LocalStatProvider = LocalStateContext.Provider;

export function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => setCartOpen(!cartOpen);
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return (
    <LocalStatProvider
      value={{
        cartOpen,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </LocalStatProvider>
  );
}

export function useCart() {
  return useContext(LocalStateContext);
}

CartStateProvider.propTypes = {
  children: PropTypes.any,
};
