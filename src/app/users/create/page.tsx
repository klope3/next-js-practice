import { createUser } from "@/actions/users";
import { prisma } from "../../../../prisma/client";
import RoleSelect from "./RoleSelect";

export default async function CreateUserForm() {
  const roles = await prisma.userRole.findMany({
    orderBy: {
      permissionLevel: "desc",
    },
  });

  return (
    <form action={createUser}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <RoleSelect roles={roles} />
      <button type="submit">Create User</button>
    </form>
  );
}
