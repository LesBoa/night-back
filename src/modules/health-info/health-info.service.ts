import { HealthInfo } from './health-info.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthInfoRepository } from './health-info.repository';
import { HealthInfoDto } from './health-info.dto';
import Optional from 'typescript-optional';
import { User } from '../user/user.entity';

@Injectable()
export class HealthInfoService {
  constructor(
    @InjectRepository(HealthInfoRepository)
    private readonly healthInfoRepository: HealthInfoRepository,
  ) {}

  async getAll(): Promise<HealthInfo[]> {
    return this.healthInfoRepository.find({});
  }

  async getOneById(
    id: number,
    loggedUser: User,
  ): Promise<Optional<HealthInfo>> {
    return this.healthInfoRepository.findOneById(id, loggedUser);
  }

  async getAllByUser(user: User): Promise<HealthInfo[]> {
    return this.healthInfoRepository.findAllByUser(user);
  }

  async saveNew(body: HealthInfoDto, loggedUser: User): Promise<HealthInfo> {
    let healthInfoNew = new HealthInfo();

    healthInfoNew.value = body.value;
    healthInfoNew.healthType = body.healthType;

    healthInfoNew = await this.healthInfoRepository.save(healthInfoNew);

    return healthInfoNew;
  }

  async update(
    id: number,
    body: HealthInfoDto,
    loggedUser: User,
  ): Promise<HealthInfo> {
    let healthInfoFound = (await this.healthInfoRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());

    healthInfoFound.value = body.value;
    healthInfoFound.healthType = body.healthType;

    healthInfoFound = await this.healthInfoRepository.save(healthInfoFound);

    return healthInfoFound;
  }

  async deleteById(id: number, loggedUser: User): Promise<void> {
    const healthInfoFound = (await this.healthInfoRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());
    await this.healthInfoRepository.remove(healthInfoFound);
  }
}
