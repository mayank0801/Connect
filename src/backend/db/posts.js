import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: '6eec47f9-a669-457f-ab25-98a3b5120b9b',
    content:
      'Must try of this week: Vada Pao from SK Vadewale in Pune. The taste is absolutely mind-boggling and fresh.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'adarshbalika',
    firstName: 'Adarsh',
    postImage:
      'https://res.cloudinary.com/dwebygldw/image/upload/v1653066367/frittr/vada-pav_g0u58t.webp',
    createdAt: '2023-06-15',
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: '41dd1076-664f-44a5-b255-db493360128d',
    content:
      "Went to this hangout place, Bob's in Marathalli yesterday. The ambience is real good and the mocktails are really fresh.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'mayank0801',
    firstName: 'Mayank',
    createdAt: '2023-05-18',
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: '6f7c6dc1-1f00-4927-b8db-0af4146a871c',
    content:
      "Ordered Meghana's Special Chicken Biryani from Meghana's. Recommend 10/10. ✨  ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'itsRam',
    firstName: 'Ram',
    comments: [],
    createdAt: '2023-04-20',
    updatedAt: formatDate(),
    
  },
  {
    _id: 'bc748397-c7d9-447e-969d-7e40022a274a',
    content:
      "Went out for dinner at Chili's Hyderabad. The taste reminds me of back home in Autralia.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    postImage: null,
    username: 'itsRam',
    firstName: 'Ram',
    createdAt: '2023-05-01',
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: '5d434f19-bd2e-4ddd-8463-45dbe613bfa4',
    content:
      "Went out for dinner at Chili's Hyderabad. The taste reminds me of back home in Autralia.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    postImage: null,
    username: 'Spidy',
    firstName: 'Yuvraj',
    createdAt: '2023-06-11',
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: 'aaaad84e-98da-40fc-a690-47fdcf76fd32',
    content:
      'Nairobi is such a great city with so many people going about their business. One thing that you need to know while there are the places where to find great food/meals. Best recommendation is @al_yusra Restaurant located along Banda Street just next to Nation Centre. #Kenya',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    postImage:
      'https://res.cloudinary.com/ditqnzlil/image/upload/v1683716038/cld-sample-2.jpg',
    username: 'Spidy',
    firstName: 'Yuvraj',
    createdAt: '2023-06-16',
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: 'c4786415-ad7d-4987-82f0-27fcd9b37843',
    content:
      'I met this street food seller in Gyeongju on a recommendation from a dating app. This man was adopted and grew up in US. He moved to Korea to find his birth mother. And he did! I often think back to our conversation #MondayMotivation',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'Spidy',
    firstName: 'Yuvraj',
    createdAt: '2022-06-01',
    updatedAt: formatDate(),
    comments: [],
  },
];
