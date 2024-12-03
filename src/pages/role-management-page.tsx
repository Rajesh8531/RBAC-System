import { Button } from "@/components/button";
import CellAction from "@/components/cell-action";
import Container from "@/components/container";
import { DataTable } from "@/components/data-table";
import Header from "@/components/header";
import { useRoleModal } from "@/hooks/role-modal-store";
import { FullDataType } from "@/types";
import { getItem, setItem } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

const RoleManagementPage = () => {
  const roleModal = useRoleModal();
  const RBAC_DATA = getItem("rbac_data") as FullDataType;

  const formattedRoles = RBAC_DATA.roles.map((role) => {
    const permissions = [];
    for (const permission of role.permissions) {
      const permissionObj = RBAC_DATA.permissions.find(
        (per) => per.id == permission
      );
      if (permissionObj) {
        permissions.push(permissionObj?.name);
      }
    }
    return {
      id: role.id,
      name: role.name,
      permissions: permissions,
    };
  });

  return (
    <Container>
      <Header title="Manage Roles" style="header-primary" />
      <div className="flex gap-2 sm:items-center mb-2 items-start">
        <h2 className="text-sm uppercase font-semibold text-nowrap text-red-500">
          Note :
        </h2>
        <p className="text-xs text-grey_dark_2">
          Please create permission first if no permissions exist in the Role
          Management Page.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <Button onClick={() => roleModal.onOpen(null)} variant="secondary">
          <Plus className="inline-block" /> Add Role
        </Button>
        <DataTable
          filterKey="name"
          placeholder="Filter By Name..."
          columns={columns}
          data={formattedRoles}
        />
      </div>
    </Container>
  );
};

export default RoleManagementPage;

interface Role {
  id: string;
  permissions: string[];
  name: string;
}

const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-1 flex-wrap">
          {row.original.permissions.map((item, index) => (
            <p
              key={index}
              className="bg-primary_red rounded px-2 py-1 text-white"
            >
              {item}
            </p>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const RBAC_DATA = getItem("rbac_data") as FullDataType;
      const role = RBAC_DATA.roles.find((item) => item.id == row.original.id);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const roleModal = useRoleModal();
      const onUpdate = () => {
        roleModal.onOpen(role || null);
      };

      const onDelete = () => {
        const usersCount = RBAC_DATA.users.filter(
          (user) => user.role == row.original.id
        ).length;

        if (usersCount > 0) {
          toast.error("Can't be deleted. Users found with this role");
        } else {
          RBAC_DATA.roles = RBAC_DATA.roles.filter(
            (role) => role.id != row.original.id
          );
          setItem("rbac_data", RBAC_DATA);
          window.location.reload();
        }
      };
      return (
        <>
          <CellAction onUpdate={onUpdate} onDelete={onDelete} />
        </>
      );
    },
  },
];
