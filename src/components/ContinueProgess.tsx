import { Heading, Text, VStack ,HStack, Box } from "@gluestack-ui/themed"
import { MonitorPlay } from "lucide-react-native"
import { TouchableOpacity } from "react-native"

export const ContinueProgress = () => {
  return(
    <VStack mt="$20" px="$4">
      <Box h={200} mb="$4" w="$full" bg="$white" rounded="$md" position="relative">
        <Box bg="$traderSecondaryGray" borderRadius="$sm" py="$1" px="$2" position="absolute" top="$2" left="$2">
          <Text color="$white" fontSize="$sm" >Continue de onde parou</Text>
        </Box>
      </Box>
      <Heading color="$white" mb="$4">Título</Heading>
      <Text color="$white"  fontSize="$sm">Descrição do Curso</Text>
      <TouchableOpacity>
        <HStack bg="$traderGreen500" justifyContent="center" alignItems="center" p="$3" pr="$4" rounded="$md" mt="$3">
          <MonitorPlay color="#000" size={24} strokeWidth={2}/>
          <Text color="$black" fontWeight="$bold" fontSize="$sm" ml="$4">Continuar conteúdo</Text>        
        </HStack>
      </TouchableOpacity>
    </VStack>
  )
}