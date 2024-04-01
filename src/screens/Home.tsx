import { HomeHeader } from "@components/HomeHeader"
import { Heading, ImageBackground, Text, VStack } from "@gluestack-ui/themed"
import BackgroundHomeImg from '@assets/bgHome.png'

export const Home = () => {

  return(
    <VStack flex={1} bgColor="$traderBg800">
      <HomeHeader/>
      <ImageBackground
          source={BackgroundHomeImg}
          defaultSource={BackgroundHomeImg}
          resizeMode="stretch">
        <Heading my="$24" px="$4" size="sm" color="$white">Seja bem-vindo(a) à vida real do trader!</Heading>
      </ImageBackground>
    </VStack>
  )
}