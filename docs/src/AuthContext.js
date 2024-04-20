import { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userRef = firebase.firestore().collection('users').doc(user.uid);
        userRef.get().then(doc => {
          const userData = doc.data();
          setCurrentUser(user);
          setRole(userData.role);
        });
      } else {
        setCurrentUser(null);
        setRole(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
