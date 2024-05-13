import { createUser, updateUser } from "@/actions/users";
import { prisma } from "../../../../prisma/client";
import RoleSelect from "./RoleSelect";

export default async function User({ params }: { params: { id: number } }) {
  const id = +params.id;
  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      role: true,
    },
  });
  const roles = await prisma.userRole.findMany({
    orderBy: {
      permissionLevel: "desc",
    },
  });

  if (!existingUser && id !== 0)
    //the route users/0 is used for user creation
    return (
      <>
        <h1>User not found.</h1>
      </>
    );

  return (
    <form action={existingUser ? updateUser : createUser}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={existingUser ? existingUser.name : ""}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={existingUser ? existingUser.email : ""}
        />
      </div>
      <div>
        <label htmlFor="password">
          {existingUser ? "Change Password" : "Password"}
        </label>
        <input type="password" name="password" id="password" />
      </div>
      <RoleSelect roles={roles} existingUser={existingUser} />
      <input
        type="hidden"
        name="existingUserId"
        id="existingUserId"
        value={existingUser ? existingUser.id : ""}
      />
      <button type="submit">
        {existingUser ? "Update User" : "Create User"}
      </button>
    </form>
  );
}
