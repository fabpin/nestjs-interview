import { Module } from '@nestjs/common';

import { TimesheetTypeController } from './timesheetType.controller';
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
// import { HelloCommand } from '@ocmi/api/commands/hello.command';
// import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    // PrismaModule,
  ],
  controllers: [TimesheetTypeController],
  providers: [
    PrismaService
    //AppService,
    // HelloCommand
  ],
})
export class TimesheetTypeModule {}
