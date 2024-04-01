import { HStack, VStack, Heading, Text, useStyled } from "@gluestack-ui/themed"
import { UserPhoto } from "./UserPhoto"
import { TouchableOpacity } from "react-native"

import ExitSvg from '@assets/exit.svg'
export const HomeHeader = () => {
  const theme = useStyled()
  const sizes = theme.config.tokens.space
  const colors = theme.config.tokens.colors
  const iconSize = sizes[5]

  return(
    <HStack bg="$traderBg500" pt="$16" pb="$5" px="$8" alignItems="center">
      <UserPhoto
        source={{uri:'https://github.com/lugheri.png'}}
        alt="User Photo"
        size={64}
        
      />
      <VStack flex={1} mx="$4">
        <Text color="$coolGray200" fontSize="$md" my="$0">
          Olá,
        </Text>
        <Heading color="$coolGray100" fontSize="$xl" my="$0">
          Glauco
        </Heading>
      </VStack>   

      <TouchableOpacity>
        <ExitSvg fill={colors.coolGray300} width={iconSize} height={iconSize}/> 
      </TouchableOpacity>


    </HStack>
  )
}