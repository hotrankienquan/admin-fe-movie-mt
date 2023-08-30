import Link from "next/link";
import React, { useState } from "react";
import { arrItemSidebar } from "./constants";
import { useRouter } from "next/router";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

const SidebarManageInfo = ({ showSideBar }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  // console.log(router);
  // console.log(router.asPath.startsWith(router.pathname));

  // tabs parent dont have submenu
  const handleDropdownClick = (index) => {
    if (activeDropdown === index) {
      return; // Do nothing if the clicked dropdown is already active
    }
    setActiveDropdown(index);
  };

  // tabs parent have submenu
  const handleDropdownSubmenuClick = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  // tabs children
  const handleSubmenuClick = (index) => {
    if (activeSubmenu === index) {
      return; // Do nothing if the clicked dropdown is already active
    }
    setActiveSubmenu(index);
  };

  const originalPath = router.pathname;
  const parts = originalPath.split("/");
  const modifiedPath = `/${parts[1]}`; // Lấy phần tử đầu tiên và thêm dấu /
  // console.log(modifiedPath); // Output: "/manageFilm"
  return (
    <div className={`${showSideBar ? "block hehe" : "hidden"}`}>
      <div className="fixed top-[70px] bottom-0 w-[240px] bg-[#2b3a4a] z-50 transition-transform -translate-x-full sm:translate-x-0">
        {/* https://github.com/abhijithvijayan/react-minimal-side-navigation */}
        <div className="sidebar_manage_info h-full px-3 py-4 overflow-y-auto">
          <Navigation
            activeItemId={modifiedPath}
            onSelect={({ itemId }) => {
              // console.log(itemId);
              if (itemId === "/about") {
                return;
              }
              router.push(itemId);
            }}
            items={[
              {
                title: "Dashboard",
                itemId: `/`,
                // Optional
                elemBefore: () => (
                  <>
                    <i className="fa-solid fa-house"></i>
                  </>
                ),
              },
              {
                title: "Manage Film",
                itemId: `/manageFilm`,
                // Optional
                elemBefore: () => (
                  <>
                    <i className="fa-solid fa-film"></i>
                  </>
                ),
              },
              {
                title: "Manage Account",
                itemId: `/manageAccount`,
                // Optional
                elemBefore: () => (
                  <>
                    <i className="fa-solid fa-user"></i>
                  </>
                ),
              },
              // {
              //   title: "About",
              //   itemId: "/about",
              //   elemBefore: () => <i className="fa-solid fa-cart-shopping"></i>,
              //   subNav: [
              //     {
              //       title: "Projects",
              //       itemId: "/about/projects",
              //       // Optional
              //       elemBefore: () => (
              //         <>
              //           <i className="fa-solid fa-cart-shopping"></i>
              //         </>
              //       ),
              //     },
              //     {
              //       title: "Members",
              //       itemId: "/about/members",
              //       elemBefore: () => (
              //         <i className="fa-solid fa-cart-shopping"></i>
              //       ),
              //     },
              //   ],
              // },
              // {
              //   title: "Another Tab",
              //   itemId: "/another",
              //   subNav: [
              //     {
              //       title: "Teams",
              //       itemId: "/another/teams",
              //       // Optional
              //       // elemBefore: () => <Icon name="calendar" />
              //     },
              //   ],
              // },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarManageInfo;
