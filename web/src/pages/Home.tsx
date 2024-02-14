import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import QueryKeys from '../utils/queryKeys';
import urls from '../utils/urls';
import { useContext } from 'react';
import { AuthContext } from '@contexts/Auth';
import { Link } from 'react-router-dom';
import { logoutUser } from '@utils/auth';
import Layout from '@layouts/Layout';

export default function Home() {
  const authContext = useContext(AuthContext);

  const { data, isLoading, isError, error } = authContext.user;

  if (isLoading) {
    return (
      <Layout>
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          <span className="loading loading-xl loading-ball" />
        </div>
      </Layout>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    return (
      <Layout className="gap-4">
        <p className="font-bold flex flex-row gap-2">
          Kia Ora, {data.firstName || 'Koe'} ki{' '}
          <p className="font-sans text-accent">WDCC</p>
        </p>
        <button
          className="btn"
          onClick={logoutUser}
        >
          Log Out
        </button>
      </Layout>
    );
  } else {
    return (
      <Layout className="gap-4">
        <p className="font-bold flex flex-row gap-2">
          Kia Ora Koe ki <p className="text-accent">WDCC</p>
        </p>
        <Link
          className="btn"
          to="/continue"
        >
          Sign In
        </Link>
      </Layout>
    );
  }
}
