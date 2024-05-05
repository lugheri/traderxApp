import { ContinueProgress } from "@components/ContinueProgess"
import { ModuleDTO } from "@dtos/ModuleDTO"
import { Box, FlatList, View } from "@gluestack-ui/themed"
import { VStack, Text } from "@gluestack-ui/themed"
import { useAuth } from "@hooks/useAuth"
import useErrorHandling from "@hooks/useErrorHandling"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { api } from "@services/api"
import { useCallback, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ModuleCourse } from "./components/ModuleCourse"

type RouteParamsProps = {
  courseId:number
}
export const ClassRoom = () => {
  const {user} = useAuth()
  const { handleErrors } = useErrorHandling() 
  const [ isLoading, setIsLoading ] = useState(false)
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const { courseId } = route.params as RouteParamsProps

  const handleGoBack = () => {
    navigation.navigate("myCourses")
  }

  const [ modules, setModules ] = useState<ModuleDTO[]>([])
  const getModules = async () => {
    try{
      setIsLoading(true)
      const modules = await api.get(`modulesCourse/${courseId}`)
      setModules(modules.data.response)
    }catch(error){
      handleErrors(error as Error);
    }finally{
      setIsLoading(false)
    }
  }
  useFocusEffect(useCallback(()=>{
    getModules()
  },[courseId]))


  return(
    <VStack flex={1} mb="$33">
      <ContinueProgress/>     
      <FlatList
          data={modules as ModuleDTO[]}
          renderItem={({item}: { item: ModuleDTO|any })=>(
            <ModuleCourse data={item}/>
          )}
          keyExtractor={(item:any) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:80}}
        />
      
     
    </VStack>
  )
}

type Props = {
  data: ModuleDTO
}

export const Module = ({data}:Props) => {
  return(
    <Box>
      <Text>{data.module}</Text>
    </Box>
  )
}