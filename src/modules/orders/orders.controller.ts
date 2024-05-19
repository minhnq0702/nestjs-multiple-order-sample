import { CreateOrderDto } from '@dto/create-order.dto';
import { UpdateOrderDto } from '@dto/update-order.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Public } from '@src/config/auth.config';
import { OrdersService } from '@src/modules/orders/orders.service';
import { Request, Response } from 'express';

export type order = {
  productKey: string;
};

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Public()
  @Post('/benchmark-over-qty')
  @Header('Content-Type', 'application/json')
  async createOrder(
    @Req() req: Request,
    @Body() body: order,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { productKey } = body;
    if (!productKey) {
      res.status(400).send({
        msg: 'productKey is required',
      });
      return;
    }

    const ordered = await this.ordersService.createOrder(productKey);
    res.status(201).send({
      msg: ordered,
    });
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return this.ordersService.findOne(+id);
    } catch (error) {
      res.status(404).send({
        msg: error.message,
      });
      return;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
