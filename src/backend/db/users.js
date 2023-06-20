import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: 100,
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio:"Hey, Aadrash Here",
    website: "https://twiiter.com",
    profileAvatar:
    "https://picsum.photos/id/1012/150",

    likes:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
        {_id: 101,firstName: "Mayank",username: "Mayanksingh0801@gmail.com",profileAvatar:
        "https://picsum.photos/id/1009/150",
        },
    ],
    following: [
      {_id: 101,firstName: "Mayank",username: "Mayanksingh0801@gmail.com",profileAvatar:
      "https://picsum.photos/id/1009/150", 
      },
    ],
    bookmarks: [],
  },
  {
    _id: 101,
    firstName: "Mayank",
    lastName: "Kumar",
    username: "Mayanksingh0801@gmail.com",
    password: "mayank123",
    bio:"Hey, Mayank Here",
    website: "https://google.com",
    profileAvatar:"https://picsum.photos/id/1009/150",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      {_id: 100,firstName: "Adarsh",username: "adarshbalika",profileAvatar:
      "https://picsum.photos/id/1012/150", 
      },
    ],
    following: [
      {_id: 100,firstName: "Adarsh",username: "adarshbalika",profileAvatar:
      "https://picsum.photos/id/1012/150",
    },
    {_id: 102,firstName: "Yuvraj",username: "Spidy",profileAvatar:
    "https://picsum.photos/id/100/150",
    },
    ],
    bookmarks: [],
  },
  {
    _id:102,
    firstName: "Yuvraj",
    lastName: "Thakur",
    username: "Spidy",
    password: "Spidy123",
    bio:"Hey,Yuvraj Here",
    website: "https://facebook.com",
    profileAvatar:
    "https://picsum.photos/id/100/150",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
        {_id: 101,firstName: "Mayank",username: "Mayanksingh0801@gmail.com",profileAvatar:
        "https://picsum.photos/id/1009/150",
        },
        {_id: 103,firstName: "Ram",username: "itsRam",profileAvatar:
        "https://picsum.photos/id/1005/150",
        },
    ],
    following: [
      {_id: 100,firstName: "Adarsh",username: "adarshbalika",profileAvatar:
      "https://picsum.photos/id/1012/150", 
      },
      {_id: 103,firstName: "Ram",username: "itsRam",profileAvatar:
      "https://picsum.photos/id/1005/150", 
      },
    ],
    bookmarks: [],
  },
  {
    _id: 103,
    firstName: "Ram",
    lastName: "Kumar",
    username: "itsRam",
    password: "Ram123",
    bio:"Hey, Ram Here",
    website: "https://microsoft.com",
    profileAvatar:"https://picsum.photos/id/1005/150",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      {_id: 100,firstName: "Adarsh",username: "adarshbalika",profileAvatar:
      "https://picsum.photos/id/1012/150",
    },
    ],
    followers: [
      {_id: 100,firstName: "Adarsh",username: "adarshbalika",profileAvatar:
      "https://picsum.photos/id/1012/150", 
      },
    ],
    bookmarks: [],
  },


  
];
