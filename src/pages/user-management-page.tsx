import { Button } from "@/components/button";
import CellAction from "@/components/cell-action";
import Container from "@/components/container";
import { DataTable } from "@/components/data-table";
import Header from "@/components/header";

import { useUserModal } from "@/hooks/user-modal-store";
import { cn } from "@/lib/utils";
import { FullDataType } from "@/types";
import { getItem, setItem } from "@/utils";

import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

const UserManagementPage = () => {
  const userModal = useUserModal();
  const RBAC_DATA = getItem("rbac_data") as FullDataType;

  const formattedUsers = RBAC_DATA.users.map((item) => {
    const role = RBAC_DATA.roles.find((role) => role.id == item.role);
    return {
      id: item.id,
      name: item.name,
      email: item.email,
      status: item.isActive ? "Active" : "InActive",
      role: role?.name || "",
    };
  });

  return (
    <Container>
      <Header title="Manage Users" style="header-primary" />
      <div className="flex gap-2 mb-2 sm:items-center items-start">
        <h2 className="text-sm  text-nowrap uppercase font-semibold text-red-500">
          Note :
        </h2>
        <p className="text-xs text-grey_dark_2">
          Please create roles first if no roles exist in the Role Management
          Page.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <Button onClick={() => userModal.onOpen(null)} variant="secondary">
          <Plus className="inline-block" /> Add User
        </Button>
        <DataTable
          filterKey="name"
          placeholder="Filter By Name..."
          columns={columns}
          data={formattedUsers}
        />
      </div>
    </Container>
  );
};

export default UserManagementPage;

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <p
        className={cn(
          " rounded px-2 py-1 text-white w-fit",
          row.original.status == "Active"
            ? "bg-primary_red"
            : "opacity-70 bg-red-600"
        )}
      >
        {row.original.status}
      </p>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <p className="bg-primary_red rounded px-2 py-1 text-white w-fit">
        {row.original.role}
      </p>
    ),
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const RBAC_DATA = getItem("rbac_data") as FullDataType;
      const user = RBAC_DATA.users.find((item) => item.id == row.original.id);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const userModal = useUserModal();
      const onUpdate = () => {
        userModal.onOpen(user || null);
      };

      const onDelete = () => {
        RBAC_DATA.users = RBAC_DATA.users.filter(
          (user) => user.id != row.original.id
        );
        setItem("rbac_data", RBAC_DATA);
        window.location.reload();
      };

      return (
        <>
          <CellAction onUpdate={onUpdate} onDelete={onDelete} />
        </>
      );
    },
  },
];
