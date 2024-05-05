import { ModuleDTO } from "@dtos/ModuleDTO"
import { HStack, Text } from "@gluestack-ui/themed"
import { ChevronDown, ChevronUp } from "lucide-react-native"
import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListLessons } from "./ListLessons"

type Props = {
  data: ModuleDTO
}





export const ModuleCourse = ({data}:Props) => {
  const [ openModule, setOpenModule ] = useState(false)

  const handleOpenModule = () => {
    setOpenModule(!openModule)
  }

  return (
    <TouchableOpacity onPress={handleOpenModule}>
      <HStack flex={1} bg="$traderBg300" mx="$4" my="$2" p="$4">
        <Text color="$white" flex={1}>{data.module}</Text>
        { openModule 
        ? <ChevronUp size={24} color="#fff"/>
        : <ChevronDown size={24} color="#fff"/>}
      </HStack>
      { openModule && <ListLessons moduleId={data.id}/> }
    </TouchableOpacity>
  )
}