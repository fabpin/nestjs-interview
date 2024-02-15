import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetTypeController } from './timesheetType.controller';
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { JwtService } from '@nestjs/jwt';
import { res as MockRespose } from "@ocmi/api/helpers/ResponseExpressObject";
import { TimesheetTypeEvent } from "@prisma/client";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import { ITimesheetTypeEvent } from "@ocmi/api/providers/prisma/interface/TimesheetTypeEvent.interface";

describe('TimeSheetTypeController', () => {
  const query = { take: 10, skip: 0 };
  let app: TestingModule;
  let timeSheetController: TimesheetTypeController;
  let prismaService: PrismaService;
  let check1:ETModel;
  const icheck1:ITimesheetTypeEvent = {
    id:3,
    "name": "Prueba de tipo"+(Math.floor(Math.random() * 6) + 1)
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TimesheetTypeController],
      providers: [PrismaService, JwtService],
    }).compile();
    timeSheetController = app.get<TimesheetTypeController>(TimesheetTypeController);
    prismaService = app.get<PrismaService>(PrismaService);
  });

  describe('createTimeSheetType', () => {
    it('should return object of TimeSheetType from the create', async () => {
      const result:ETModel = <ETModel> icheck1;
      const spy = jest.spyOn(prismaService, 'create').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      check1 = await timeSheetController.createTimeSheetType(icheck1, res);
      const temp:TimesheetTypeEvent = <TimesheetTypeEvent>check1;
      expect(temp.name).toEqual(icheck1.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('getTimeSheetType', () => {
    it('should return array of TimeSheetType', async () => {
      const result:ETModel[] = [check1];
      const spy = jest.spyOn(prismaService, 'pagination').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      const temp:TimesheetTypeEvent = <TimesheetTypeEvent>result[0];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const result2:TimesheetTypeEvent[] = (await timeSheetController.getTimeSheetType(res, query));
      expect(result2[result2.length -1].name).toEqual(temp.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('updateTimeSheetType', () => {
    it('should return object of TimeSheetType from the update', async () => {
      const result:ETModel | ETModel[] = <ETModel> check1;
      const spy = jest.spyOn(prismaService, 'update').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      const result2:TimesheetTypeEvent = <TimesheetTypeEvent>result;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const temp:Rol = (await timeSheetController.updateTimeSheetType(result2.id.toString(), result2, res));
      expect(temp.name).toEqual(result2.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('deleteTimeSheetType', () => {
    it('should return object of TimeSheetType from the delete', async () => {
      const spy = jest.spyOn(prismaService, 'delete').mockImplementation(async () => check1);
      const res: { status: (code: number) => void } = MockRespose;
      const result:TimesheetTypeEvent = <TimesheetTypeEvent>check1;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const temp:any = (await timeSheetController.deleteTimeSheetType(result.id, res));
      expect(temp.name).toEqual(result.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });
});
