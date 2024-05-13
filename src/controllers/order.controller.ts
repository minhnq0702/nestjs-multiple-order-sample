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
      console.log(
        `[OrderCtrl] productKey is required ${new Date().toISOString()}`,
      );
      return res.status(400).send({
        msg: 'productKey is required',
      });
      return;
    }

    try {
      const ordered = await this.orderService.createOrder(productKey);
      console.log('[OrderCtrl]', ordered);
      return res.status(201).send({
        msg: ordered,
      });
    } catch (error) {
      console.error('[OrderCtrl] Error:', error.message);
      return res.status(500).send({
        msg: error.message,
      });
    }
  }
}
