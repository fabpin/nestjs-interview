import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetController } from './timesheet.controller';
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { JwtService } from '@nestjs/jwt';
import { res as MockRespose } from "@ocmi/api/helpers/ResponseExpressObject";
import {Prisma, Timesheet} from "@prisma/client";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import { ITimesheet } from "@ocmi/api/providers/prisma/interface/Timesheet.interface";

describe('TimeSheetController', () => {
  const query = { take: 10, skip: 0 };
  let app: TestingModule;
  let timesheetController: TimesheetController;
  let prismaService: PrismaService;
  let check1:ETModel;
  const icheck1:ITimesheet = {
    id:1,
    "hours": new Prisma.Decimal(8)
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TimesheetController],
      providers: [PrismaService, JwtService],
    }).compile();
    timesheetController = app.get<TimesheetController>(TimesheetController);
    prismaService = app.get<PrismaService>(PrismaService);
    prismaService = new PrismaService('Timesheet', icheck1);
    check1 = await prismaService.create();
  });

  describe('getTimesheet', () => {
    it('should return array of Timesheet', async () => {
      const result:ETModel[] = [check1];
      const spy = jest.spyOn(prismaService, 'pagination').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      const temp:Timesheet = <Timesheet>result[0];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const result2:Timesheet[] = (await timesheetController.getTimesheet(res, query));
      expect(result2[result2.length -1].id).toEqual(temp.id);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('updateTimesheet', () => {
    it('should return object of Timesheet from the update', async () => {
      const result:ETModel | ETModel[] = <ETModel> check1;
      const spy = jest.spyOn(prismaService, 'update').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      const result2:Timesheet = <Timesheet>result;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const temp:Timesheet = await timesheetController.updateTimesheet(result2.id.toString(), result2, res);
      expect(temp.id).toEqual(result2.id);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('deleteTimesheet', () => {
    it('should return object of Timesheet from the delete', async () => {
      const spy = jest.spyOn(prismaService, 'delete').mockImplementation(async () => check1);
      const res: { status: (code: number) => void } = MockRespose;
      const result:Timesheet = <Timesheet>check1;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const temp:Timesheet = (await timesheetController.deleteTimesheet(result.id, res));
      expect(temp.id).toEqual(result.id);
      spy.mockReset();
      spy.mockRestore();
    });
  });
});
