/** @format */

import { GetUserQuery } from "@/services/graphql";
import { AccountType } from "./enums/account-type.enum";

export const getURLParams = (params: any[]) => {
  let itemsObject: any = {};
  params?.forEach((item: any, index: number) => {
    itemsObject = Object.assign({ ...itemsObject, ...item?.value });
  });
  return itemsObject;
};

const inventory = [
  {
    id: 1,
    label: "Active",
    key: "default",
    value: {
      isActive: {
        equals: true,
      },
    },
  },
  {
    id: 1,
    label: "Inactive",
    key: "default",
    value: {
      isActive: {
        equals: false,
      },
    },
  },
  {
    id: 2,
    label: "Verified",
    key: "athleteProfile",
    value: {
      verified: {
        equals: true,
      },
    },
  },
  {
    id: 2,
    label: "Not Verified",
    key: "athleteProfile",
    value: {
      verified: {
        equals: false,
      },
    },
  },
];

export const getQueryParams = (params?: any[]) => {
  let itemsObject: any = {};
  inventory?.forEach((item: any, index: number) => {
    console.log("item", item["key"]);
    let newObject = {};
    if (item["key"] === "athleteProfile") {
      newObject = {
        [item.key]: {
          is: {
            ...item?.value,
          },
        },
      };
    }
    console.log("newObject", newObject);
    itemsObject = Object.assign({ ...itemsObject, ...item?.value });
  });
  return itemsObject;

  // return inventory.reduce((acc:any, obj) => {
  //   const { key, ...rest } = obj;
  //   if (!acc[key]) {
  //     acc[key] = {};
  //   }
  //   acc[key][obj.label] = rest?.value;
  //   return acc;
  // }, {});
  // //   let itemsObject: any = {};
  //  return inventory?.map((item: any, index: number) => {
  //   let itemsObject={}
  //   let profile;
  //   if(item?.key !=="default"){
  //     itemsObject={
  //       [item.key]:{
  //         ...item.value
  //       }
  //     }
  //   }

  //   return itemsObject

  //     // itemsObject = Object.assign({ ...itemsObject, ...item?.value });
  //   });
  // return itemsObject;

  // return inventory.reduce((acc:any, obj) => {
  //   const { key, ...rest } = obj;
  //   if (!acc[key]) {
  //     acc[key] = [];
  //   }
  //   acc[key].push(rest?.value);
  //   return acc;
  // }, {});
};

export const generateProfilePath = (user: GetUserQuery["user"]): string => {
  let userPath = "";
  if (user?.accountType?.title?.toLowerCase() === AccountType.FAN) {
    userPath = `/fan/${user?.id}`;
  } else if (
    user?.accountType?.title?.toLowerCase() === AccountType.ATHLETE
  ) {
    userPath = `/athlete/${user?.id}`;
  } else if (
    user?.accountType?.title?.toLowerCase() === AccountType.COACH
  ) {
    userPath = `/coach/${user?.id}`;
  }
  return userPath;
};

// export const hasSideBarPermissions = (permissions: any, sideBarItems: any) => {
//   const hasAccessControl = sideBarItems?.filter((permission:any) => permissions?.some((item:any) => permission?.acl === item?.title));
//   return hasAccessControl||[]
// };

export const getPermission = (userPermission: any, permissionTitle: string) => {
  const haspermission = userPermission?.find(
    (permission: any) => permission?.title === permissionTitle
  );
  return haspermission?.title;
};

export const hasSideBarPermissions = (sidebarItems: any, permissions: any) => {
  return sidebarItems
    ?.filter((sidebarItem: any) => {
      // Check if the acl of the sidebar item matches any title in the permissions
      const aclMatch = permissions?.some(
        (secItem: any) => sidebarItem?.acl === secItem?.title
      );
      // Check if the acl of any nested item matches any title in the permissions array
      const nestedAclMatch = sidebarItem?.items?.some((nestedItem: any) =>
        permissions?.some((secItem: any) => nestedItem?.acl === secItem?.title)
      );
      return aclMatch || nestedAclMatch;
    })
    ?.map((sidebarItem: any) => {
      // Filter nested permissions that match
      const matchingNestedItems = sidebarItem?.items?.filter(
        (nestedItem: any) =>
          permissions?.some(
            (secItem: any) => nestedItem?.acl === secItem?.title
          )
      );
      return (
        {
          ...sidebarItem,
          items: matchingNestedItems,
        } || []
      );
    });
};

export const sidebarItem = [
  {
    name: "Dashboard",
    path: "/dashboard",
    parentCount: [],
    acl: "dashboard.accesslevel.get",
    items: [],
    hasFill: false,
    hasBadge: false,
  },
  {
    name: "Athletes",
    hasFill: false,
    path: "/athletes",
    acl: "athletes.accesslevel.get",
    items: [],
    hasBadge: false,
    parentCount: [],
  },
  {
    name: "Coaches",
    hasFill: true,
    path: "/coaches",
    hasBadge: true,
    acl: "coaches.accesslevel.get",
    items: [
      {
        name: "Create Coach",
        path: "/coaches/new",
        acl: "coches.accesslevel.update",
      },
      {
        name: "Verification Request",
        path: "/coaches/verification-request",
        hasBadge: true,
        acl: "coches.accesslevel.update",
      },
    ],
  },
  {
    name: "Fans",
    hasFill: true,
    path: "/fans",
    hasBadge: false,
    parentCount: [],
    acl: "fans.accesslevel.get",
    items: [],
  },
  {
    name: "Schools",
    hasFill: false,
    path: "/schools/college",
    hasBadge: false,
    parentCount: [],
    acl: "schools.accesslevel.get",
    items: [
      {
        name: "College",
        path: "/schools/college",
        hasBadge: false,
        count: 0,
        acl: "schools.accesslevel.get",
      },
      {
        name: "High School",
        path: "/schools/high-school",
        hasBadge: false,
        acl: "schools.accesslevel.get",
        count: 0,
      },
      {
        name: "Create School",
        path: "/schools/new",
        hasBadge: false,
        acl: "schools.accesslevel.update",
        count: 0,
      },
    ],
  },
  {
    name: "Flagged Posts",
    hasFill: false,
    path: "/flagged-posts",
    hasBadge: false,
    acl: "flaggedposts.accesslevel.get",
    items: [],
  },
  {
    name: "Skill Types",
    hasFill: true,
    path: "/skill-types",
    hasBadge: false,
    acl: "skilltypes.accesslevel.get",
    items: [
      {
        name: "Create Skill Type",
        path: "/skill-types/new",
        acl: "skilltypes.accesslevel.update",
      },
      {
        name: "Verification Request",
        path: "/skill-types/verification-request",

        acl: "skilltypes.accesslevel.get",
      },
    ],
  },
  {
    name: "Notifications",
    hasFill: false,
    path: "/notifications",
    hasBadge: false,

    acl: "notifications.accesslevel.get",
    items: [],
  },
  {
    name: "Settings",
    hasFill: false,
    path: "/profile-settings",
    hasBadge: false,
    parentCount: [],
    acl: "settings.accesslevel.get",
    items: [
      {
        name: "Profile",
        path: "/profile-settings",
        hasBadge: false,
        count: 0,
        acl: "settings.accesslevel.get",
      },
      {
        name: "Staff",
        path: "/staff-settings",
        hasBadge: false,
        count: 0,
        acl: "settings.accesslevel.get",
      },
      {
        name: "Security",
        path: "/security-settings",
        hasBadge: false,
        count: 0,
        acl: "settings.accesslevel.get",
      },
    ],
  },
  {
    name: "Admin",
    hasFill: false,
    path: "/account-types",
    hasBadge: false,
    parentCount: [],
    acl: "admin.accesslevel.get",
    items: [
      {
        name: "Account Types",
        path: "/account-types",
        hasBadge: false,
        count: 0,
        acl: "admin.accesslevel.get",
      },
      {
        name: "School Types",
        path: "/school-types",
        hasBadge: false,
        count: 0,
        acl: "admin.accesslevel.get",
      },
      {
        name: "Roles",
        path: "/roles",
        hasBadge: false,
        count: 0,
        acl: "admin.accesslevel.get",
      },
      {
        name: "Permissions",
        path: "/permissions",
        hasBadge: false,
        count: 0,
        acl: "admin.accesslevel.get",
      },
    ],
  },
];
