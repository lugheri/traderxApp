
import { Text, Box, VStack } from "@gluestack-ui/themed"

export const ProgressBar = () => {

  const getProgressCourse = async () => {
    /*try{
      const prog = await ArrowUpIcon.get(`progressCourse/${props.infoCourse.id}/${props.userId}`)
      setProgressCourse(prog.data.response)        
    }catch(e){console.log(e)}*/
  }


  return(
    <VStack>
      <Text fontSize="$sm" color="$coolGray400">0% concluido</Text>   
      <Box h="$2" borderColor="$traderGreen500" borderWidth={1} rounded="$md">

      </Box>
    </VStack>
  )
}