import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { continueAuth, getUser, upsertUser, verifyAuth } from '@utils/auth';
import QueryKeys from '@utils/queryKeys';
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

/* 
  This is used to compose two functions
  so that whenever a change to auth like logging out
  it will refetch the user data immediately after before returning
*/
const composeAsyncFunction = <T extends any[], U>(
  f: (...args: T) => Promise<U>,
  n: () => Promise<any>
): ((...args: T) => Promise<U>) => {
  return async (...args: T) => {
    let res = await f(...args);
    await n();
    return res;
  };
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [cookies] = useCookies(['auth-token']);
  const queryClient = useQueryClient();
  const userQuery = useQuery(
    {
      queryKey: [QueryKeys.GetUser, cookies['auth-token']],
      queryFn: async () => getUser(cookies['auth-token']),
    },
    queryClient
  );
  let value: AuthContextValue = {
    user: userQuery,
    continueAuth: continueAuth,
    verifyAuth: composeAsyncFunction(verifyAuth, userQuery.refetch),
    upsertUser: composeAsyncFunction(upsertUser, userQuery.refetch),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
