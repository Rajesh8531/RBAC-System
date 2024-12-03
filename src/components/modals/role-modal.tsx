import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 } from "uuid";

import Modal from "./modal";
import Header from "../header";
import { Input } from "../input";
import { Button } from "../button";
import { useRoleModal } from "@/hooks/role-modal-store";
import { getItem, setItem } from "@/utils";
import { FullDataType } from "@/types";
import { CheckBox } from "../check-box";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a valid name for Role",
  }),
  permissions: z
    .string()
    .array()
    .min(1, { message: "At least 1 Permission is Required" }),
});

const RoleModal = () => {
  const roleModal = useRoleModal();
  const RBAC_DATA = getItem("rbac_data") as FullDataType;
  const [isClosing, setIsClosing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: roleModal.data?.name || "",
      permissions: roleModal.data?.permissions || [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (roleModal.data) {
      // Updating the role
      const exisintRole = RBAC_DATA.roles.find(
        (item) => roleModal.data!.id == item.id
      );
      exisintRole!.name = values.name;
      exisintRole!.permissions = values.permissions;
    } else {
      // Creating the role
      const newId = v4();
      const newRole = {
        id: newId,
        name: values.name,
        permissions: values.permissions,
      };
      RBAC_DATA.roles = [...RBAC_DATA.roles, newRole];
    }

    setItem("rbac_data", RBAC_DATA);
    onClose();
  };

  useEffect(() => {
    // Populating the values if the modal is in the update mode
    if (roleModal.data) {
      setValue("name", roleModal.data.name);
      setValue("permissions", roleModal.data.permissions);
      setPermissions(roleModal.data.permissions);
    }
  }, [roleModal.data, setValue]);

  const [permissions, setPermissions] = useState<string[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    // Toggling permissions
    if (permissions.includes(id)) {
      // if permission already existing
      setValue(
        "permissions",
        permissions.filter((item) => item != id)
      );
      setPermissions(permissions.filter((item) => item != id));
    } else {
      // if permission not existing
      setValue("permissions", [...permissions, id]);
      setPermissions([...permissions, id]);
    }
  };

  const permissionsError = errors.permissions;

  // Ensuring the animation when closing
  const onClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      roleModal.onClose();
      setPermissions([]);
      reset();
      setIsClosing(false);
    }, 300);
  };

  return (
    <Modal isClosing={isClosing} isOpen={roleModal.isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <Header
          title={roleModal.data ? "Update Role" : "Create New Role"}
          style="header-secondary"
        />
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            id="name"
            error={errors.name}
            {...register("name")}
            type="text"
            placeholder=" "
          />
          <div className="check-boxes-group">
            <p className="font-semibold text-grey_dark_1">Permissions</p>
            {RBAC_DATA?.permissions.map((item) => (
              <CheckBox
                checked={watch("permissions").includes(item.id)}
                key={item.id}
                id={item.id}
                label={item.name}
                onChange={onChange}
              />
            ))}
            {permissionsError && (
              <p className={cn("input__error")}>{permissionsError.message}</p>
            )}
          </div>
          <div className="mt-8 flex justify-end gap-6 ">
            <Button type="button" variant="danger" onClick={onClose}>
              close
            </Button>
            <Button type="submit" variant="primary">
              submit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RoleModal;
