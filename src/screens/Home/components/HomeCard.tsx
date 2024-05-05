import { TouchableOpacity } from "react-native"
import { Box, HStack,VStack,Text, Heading, Icon, ChevronRightIcon } from "@gluestack-ui/themed"
import { HomeButtonDTO } from "../../../dtos/HomeButtonDTO"

import PlaySvg from '@assets/icons/play.svg'
import CheckSvg from '@assets/icons/checkMark.svg'
import LinkSvg from '@assets/icons/externalLink.svg'
import QuestionSvg from '@assets/icons/question.svg'
import { ClipboardCheck,  MessageCircleQuestion,  MonitorPlay,  SquareArrowOutUpRight } from "lucide-react-native"

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
        <HStack bg="$traderPrimaryGray" borderColor={`${color}`} borderWidth={2} justifyContent="center" alignItems="center" p="$3" pr="$4" rounded="$md" mx="$4" mt="$3">
          { data.icon == "faArrowUpRightFromSquare" ? 
              <SquareArrowOutUpRight color="#fff" size={24} strokeWidth={1}/> :
            data.icon == "faQuestion" ? 
              <MessageCircleQuestion color="#fff" size={24} strokeWidth={1}/>:
            data.icon == "faListCheck" ? 
              <ClipboardCheck color="#fff" size={24} strokeWidth={1}/> : 
              <MonitorPlay color="#fff" size={24} strokeWidth={1}/>
          }
          <Text color="$white" fontSize="$sm" ml="$4">{data.name}</Text>        
      </HStack>
      { data.mobile_description && 
        <Text color="$coolGray200" textAlign="center" mt="$1" fontSize="$sm" numberOfLines={2}>
          {data.mobile_description}
        </Text>
      }
    </TouchableOpacity>
  )
}