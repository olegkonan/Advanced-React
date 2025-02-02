import Link from 'next/link';
import PropTypes from 'prop-types';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import { formatMoney } from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import { AddToCart } from './AddToCart';

export default function Product({ product }) {
  return (
    <ItemStyles>
      {product.photo && (
        <img
          src={product?.photo?.image?.publicUrlTransformed}
          alt={product.name}
        />
      )}
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: {
              id: product.id,
            },
          }}
        >
          Update ✏
        </Link>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>Delete 🚚 </DeleteProduct>
      </div>
    </ItemStyles>
  );
}

Product.propTypes = {
  product: PropTypes.any,
};
