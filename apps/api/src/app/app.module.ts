import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

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
import { CheckStructureMiddleware } from "@ocmi/api/middleware/check.middleware";
import { ValidateNameAlphabeticMiddleware } from "@ocmi/api/middleware/common/validateNameOnly.middleware";
import { UserMiddleware } from "@ocmi/api/middleware/user.middleware";
import { RegisterTimePostMiddleware } from "@ocmi/api/middleware/RegisterTime/registerTimePost.middleware";
import { RegisterTimePutMiddleware } from "@ocmi/api/middleware/RegisterTime/registerTimePut.middleware";
import { TimeSheetMiddleware } from "@ocmi/api/middleware/timesheet.middleware";
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
    // HelloCommand
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckStructureMiddleware)
      .forRoutes(
        { path: 'checks', method: RequestMethod.POST },
        { path: 'checks', method: RequestMethod.PUT }
      ).apply(ValidateNameAlphabeticMiddleware)
      .forRoutes(
        { path: 'pay_type', method: RequestMethod.POST },
        { path: 'pay_type', method: RequestMethod.PUT },
        { path: 'rol', method: RequestMethod.POST },
        { path: 'rol', method: RequestMethod.PUT },
        { path: 'timesheet_type', method: RequestMethod.POST },
        { path: 'timesheet_type', method: RequestMethod.PUT }
      ).apply(UserMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.PUT }
      )
      .apply(RegisterTimePostMiddleware)
      .forRoutes(
        { path: 'register_time', method: RequestMethod.POST }
      ).apply(RegisterTimePutMiddleware)
      .forRoutes(
        { path: 'register_time', method: RequestMethod.PUT }
      )
      .apply(TimeSheetMiddleware)
      .forRoutes({ path: 'timesheet', method: RequestMethod.PUT });
  }
}
