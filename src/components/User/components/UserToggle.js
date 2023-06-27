// import React from 'react'
// import '../styles/usertoggle.css'
// import ClearIcon from '@mui/icons-material/Clear';
// import {Link} from "react-router-dom";

// // import Sidebar from './sidebar/Sidebar'

// // import Homepage from '../contentdisplay/Homepage'
// // import Accountpage from './contentdisplay/Accountpage'
// // import Account from '../contentdisplay/cards/Account'
// // import Convertpage from '../contentdisplay/Convertpage'
// // import Transactionpage from '../contentdisplay/Transactionpage'
// // import Logoutpage from '../contentdisplay/Logoutpage'
// // import Settingpage from '../contentdisplay/Settingpage'
// // import Profilepage from '../contentdisplay/Profilepage'




// // Images
// import { icons } from '../../../assets'

// const  UserToggle = (props) => {
//     console.log(props)

//     // custome design
//   const cursor = {
//     cursor: "pointer",
//     color: "#6C757D"

// }

// function refreshPage() {
//   setTimeout(()=>{
//       window.location.reload(false);
//   }, 500);
  
// }


//     return (
//             <div className="user-toggle" style={props.showUser? props.retUser: null }>
//             <ClearIcon style={{position: "relative", left: "85%", top: "30px", fontSize: "1.5rem"}} className="clear" onClick={props.tog}></ClearIcon>  
//             <div className="z-index  pt-4 px-2 shadow point">
                  
//                   <div className="py-2 text-muted text-center"><h5><strong><Link  to={{pathname:"/"}} style={{color: "gray"}} onClick={refreshPage}>FuturePay</Link><sup>&#8226;</sup></strong></h5></div>
//                     <Link to="/user/home">
//                       <div className="pt-4   pb-3 sidebarhome " style={cursor}>
//                           <img src={icons.home2} alt="home" />
//                           <p>Home</p>
//                       </div>
//                     </Link>
                  
//                   <Link to="/user/convert">
//                     <div className="py-3 sidebarhome" style={cursor}>
//                         <img  src={icons.rotate} alt="rotate" />
//                         <p>Convert</p>
//                     </div>
//                   </Link>
                  

                  
//                   <Link to="/user/account">
//                   <div className="py-3 sidebarhome" style={cursor}  >
//                       <img src={icons.wallet} alt="wallet" />
//                       <p>Accounts</p>
//                   </div>
//                   </Link>
                  
//                   <Link to="/user/transaction">
//                     <div className="py-3 sidebarhome " style={cursor}>
//                         <img src={icons.trans} alt="transaction" />
//                       <p>Transactions</p>
//                     </div>
//                   </Link>
                  
//                   <hr className="mr-3 bg-dark" />

//                   <Link to="/user/profile">
//                     <div className=" sidebarhome " style={cursor}>
//                         <img src={icons.user} alt="profile" />
//                         <p>Profile</p>
//                     </div>
//                   </Link>
                  
//                   <Link to="/user/setting/security">
//                     <div className="py-3 sidebarhome " style={cursor}>
//                         <img src={icons.setting} alt="settings" />
//                         <p>Settings</p>
//                     </div>
//                   </Link>
                  
//                   {/* <Link to="/user/logout">
//                     <div className="py-3 sidebarhome" style={cursor}>
//                         <img src={icons.envelope} alt="envelope" />
//                         <p> Log out</p>
//                     </div>
//                   </Link> */}
//                   <Link to="/user/logout">
//                     <div className="py-3 vh-100 sidebarhome" style={cursor}>
//                         <img src={icons.envelope} alt="envelope" />
//                         <p> Log out</p>
//                     </div>
//                   </Link>
//             </div>  
            
//             </div>
//     )
// }

// export default UserToggle