import { TouchableOpacity } from "react-native"
import { Box, HStack,VStack,Text, Heading, Icon } from "@gluestack-ui/themed"
import { Entypo } from '@expo/vector-icons' 
import { HomeButtonDTO } from "../dtos/HomeButtonDTO"

import PlaySvg from '@assets/icons/play.svg'
import CheckSvg from '@assets/icons/checkMark.svg'
import LinkSvg from '@assets/icons/externalLink.svg'
import QuestionSvg from '@assets/icons/question.svg'

type Props = {
  data: HomeButtonDTO
}

export const HomeCard = ({data}:Props) => {
  const color = data.type=="error" ? "$rose600" :
                data.type=="info" ? "$primary500" :
                data.type=="light" ? "$secondary400" :
                data.type=="muted" ? "$secondary800" :
                data.type=="success" ? "$tertiary500" :
                data.type=="warning" ? "$amber700" : "$tertiary500"
             
  return(
    <TouchableOpacity>
      <HStack bg="$warmGray900" alignItems="center" p="$2" pr="$4" rounded="$md" mb="$3">
        <Box w="$16" h="$16" rounded="$md" bg={`${color}`} mr="$4" justifyContent="center" alignItems="center">
          { data.icon == "faArrowUpRightFromSquare" ? 
            <LinkSvg fill="#fff" width={24} height={24}/> :
            data.icon == "faQuestion" ? 
            <QuestionSvg fill="#fff" width={24} height={24}/>:
            data.icon == "faListCheck" ? 
            <CheckSvg fill="#fff" width={24} height={24}/> : 
            <PlaySvg fill="#fff" width={24} height={24}/>}
        </Box>
        <VStack flex={1}>
          <Heading color="$white" fontSize="$lg">{data.name}</Heading>
          <Text color="$coolGray200" fontSize="$sm" mt="$1" numberOfLines={2}>{data.mobile_description}</Text>
        </VStack>
        <Icon as={Entypo} name={`chevron-thin-right`} color="$coolGray300"/>
      </HStack>
    </TouchableOpacity>
  )
}