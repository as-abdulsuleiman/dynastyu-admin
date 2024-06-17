/** @format */

export const athleteFilter = [
  {
    id: 1,
    label: "Active",
    value: {
      isActive: {
        equals: true,
      },
    },
  },
  // {
  //   id: 2,
  //   label: "Inactive",
  //   value: {
  //     isActive: {
  //       equals: false,
  //     },
  //   },
  // },
  {
    id: 2,
    label: "Verified",
    value: {
      athleteProfile: {
        is: {
          verified: {
            equals: true,
          },
        },
      },
    },
  },
  {
    id: 3,
    label: "Featured",
    value: {
      athleteProfile: {
        is: {
          featured: {
            equals: true,
          },
        },
      },
    },
  },
  // {
  //   id: 4,
  //   label: "Not Verified",
  //   value: {
  //     athleteProfile: {
  //       is: {
  //         verified: {
  //           equals: false,
  //         },
  //       },
  //     },
  //   },
  // },
];

export const coachFilter = [
  {
    id: 1,
    label: "Active",
    value: {
      isActive: {
        equals: true,
      },
    },
  },
  // {
  //   id: 2,
  //   label: "Inactive",
  //   value: {
  //     isActive: {
  //       equals: false,
  //     },
  //   },
  // },
  {
    id: 2,
    label: "Verified",
    value: {
      coachProfile: {
        is: {
          verified: {
            equals: true,
          },
        },
      },
    },
  },
  // {
  //   id: 3,
  //   label: "Featured",
  //   value: {
  //     coachProfile: {
  //       is: {
  //         featured: {
  //           equals: true,
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   id: 4,
  //   label: "Not Verified",
  //   value: {
  //     athleteProfile: {
  //       is: {
  //         verified: {
  //           equals: false,
  //         },
  //       },
  //     },
  //   },
  // },
];

export const fanFilter = [
  {
    id: 1,
    label: "Active",
    value: {
      isActive: {
        equals: true,
      },
    },
  },
  // {
  //   id: 2,
  //   label: "Inactive",
  //   value: {
  //     isActive: {
  //       equals: false,
  //     },
  //   },
  // },
  {
    id: 2,
    label: "Inactive",
    value: {
      isActive: {
        equals: false,
      },
    },
  },
  // {
  //   id: 3,
  //   label: "Featured",
  //   value: {
  //     coachProfile: {
  //       is: {
  //         featured: {
  //           equals: true,
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   id: 4,
  //   label: "Not Verified",
  //   value: {
  //     athleteProfile: {
  //       is: {
  //         verified: {
  //           equals: false,
  //         },
  //       },
  //     },
  //   },
  // },
];

const filterItems = [
  { name: "Active", value: "Active" },
  { name: "Inactive", value: "Inactive" },
  { name: "Verified", value: "Verified" },
  { name: "Not Verified", value: "Not Verified" },
  // { name: "Approved", value: "Approved" },
  // { name: "Not Approved", value: "Not Approved" },
];

export const usersFilter = [
  {
    id: 1,
    label: "Active",
    value: {
      isActive: {
        equals: true,
      },
    },
  },
  // {
  //   id: 2,
  //   label: "Inactive",
  //   value: {
  //     isActive: {
  //       equals: false,
  //     },
  //   },
  // },
  {
    id: 2,
    label: "Athletes",
    value: {
      accountType: {
        is: {
          title: {
            equals: "Athlete",
          },
        },
      },
    },
  },
  {
    id: 6,
    label: "Coaches",
    value: {
      accountType: {
        is: {
          title: {
            equals: "Coach",
          },
        },
      },
    },
  },
  {
    id: 5,
    label: "Fans",
    value: {
      accountType: {
        is: {
          title: {
            equals: "Fan",
          },
        },
      },
    },
  },
  // {
  //   id: 4,
  //   label: "Not Verified",
  //   value: {
  //     athleteProfile: {
  //       is: {
  //         verified: {
  //           equals: false,
  //         },
  //       },
  //     },
  //   },
  // },
];

export const athleteHeaderItems = [
  { name: "Name" },
  { name: "Username" },
  { name: "Email" },
  { name: "Position" },
  { name: "Created At" },
  { name: "Updated At" },
  { name: "Status" },
  { name: "Verified" },
  { name: "Featured" },
  { name: "Actions" },
];
