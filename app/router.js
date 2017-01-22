import mainPage from './views/mainPage/mainPage.vue';
import sellPage from './views/sellPage/sellPage.vue';
import userPage from './views/userPage/userPage.vue';
import searchPage from './views/searchPage/searchPage.vue';
//声明路径和相应路径要跳转的目标组件
export default [
  //路由
  {
    path: '/mainPage',
    name: 'mainPage',
    component: mainPage
  }, {
    path: '/sellPage',
    name: 'sellPage',
    component: sellPage

  }, {
    path: '/userPage',
    name: 'userPage',
    component: userPage

  }, {
    path: '/searchPage',
    name: 'searchPage',
    component: searchPage

  }, {
    path: '/',
    redirect: '/mainPage'
  }
];
