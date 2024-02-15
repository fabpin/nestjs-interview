import { Test, TestingModule } from '@nestjs/testing';
import { RolController } from './rol.controller';
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { JwtService } from '@nestjs/jwt';
import { res as MockRespose } from "@ocmi/api/helpers/ResponseExpressObject";
import { Rol } from "@prisma/client";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import { IRol } from "@ocmi/api/providers/prisma/interface/Rol.interface";

describe('RolController', () => {
  const query = { take: 10, skip: 0 };
  let app: TestingModule;
  let rolController: RolController;
  let prismaService: PrismaService;
  let check1:ETModel;
  const icheck1:IRol = {
    id:4,
    "name": "Prueba de tipo"+(Math.floor(Math.random() * 6) + 1)
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [RolController],
      providers: [PrismaService, JwtService],
    }).compile();
    rolController = app.get<RolController>(RolController);
    prismaService = app.get<PrismaService>(PrismaService);
  });

  describe('createRol', () => {
    it('should return object of Rol from the create', async () => {
      const result:ETModel = <ETModel> icheck1;
      const spy = jest.spyOn(prismaService, 'create').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      check1 = await rolController.createRol(icheck1, res);
      const temp:Rol = <Rol>check1;
      expect(temp.name).toEqual(icheck1.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('getRol', () => {
    it('should return array of Rol', async () => {
      const result:ETModel[] = [check1];
      const spy = jest.spyOn(prismaService, 'pagination').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      const temp:Rol = <Rol>result[0];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const result2:PayType[] = (await rolController.getRol(res, query));
      expect(result2[result2.length -1].name).toEqual(temp.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('updateRol', () => {
    it('should return object of Rol from the update', async () => {
      const result:ETModel | ETModel[] = <ETModel> check1;
      const spy = jest.spyOn(prismaService, 'update').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      const result2:Rol = <Rol>result;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const temp:Rol = (await rolController.updateRol(result2.id.toString(), result2, res));
      expect(temp.name).toEqual(result2.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('deleteRol', () => {
    it('should return object of Rol from the delete', async () => {
      const spy = jest.spyOn(prismaService, 'delete').mockImplementation(async () => check1);
      const res: { status: (code: number) => void } = MockRespose;
      const result:Rol = <Rol>check1;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const temp:any = (await rolController.deleteRol(result.id, res));
      expect(temp.name).toEqual(result.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });
});
