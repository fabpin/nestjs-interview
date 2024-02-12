import { Module } from '@nestjs/common';

import { CheckController } from './check.controller';
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
// import { HelloCommand } from '@ocmi/api/commands/hello.command';
// import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    // PrismaModule,
  ],
  controllers: [CheckController],
  providers: [
    PrismaService
    //AppService,
    // HelloCommand
  ],
})
export class CheckModule {}
