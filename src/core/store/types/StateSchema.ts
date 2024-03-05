export interface StateSchema {
  user: UserSchema;
}

export interface UserSchema {
  userId?: number | null;
  isAuth: boolean;
  isLoading: boolean;
  error?: string;
}
