import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CanvaService } from './canva.service';
import { CreateCanvaDto } from './dto/create-canva.dto';
import { UpdateCanvaDto } from './dto/update-canva.dto';

@Controller('canva')
export class CanvaController {
  constructor(private readonly canvaService: CanvaService) {}

  @Post()
  create(@Body() createCanvaDto: CreateCanvaDto) {
    return this.canvaService.create(createCanvaDto);
  }

  @Get()
  findAll() {
    return this.canvaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.canvaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCanvaDto: UpdateCanvaDto) {
    return this.canvaService.update(+id, updateCanvaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canvaService.remove(+id);
  }
}
