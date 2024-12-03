import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SideBar from "./components/layout/side-navbar";
import DashboardPage from "./pages/dashboard-page";
import UserManagementPage from "./pages/user-management-page";
import RoleManagementPage from "./pages/role-management-page";
import PermissionManagementPage from "./pages/permission-management-page";
import { Toaster } from "react-hot-toast";
import ModalProvider from "./provider/modal-provider";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SideBar />}>
          <Route index element={<DashboardPage />} />
          <Route path="manage-users" element={<UserManagementPage />} />
          <Route path="manage-roles" element={<RoleManagementPage />} />
          <Route
            path="manage-permissions"
            element={<PermissionManagementPage />}
          />
        </Route>
      </>
    )
  );
  return (
    <>
      <Toaster />
      <ModalProvider />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
