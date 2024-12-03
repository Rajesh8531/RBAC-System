import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 } from "uuid";

import Modal from "./modal";
import Header from "../header";
import { Input } from "../input";
import { Button } from "../button";
import { getItem, setItem } from "@/utils";
import { FullDataType } from "@/types";
import { useUserModal } from "@/hooks/user-modal-store";
import { CheckBox } from "../check-box";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a valid name for User",
  }),
  email: z.string().email({ message: "Please Enter a valid Email" }),
  isActive: z.boolean(),
  role: z.string().min(1, { message: "Please Select the role of the User" }),
});

const UserModal = () => {
  const userModal = useUserModal();
  const [isClosing, setIsClosing] = useState(false);

  const RBAC_DATA = getItem("rbac_data") as FullDataType;

  const exisingEmails = RBAC_DATA?.users.map((user) => user.email);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userModal.data?.name || "",
      email: userModal.data?.email || "",
      isActive: !!userModal.data?.isActive,
      role: userModal.data?.role || "",
    },
  });

  const roleError = errors.role;

  const onClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      userModal.onClose();
      reset();
      userModal.onClose();
      reset();
      setIsClosing(false);
    }, 300);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (userModal.data) {
      // Updating the user
      const existingUser = RBAC_DATA.users.find(
        (item) => userModal.data!.id == item.id
      );
      existingUser!.name = values.name;
      existingUser!.email = values.email;
      existingUser!.isActive = values.isActive;
      existingUser!.role = values.role;
    } else {
      if (exisingEmails.includes(values.email)) {
        // Resisting the submition if email already existing
        setError("email", {
          message: "Email Already Existing",
        });
        return;
      }
      // Creating the User
      const newId = v4();
      const newUser = {
        id: newId,
        name: values.name,
        isActive: values.isActive,
        email: values.email,
        role: values.role,
      };
      RBAC_DATA.users = [...RBAC_DATA.users, newUser];
    }
    setItem("rbac_data", RBAC_DATA);
    onClose();
  };

  useEffect(() => {
    // Populating the values if the modal is in the update mode
    if (userModal?.data) {
      setValue("email", userModal.data.email);
      setValue("name", userModal.data.name);
      setValue("isActive", userModal.data.isActive);
      setValue("role", userModal.data.role);
    }
  }, [userModal.data, setValue]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("isActive", event.target.checked);
  };

  return (
    <Modal isClosing={isClosing} isOpen={userModal.isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <Header
          title={userModal.data ? "Update User" : "Create New User"}
          style="header-secondary"
        />
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            id="name"
            error={errors.name}
            {...register("name")}
            type="text"
            placeholder=""
          />
          <Input
            label="Email"
            id="email"
            error={errors.email}
            {...register("email")}
            type="text"
            placeholder=""
          />
          <div>
            <Select
              value={watch("role")}
              onValueChange={(value) => setValue("role", value)}
            >
              <SelectTrigger className="select">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="uppercase">Role</SelectLabel>
                  {RBAC_DATA?.roles.map((item) => (
                    <SelectItem
                      className="focus:bg-primary_red focus:text-white font-semibold"
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {roleError && (
              <p className={cn("input__error")}>{roleError.message}</p>
            )}
          </div>
          <div>
            <CheckBox
              checked={watch("isActive")}
              id="active"
              label="Active"
              onChange={onChange}
            />
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

export default UserModal;
