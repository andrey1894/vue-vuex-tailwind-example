import { IUserInDto, IUserOutDto } from "./user";

export interface IPostInDto {
  id: number;
  userId: number;
  title: string;
  body: string;
  date?: Date;
  user?: IUserInDto;
}

export interface IPostOutDto {
  id: number;
  userId: number;
  title: string;
  body: string;
  date?: Date;
  user?: IUserOutDto;
}
