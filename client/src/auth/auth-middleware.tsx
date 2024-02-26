import { Spin } from 'antd';
import { useLayoutEffect, useState } from 'react';

import { useInfoMutation } from './auth.api';
import { setCredentials } from './auth.slice';
import { useAppDispatch } from '../hooks/redux-hooks';
import useAuth from '../hooks/use-auth';

interface Props {
  children: React.ReactNode;
}

export default function AuthMiddleware({ children }: Props) {
  const appDispatch = useAppDispatch();

  const { accessToken } = useAuth();
  const [info] = useInfoMutation();

  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      info({ accessToken })
        .unwrap()
        .then((response) => appDispatch(setCredentials(response)))
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Spin fullscreen tip="Loading app ..." />;
  }

  return <>{children}</>;
}
