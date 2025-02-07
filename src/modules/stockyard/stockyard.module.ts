import { Module } from '@nestjs/common';
import { StockyardController } from './stockyard.controller';
import { StockyardService } from './stockyard.service';  // ✅ Remove the incorrect import

@Module({
  controllers: [StockyardController],
  providers: [StockyardService],  // ✅ Only keep StockyardService
})
export class StockyardModule {}
