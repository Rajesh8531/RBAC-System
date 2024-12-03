import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 } from "uuid";

import { usePermissionModal } from "@/hooks/permission-modal-store";
import Modal from "./modal";
import Header from "../header";
import { Input } from "../input";
import { Button } from "../button";
import { getItem, setItem } from "@/utils";
import { FullDataType } from "@/types";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a valid name for Permission",
  }),
});

const PermissionModal = () => {
  const permissionModal = usePermissionModal();

  const [isClosing, setIsClosing] = useState(false);

  const RBAC_DATA = getItem("rbac_data") as FullDataType;
  const existingPermissions = RBAC_DATA?.permissions.map(
    (permission) => permission.name
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    // Populating the values if the modal is in the update mode
    if (permissionModal.data) {
      setValue("name", permissionModal.data.name);
    }
  }, [setValue, permissionModal.data]);

  // Ensuring the animation when closing
  const onClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      permissionModal.onClose();
      reset();
      setIsClosing(false);
    }, 300);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (permissionModal.data) {
      // Updating the existing permission
      const existingPermission = RBAC_DATA.permissions.find(
        (item) => permissionModal.data!.id == item.id
      );
      existingPermission!.name = values.name;
    } else {
      if (existingPermissions.includes(values.name)) {
        // Resisting the submission if permission already existing
        setError("name", {
          message: "Permission Already Existing",
        });
        return;
      }
      // Creating new Permission
      const newId = v4();
      const newPermission = {
        id: newId,
        name: values.name,
      };
      RBAC_DATA.permissions = [...RBAC_DATA.permissions, newPermission];
    }
    setItem("rbac_data", RBAC_DATA);
    onClose();
  };

  return (
    <Modal
      isClosing={isClosing}
      isOpen={permissionModal.isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col gap-6">
        <Header
          title={
            permissionModal.data ? "Update Permission" : "Create New Permission"
          }
          style="header-secondary"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            id="name"
            error={errors.name}
            {...register("name")}
            type="text"
            placeholder=" "
          />
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

export default PermissionModal;
