import { IPaginationList, IPostInDto } from "@/models";

import { getAllFakerUsers } from "./user";

export const getAllFakerPosts = async (): Promise<IPostInDto[]> => {
  const mockedData = await import("@/assets/mocked_post_data.json");
  const posts = Array.from(mockedData) as IPostInDto[];
  return posts;
};

export const getFakerPosts = async (
  page = 1,
  limit = 10
): Promise<IPaginationList<IPostInDto[]>> => {
  const users = await getAllFakerUsers();
  const postResults = await getAllFakerPosts();
  const posts = postResults.slice((page - 1) * limit, limit);

  const data = posts.map((post) => ({
    ...post,
    date: new Date(),
    user: users.find((u) => u.id === post.userId),
  }));

  return {
    page,
    limit,
    count: postResults.length,
    data,
  };
};
