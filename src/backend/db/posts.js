import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "p1",
    content:
    "Must try of this week: Vada Pao from SK Vadewale in Pune. The taste is absolutely mind-boggling and fresh.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    firstName: "Adarsh",
    postImage:"https://res.cloudinary.com/dwebygldw/image/upload/v1653066367/frittr/vada-pav_g0u58t.webp",
    createdAt: "2023-06-15",
    updatedAt: formatDate(),
    comments:[]
  },
  {
    _id: uuid(),
    content:
    "Went to this hangout place, Bob's in Marathalli yesterday. The ambience is real good and the mocktails are really fresh.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Mayanksingh0801@gmail.com",
    firstName: "Mayank",
    createdAt: "2023-05-18",
    updatedAt: formatDate(),
    comments:[]
  },
  {
    _id: uuid(),
    content:
"Ordered Meghana's Special Chicken Biryani from Meghana's. Recommend 10/10. ✨  ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "itsRam",
    firstName:"Ram",
    comments: [],
    createdAt: "2023-04-20",
    updatedAt: formatDate(),
    comments:[]
  },
  {
    _id: uuid(),
    content:
    "Went out for dinner at Chili's Hyderabad. The taste reminds me of back home in Autralia.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    postImage:null,
    username: "itsRam",
    firstName: "Ram",
    createdAt: "2023-05-01",
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content:
    "Went out for dinner at Chili's Hyderabad. The taste reminds me of back home in Autralia.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    postImage:null,
    username: "Spidy",
    firstName: "Yuvraj",
    createdAt: "2023-06-11",
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content:
    "Nairobi is such a great city with so many people going about their business. One thing that you need to know while there are the places where to find great food/meals. Best recommendation is @al_yusra Restaurant located along Banda Street just next to Nation Centre. #Kenya",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: []
    },
    username: "Spidy",
    firstName: "Yuvraj",
    createdAt: "2023-06-16",
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content:
    "I met this street food seller in Gyeongju on a recommendation from a dating app. This man was adopted and grew up in US. He moved to Korea to find his birth mother. And he did! I often think back to our conversation #MondayMotivation",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: []
    },
    username: "Spidy",
    firstName: "Yuvraj",
    createdAt: "2023-06-01",
    updatedAt: formatDate(),
    comments: [],
  }
];
