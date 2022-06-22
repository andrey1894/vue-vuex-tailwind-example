import { getFakerPosts } from "@/fakers";
import { IPaginationList, IPostOutDto } from "@/models";

import { parseUserDto } from "./user";

// const API = "https://jsonplaceholder.typicode.com/";
export const getPosts = async (
  page = 1,
  limit = 10
): Promise<IPaginationList<IPostOutDto[]>> => {
  const res = await getFakerPosts(page, limit);

  return {
    ...res,
    data: res.data.map((post) => ({
      ...post,
      user: post.user ? parseUserDto(post.user) : undefined,
    })),
  };
};
