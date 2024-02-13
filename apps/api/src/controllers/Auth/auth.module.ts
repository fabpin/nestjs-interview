import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from "@ocmi/api/controllers/User/user.module";
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import * as process from "process";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.secret || 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
