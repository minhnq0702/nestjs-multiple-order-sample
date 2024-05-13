import { Test, TestingModule } from '@nestjs/testing';
import { RedisManager } from '../tools/redis';
import { OrderController } from './order.controller';

describe('OrderController', () => {
  let orderController: OrderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [RedisManager],
    }).compile();

    orderController = app.get<OrderController>(OrderController);
  });

  describe('getOrders', () => {
    it('[GET] should return an object of show order page', () => {
      // Add your test logic here
      expect(orderController.getOrders()).toEqual({
        status: 200,
        body: 'This is order api',
      });
    });
  });

  // describe('createOrder', () => {
  //   it('should create a new order and return an object', async () => {
  //     // Add your test logic here
  //   });
  // });
});
