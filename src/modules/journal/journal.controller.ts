import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Journal } from './journal.entity';
import { JournalService } from './journal.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { JournalDto } from './journal.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { User } from '../user/user.entity';

@ApiUseTags('Journal')
@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: `Get a list of user's journal`,
    type: Journal,
    isArray: true,
  })
  getAllbyUser(@CurrentUser() loggedUser: User): Promise<Journal[]> {
    return this.journalService.getAllByUser(loggedUser);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The Journal has been created.',
    type: Journal,
  })
  saveNew(
    @Body() journalDto: JournalDto,
    @CurrentUser() loggedUser: User,
  ): Promise<Journal> {
    return this.journalService.saveNew(journalDto, loggedUser);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The Journal with the matching id',
    type: Journal,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<Journal> {
    return (await this.journalService.getOneById(id, loggedUser)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated Journal with the matching id',
    type: Journal,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() journalDto: JournalDto,
    @CurrentUser() loggedUser: User,
  ): Promise<Journal> {
    return this.journalService.update(id, journalDto, loggedUser);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The Journal with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<void> {
    await this.journalService.deleteById(id, loggedUser);
  }
}
