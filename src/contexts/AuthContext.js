import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { forgotPasswordApi, initApi, loginApi, logoutApi, registerApi, resetPasswordApi } from '../api/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    async function signup(fullname, email, password) {
        const response = await registerApi({ fullname, email, password })
        if (response.error) {
            throw new Error(response.error.error)
        }
        return response
    }

    async function login(email, password) {
        const response = await loginApi({ email, password })
        if (response.error) {
            throw new Error(response.error.error)
        }
        setCurrentUser(response)
        return response
    }

    async function forgotPassword(email) {
        const response = await forgotPasswordApi({ email })
        if (response.error) {
            throw new Error(response.error.error)
        }
        return response
    }

    async function resetPassword(data) {
        const response = await resetPasswordApi(data)
        if (response.error) {
            throw new Error(response.error.error)
        }
        return response
    }

    async function logout() {
        const response = await logoutApi()
        if (response?.error) {
            throw new Error(response.error.error)
        }
        setCurrentUser(null)
        return response
    }


    useEffect(() => {
        async function clearUser() {
            setCurrentUser(null)
            history.push('/login')

        }
        const user = initApi(clearUser)
        setCurrentUser(user)
        setLoading(false)
        return () => {
            setCurrentUser(null)
        }
    }, [history])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        forgotPassword,

    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
