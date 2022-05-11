import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'lista-recados',
    title: 'Lista de recados',
    translate: 'LISTA DE RECADOS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'cadastro',
        title: 'Cadastrar recado',
        translate: 'CADASTRAR RECADO',
        type: 'item',
        icon: 'add',
        url: '/novo-recado',
      },
      {
        id: 'todos-recados',
        title: 'Todos recados',
        translate: 'TODOS RECADOS',
        type: 'item',
        icon: 'article',
        url: '/todos-recados',
      },
      {
        id: 'sair',
        title: 'Sair',
        translate: 'SAIR',
        type: 'item',
        icon: 'arrow-back',
        url: '/login',
      },
    ],
  },
];

export default navigationConfig;
