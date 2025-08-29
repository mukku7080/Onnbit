// import React, { createContext, useContext } from 'react'

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {

//   const [user, setUser] = React.useState(null);

//   const login = (email) => setUser({ email });
//   const logout = () => setUser(null);


//   return (
//     <>
//       <AuthContext.Provider value={{ user, login, logout }}>
//         {children}
//       </AuthContext.Provider>
//     </>
//   )
// }
// export const useAuth = () => useContext(AuthContext);