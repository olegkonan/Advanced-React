import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import FormatMoney from '../lib/formatMoney';

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
      <PriceTag>{FormatMoney(product.price)}</PriceTag>
    </ItemStyles>
  );
}
