import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import QueryKeys from '../utils/queryKeys';
import urls from '../utils/urls';

export default function Home() {
  const { name } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.GetName, name],
    queryFn: async () => {
      const res = await axios.get(`/hello/${name}`, {
        baseURL: urls.apiUrl,
      });
      return await res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <span className="loading loading-xl loading-ball" />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className="font-bold">{data}</p>
    </div>
  );
}
