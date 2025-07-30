import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from "react";
  import { onAuthStateChanged, signOut, User } from "firebase/auth";
  import { doc, getDoc } from "firebase/firestore";
  import { auth, db } from "../firebase";
  
  type UserType = "manager" | "tenant" | null;
  
  interface AuthContextType {
    user: User | null;
    userType: UserType;
    loading: boolean;
    logout: () => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextType>({
    user: null,
    userType: null,
    loading: true,
    logout: async () => {},
  });
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userType, setUserType] = useState<UserType>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(true);
  
        if (firebaseUser) {
          // fetch userType from Firestore
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(userDocRef);
  
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserType(data.userType || null);
          } else {
            setUserType(null);
          }
        } else {
          setUserType(null);
        }
  
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);
  
    const logout = async () => {
      await signOut(auth);
      setUser(null);
      setUserType(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, userType, loading, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);
  