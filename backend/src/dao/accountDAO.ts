import { getRepository } from "typeorm";
import { EmployeeEntity } from "../entity/employeeEntity";

// async function getEmployeeById(employeeId: string) {
//   try {
//     const repository = getRepository(EmployeeEntity);
//     const employees = await repository.find({id: employeeId});
//     if (employees.length <= 0) {
//       return null;
//     }
//     else {
//       return employees[0].hashPassword;
//     }
//   }
//   catch(e) {
//     throw e;
//   }
// }

async function getEmployeeByAccount(account: string) {
  try {
    const repository = getRepository(EmployeeEntity);
    const employees = await repository.find({account: account});
    if (employees.length <= 0) {
      return null;
    }
    else {
      return employees[0];
    }
  }
  catch(e) {
    throw e;
  }
}

export default {
  getEmployeeByAccount,
}