import { CourseCard } from "@screens/MyCourses/components/CourseCard"
import { Loading } from "@components/Loading"
import { ScreenHeader } from "@components/ScreenHeader"
import { CourseDTO } from "@dtos/CourseDTO"
import { Center } from "@gluestack-ui/themed"
import { FlatList } from "@gluestack-ui/themed"
import { VStack } from "@gluestack-ui/themed"
import { useAuth } from "@hooks/useAuth"
import useErrorHandling from "@hooks/useErrorHandling"
import { useFocusEffect } from "@react-navigation/native"
import { api } from "@services/api"
import { useCallback, useState } from "react"

export const MyCourses = () => {
  const {user} = useAuth()
  const { handleErrors } = useErrorHandling() 
  const [ isLoading, setIsLoading ] = useState(false)

  const [ courses, setCourses ] = useState<CourseDTO[]>([])

  const getCourses = async () => {
    try{
      setIsLoading(true)
      const mycourses = await api.get(`myCourses/${user.id}`)
      setCourses(mycourses.data.response)
    }catch(error){
      handleErrors(error as Error);
    }finally{
      setIsLoading(false)
    }
  }
  useFocusEffect(useCallback(()=>{
    getCourses()
  },[]))

  const handleOpenCourse = () => {}

  return(
    <VStack bg="$black" flex={1} >
      <ScreenHeader title="Meus Cursos"/>
      <VStack px="$4" mt="$4" mb="$32">
      { isLoading ? 
        <Center flex={1}>
          <Loading /> 
        </Center> : 
        <FlatList
          data={courses as CourseDTO[]}
          renderItem={({item}: { item: CourseDTO|any })=>(
            <CourseCard 
              onPress={handleOpenCourse}
              data={item}/>
          )}
          keyExtractor={(item:any) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:80}}
        />
      }
      </VStack>  
    </VStack>  
  )
}