import { Test, TestingModule } from '@nestjs/testing';
import { PayTypeController } from './payType.controller';
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { JwtService } from '@nestjs/jwt';
import { res as MockRespose } from "@ocmi/api/helpers/ResponseExpressObject";
import { PayType} from "@prisma/client";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import {IPayType} from "@ocmi/api/providers/prisma/interface/PayType.interface";

describe('PayTypeController', () => {
  const query = { take: 10, skip: 0 };
  let app: TestingModule;
  let payTypeController: PayTypeController;
  let prismaService: PrismaService;
  let check1:ETModel;
  const icheck1:IPayType = {
    id:7,
    "name": "Prueba de tipo"+(Math.floor(Math.random() * 6) + 1)
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PayTypeController],
      providers: [PrismaService, JwtService],
    }).compile();
    payTypeController = app.get<PayTypeController>(PayTypeController);
    prismaService = app.get<PrismaService>(PrismaService);
  });

  describe('createPayType', () => {
    it('should return object of PayType from the create', async () => {
      const result:ETModel = <ETModel> icheck1;
      const spy = jest.spyOn(prismaService, 'create').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      check1 = await payTypeController.createPayType(icheck1, res);
      const temp:PayType = <PayType>check1;
      expect(temp.name).toEqual(icheck1.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('getPayType', () => {
    it('should return array of PayType', async () => {
      const result:ETModel[] = [check1];
      const spy = jest.spyOn(prismaService, 'pagination').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      const temp:PayType = <PayType>result[0];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const result2:PayType[] = (await payTypeController.getPayType(res, query));
      expect(result2[result2.length -1].name).toEqual(temp.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('updatePayType', () => {
    it('should return object of PayType from the update', async () => {
      const result:ETModel | ETModel[] = <ETModel> check1;
      const spy = jest.spyOn(prismaService, 'update').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      const result2:PayType = <PayType>result;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const temp:PayType = (await payTypeController.updatePayType(result2.id.toString(), result2, res));
      expect(temp.name).toEqual(result2.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('deletePayType', () => {
    it('should return object of PayType from the delete', async () => {
      const spy = jest.spyOn(prismaService, 'delete').mockImplementation(async () => check1);
      const res: { status: (code: number) => void } = MockRespose;
      const result:PayType = <PayType>check1;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const temp:any = (await payTypeController.deletePayType(result.id, res));
      expect(temp.name).toEqual(result.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });
});
