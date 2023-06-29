import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import React, { createContext, useEffect, useState } from "react"

import { app } from "./firebase.config"

interface AuthContextType {
  currentUser: User | null
}

export const AuthContext = createContext<AuthContextType>({ currentUser: null })

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })

    return () => unsubscribe()
  }, [auth])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
