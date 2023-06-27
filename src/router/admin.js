
import { icons } from '../assets'
import Analysis from '../components/Admin/pages/analysis'
import Dashboard from '../components/Admin/pages/dashboard'
import Profile from '../components/Admin/pages/profile'
import Settings from '../components/Admin/pages/settings'
import Transaction from '../components/Admin/pages/transaction'
import Logoutpage from '../components/User/pages/Logoutpage'

export const adminRoutes = [

  { path: '', icon: icons.dashboard, title: 'Dashboard', component: Dashboard },
  { path: 'transaction', icon: icons.transaction, title: 'Transaction', component: Transaction },
  { path: 'profile', icon: icons.customer, title: 'Profile', component: Profile },
  { path: 'analysis', icon: icons.Analysis, title: 'Analysis', component: Analysis },
  { path: 'settings', icon: icons.setting, title: 'Settings', component: Settings },
  { path: 'logout', icon: icons.envelope, title: 'Log Out', component: Logoutpage },

]