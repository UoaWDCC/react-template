import { QueryClient } from '@tanstack/react-query';

enum QueryKeys {
  GetName = 'get-name',
  GetUser = 'get-user',
}

export const queryClient = new QueryClient();

export default QueryKeys;
