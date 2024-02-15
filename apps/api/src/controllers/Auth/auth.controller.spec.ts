import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from "@ocmi/api/controllers/Auth/DTO/Login.DTO";
import { res as MockRespose } from '../../helpers/ResponseExpressObject';

describe('AuthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService],
    }).compile();
  });

  describe('Auth', () => {
    it('should return access_token', async () => {
      const result = {"access_token":"eyJhbGciOiJIUzI"};
      const res: { status: (code: number) => void } = MockRespose;
      const authController = app.get<AuthController>(AuthController);
      const authService = app.get<AuthService>(AuthService);
      jest.spyOn(authService, 'signIn').mockImplementation(async () => result);
      const loginDTO:LoginDTO = { "email": "fabio@peopaygo.com", "password": "Bladeelpoderoso04!"};
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      expect(await authController.signIn(loginDTO, res)).toEqual(result);
    });
  });
});
