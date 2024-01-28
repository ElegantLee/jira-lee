import React, { ReactNode, useCallback } from 'react';
import * as auth from 'auth-provider';
import { User } from '../project-list/search-panel';
import { http } from '../../utils/http';
import { useMount } from '../../utils';
import { useAsync } from 'utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
import * as authStore from 'store/auth.slice';
import { bootstrap, selectUser } from 'store/auth.slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

export interface AuthForm {
  username: string;
  password: string;
}

/* 维持登录状态 */
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { error, isLoading, isIdle, isError, run } = useAsync<User | null>();
  const dispatch: (...args: unknown[]) => Promise<User> = useAppDispatch();

  useMount(() => {
    run(dispatch(bootstrap()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
