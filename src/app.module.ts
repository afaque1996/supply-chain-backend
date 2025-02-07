import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';

import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

import { JwtStrategy } from './modules/auth/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { StockyardModule } from './modules/stockyard/stockyard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'api',
      password: 'development_pass',
      database: 'supply_chain_db',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([User]), 
    PassportModule,
    JwtModule.register({
      secret: 'my-secret-key', 
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    AuthModule,
    StockyardModule,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, 
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, 
    },
  ],
})
export class AppModule {}
