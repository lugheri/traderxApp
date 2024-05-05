import { VStack, HStack, Text, Heading, Image, Center, Spinner, Icon, CalendarDaysIcon, Box } from "@gluestack-ui/themed"
import { ProgressBar } from "../../../components/ProgressBar"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { BaseUrl } from "@utils/BaseUrl"
import { CourseDTO} from "@dtos/CourseDTO"
import { useEffect, useState } from "react"
import { api } from "@services/api"
import { useAuth } from "@hooks/useAuth"
import useErrorHandling from "@hooks/useErrorHandling"
import { FileDTO } from "@dtos/FileDTO"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"

type Props = TouchableOpacityProps & {
  data: CourseDTO
}
export const CourseCard = ({data,...rest}:Props) => {
  const {user} = useAuth()
  const [ isLoading, setIsLoading ] = useState(false)
  const { handleErrors } = useErrorHandling() 

  const [ validityCourse, setValidityCourse ] = useState<'valid'|'expired'>()
  const [ imageUrl, setImageUrl ] = useState<FileDTO|null>(null)

  const getInfoContract = async () => {
    try{
      setIsLoading(true)
      const contract = await api.get(`validityCourse/${data.id}/${user.id}`)
      setValidityCourse(contract.data.response)
    }catch(error){
      handleErrors(error as Error);
    }finally{
      setIsLoading(false)
    }
  }
  const getImage = async () => {
    try{
      setIsLoading(true)
      const img = await api.get(`infoFile/${data.default_thumb}`)
      console.log(img.data.response)
      setImageUrl(img.data.response)
    }catch(error){
      handleErrors(error as Error);
    }finally{
      setIsLoading(false)
    }
  }
  useEffect(()=>{
    getInfoContract()
  },[])
  useEffect(()=>{
    getImage()
  },[])


  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const openCourse = () => {   
    const courseId = data.id
    navigation.navigate("classRoom",{courseId})
  }


  
  return(
    <TouchableOpacity {...rest} onPress={openCourse}>
      <VStack mb="$8" mx="$2">
        { isLoading ? 
          <Box
            w="$full" h="$44" mb="$2"
            justifyContent="center" alignItems="center" bg="$traderSecondaryGray" 
            rounded="$xl" borderWidth={1} borderColor="$traderGreen500" >
            <Spinner color="$traderGreen500"/> 
          </Box>
        :
          <Center flex={1}>
            <Image 
              source={{uri:`${BaseUrl}/gallery/${imageUrl?.file}`}}
              w="$full"
              h="$44"
              alt="Capa do Curso"
              rounded="$xl"
              borderWidth={1} borderColor="$traderGreen500"
              mb="$2"
              overflow="hidden"
            />  
            {validityCourse !== "valid" && 
              <HStack position="absolute" bottom={5} bgColor="$red500" py="$1" px="$2" rounded="$md"  justifyContent="center" alignItems="center">
                <Icon as={CalendarDaysIcon} color="$coolGray300" mr="$2"/>
                <Heading color="$white" fontSize="$sm">                  
                  Acesso Expirado
                </Heading>
              </HStack>}
          </Center>
        }  
        <ProgressBar/>
        <Heading color="$white" fontSize="$sm">{data.name}</Heading> 
        <Text color="$white" fontSize="$xs" numberOfLines={3}>{data.description}</Text>   
      
      </VStack>
    </TouchableOpacity>
  )
}


export const CourseCardHome = ({data,...rest}:Props) => {
  const {user} = useAuth()
  const [ isLoading, setIsLoading ] = useState(false)
  const { handleErrors } = useErrorHandling() 

  const [ validityCourse, setValidityCourse ] = useState<'valid'|'expired'>()
  const [ imageUrl, setImageUrl ] = useState<FileDTO|null>(null)

  const getInfoContract = async () => {
    try{
      setIsLoading(true)
      const contract = await api.get(`validityCourse/${data.id}/${user.id}`)
      setValidityCourse(contract.data.response)
    }catch(error){
      handleErrors(error as Error);
    }finally{
      setIsLoading(false)
    }
  }
  const getImage = async () => {
    try{
      setIsLoading(true)
      const img = await api.get(`infoFile/${data.image}`)
      console.log(img.data.response)
      setImageUrl(img.data.response)
    }catch(error){
      handleErrors(error as Error);
    }finally{
      setIsLoading(false)
    }
  }
  useEffect(()=>{
    getInfoContract()
  },[])
  useEffect(()=>{
    getImage()
  },[])




  
  return(
    <TouchableOpacity {...rest}>
      <VStack mb="$6" mx="$3" w="$40">
        { isLoading ? 
          <Spinner color="$traderGreen500"/> 
        :
          <Center flex={1}>
            <Image 
              source={{uri:`${BaseUrl}/gallery/${imageUrl?.file}`}}
              w="$full"
              h="$56"
              alt="Capa do Curso"
              rounded="$xl"
              overflow="hidden"
            />         
          </Center>
        }  
        <Heading color="$white" fontSize="$sm">{data.name}</Heading>  
      
      </VStack>
    </TouchableOpacity>
  )
}