import {
  PrismaClient,
  Rol,
  Check,
  PayType,
  TimesheetTypeEvent,
  PivotTimesheetTypeEvent,
  Timesheet,
  Status,
  CompanyParameter
} from '@prisma/client';
import {
  ETModel,
  ENModel,
  ENSModel,
  ETModelByName,
  ENSModelByName,
  ETModelByEmail,
  ENSModelByEmail, IETModel
} from "@ocmi/api/providers/prisma/TModel.enum";
import { IUser } from "@ocmi/api/providers/prisma/interface/User.interface";
import bcryptjs from "bcryptjs";
import {Logger} from "@nestjs/common";
import {IPivotTimesheetTypeEvent} from "@ocmi/api/providers/prisma/interface/PivotTimesheetTypeEvent.interface";
export class PrismaProviders {
  private clientPrisma = new PrismaClient();
  private model: ETModel | IETModel;
  private typeOfModel: ENModel;
  constructor( typeOfModel: ENModel, model?: ETModel | IETModel) {
    this.typeOfModel = typeOfModel;
    if(model) {
      this.model = model;
    }
  }

  async create():Promise<ETModel>{
    let iUser:IUser;
    let pivotTimesheetTypeEvent: IPivotTimesheetTypeEvent;
    if (this.model){
      switch (this.typeOfModel){
        case ENSModel.User:
          iUser = this.model;
          return this.clientPrisma.user.create({
            data: {
              name: iUser.name,
              password: bcryptjs.hashSync( iUser.password, bcryptjs.genSaltSync(10)),
              email: iUser.email,
              pay_date: new Date(iUser.pay_date),
              rol_id: iUser.rol.id,
              pay_type_id: iUser.payType.id,
              company_parameters_id: iUser.CompanyParams.id
            },
            include: { CompanyParams: true, rol: true, payType: true }
          });
        case ENSModel.Rol:
          return this.clientPrisma.rol.create({
            data: <Rol>{
              ...this.model
            }
          });
        case ENSModel.CompanyParameter:
          return this.clientPrisma.companyParameter.create({
            data: <CompanyParameter>{
              ...this.model
            }
          });
        case ENSModel.Timesheet:
          return this.clientPrisma.timesheet.create({
            data: <Timesheet>{
              ...this.model
            }
          });
        case ENSModel.TimesheetTypeEvent:
          return this.clientPrisma.timesheetTypeEvent.create({
            data: <TimesheetTypeEvent>{
              ...this.model
            }
          });
        case ENSModel.Status:
          return this.clientPrisma.status.create({
            data: <Status>{
              ...this.model
            }
          });
        case ENSModel.Check:
          return this.clientPrisma.check.create({
            data: <Check>{
              ...this.model
            }
          });
        case ENSModel.PayType:
          return this.clientPrisma.payType.create({
            data: <PayType>{
              ...this.model
            }
          });
        case ENSModel.PivotTimesheetTypeEvent:
          pivotTimesheetTypeEvent = this.model;
          return this.clientPrisma.pivotTimesheetTypeEvent.create({
            data: {
                note: pivotTimesheetTypeEvent.note,
                status_id: pivotTimesheetTypeEvent.status_id,
                check_id: pivotTimesheetTypeEvent.check_id,
                timesheet_id: pivotTimesheetTypeEvent.timesheet_id,
                timesheet_Type_Event_id: pivotTimesheetTypeEvent.timesheet_Type_Event_id,
                user_id: pivotTimesheetTypeEvent.user_id,
                company_parameter_id: pivotTimesheetTypeEvent.company_parameter_id
            },
            include: { status: true, user: true, timesheet: true, timesheet_type: true, companyParams: true, check: true }
          });
      }
    }else{
      throw new Error('the model is mandatory for create a new record into the database');
    }
  }

  async update(id: number):Promise<ETModel>{
    let iUser:IUser;
    let pivotTimesheetTypeEvent: IPivotTimesheetTypeEvent;
    if (this.model){
      switch (this.typeOfModel){
        case ENSModel.User:
          iUser = this.model;
          return this.clientPrisma.user.update({
            where: {
              id: id
            },
            data: {
              name: iUser.name,
              password: bcryptjs.hashSync( iUser.password, bcryptjs.genSaltSync(10)),
              email: iUser.email,
              pay_date: new Date(iUser.pay_date),
              rol_id: iUser.rol.id,
              pay_type_id: iUser.payType.id,
              company_parameters_id: iUser.CompanyParams.id
            },
            include: { CompanyParams: true, rol: true, payType: true }
          });
        case ENSModel.Rol:
          return this.clientPrisma.rol.update({
            where:{
              id: id
            },
            data: <Rol>{
              ...this.model
            }
          });
        case ENSModel.CompanyParameter:
          return this.clientPrisma.companyParameter.update({
            where:{
              id: id
            },
            data: <CompanyParameter>{
              ...this.model
            }
          });
        case ENSModel.Timesheet:
          return this.clientPrisma.timesheet.update({
            where:{
              id: id
            },
            data: <Timesheet>{
              ...this.model
            }
          });
        case ENSModel.TimesheetTypeEvent:
          return this.clientPrisma.timesheetTypeEvent.update({
            where:{
              id: id
            },
            data: <TimesheetTypeEvent>{
              ...this.model
            }
          });
        case ENSModel.Status:
          return this.clientPrisma.status.update({
            where:{
              id: id
            },
            data: <Status>{
              ...this.model
            }
          });
        case ENSModel.Check:
          return this.clientPrisma.check.update({
            where:{
              id: id
            },
            data: <Check>{
              ...this.model
            }
          });
        case ENSModel.PayType:
          return this.clientPrisma.payType.update({
            where:{
              id: id
            },
            data: <PayType>{
              ...this.model
            }
          });
        case ENSModel.PivotTimesheetTypeEvent:
          pivotTimesheetTypeEvent = this.model;
          return this.clientPrisma.pivotTimesheetTypeEvent.update({
            where:{
              id: id
            },
            data: {
              note: pivotTimesheetTypeEvent.note,
              status_id: pivotTimesheetTypeEvent.status_id,
              check_id: pivotTimesheetTypeEvent.check_id,
              timesheet_id: pivotTimesheetTypeEvent.timesheet_id,
              timesheet_Type_Event_id: pivotTimesheetTypeEvent.timesheet_Type_Event_id,
              user_id: pivotTimesheetTypeEvent.user_id,
              company_parameter_id: pivotTimesheetTypeEvent.company_parameter_id
            },
            include: { status: true, user: true, timesheet: true, timesheet_type: true, companyParams: true, check: true }
          });
      }
    }else{
      throw new Error('the model is mandatory for create a new record into the database');
    }
  }

  async findByName(name: string):Promise<ETModelByName | ETModelByName[]>{
    switch (this.typeOfModel){
      case ENSModelByName.User:
        return this.clientPrisma.user.findUnique({
          where: {
            name: name
          },
          include: { CompanyParams: true, rol: true, payType: true }
        });
      case ENSModelByName.Rol:
        return this.clientPrisma.rol.findUnique({
          where: {
            name: name
          }
        });
      case ENSModelByName.Check:
        return this.clientPrisma.check.findMany({
          where: {
            name: name
          }
        });
      case ENSModelByName.PayType:
        return this.clientPrisma.payType.findUnique({
          where: {
            name: name
          }
        });
      case ENSModelByName.Status:
        return this.clientPrisma.status.findUnique({
          where: {
            name: name
          }
        });
      case ENSModelByName.TimesheetTypeEvent:
        return this.clientPrisma.timesheetTypeEvent.findUnique({
          where: {
            name: name
          }
        });
      case ENSModelByName.CompanyParameter:
        return this.clientPrisma.companyParameter.findUnique({
          where: {
            name: name
          }
        });
      default:
        Logger.error('The type of model was incorrect, pls select one allow it for this function ENSModelByName: ', ENSModelByName)
        throw new Error('The type of model was incorrect, pls select one allow it for this function')
    }
  }

  async findByEmail(email: string):Promise<ETModelByEmail>{
    switch (this.typeOfModel){
      case ENSModelByEmail.User:
        return this.clientPrisma.user.findUnique({
          where: {
            email: email
          },
          include: { CompanyParams: true, rol: true, payType: true }
        });
      case ENSModelByEmail.CompanyParameter:
        return this.clientPrisma.companyParameter.findUnique({
          where: {
            email: email
          }
        });
      default:
        Logger.error('The type of model was incorrect, pls select one allow it for this function ENSModelByEmail: ', ENSModelByEmail)
        throw new Error('The type of model was incorrect, pls select one allow it for this function')
    }
  }

  async findById(id: number):Promise<ETModel>{
    switch (this.typeOfModel){
      case ENSModel.User:
        return this.clientPrisma.user.findFirst({
          where:{
            id: id
          },
          include: { CompanyParams: true, rol: true, payType: true }
        });
      case ENSModel.PivotTimesheetTypeEvent:
        return this.clientPrisma.pivotTimesheetTypeEvent.findFirst({
          where:{
            id: id
          },
          include: { status: true, companyParams: true, user: true, timesheet: true, timesheet_type: true }
        });
      case ENSModel.Rol:
        return this.clientPrisma.rol.findFirst({
          where:{
            id: id
          }
        });
      case ENSModel.PayType:
        return this.clientPrisma.payType.findFirst({
          where:{
            id: id
          }
        });
      case ENSModel.Check:
        return this.clientPrisma.check.findFirst({
          where:{
            id: id
          }
        });
      case ENSModel.Status:
        return this.clientPrisma.status.findFirst({
          where:{
            id: id
          }
        });
      case ENSModel.TimesheetTypeEvent:
        return this.clientPrisma.timesheetTypeEvent.findFirst({
          where:{
            id: id
          }
        });
      case ENSModel.Timesheet:
        return this.clientPrisma.timesheet.findFirst({
          where:{
            id: id
          }
        });
      case ENSModel.CompanyParameter:
        return this.clientPrisma.companyParameter.findFirst({
          where:{
            id: id
          }
        });
    }
  }

  async delete(id: number):Promise<ETModel>{
    switch (this.typeOfModel){
      case ENSModel.User:
        return this.clientPrisma.user.delete({
          where:{
            id: id
          },
          include: { check: true, CompanyParams: true, rol: true, payType: true, pivotTimesheetTypeEvents:true }
        });
      case ENSModel.PivotTimesheetTypeEvent:
        return this.clientPrisma.pivotTimesheetTypeEvent.delete({
          where:{
            id: id
          },
          include: { status: true, companyParams: true, user: true, timesheet: true, timesheet_type: true }
        });
      case ENSModel.Rol:
        return this.clientPrisma.rol.delete({
          where:{
            id: id
          }
        });
      case ENSModel.PayType:
        return this.clientPrisma.payType.delete({
          where:{
            id: id
          }
        });
      case ENSModel.Check:
        return this.clientPrisma.check.delete({
          where:{
            id: id
          }
        });
      case ENSModel.Status:
        return this.clientPrisma.status.delete({
          where:{
            id: id
          }
        });
      case ENSModel.TimesheetTypeEvent:
        return this.clientPrisma.timesheetTypeEvent.delete({
          where:{
            id: id
          }
        });
      case ENSModel.Timesheet:
        return this.clientPrisma.timesheet.delete({
          where:{
            id: id
          }
        });
      case ENSModel.CompanyParameter:
        return this.clientPrisma.companyParameter.delete({
          where:{
            id: id
          }
        });
    }
  }

  async pagination(take:number = 10, skip:number = 0):Promise<ETModel[]>{
    switch (this.typeOfModel){
      case ENSModel.User:
        return this.clientPrisma.user.findMany({
          include: { CompanyParams: true, rol: true, payType: true},
          orderBy:{
            id: 'asc'
          },
          take: parseInt(take.toString()),
          skip: parseInt(skip.toString())
        });
      case ENSModel.PivotTimesheetTypeEvent:
        return this.clientPrisma.pivotTimesheetTypeEvent.findMany({
          include: { status: true, companyParams: true, user: true, timesheet: true, timesheet_type: true, check: true },
          orderBy:{
            id: 'asc'
          },
          take: parseInt(take.toString()),
          skip: parseInt(skip.toString())
        });
      case ENSModel.Rol:
        return this.clientPrisma.rol.findMany({
          orderBy:{
            id: 'asc'
          },
          take: parseInt(take.toString()),
          skip: parseInt(skip.toString())
        });
      case ENSModel.PayType:
        return this.clientPrisma.payType.findMany({
          orderBy:{
            id: 'asc'
          },
          take: parseInt(take.toString()),
          skip: parseInt(skip.toString())
        });
      case ENSModel.Check:
        return this.clientPrisma.check.findMany({
          orderBy:{
            id: 'asc'
          },
          take: parseInt(take.toString()),
          skip: parseInt(skip.toString())
        });
      case ENSModel.Status:
        return this.clientPrisma.status.findMany({
          orderBy:{
            id: 'asc'
          },
          take: parseInt(take.toString()),
          skip: parseInt(skip.toString())
        });
      case ENSModel.TimesheetTypeEvent:
        return this.clientPrisma.timesheetTypeEvent.findMany({
          orderBy:{
            id: 'asc'
          },
          take: parseInt(take.toString()),
          skip: parseInt(skip.toString())
        });
      case ENSModel.Timesheet:
        return this.clientPrisma.timesheet.findMany({
          orderBy:{
            id: 'asc'
          },
          take: parseInt(take.toString()),
          skip: parseInt(skip.toString())
        });
      case ENSModel.CompanyParameter:
        return this.clientPrisma.companyParameter.findMany({
          orderBy:{
            id: 'asc'
          },
          take: parseInt(take.toString()),
          skip: parseInt(skip.toString())
        });
    }
  }

  async findPivotTimeSheeetCheck(id: number):Promise<PivotTimesheetTypeEvent>{
    return this.clientPrisma.pivotTimesheetTypeEvent.findFirst({
      where:{
        check_id: id
      }
    });
  }

  async disconnect(){
    return this.clientPrisma.$disconnect();
  }
}
