import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ServiceProviderController } from './service-provider.controller';
import { ServiceProviderService } from './service-provider.service';
import { ServiceProvider } from './service-provider.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceProvider]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234', // Replace with your database password
      database: 'houserent', // Replace with your database name
      entities: [ServiceProvider],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'default_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ServiceProviderController],
  providers: [ServiceProviderService, JwtStrategy],
})
export class ServiceProviderModule {}
