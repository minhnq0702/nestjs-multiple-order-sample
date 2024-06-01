import { sampleOrders } from '@entities/order.entity';
import { OrdersController } from '@module/orders/orders.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '@src/modules/orders/orders.service';
import { getMockRedisManager } from '@src/svc/tools/mockRedis';
import { RedisManagerType } from '@src/svc/tools/redis';

describe('OrderController', () => {
  let ordersController: OrdersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: RedisManagerType,
          useClass: getMockRedisManager(),
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
