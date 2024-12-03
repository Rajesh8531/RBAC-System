import { cn } from "@/lib/utils";
import { getItem, setItem } from "@/utils";
import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import MobileNavBar from "../mobile-nav-bar";

const SideBar = () => {
  const { pathname } = useLocation();

  const rbac_data = getItem("rbac_data");

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      isActive: pathname == "/",
    },
    {
      name: "Manage Users",
      href: "/manage-users",
      isActive: pathname == "/manage-users",
    },
    {
      name: "Manage Roles",
      href: "/manage-roles",
      isActive: pathname == "/manage-roles",
    },
    {
      name: "Manage Permissions",
      href: "/manage-permissions",
      isActive: pathname == "/manage-permissions",
    },
  ];

  useEffect(() => {
    if (!rbac_data) {
      setItem("rbac_data", {
        roles: [],
        users: [],
        permissions: [
          { id: "__create__", name: "Create" },
          { id: "__delete__", name: "Delete" },
          { id: "__read__", name: "Read" },
          { id: "__update__", name: "Update" },
        ],
      });
    }
  }, [rbac_data]);

  return (
    <div className="flex w-full">
      <nav className="w-[28%] lg:w-[24%] hidden md:flex bg-grey_dark_1 h-screen py-8 flex-col">
        {navItems.map((item) => (
          <NavLink
            to={item.href}
            key={item.href}
            className={cn(
              item.isActive
                ? "bg-gradient-to-r from-primary_red to-primary_light active:bg-opacity-90 text-white px-[2rem] py-[1rem] w-full"
                : "nav__item hover:text-white"
            )}
          >
            <div
              className={cn(
                item.isActive ? " uppercase font-semibold " : "nav__link"
              )}
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </nav>
      <MobileNavBar navItems={navItems} />
      <div className="flex-1 p-2 sm:p-8 bg-gradient-to-r h-screen from-primary_light to-primary_dark">
        <Outlet />
      </div>
    </div>
  );
};

export default SideBar;
