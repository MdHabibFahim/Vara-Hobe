import { Module } from '@nestjs/common';
import { ServiceProviderModule } from './service-provider/service-provider.module';

@Module({
  imports: [ServiceProviderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
