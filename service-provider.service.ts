import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceProvider } from './service-provider.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class ServiceProviderService {
  constructor(
    @InjectRepository(ServiceProvider)
    private readonly serviceProviderRepo: Repository<ServiceProvider>,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: Partial<ServiceProvider>) {
    const existing = await this.serviceProviderRepo.findOne({ where: { email: data.email } });
    if (existing) throw new ConflictException('Email already exists');
    const serviceProvider = this.serviceProviderRepo.create(data);
    return this.serviceProviderRepo.save(serviceProvider);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.serviceProviderRepo.findOne({ where: { email } });
    if (!user || user.password !== password) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwtService.sign({ email: user.email, id: user.id });
    return { token };
  }

  getAll() {
    return this.serviceProviderRepo.find();
  }
}
