import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "@dtos/userDTO";
import { api } from "@services/api";
import { storageUserSave, storageUserGet, storageUserRemove } from "src/storage/storageUser";
import { ImageUrl } from "@utils/BaseUrl";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";

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

  //Save data logged student
  const storageUserAndToken = async (userData:UserDTO,token:string) => {
    try{
      setIsLoadingUserStorageData(true)
      api.defaults.headers.common['Authorization'] = token
      await storageUserSave(userData)
      await storageAuthTokenSave(token)
      setUser(userData)
    }catch(error){
      throw error
    }finally{
      setIsLoadingUserStorageData(false)
    }
  }

  const signIn = async (email:string,password:string) => {
    try{
      const { data } = await api.post('/loginStudent',{username:email,password})
      if(data.success){
        const  { id, name, mail, photo } = data.userdata
        await storageUserAndToken({ id,name,email:mail,avatar:`${ImageUrl}${photo}`},data.token)        
      }      
    }catch(error){
      throw error
    }
  }

  const signOut = async () => {
    try{
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()
      api.defaults.headers.common['Authorization'] = ''
    }catch(error){
      throw error
    } finally{
      setIsLoadingUserStorageData(false)
    }
  }

  const loadUserData = async () => {
    try{
      setIsLoadingUserStorageData(true)
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet()
      if(token && userLogged){
        api.defaults.headers.common['Authorization'] = token
        setUser(userLogged)       
      }
    }catch(error){
      throw error;
    } finally{
      setIsLoadingUserStorageData(false)
    }
  }
  useEffect(()=>{loadUserData()},[])

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