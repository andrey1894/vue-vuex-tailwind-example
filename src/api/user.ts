import { getToken } from "@/core";
import {
  generateToken,
  getFakeCurrentUser,
  getFakerUsers,
  getFakeUserByAuth,
} from "@/fakers/user";
import { EUserMembership, EUserRelationship, IUserOutDto } from "@/models";

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await getFakeUserByAuth(email, password);
  if (user) {
    return generateToken(email, password);
  }
  return Promise.reject();
};

export const logout = async (): Promise<void> => {
  Promise.resolve();
};

export const getCurrentUser = async (): Promise<IUserOutDto> => {
  const token = getToken();
  console.log("token", token);
  const user = await getFakeCurrentUser(token);
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    active: user.active === "true",
    relationship: user.relationship as EUserRelationship,
    avatar: user.avatar,
    membership:
      user.membership === "null" ? null : (user.membership as EUserMembership),
    phone: user.phone,
    emailAddress: user.email_address,
  };
};

export const searchUsers = async (search: string): Promise<IUserOutDto[]> => {
  if (!search) {
    return [];
  }
  return (await getFakerUsers(search)).map((user) => ({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    active: user.active === "true",
    relationship: user.relationship as EUserRelationship,
    avatar: user.avatar,
    membership:
      user.membership === "null" ? null : (user.membership as EUserMembership),
    phone: user.phone,
    emailAddress: user.email_address,
  }));
};