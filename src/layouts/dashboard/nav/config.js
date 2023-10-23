// component
import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'projects',
    path: '/dashboard/projects',
    icon: icon('ic_journals'),
  },
  {
    title: 'bids',
    path: '/dashboard/bids',
    icon: icon('ic_award'),
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: icon('cog'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_settings'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
