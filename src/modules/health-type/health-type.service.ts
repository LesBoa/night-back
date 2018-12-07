import { HealthType } from './health-type.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthTypeRepository } from './health-type.repository';
import { HealthTypeDto } from './health-type.dto';
import Optional from 'typescript-optional';

@Injectable()
export class HealthTypeService {
  constructor(
    @InjectRepository(HealthTypeRepository)
    private readonly healthTypeRepository: HealthTypeRepository,
  ) {}

  async getAll(): Promise<HealthType[]> {
    return this.healthTypeRepository.find({});
  }

  async getOneById(id: number): Promise<Optional<HealthType>> {
    return this.healthTypeRepository.findOneById(id);
  }

  async saveNew(body: HealthTypeDto): Promise<HealthType> {
    let healthTypeNew = new HealthType();

    healthTypeNew.type = body.type;
    healthTypeNew.unit = body.unit;

    healthTypeNew = await this.healthTypeRepository.save(healthTypeNew);

    return healthTypeNew;
  }

  async update(id: number, body: HealthTypeDto): Promise<HealthType> {
    let healthTypeFound = (await this.healthTypeRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());

    healthTypeFound.type = body.type;
    healthTypeFound.unit = body.unit;

    healthTypeFound = await this.healthTypeRepository.save(healthTypeFound);

    return healthTypeFound;
  }

  async deleteById(id: number): Promise<void> {
    const healthTypeFound = (await this.healthTypeRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());
    await this.healthTypeRepository.remove(healthTypeFound);
  }
}
