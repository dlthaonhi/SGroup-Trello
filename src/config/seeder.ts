import { DataSource } from "typeorm";
import { Roles } from "../model/roles.entity";
import { Permissions } from "../model/permissions.entity";
import { Users } from "../model/users.entity";
import { userRepository } from "../api/user/userRepository";
import bcrypt from "bcryptjs";



export async function seedData(dataSource: DataSource) {
  // const roleRepository = dataSource.getRepository(Roles);
  // const permissionRepository = dataSource.getRepository(Permissions);

  // const existingRoles = await roleRepository.count();
  // if (existingRoles > 0) {
  //   console.log("Seed data already exists, skipping seeding.");
  //   return;
  // }

  // const permissions = [
  //   { action: "read" },
  //   { action: "write" },
  //   { action: "delete" },
  //   { action: "*" },
  // ];

  // const createdPermissions = await permissionRepository.save(permissions);

    //create Users
    const users: Users[] = [];
    for (let i = 0; i < 3; i++) {
      const existedEmail = await userRepository.findByEmailAsync(`user${i}@gmail.com`);
      if (!existedEmail) {
        const user = new Users();
        user.name = `user${i}`;
        user.password = await bcrypt.hash(`user${i}`, 10);
        user.email = `user${i}@gmail.com`;
        users.push(user);
      }
    }
    await userRepository.createManyUsersAsync(users);

  console.log("Seed data inserted successfully");
}
