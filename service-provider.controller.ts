import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';

@Controller('service-provider')
export class ServiceProviderController {
  constructor(private readonly serviceProviderService: ServiceProviderService) {}

  @Post('register')
  register(@Body() data) {
    return this.serviceProviderService.register(data);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.serviceProviderService.login(loginDto);
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.serviceProviderService.getAll();
  }
}
