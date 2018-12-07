import { Journal } from './journal.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalRepository } from './journal.repository';
import { JournalDto } from './journal.dto';
import Optional from 'typescript-optional';
import { User } from '../user/user.entity';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(JournalRepository)
    private readonly journalRepository: JournalRepository,
  ) {}

  async getAll(): Promise<Journal[]> {
    return this.journalRepository.find({});
  }

  async getAllByUser(user: User): Promise<Journal[]> {
    return this.journalRepository.findAllByUser(user);
  }

  async getOneById(id: number, loggedUser: User): Promise<Optional<Journal>> {
    return this.journalRepository.findOneById(id, loggedUser);
  }

  async saveNew(body: JournalDto, loggedUser: User): Promise<Journal> {
    let journalNew = new Journal();

    journalNew.title = body.title;
    journalNew.description = body.description;
    journalNew.user = loggedUser;

    journalNew = await this.journalRepository.save(journalNew);

    return journalNew;
  }

  async update(
    id: number,
    body: JournalDto,
    loggedUser: User,
  ): Promise<Journal> {
    let journalFound = (await this.journalRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());

    journalFound.title = body.title;
    journalFound.description = body.description;

    journalFound = await this.journalRepository.save(journalFound);

    return journalFound;
  }

  async deleteById(id: number, loggedUser: User): Promise<void> {
    const journalFound = (await this.journalRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());
    await this.journalRepository.remove(journalFound);
  }
}
