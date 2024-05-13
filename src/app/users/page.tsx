import { prisma } from "../../../prisma/client";

export default async function Users() {
  const users = await prisma.user.findMany({
    include: {
      role: true,
    },
  });

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li>
            <a href={`/users/${user.id}`}>
              {user.name} ({user.role ? user.role.name : "No Role"})
            </a>
          </li>
        ))}
      </ul>
      <a href="/users/create">Create User</a>
    </div>
  );
}
