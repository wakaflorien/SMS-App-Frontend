"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../api/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const googleSignIn = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
  };

  const githubSignIn = () => {
    const provider = new GithubAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const emailAndPasswordSignUp = async (email, password) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  };

  const emailAndPasswordSignIn = async (email,password) => {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  }

  const logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        logout,
        githubSignIn,
        emailAndPasswordSignUp,
        emailAndPasswordSignIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
