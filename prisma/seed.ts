import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// @ts-ignore
import bcryptjs from "bcryptjs";
async function main() {
  const payType = await prisma.payType.createMany({
    data:[
      {
        name: 'Hourly'
      },
      {
        name: 'Weekendly'
      },
      {
        name: 'Monthly'
      },
      {
        name: 'Semesterly'
      },
      {
        name: 'Yearly'
      },
      {
        name: 'Undifined'
      }
    ]
  });
  const rol = await prisma.rol.createMany({
    data: [
      {
        name: 'Administraitor'
      },
      {
        name: 'Customer'
      },
      {
        name: 'Employee'
      }
    ]
  });

  const status = await prisma.status.createMany({
    data:[
      {
        name: 'Canceled'
      },
      {
        name: 'Payed'
      },
      {
        name: 'Processing'
      },
      {
        name: 'Refunded Money'
      },
      {
        name: 'Amount Deducted'
      },
      {
        name: 'Bloked'
      },
      {
        name: 'Actived'
      }
    ]
  });
  const timeSheetTypeEvent = await prisma.timesheetTypeEvent.createMany({
    data:[
      {
        name: 'Hourly'
      },
      {
        name: 'Salary'
      }
    ]
  });
  const company = await prisma.companyParameter.create({
    data: {
      name: 'PEOPayGo',
      email: 'admin@peopaygo.com'
    }
  });
  const user = await prisma.user.create({
    data: {
      name: 'fabio',
      password: bcryptjs.hashSync( 'Bladeelpoderoso04!', bcryptjs.genSaltSync(10)),
      email: 'fabio@peopaygo.com',
      pay_date: new Date(Date.now()),
      rol_id: 1,
      pay_type_id: 1,
      company_parameters_id: 1
    }
  });
  console.log({ payType, rol, status, company, user })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
