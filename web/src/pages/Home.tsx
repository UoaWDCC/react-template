import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import QueryKeys from '../utils/queryKeys';
import urls from '../utils/urls';
import { useContext } from 'react';
import { AuthContext } from '@contexts/Auth';
import { Link } from 'react-router-dom';
import { logoutUser } from '@utils/auth';

export default function Home() {
  const authContext = useContext(AuthContext);

  const { data, isLoading, isError, error } = authContext.user;

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

  if (data) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
        <p className="font-bold">Kia Ora, {data.firstName || 'Koe'}</p>
        <button
          className="btn"
          onClick={logoutUser}
        >
          Log Out
        </button>
      </div>
    );
  } else {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
        <p className="font-bold">Kia Ora Koe </p>
        <Link
          className="btn"
          to="/continue"
        >
          Sign In
        </Link>
      </div>
    );
  }
}
