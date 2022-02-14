/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

export async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  const session = context.session as Session;
  if (!session.itemId) throw new Error('You must be logged in');
  const allCartItems = await context.lists.CartItem.findMany({
    where: {
      user: { id: session.itemId },
      product: { id: productId },
    },
    resolveFields: 'id,quantity',
  });
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    // eslint-disable-next-line no-return-await
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }

  // eslint-disable-next-line no-return-await
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: session.itemId } },
    },
  });
}
