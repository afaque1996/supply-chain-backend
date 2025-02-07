import { Injectable } from '@nestjs/common';
import { VehicleRequest, StockyardInventory, PdiQueue } from './stockyard.model';

@Injectable()
export class StockyardService {
  private requests: VehicleRequest[] = [];
  private inventory: StockyardInventory[] = [
    { id: '1', model: 'Coolray', stockyard: 'Stockyard A', status: 'Available' },
    { id: '2', model: 'Emgrand', stockyard: 'Stockyard B', status: 'Available' }
  ];
  private pdiQueue: PdiQueue[] = [
    { id: '1', model: 'Azkarra', status: 'Pending PDI' }
  ];

  // 🚛 Get all vehicle requests
  getAllRequests(): VehicleRequest[] {
    return this.requests;
  }

  // 📝 Create a new vehicle request
  createRequest(requestData: Omit<VehicleRequest, 'id'>): { message: string; requestData: VehicleRequest } {
    const newRequest: VehicleRequest = { ...requestData, id: `${this.requests.length + 1}` };
    this.requests.push(newRequest);
    return { message: 'Request Created Successfully', requestData: newRequest };
  }

  // 🔄 Update request status
  updateRequestStatus(requestId: string, status: 'Pending' | 'In Transit' | 'Delivered'): { message: string } {
    const request = this.requests.find((req) => req.id === requestId);
    if (request) {
      request.status = status; 
    }
    return { message: `Request ${requestId} updated to ${status}` };
  }
  

  // 📦 Get stockyard inventory
  getStockyardInventory(): StockyardInventory[] {
    return this.inventory;
  }

  // 🔁 Request stock transfer
  requestStockTransfer(transferData: { fromStockyard: string; toStockyard: string; vehicleId: string }): { message: string; transferData: any } {
    return { message: 'Stock Transfer Requested', transferData };
  }

  // 🔎 Get PDI pending vehicles
  getPdiVehicles(): PdiQueue[] {
    return this.pdiQueue;
  }

  // ✅ Update PDI status
  updatePdiStatus(vehicleId: string, status: 'Pending PDI' | 'Passed' | 'Failed'): { message: string } {
    const vehicle = this.pdiQueue.find((v) => v.id === vehicleId);
    if (vehicle) {
      vehicle.status = status; 
    }
    return { message: `Vehicle ${vehicleId} marked as ${status}` };
  }
  
}
