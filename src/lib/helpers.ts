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
    key: 'default',
    value:{
      isActive: {
        equals: true,
      },
    }
  },
  {  
    id: 1,
    label: "Inactive",
    key: 'default',
   value:{
    isActive: {
      equals: false,
    },
   }
  },
  {
    id: 2,
    label: "Verified",
    key:'athleteProfile',
    value: {
      verified: {
        equals: true,
      },
    },
  }, 
  {
    id: 2,
    label: "Not Verified",
    key:'athleteProfile',
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
    console.log("item",item['key'])
    let newObject ={}
    if(item['key'] === 'athleteProfile'){
      newObject ={
        [item.key]:{
          is:{
            ...item?.value
          }
        }
      }
    }
    console.log("newObject",newObject)
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

 

}

export const generateProfilePath = (user: GetUserQuery["user"]): string => {
  let userPath = "";
  if (user?.accountType?.role?.title?.toLowerCase() === AccountType.FAN) {
    userPath = `/fan/${user?.id}`;
  } else if (
    user?.accountType?.role?.title?.toLowerCase() === AccountType.ATHLETE
  ) {
    userPath = `/athlete/${user?.id}`;
  } else if (
    user?.accountType?.role?.title?.toLowerCase() === AccountType.COACH
  ) {
    userPath = `/coach/${user?.id}`;
  }
  return userPath;
};
