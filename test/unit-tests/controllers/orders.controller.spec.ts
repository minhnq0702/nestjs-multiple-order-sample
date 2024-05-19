import { sampleOrders } from '@entities/order.entity';
import { OrdersController } from '@module/orders/orders.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '@src/modules/orders/orders.service';
import { RedisManagerType, getRedisManager } from '@svc/tools/redis';

describe('OrderController', () => {
  let ordersController: OrdersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: RedisManagerType,
          useFactory: getRedisManager,
        },
      ],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });

  describe('getOrders', () => {
    it('[GET] should return an array of show all order', () => {
      // Add your test logic here
      expect(ordersController.findAll().length).toEqual(sampleOrders.length);
    });
  });

  // describe('createOrder', () => {
  //   it('should create a new order and return an object', async () => {
  //     // Add your test logic here
  //   });
  // });
});
