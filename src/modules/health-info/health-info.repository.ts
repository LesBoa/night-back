import { EntityRepository, Repository } from 'typeorm';
import { HealthInfo } from './health-info.entity';
import Optional from 'typescript-optional';
import { User } from 'modules/user/user.entity';

@EntityRepository(HealthInfo)
export class HealthInfoRepository extends Repository<HealthInfo> {
  async findOneById(id: number, user: User): Promise<Optional<HealthInfo>> {
    return Optional.ofNullable(
      await this.findOne({
        where: { id, user },
      }),
    );
  }

  async findAllByUser(user: User): Promise<HealthInfo[]> {
    return await this.find({
      where: { user },
    });
  }
}
