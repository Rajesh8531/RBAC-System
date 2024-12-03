import PermissionModal from "@/components/modals/permission-modal";
import RoleModal from "@/components/modals/role-modal";
import UserModal from "@/components/modals/user-modal";

const ModalProvider = () => {
  return (
    <>
      <UserModal />
      <RoleModal />
      <PermissionModal />
    </>
  );
};

export default ModalProvider;
