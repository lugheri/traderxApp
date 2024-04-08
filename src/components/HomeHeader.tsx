import { HStack, VStack, Heading, Text, useStyled } from "@gluestack-ui/themed"
import { UserPhoto } from "./UserPhoto"
import { TouchableOpacity } from "react-native"

import ExitSvg from '@assets/exit.svg'
import { useAuth } from "@hooks/useAuth"
import defaultUserPhotoImg from '@assets/userPhotoDefault.png'

export const HomeHeader = () => {
  const theme = useStyled()
  const sizes = theme.config.tokens.space
  const colors = theme.config.tokens.colors
  const iconSize = sizes[5]
  const { user, signOut } = useAuth()
  
  return(
    <HStack bg="$traderBg800" pt="$10" pb="$5" px="$8" alignItems="center">
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
      <TouchableOpacity onPress={signOut}>
        <ExitSvg fill={colors.coolGray300} width={iconSize} height={iconSize}/> 
      </TouchableOpacity>
    </HStack>
  )
}