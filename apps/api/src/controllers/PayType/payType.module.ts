import { Module } from '@nestjs/common';

import { PayTypeController } from './payType.controller';
// import { HelloCommand } from '@ocmi/api/commands/hello.command';
// import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    // PrismaModule,
  ],
  controllers: [PayTypeController],
  providers: [
    //AppService,
    // HelloCommand
  ],
})
export class PayTypeModule {}
