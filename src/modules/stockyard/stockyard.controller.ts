import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { StockyardService } from './stockyard.service';

@Controller('stockyard')
export class StockyardController {
  constructor(private readonly stockyardService: StockyardService) {}

  // 🚛 Fetch all vehicle transfer requests
  @Get('requests')
  getAllRequests() {
    return this.stockyardService.getAllRequests();
  }

  // 📝 Create a new vehicle transfer request
  @Post('requests')
  createRequest(@Body() requestData: any) {
    return this.stockyardService.createRequest(requestData);
  }

  // 🔄 Update request status (Pending → In Transit → Delivered)
  @Put('requests/:id')
    updateRequestStatus(@Param('id') requestId: string, @Body() body: { status: string }) {
  // Cast the status to the allowed type
    const validStatus = body.status as 'Pending' | 'In Transit' | 'Delivered';
        return this.stockyardService.updateRequestStatus(requestId, validStatus);
}


  // 📦 Fetch stockyard inventory
  @Get('inventory')
  getStockyardInventory() {
    return this.stockyardService.getStockyardInventory();
  }

  // 🔁 Request a stock transfer between stockyards
  @Post('transfers')
  requestStockTransfer(@Body() transferData: any) {
    return this.stockyardService.requestStockTransfer(transferData);
  }

  // 🔎 Fetch PDI (Pre-Delivery Inspection) pending vehicles
  @Get('pdi')
  getPdiVehicles() {
    return this.stockyardService.getPdiVehicles();
  }

  // ✅ Update PDI status (Passed / Failed)
  @Post('pdi/:id')
  updatePdiStatus(@Param('id') vehicleId: string, @Body() body: { status: string }) {
  // Cast status to allowed PDI status values
    const validStatus = body.status as 'Pending PDI' | 'Passed' | 'Failed';
    return this.stockyardService.updatePdiStatus(vehicleId, validStatus);
}
}
