import React from 'react';
import { authRoles } from 'app/auth';

const Login = React.lazy(() => import('./Login'));
const NovaConta = React.lazy(() => import('./NovaConta'));

const LoginConfig = {
  settings: {
    layout: {
      config: {
        mode: 'fullwidth',
        scroll: 'content',
        navbar: {
          display: false,
          folded: false,
          position: 'left',
        },
        toolbar: {
          display: false,
          style: 'fixed',
          position: 'below',
        },
        footer: {
          display: false,
          style: 'fixed',
          position: 'below',
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/nova-conta',
      element: <NovaConta />,
    },
  ],
};

export default LoginConfig;
