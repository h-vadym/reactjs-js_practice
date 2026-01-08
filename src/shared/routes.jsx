import { lazy } from 'react';

export const ROUTES = [
  {
    id: 1,
    path: '/',
    component: lazy(() => import('../pages/home')),
    menuLabel: 'Home'
  },
  {
    id: 2,
    path: '/intersection-observer',
    component: lazy(() => import('../pages/intersection-observer')),
    menuLabel: 'Intersection Observer'
  },
  {
    id: 3,
    path: '/storage-in-tabs',
    component: lazy(() => import('../pages/storage-in-tabs')),
    menuLabel: 'Storage event in tabs'
  },
  {
    id: 3,
    path: '/indexeddb-todo',
    component: lazy(() => import('../pages/indexeddb-todo')),
    menuLabel: 'Todo (IndexedDB)'
  },
  {
    id: 4,
    path: '/memory-leak',
    component: lazy(() => import('../pages/memory-leak')),
    menuLabel: 'Memory leaks'
  }
];
