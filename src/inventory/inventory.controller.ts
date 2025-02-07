import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../modules/roles.decorator';

@Controller('inventory')
@UseGuards(RolesGuard) // Apply the Roles Guard globally for all routes
export class InventoryController {
  
  @Get('all')
  @Roles('admin', 'manager') // Only Admins and Managers can access this route
  findAll() {
    return { message: 'Only Admins and Managers can access this!' };
  }

  @Get('staff-view')
  @Roles('staff') // Only Staff can access this route
  staffView() {
    return { message: 'Only Staff can access this inventory!' };
  }
}
