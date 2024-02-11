import {
  CompanyParameter,
  Timesheet,
  TimesheetTypeEvent,
  Status,
  User,
  Check,
  PayType,
  Rol,
  PivotTimesheetTypeEvent } from '@prisma/client';

export type ETModel =
  CompanyParameter |
  Timesheet |
  TimesheetTypeEvent |
  Status |
  User |
  Check |
  PayType |
  Rol |
  PivotTimesheetTypeEvent;

export type ENModel =
  'User' |
  'Rol' |
  'CompanyParameter' |
  'Timesheet' |
  'TimesheetTypeEvent' |
  'Status' |
  'Check' |
  'PayType' |
  'PivotTimesheetTypeEvent';

export enum ENSModel {
  User = 'User',
  Rol = 'Rol',
  CompanyParameter = 'CompanyParameter',
  Timesheet = 'Timesheet',
  TimesheetTypeEvent = 'TimesheetTypeEvent',
  Status = 'Status',
  Check = 'Check',
  PayType = 'PayType',
  PivotTimesheetTypeEvent = 'PivotTimesheetTypeEvent'
}

export type ENModelByName =
  'User' |
  'Rol' |
  'CompanyParameter' |
  'TimesheetTypeEvent' |
  'Status' |
  'Check' |
  'PayType';

export type ETModelByName =
  CompanyParameter |
  TimesheetTypeEvent |
  Status |
  User |
  Check |
  PayType |
  Rol;

export enum ENSModelByName {
  User = 'User',
  Rol = 'Rol',
  CompanyParameter = 'CompanyParameter',
  TimesheetTypeEvent = 'TimesheetTypeEvent',
  Status = 'Status',
  Check = 'Check',
  PayType = 'PayType'
}

export type ENModelByEmail =
  'User' |
  'CompanyParameter';

export type ETModelByEmail =
  CompanyParameter |
  User;

export enum ENSModelByEmail {
  User = 'User',
  CompanyParameter = 'CompanyParameter'
}

