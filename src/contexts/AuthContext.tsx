import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "@dtos/userDTO";
import { api } from "@services/api";
import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";

export type AuthContextDataProps = {
  user:UserDTO;
  signIn: (email:string,password:string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData:boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export const AuthContextProvider = ({children}:AuthContextProviderProps) => {
  const [ user, setUser ] = useState<UserDTO>({} as UserDTO)
  const [ isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  const signIn = async (email:string,password:string) => {
    try{
      const { data } = await api.post('/loginStudent',{username:email,password})
      if(data.success){
        setUser({
          id:1,name:'Glauco',email,avatar:'https://github.com/lugheri.png'
        })
        storageUserSave({
          id:1,name:'Glauco',email,avatar:'https://github.com/lugheri.png'
        })
      }
      console.log('DATA >> ',data)
    }catch(error){
      throw error

    }
  }
  const signOut = async () => {
    try{
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageUserRemove()
    }catch(error){
      throw error
    } finally{
      setIsLoadingUserStorageData(false)
    }
  }

  const loadUserData = async () => {
    try{
      const userLogged = await storageUserGet();
      if(userLogged){
        setUser(userLogged)       
      }
    }catch(error){
      throw error;
    } finally{
      setIsLoadingUserStorageData(false)
    }
  }
  useEffect(()=>{
    loadUserData()
  },[])
  return(
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      isLoadingUserStorageData
      }}>
      { children }
    </AuthContext.Provider>
  )
}