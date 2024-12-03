import { Button } from "@/components/button";
import CellAction from "@/components/cell-action";
import Container from "@/components/container";
import { DataTable } from "@/components/data-table";
import Header from "@/components/header";
import { usePermissionModal } from "@/hooks/permission-modal-store";
import { FullDataType } from "@/types";
import { getItem, setItem } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

const PermissionManagementPage = () => {
  const permissionModal = usePermissionModal();
  const RBAC_DATA = getItem("rbac_data") as FullDataType;

  const formattedPermissions = RBAC_DATA.permissions.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return (
    <div>
      <Container>
        <Header title="Manage Permissions" style="header-primary" />
        <div className="flex flex-col gap-6">
          <Button
            onClick={() => permissionModal.onOpen(null)}
            variant="secondary"
          >
            <Plus className="inline-block" /> Add Permission
          </Button>
          <DataTable
            filterKey="name"
            placeholder="Filter By Name..."
            columns={columns}
            data={formattedPermissions}
          />
        </div>
      </Container>
    </div>
  );
};

export default PermissionManagementPage;

interface Permission {
  id: string;
  name: string;
}

const columns: ColumnDef<Permission>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const RBAC_DATA = getItem("rbac_data") as FullDataType;
      const permission = RBAC_DATA.permissions.find(
        (item) => item.id == row.original.id
      );
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const permissionModal = usePermissionModal();
      const onUpdate = () => {
        permissionModal.onOpen(permission || null);
      };

      const onDelete = () => {
        RBAC_DATA.roles.map((role) => {
          role.permissions = role.permissions.filter(
            (permission) => permission != row.original.id
          );
        });
        RBAC_DATA.permissions = RBAC_DATA.permissions.filter(
          (item) => item.id != row.original.id
        );
        setItem("rbac_data", RBAC_DATA);
        window.location.reload();
      };
      return (
        <>
          <CellAction onDelete={onDelete} onUpdate={onUpdate} />
        </>
      );
    },
  },
];
