import { useEffect, useState } from "react"
import { HomeHeader } from "@components/HomeHeader"
import { Heading, VStack, ScrollView} from "@gluestack-ui/themed"
import BackgroundHomeImg from '@assets/bgHome.png'
import { api } from "@services/api"
import useErrorHandling from "@hooks/useErrorHandling"
import { Center } from "@gluestack-ui/themed"
import { Spinner } from "@gluestack-ui/themed"
import { Image } from "@gluestack-ui/themed"
import { WebView } from 'react-native-webview';

export const Home = () => {
  const [ titleHome, setTitleHome ] = useState('')
  const [ textHome, setTextHome ] = useState('')
  const {handleErrors} = useErrorHandling()
  const [ isLoading, setIsLoading] = useState(false)

  const getDataHome = async() => {
    try{
      setIsLoading(true)
      const home = await api.get(`getTextHomeCommunity`)
      console.log('data api ---- ',home.data)
      setTitleHome(home.data.response.title_text)
      setTextHome(home.data.response.text)
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
    <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bgColor="$traderBg800">
        <HomeHeader/>
        <Image 
          source={BackgroundHomeImg}
          defaultSource={BackgroundHomeImg}
          flex={1}
          resizeMode="contain"
          alt="Logo Comunidade Traderx"/>

        
          { isLoading ? 
            <Center flex={1} bg="$traderBg700">
              <Spinner color="$traderGreen500"/>
            </Center>
          :
            <>
              <Heading my="$24" px="$4" size="sm" color="$white">
                {titleHome}
              </Heading>
              <WebView
                originWhitelist={['*']}
                source={{ html: textHome }}
              />
            </>
          }
      
      </VStack>
    </ScrollView>
  )
}