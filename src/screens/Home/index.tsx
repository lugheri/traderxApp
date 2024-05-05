import { Header } from "@components/Header"
import { HStack, Heading, ImageBackground, ScrollView, Text, VStack } from "@gluestack-ui/themed"
import BackgroundHomeImg from "@assets/bgHome.png"
import { UserPhoto } from "@components/UserPhoto"
import defaultUserPhotoImg from '@assets/userPhotoDefault.png'
import { useAuth } from "@hooks/useAuth"
import { useEffect, useState } from "react"
import { api } from "@services/api"
import { HomeButtonDTO } from "@dtos/HomeButtonDTO"
import useErrorHandling from "@hooks/useErrorHandling"
import { Loading } from "@components/Loading"
import { HomeCard } from "@screens/Home/components/HomeCard"
import { HomeCourses } from "@screens/Home/components/HomeCourses"
import { ContinueProgress } from "@components/ContinueProgess"


export const Home = () => {
  const { user } = useAuth()
  const { handleErrors } = useErrorHandling()
  const [ isLoading, setIsLoading ] = useState(false)

  //Welcome States
  const [ titleHome, setTitleHome ] = useState('')
  const [ textHome, setTextHome ] = useState('')
  const [ additionalTextHome, setAdditionalTextHome ] = useState('')

  //Get Texts
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

  const [ buttons, setButtons ] = useState<HomeButtonDTO[]>([])
  //GetButtons
  const getButtons = async() => {
    try{
      setIsLoading(true)
      const buttons = user.community == 1 ? await api.get(`getButtonsCommunity`) : await api.get(`getButtons`)
      setButtons(buttons.data.response)
    }catch(error){
      handleErrors(error as Error);
    }finally{
      setIsLoading(false)
    }
  } 
  useEffect(()=>{
    getButtons()
  },[])





  return(
    <VStack flex={1} pb="$16" bg="$black">
      <Header />
      <ImageBackground
        source={BackgroundHomeImg}
        defaultSource={BackgroundHomeImg}
        flex={1}
        resizeMode="cover"
        px="$4">
        { isLoading ? 
          <Loading/> :
          <ScrollView>
            <HStack py="$2">
              <UserPhoto
                source={user.avatar ? {uri:user.avatar} : defaultUserPhotoImg }
                alt="User Photo"
                size={50}        
              />
              <VStack flex={1} mx="$4">
                <Text color="$coolGray200" fontSize="$sm" lineHeight={20}>Olá,</Text>
                <Heading color="$coolGray100" lineHeight={25} >
                  {user.name} 
                </Heading>
              </VStack>   
            </HStack>  
            <Heading  fontSize="$lg" color="$white" my="$4">{titleHome}</Heading>
            <Text color="$white">{textHome}</Text>
            <Text color="$white" my="$4">{additionalTextHome}</Text>
            { buttons.map(item => ( 
              <HomeCard key={item.id} data={item} /> 
            ))}
            <ContinueProgress/>
            <HomeCourses/>
          </ScrollView>
        }
      </ImageBackground>

    </VStack>)
}