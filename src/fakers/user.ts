import { IUserInDto } from "@/models";

const PASSWORD = "1234";

export const generateToken = (email: string, password: string): string => {
  return btoa(JSON.stringify({ email, password }));
};

export const parseToken = (
  token: string
): { email: string; password: string } | null => {
  try {
    const { email, password } = JSON.parse(atob(token));
    if (!email || password !== PASSWORD) {
      return null;
    }
    return { email, password };
  } catch {
    return null;
  }
};

export const getAllFakerUsers = async (): Promise<IUserInDto[]> => {
  const mockedData = await import("@/assets/mocked_user_data.json");
  const users = Array.from(mockedData) as IUserInDto[];
  return users;
};

export const getFakerUsers = async (search: string): Promise<IUserInDto[]> => {
  const users = await getAllFakerUsers();

  return users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase())
  );
};

export const getFakeCurrentUser = async (
  token: string | null
): Promise<IUserInDto> => {
  if (!token) {
    return Promise.reject();
  }

  const authData = parseToken(token);
  if (!authData) {
    return Promise.reject();
  }

  const mockedData = await import("@/assets/mocked_user_data.json");
  const users = Array.from(mockedData) as IUserInDto[];

  const user = users.find(
    (u) => u.email_address.toLowerCase() === authData.email.toLowerCase()
  );

  return user || Promise.reject();
};

export const getFakeUserByAuth = async (
  email: string,
  password: string
): Promise<IUserInDto | null | undefined> => {
  if (password !== PASSWORD) {
    return null;
  }
  const mockedData = await import("@/assets/mocked_user_data.json");
  const users = Array.from(mockedData) as IUserInDto[];

  return users.find(
    (user) => user.email_address.toLowerCase() === email.toLowerCase()
  );
};
