export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
}

export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  point: number;
  exp: number;
  level: number;
  imageUrl: string;
}

export interface ICommunity {
  content: {
    id: number;
    nickname: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    viewsCount: number;
    likesCount: number;
    commentsCount: number;
  };
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ITeamImage {
  id: number;
  team: string;
  imageUrl: string;
}

export interface IContent {
  id: number;
  nickname: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
}

export interface IComment {
  id: number;
  communityId: number;
  communityTitle: string;
  nickname: string;
  content: string;
  createdAt: string;
  updateAt: string;
  likesCount: number;
  hatesCount: number;
}

export function postUserInfo(nickname: string) {
  return fetch(`http://localhost:8080/info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname }),
    credentials: "include",
  });
}

export function getCheckDuplicate(nickname: string) {
  return fetch(`http://localhost:8080/check/${nickname}`, {
    method: "GET",
    credentials: "include",
  });
}

export function getCommunityList() {
  return fetch(`http://localhost:8080/community`, {
    method: "GET",
    credentials: "include",
  }).then((response) => response.json());
}

export const getTeamImage = async (id: number) => {
  await fetch(`http://localhost:8080/image/${id}`, {
    method: "GET",
    credentials: "include",
  });
};
