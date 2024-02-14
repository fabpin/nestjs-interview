import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from "@ocmi/api/controllers/User/user.module";
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: (process.env.secret || 'secret'),
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
