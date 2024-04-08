import { ScrollView, VStack, ImageBackground} from "@gluestack-ui/themed"
import { HomeHeader } from "@components/HomeHeader"
import { HomeWellcome } from "@components/HomeWellcome"
import { HomeCard } from "@components/HomeCard"

import BackgroundHomeImg from "@assets/bgHome.png"
import { FlatList } from "@gluestack-ui/themed"
import { useEffect, useState } from "react"
import { useAuth } from "@hooks/useAuth"
import { api } from "@services/api"
import useErrorHandling from "@hooks/useErrorHandling"
import { Loading } from "@components/Loading"
import { HomeButtonDTO } from "@dtos/HomeButtonDTO"

export const Home = () => {
  const {user} = useAuth()
  const [ buttons, setButtons ] = useState<HomeButtonDTO[]>([])
  const [ isLoading, setIsLoading ] = useState(false)
  const { handleErrors } = useErrorHandling() 

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
    <VStack flex={1}>
      { isLoading ? <Loading/> : 
      <>
        <HomeHeader/>
        <ScrollView>       
          <ImageBackground
            source={BackgroundHomeImg}
            defaultSource={BackgroundHomeImg}
            flex={1}
            resizeMode="cover">
          
            <HomeWellcome/>
            <VStack px="$8" my="$4">
              {isLoading ? <Loading/>
              :
              <FlatList
                data={buttons}              
                renderItem={({item})=>(
                  <HomeCard  data={item}/>
                )}
                keyExtractor={(item: HomeButtonDTO) => item.id}
              />
            }
            </VStack>
          </ImageBackground>
        </ScrollView>
      </> }
    </VStack>
  )
}