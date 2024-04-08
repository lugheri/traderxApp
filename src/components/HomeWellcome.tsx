import { useEffect, useState } from "react"
import useErrorHandling from "@hooks/useErrorHandling"
import { api } from "@services/api"
import { Center, Heading, VStack, Text } from "@gluestack-ui/themed"
import { Loading } from "./Loading"
//Images
import Logo from '@assets/logo.png'
import { Image } from "@gluestack-ui/themed"
import { useAuth } from "@hooks/useAuth"

export const HomeWellcome = () => {
  const [ titleHome, setTitleHome ] = useState('')
  const [ textHome, setTextHome ] = useState('')
  const [ additionalTextHome, setAdditionalTextHome ] = useState('')
  const { handleErrors } = useErrorHandling()
  const [ isLoading, setIsLoading] = useState(false)
  const {user} = useAuth()

  const getDataHome = async() => {
    try{
      setIsLoading(true)
      const home = user.community == 1 ? await api.get(`getTextHomeCommunity`) 
      : await api.get(`getTextHome`)
      setTitleHome(home.data.response.title_text)
      setTextHome(home.data.response.mobile_text)
      setAdditionalTextHome(home.data.response.additional_text)
    }catch(error){
      handleErrors(error as Error);
    }finally{
      setIsLoading(false)
    }
  }
  useEffect(()=>{
    getDataHome()
  },[])

  return(
    <VStack>
      { isLoading ? <Loading/> :
        <Center mt="$4" px="$2">
          <Image 
            source={Logo}
            w="$2/4"
            resizeMode="contain" 
            alt="Logo Comunidade Traderx"/>          
          <Heading textAlign="center" color="$white" my="$4">{titleHome}</Heading>
          <Text color="$white">{textHome}</Text>
          <Text color="$white" my="$4">{additionalTextHome}</Text>          
        </Center>               
      }
    </VStack>
  )
}