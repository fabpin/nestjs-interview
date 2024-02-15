import { Test, TestingModule } from '@nestjs/testing';
import { CheckController } from './check.controller';
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { JwtService } from '@nestjs/jwt';
import { res as MockRespose } from "@ocmi/api/helpers/ResponseExpressObject";
import {Check, Prisma} from "@prisma/client";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import { ICheck } from "@ocmi/api/providers/prisma/interface/Check.interface";
import { PivotTimesheetTypeEvent } from "@prisma/client/default";

describe('CheckController', () => {
  let app: TestingModule;
  let checkController: CheckController;
  let prismaService: PrismaService;
  const query = { take: 10, skip: 0 };
  let check1:ETModel;
  const icheck1:ICheck = {
    id:1,
    "name": "fabio",
    "gross_wages": new Prisma.Decimal(300.00),
    "user_id": 1,
    "created_at": new Date("2024-02-14T01:16:09.277Z"),
    "updated_at": new Date("2024-02-14T01:32:53.646Z"),
    "deleted_at": null
  };
  const pivot: PivotTimesheetTypeEvent = {
    "id": 1,
    "note": "nota de prueba!!",
    "status_id": 3,
    "check_id": 22,
    "timesheet_id": 2,
    "timesheet_Type_Event_id": 1,
    "user_id": 1,
    "company_parameter_id": 1,
    "created_at": new Date("2024-02-14T19:31:42.793Z"),
    "updated_at": new Date("2024-02-14T19:31:42.793Z"),
    "deleted_at": null,
  }

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CheckController],
      providers: [PrismaService, JwtService],
    }).compile();
    checkController = app.get<CheckController>(CheckController);
    prismaService = app.get<PrismaService>(PrismaService);
  });

  describe('createCheck', () => {
    it('should return object of check from the create', async () => {
      const result:ETModel = <ETModel> icheck1;
      const spy = jest.spyOn(prismaService, 'create').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      check1 = await checkController.createCheck(icheck1, res);
      const temp:Check = <Check>check1;
      expect(temp.name).toEqual(icheck1.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('getCheck', () => {
    it('should return array of check', async () => {
      const result:ETModel[] = [];
      result.push(check1);
      const spy = jest.spyOn(prismaService, 'pagination').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      expect((await checkController.getCheck(res,query))[0].name).toEqual(result[0].name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('updateCheck', () => {
    it('should return object of check from the update', async () => {
      const result:ETModel | ETModel[] = <ETModel> check1;
      const spy = jest.spyOn(prismaService, 'findPivotTimeSheeetCheck').mockImplementation(async () => pivot);
      const spy2 = jest.spyOn(prismaService, 'update').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const temp:Check = await checkController.updateCheck(check1.id.toString(), icheck1, res);
      expect(temp.name).toEqual(icheck1.name);
      spy.mockReset();
      spy.mockRestore();
      spy2.mockReset();
      spy2.mockRestore();
    });
  });

  describe('deleteCheck', () => {
    it('should return object of check from the delete', async () => {
      const spy = jest.spyOn(prismaService, 'delete').mockImplementation(async () => check1);
      const res: { status: (code: number) => void } = MockRespose;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const temp:any = (await checkController.deleteCheck(check1.id.toString(), res));
      expect(temp.name).toEqual(icheck1.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });
});
