import { EntityRepository, Repository } from 'typeorm';
import { HealthType } from './health-type.entity';
import Optional from 'typescript-optional';

@EntityRepository(HealthType)
export class HealthTypeRepository extends Repository<HealthType> {
  async findOneById(id: number): Promise<Optional<HealthType>> {
    return Optional.ofNullable(await this.findOne(id, {}));
  }
}
