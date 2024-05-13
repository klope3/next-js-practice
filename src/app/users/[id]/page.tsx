import { prisma } from "../../../../prisma/client";
import CreateUserForm from "../create/page";

export default async function User({ params }: { params: { id: number } }) {
  const user = await prisma.user.findUnique({
    where: {
      id: +params.id,
    },
    include: {
      role: true,
    },
  });

  if (!user)
    return (
      <>
        <h1>User not found.</h1>
      </>
    );

  return (
    <>
      <h1>User - {user.name}</h1>
      <p>Role - {user.role ? user.role.name : "No Role"}</p>
    </>
  );
}
