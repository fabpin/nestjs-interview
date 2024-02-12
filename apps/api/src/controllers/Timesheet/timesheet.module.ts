import { Module } from '@nestjs/common';

import { TimesheetController } from './timesheet.controller';
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
// import { HelloCommand } from '@ocmi/api/commands/hello.command';
// import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    // PrismaModule,
  ],
  controllers: [TimesheetController],
  providers: [
    PrismaService
    //AppService,
    // HelloCommand
  ],
})
export class TimesheetModule {}
