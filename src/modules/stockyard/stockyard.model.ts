export interface VehicleRequest {
    id: string;
    model: string;
    quantity: number;
    stockyard: string;
    status: 'Pending' | 'In Transit' | 'Delivered';
  }
  
  export interface StockyardInventory {
    id: string;
    model: string;
    stockyard: string;
    status: 'Available' | 'In Use' | 'Sold';
  }
  
  export interface PdiQueue {
    id: string;
    model: string;
    status: 'Pending PDI' | 'Passed' | 'Failed';
  }
  