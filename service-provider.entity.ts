import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('service_provider')
export class ServiceProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
