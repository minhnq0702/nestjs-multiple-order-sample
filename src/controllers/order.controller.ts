import { Body, Controller, Get, Header, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { OrderService } from '../svc/order.service';

export type order = {
  productKey: string;
};

@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(): object {
    return {
      status: 200,
      body: 'This is order api',
    };
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async createOrder(
    @Req() req: Request,
    @Body() body: order,
    @Res() res: Response,
  ) {
    const { productKey } = body;
    if (!productKey) {
      res.status(400).send({
        msg: 'productKey is required',
      });
      return;
    }

    try {
      const order = await this.orderService.createOrder(productKey);
      res.status(201).send({
        msg: `Order created ${order}`,
      });
    } catch (error) {
      console.error('[OrderCtrl] Error:', error.message);
      res.status(500).send({
        msg: error.message,
      });
    }
    return;
  }
}
