import { useCallback, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { Center, FlatList} from "@gluestack-ui/themed"

import { Loading } from "../../../components/Loading"
import { useAuth } from "@hooks/useAuth"
import useErrorHandling from "@hooks/useErrorHandling"
import { CourseDTO } from "@dtos/CourseDTO"
import { api } from "@services/api"
import {  CourseCardHome } from "../../MyCourses/components/CourseCard"

export const HomeCourses = () => {
  const {user} = useAuth()
  const [ isLoading, setIsLoading ] = useState(false)
  const { handleErrors } = useErrorHandling() 
  
  const [ courses, setCourses ] = useState<CourseDTO[]>([])
  const getCourses = async () => {
    try{
      setIsLoading(true)
      const allcourses = await api.get(`myCourses/${user.id}`)
      setCourses(allcourses.data.response)
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
    isLoading ? 
      <Center flex={1}>
        <Loading/> 
      </Center>
    :
      <FlatList
        data={courses as CourseDTO[]}
        renderItem={({item}: { item: CourseDTO|any })=>(
          <CourseCardHome 
            onPress={handleOpenCourse}
            data={item}/>
          )}
          keyExtractor={(item:any) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingTop:80}}
        />
  )
}