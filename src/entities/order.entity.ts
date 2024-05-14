export class Order {
  id: number;
  userId: number;
  total: number;
  products: Array<{ id: number; quantity: number }>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  // add constructor
  constructor(
    id: number,
    userId: number,
    total: number,
    products: Array<{ id: number; quantity: number }>,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.total = total;
    this.products = products;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}

// add 20 sample orders
export const sampleOrders: Order[] = Array.from({ length: 20 }, (_, i) => {
  return {
    id: i + 1,
    userId: i + 1,
    total: 100 * (i + 1),
    products: Array.from({ length: i + 1 }, (_, j) => ({
      id: j + 1,
      quantity: j + 1,
    })),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };
});
