import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import ProductsConfig from 'app/main/products/ProductsConfig';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import NovoRecado from 'app/main/recados';
import TodosRecados from 'app/main/recados/TodosRecados';

const routeConfigs = [ExampleConfig, ProductsConfig, LoginConfig];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/novo-recado',
    element: <NovoRecado />,
  },
  {
    path: '/todos-recados',
    element: <TodosRecados />,
  },
  {
    path: '/',
    element: <Navigate to="example" />,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
