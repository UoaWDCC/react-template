import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { continueAuth, getUser, upsertUser, verifyAuth } from '@utils/auth';
import QueryKeys, { queryClient } from '@utils/queryKeys';
import { createContext } from 'react';
import { useCookies } from 'react-cookie';

export interface User {
  email: string;
  firstName: string;
  lastName?: string;
}

export interface AuthContextValue {
  user: UseQueryResult<User | null, Error>;
  continueAuth: typeof continueAuth;
  verifyAuth: typeof verifyAuth;
  upsertUser: typeof upsertUser;
}

export const AuthContext = createContext<AuthContextValue>({
  user: {
    data: undefined,
    dataUpdatedAt: Date.now(),
    errorUpdatedAt: Date.now(),
    failureCount: 0,
    isFetched: false,
    isSuccess: false,
    refetch: () => {},
    isError: false,
    isLoading: true,
  } as UseQueryResult<User>,
  continueAuth,
  verifyAuth,
  upsertUser,
});

interface AuthContextProviderProps {
  children?: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [cookies] = useCookies(['auth-token']);
  const userQuery = useQuery(
    {
      queryKey: [QueryKeys.GetUser, cookies['auth-token']],
      queryFn: async () => getUser(cookies['auth-token']),
    },
    queryClient
  );
  let value: AuthContextValue = {
    user: userQuery,
    continueAuth,
    verifyAuth,
    upsertUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
