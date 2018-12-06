import { EntityRepository, Repository } from 'typeorm';
import { Role } from './roles.entity';
import Optional from 'typescript-optional';
import { ADMIN_ROLE, USER_ROLE } from './roles.constants';

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {
  async findRoleByName(name: string): Promise<Optional<Role>> {
    return Optional.ofNullable(await this.findOne({ name }));
  }

  async findOneById(id: number): Promise<Optional<Role>> {
    return Optional.ofNullable(await this.findOne(id, {}));
  }
}
