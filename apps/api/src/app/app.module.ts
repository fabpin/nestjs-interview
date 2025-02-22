import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckModule } from "@ocmi/api/controllers/Check/check.module";
import { PayTypeModule } from "@ocmi/api/controllers/PayType/payType.module";
import { CompanyParameterModule } from "@ocmi/api/controllers/CompanyParameter/companyParameter.module";
import { RolModule } from "@ocmi/api/controllers/Rol/rol.module";
import { UserModule } from "@ocmi/api/controllers/User/user.module";
import { RegisterTimeModule } from "@ocmi/api/controllers/RegisterTime/RegisterTime.module";
import { TimesheetModule } from "@ocmi/api/controllers/Timesheet/timesheet.module";
import { TimesheetTypeModule } from "@ocmi/api/controllers/TimesheetType/timesheetType.module";
import { AuthModule } from "@ocmi/api/controllers/Auth/auth.module";
import { AuthGuard } from "@ocmi/api/guards/Auth.guard";
import {APP_GUARD} from "@nestjs/core";
// import { HelloCommand } from '@ocmi/api/commands/hello.command';
// import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    CheckModule,
    PayTypeModule,
    CompanyParameterModule,
    RolModule,
    UserModule,
    RegisterTimeModule,
    TimesheetModule,
    TimesheetTypeModule,
    AuthModule
    // PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
    // HelloCommand
  ],
})
export class AppModule {}
