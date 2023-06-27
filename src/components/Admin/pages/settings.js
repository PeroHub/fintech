import { useState } from 'react'
import style from '../styles/settings.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import WebsiteDetailPage from '../pages/settingSubpage/WebsiteDetailPage'
import WalletDetailPage from '../pages/settingSubpage/WalletDetailPage'
import UsersDetailPage from '../pages/settingSubpage/UsersDetailPage'
import SecurityDetailsPage from '../pages/settingSubpage/SecurityDetailPage'
import NotificationDetailPage from '../pages/settingSubpage/NotificationDetailPage'
import AdminDetailPage from '../pages/settingSubpage/AdminDetailPage'

export function SettingToggle ({handleToggleWebsite, handleToggleUsers, handleToggleWallet, handleToggleSecurity, handleToggleAdmin, handleToggleNotification}) {
    return (
        <Box>
            <Box className="toggleBtn" sx={{display: "flex", justifyContent: "space-between", padding: "10px", fontSize: "20px", fontWeight: "bold", cursor: "pointer"}}>
                <Box onClick={handleToggleWebsite}>Website</Box>
                <Box onClick={handleToggleUsers}>Users</Box>
                <Box onClick={handleToggleWallet}>Wallet</Box>
                <Box onClick={handleToggleSecurity}>Security</Box>
                <Box onClick={handleToggleAdmin}>Add Admin</Box>
                <Box onClick={handleToggleNotification}>Notifications</Box>
            </Box>

            <Box className="" sx={{ minWidth: 120, display: {md: "none", xs: "initial   "}}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Transact</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Transact"
                    >
                    <MenuItem value={"website"}><Box onClick={handleToggleWebsite}>Website</Box></MenuItem>
                    <MenuItem value={"users"}><Box onClick={handleToggleUsers}>Users</Box></MenuItem>
                    <MenuItem value={"wallet"}><Box onClick={handleToggleWallet}>Wallet</Box></MenuItem>
                    <MenuItem value={"security"}><Box onClick={handleToggleSecurity}>Security</Box></MenuItem>
                    <MenuItem value={"admin"}><Box onClick={handleToggleAdmin}>Add Admin</Box></MenuItem>
                    <MenuItem value={"notification"}><Box onClick={handleToggleNotification}>Notifications</Box></MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    )

}


function Settings() {
    const [ toggleBtn, setToggle ] = useState('website')

    console.log(toggleBtn)
    const handleToggleWebsite = () => {
        setToggle('website')
    }

    const handleToggleUsers = () => {
        setToggle('users')
    }

    const handleToggleWallet = () => {
        setToggle('wallet')
    }

    const handleToggleSecurity = () => {
        setToggle('security')
    }

    const handleToggleAdmin = () => {
        setToggle('admin')
    }

    const handleToggleNotification= () => {
        setToggle('notification')
    }

    let toggleContent;
    switch (toggleBtn) {
        case 'website':
            toggleContent = <WebsiteDetailPage />
            break;
        case 'users':
            toggleContent = <UsersDetailPage />
            break;
        case 'wallet':
            toggleContent = <WalletDetailPage />
            break;
        case 'security':
            toggleContent = <SecurityDetailsPage />
            break;
        case 'admin':
            toggleContent = <AdminDetailPage />
            break;
        case 'notification':
            toggleContent = <NotificationDetailPage />
            break;
        default:
            toggleContent = <WebsiteDetailPage />
            break;
    }

    
    return (
        <main className={style.container}>
            <SettingToggle 
            handleToggleWebsite={handleToggleWebsite}
            handleToggleUsers={handleToggleUsers}
            handleToggleWallet={handleToggleWallet}
            handleToggleSecurity={handleToggleSecurity}
            handleToggleAdmin={handleToggleAdmin}
            handleToggleNotification={handleToggleNotification}
            />
            <section>
                {toggleContent}
            </section>
        </main>
    )
}

export default Settings
