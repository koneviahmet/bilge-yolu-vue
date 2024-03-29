const defaultPath = "quesitons";
const defaultPathName =
  defaultPath.charAt(0).toUpperCase() + defaultPath.slice(1);

export const quesitonsRouters = [
  {
    name: `${defaultPathName}Home`,
    path: `/${defaultPath}`,
    component: () => import(`../../views/${defaultPath}/Home.vue`),
  },
  {
    name: `${defaultPathName}Create`,
    path: `/${defaultPath}/create`,
    component: () => import(`../../views/${defaultPath}/Create.vue`),
  },
  {
    name: `${defaultPathName}Print`,
    path: `/${defaultPath}/print`,
    component: () => import(`../../views/${defaultPath}/Print.vue`),
  },
  {
    name: `${defaultPathName}Money`,
    path: `/${defaultPath}/money`,
    component: () => import(`../../views/${defaultPath}/Money.vue`),
  },
  {
    name: `${defaultPathName}Update`,
    path: `/${defaultPath}/update/:id`,
    component: () => import(`../../views/${defaultPath}/Update.vue`),
  },
  {
    name: `${defaultPathName}Detail`,
    path: `/${defaultPath}/detail/:id`,
    component: () => import(`../../views/${defaultPath}/Detail.vue`),
  },
  {
    name: `${defaultPathName}List`,
    path: `/${defaultPath}/list`,
    component: () => import(`../../views/${defaultPath}/List.vue`),
  },
  {
    name: `${defaultPathName}Search`,
    path: `/${defaultPath}/search`,
    component: () => import(`../../views/${defaultPath}/Search.vue`),
  },
];
