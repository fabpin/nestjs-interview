import { Test, TestingModule } from '@nestjs/testing';
import { CompanyParameterController } from './companyParameter.controller';
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { JwtService } from '@nestjs/jwt';
import { res as MockRespose } from "@ocmi/api/helpers/ResponseExpressObject";
import {Check, CompanyParameter, Prisma} from "@prisma/client";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import {ICompanyParameter} from "@ocmi/api/providers/prisma/interface/CompanyParameters.interface";

describe('CompanyParameterController', () => {
  const query = { take: 10, skip: 0 };
  let app: TestingModule;
  let companyParameterController: CompanyParameterController;
  let prismaService: PrismaService;
  let check1:ETModel;
  const icheck1:ICompanyParameter = {
    id:2,
    "name": "PEOPayGo"+(Math.floor(Math.random() * 6) + 1),
    "email": "admin"+(Math.floor(Math.random() * 6) + 1)+"@peopaygo.com",
    "minimun_wages_salary": new Prisma.Decimal(480),
    "minimun_wages_hourly": new Prisma.Decimal(12),
    "created_at": new Date("2024-02-15T01:08:23.471Z"),
    "updated_at": new Date("2024-02-15T01:08:23.471Z"),
    "deleted_at": null
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CompanyParameterController],
      providers: [PrismaService, JwtService],
    }).compile();
    companyParameterController = app.get<CompanyParameterController>(CompanyParameterController);
    prismaService = app.get<PrismaService>(PrismaService);
  });

  describe('createCompanyParameter', () => {
    it('should return object of CompanyParameter from the create', async () => {
      const result:ETModel = <ETModel> icheck1;
      const spy = jest.spyOn(prismaService, 'create').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      check1 = await companyParameterController.createCompanyParameter(icheck1, res);
      const temp:Check = <Check>check1;
      expect(temp.name).toEqual(icheck1.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('getCompanyParameter', () => {
    it('should return array of CompanyParameter', async () => {
      const result:ETModel[] = [check1];
      const spy = jest.spyOn(prismaService, 'pagination').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      const temp:CompanyParameter = <CompanyParameter>result[0];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const result2:CompanyParameter[] = await companyParameterController.getCompanyParameter(res, query);
      expect(result2[result2.length-1].name).toEqual(temp.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('updateCompanyParameter', () => {
    it('should return object of CompanyParameter from the update', async () => {
      const result:ETModel | ETModel[] = <ETModel> check1;
      const spy = jest.spyOn(prismaService, 'update').mockImplementation(async () => result);
      const res: { status: (code: number) => void } = MockRespose;
      const result2:CompanyParameter = <CompanyParameter>result;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const temp:any = (await companyParameterController.updateCompanyParameter(result2.id.toString(), result2, res));
      expect(temp.name).toEqual(result2.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('deleteCompanyParameter', () => {
    it('should return object of CompanyParameter from the delete', async () => {
      const spy = jest.spyOn(prismaService, 'delete').mockImplementation(async () => check1);
      const res: { status: (code: number) => void } = MockRespose;
      const result:CompanyParameter = <CompanyParameter>check1;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const temp:any = (await companyParameterController.deleteCompanyParameter(result.id, res));
      expect(temp.name).toEqual(result.name);
      spy.mockReset();
      spy.mockRestore();
    });
  });
});
