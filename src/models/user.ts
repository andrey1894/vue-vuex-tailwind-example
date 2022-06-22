export interface IUserInDto {
  id: string;
  first_name: string;
  last_name: string;
  active: string;
  relationship: EUserRelationship;
  avatar: string;
  membership: EUserMembership | "null";
  phone: string;
  email_address: string;
}

export interface IUserOutDto {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
  relationship: EUserRelationship;
  avatar: string;
  membership: EUserMembership | null;
  phone: string;
  emailAddress: string;
}

export interface IUserGroup {
  [key: string]: IUserOutDto[];
}

export enum EUserMembership {
  GOLD = "GOLD",
  SILVER = "SILVER",
  PLATIN = "PLATIN",
}

export enum EUserRelationship {
  MEMBER = "member",
  STAFF = "staff",
  PROSPECT = "prospect",
}
