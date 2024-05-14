import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../../svc/orders.service';
import { RedisManager } from '../../svc/tools/redis';
import { OrdersController } from './orders.controller';

describe('OrderController', () => {
  let ordersController: OrdersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService, RedisManager],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });

  describe('getOrders', () => {
    it('[GET] should return an object of show order page', () => {
      // Add your test logic here
      expect(ordersController.findAll()).toEqual({
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
