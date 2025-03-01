export interface UserInput {
  email?: string;
  password?: string;
  name?: string;
  active?: boolean;
  role?: "ADMIN" | "USER";
  refreshToken?: string;
}
