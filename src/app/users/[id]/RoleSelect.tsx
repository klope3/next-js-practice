"use client";
import { User, UserRole } from "@prisma/client";
import { ChangeEvent, useRef } from "react";

type RoleSelectProps = {
  roles: UserRole[];
  existingUser: User | null;
};
export default function RoleSelect({ roles, existingUser }: RoleSelectProps) {
  const roleIdRef = useRef(null as HTMLInputElement | null);

  function onChangeSelection(e: ChangeEvent<HTMLSelectElement>) {
    if (!roleIdRef.current) return;

    const roleId = e.target.selectedOptions[0].dataset.roleid;
    roleIdRef.current.value = `${roleId}`;
  }

  return (
    <div>
      <label htmlFor="role-select">Role</label>
      <select name="role-select" id="role-select" onChange={onChangeSelection}>
        {roles.map((role) => (
          <option
            data-roleid={role.id}
            selected={
              existingUser ? existingUser.roleId === role.id : undefined
            }
          >
            {role.name}
          </option>
        ))}
      </select>
      <input type="hidden" name="roleId" ref={roleIdRef} value={roles[0].id} />
    </div>
  );
}
