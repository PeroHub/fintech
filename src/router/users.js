
import { icons } from '../assets'
// import Account from '../components/User/cards/Account'
import Accountpage from '../components/User/pages/Accountpage'
import ConvertPage from '../components/User/pages/Convertpage'
import Logoutpage from '../components/User/pages/Logoutpage'

import Settingpage from '../components/User/pages/Settingpage'
import Transactionpage from '../components/User/pages/Transactionpage'

// import Homepage from '../components/User/pages/Homepage'
  
// import Profilepage from '../components/User/pages/Profilepage'

// import Homepage from '../components/User/pages/Homepage'
//  import Pay from '../components/User/pages/Pay'
import Profilepage from '../components/User/pages/Profilepage'
// import Alert from '../services/Alert'

export  const userRoutes = [

  // {path:  'home', icon: icons.home2, title: 'Home', component: Homepage },
  {path:  '', icon: icons.rotate, title: 'Convert', component: ConvertPage },
  {path:  'account', icon: icons.wallet, title: 'Accounts', component: Accountpage },
  {path:  'transaction', icon: icons.trans, title: 'Transactions', component: Transactionpage },
//  {path:  'pay', icon: icons.pay, title: 'Pay', component: Pay },


  {path:  'profile', icon: icons.user, title: 'Profile', component: Profilepage },
  {path:  'settings', icon: icons.setting, title: 'Settings', component: Settingpage },
  {path:  'logout', icon: icons.envelope, title: 'Log Out', component: Logoutpage },  

]

// export const userAlert = [
//   {path:  'alert',  component: Alert },
// ]