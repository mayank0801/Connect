import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: 100,
    firstName: 'Adarsh',
    lastName: 'Balika',
    username: 'adarshbalika',
    password: 'adarshBalika123',
    bio: 'Hey, Aadrash Here',
    website: 'https://twiiter.com',
    profileAvatar: 'https://picsum.photos/id/1012/150',
    backgroundImage:"https://png.pngtree.com/thumb_back/fh260/background/20210803/pngtree-modern-simple-elegant-dark-blue-landing-page-website-background-image_756950.jpg",
    likes: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      {
        _id: 101,
        firstName: 'Mayank',
        username: 'mayank0801',
        profileAvatar: 'https://picsum.photos/id/1009/150',
      },
    ],
    following: [
      {
        _id: 101,
        firstName: 'Mayank',
        username: 'mayank0801',
        profileAvatar: 'https://picsum.photos/id/1009/150',
      },
    ],
    bookmarks: [],
  },
  {
    _id: 101,
    firstName: 'Mayank',
    lastName: 'Kumar',
    username: 'Mayank0801',
    password: 'mayank123',
    bio: 'Hey, Mayank Here',
    website: 'https://google.com',
    profileAvatar: 'https://picsum.photos/id/1009/150',
    backgroundImage:"https://png.pngtree.com/thumb_back/fh260/background/20210803/pngtree-modern-simple-elegant-dark-blue-landing-page-website-background-image_756950.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      {
        _id: 100,
        firstName: 'Adarsh',
        username: 'adarshbalika',
        profileAvatar: 'https://picsum.photos/id/1012/150',
      },
    ],
    following: [
      {
        _id: 100,
        firstName: 'Adarsh',
        username: 'adarshbalika',
        profileAvatar: 'https://picsum.photos/id/1012/150',
      },
      {
        _id: 102,
        firstName: 'Yuvraj',
        username: 'Spidy',
        profileAvatar: 'https://picsum.photos/id/100/150',
      },
    ],
    bookmarks: [],
  },
  {
    _id: 102,
    firstName: 'Yuvraj',
    lastName: 'Thakur',
    username: 'Spidy',
    password: 'Spidy123',
    bio: 'Hey,Yuvraj Here',
    website: 'https://facebook.com',
    profileAvatar: 'https://picsum.photos/id/100/150',
    backgroundImage:"https://png.pngtree.com/thumb_back/fh260/background/20210803/pngtree-modern-simple-elegant-dark-blue-landing-page-website-background-image_756950.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      {
        _id: 101,
        firstName: 'Mayank',
        username: 'mayank0801',
        profileAvatar: 'https://picsum.photos/id/1009/150',
      },
      {
        _id: 103,
        firstName: 'Ram',
        username: 'itsRam',
        profileAvatar: 'https://picsum.photos/id/1005/150',
      },
    ],
    following: [
      {
        _id: 100,
        firstName: 'Adarsh',
        username: 'adarshbalika',
        profileAvatar: 'https://picsum.photos/id/1012/150',
      },
      {
        _id: 103,
        firstName: 'Ram',
        username: 'itsRam',
        profileAvatar: 'https://picsum.photos/id/1005/150',
      },
    ],
    bookmarks: [],
  },
  {
    _id: 103,
    firstName: 'Ram',
    lastName: 'Kumar',
    username: 'itsRam',
    password: 'Ram123',
    bio: 'Hey, Ram Here',
    website: 'https://microsoft.com',
    profileAvatar: 'https://picsum.photos/id/1005/150',
    backgroundImage:"https://png.pngtree.com/thumb_back/fh260/background/20210803/pngtree-modern-simple-elegant-dark-blue-landing-page-website-background-image_756950.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      {
        _id: 100,
        firstName: 'Adarsh',
        username: 'adarshbalika',
        profileAvatar: 'https://picsum.photos/id/1012/150',
      },
    ],
    followers: [
      {
        _id: 100,
        firstName: 'Adarsh',
        username: 'adarshbalika',
        profileAvatar: 'https://picsum.photos/id/1012/150',
      },
    ],
    bookmarks: [],
  },
];
