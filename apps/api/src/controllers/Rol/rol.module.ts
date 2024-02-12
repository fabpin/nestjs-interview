import { Module } from '@nestjs/common';

import { RolController } from './rol.controller';
// import { HelloCommand } from '@ocmi/api/commands/hello.command';
// import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    // PrismaModule,
  ],
  controllers: [RolController],
  providers: [
    //AppService,
    // HelloCommand
  ],
})
export class RolModule {}
