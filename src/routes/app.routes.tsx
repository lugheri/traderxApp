import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeSvg from '@assets/home.svg'
import CoursesSvg from '@assets/course.svg'
import UsersSvg from '@assets/users.svg'
import ProfileSvg from '@assets/profile.svg'

import { Home } from "@screens/Home";
import { MyCourses } from "@screens/MyCourses";
import { ClassRoom } from "@screens/ClassRoom";
import { Community } from "@screens/Community";
import { Profile } from "@screens/Profile";
import { useStyled } from "@gluestack-style/react";
import { Platform } from "react-native";

type AppRoutes = { 
  home: undefined;
  myCourses: undefined;
  classRoom: undefined;
  community: undefined;
  profile: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>
const { Navigator,Screen} = createBottomTabNavigator<AppRoutes>()

export const AppRoutes = () => {
  const theme = useStyled()
  const sizes = theme.config.tokens.space
  const colors = theme.config.tokens.colors
  const iconSize = sizes[6]
  return(
    <Navigator screenOptions={{
      headerShown:false,
      tabBarShowLabel:false,
      tabBarActiveTintColor:colors.traderGreen500,
      tabBarInactiveTintColor:colors.gray200,
      tabBarStyle:{
        backgroundColor: colors.traderBg700,
        borderTopWidth:0,
        height: Platform.OS === "android" ? 'auto' : 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[6],

      }
    }}>
      <Screen 
        name="home" 
        component={Home}
        options={{
          tabBarIcon:({ color })=>(
            <HomeSvg fill={color} width={iconSize} height={iconSize}/>
          )
        }}
      />

      <Screen 
        name="myCourses" 
        component={MyCourses}
        options={{
          tabBarIcon:({ color })=>(
            <CoursesSvg fill={color} width={iconSize} height={iconSize}/>
          )
        }}
      />  

      <Screen 
        name="classRoom" 
        component={ClassRoom}
        options={{tabBarButton: ()=>null}}
      />

      <Screen 
        name="community" 
        component={Community}
        options={{
          tabBarIcon:({ color })=>(
            <UsersSvg fill={color} width={iconSize} height={iconSize}/>
          )
        }}
      />

      <Screen 
        name="profile" 
        component={Profile}
        options={{
          tabBarIcon:({ color })=>(
            <ProfileSvg  fill={color} width={iconSize} height={iconSize}/>
          )
        }}
      />
    </Navigator>

  )
}