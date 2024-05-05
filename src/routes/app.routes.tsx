import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "@screens/Home";
import { MyCourses } from "@screens/MyCourses";

import { ClassRoom } from "@screens/ClassRoom";
import { Community } from "@screens/Community";
import { Profile } from "@screens/Profile";
import { useStyled } from "@gluestack-style/react";
import { Platform } from "react-native";
import { BookText, CircleUserRound, HomeIcon, MessageCircle } from "lucide-react-native";
import { Box } from "@gluestack-ui/themed";


type AppRoutes = { 
  home: undefined;
  myCourses: undefined;
  classRoom: { courseId:number };
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
      tabBarActiveTintColor:colors.traderPrimaryGray,
      tabBarInactiveTintColor:colors.traderGreen500,
      tabBarStyle:{
        position: 'absolute',
        backgroundColor: colors.traderSecondaryGray,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 10,
        borderRadius: 6,
        borderTopWidth:0,
        height: Platform.OS === "android" ? 'auto' : 96,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:sizes[8],
        paddingBottom:sizes[8]
      }
    }}>
      <Screen 
        name="home" 
        component={Home}
        options={{          
          tabBarIcon:({ color, size }) =>{
            return (
              <Box 
                bg={color === "#0f0f0f" ? "$traderGreen500" : "$traderPrimaryGray"} 
                p="$2" 
                w="$12" 
                h="$12" 
                justifyContent="center" 
                alignItems="center" 
                rounded="$md" 
                overflow="hidden">
                <HomeIcon color={color} size={size} strokeWidth={2}/>
              </Box>
            )
          },
        }}
      />

      <Screen 
        name="myCourses" 
        component={MyCourses}
        options={{
          tabBarIcon:({ color, size })=> {
            return (
              <Box 
                bg={color === "#0f0f0f" ? "$traderGreen500" : "$traderPrimaryGray"} 
                p="$2" 
                w="$12" 
                h="$12" 
                justifyContent="center" 
                alignItems="center" 
                rounded="$md" 
                overflow="hidden">
                <BookText color={color} size={size} strokeWidth={2}/>
              </Box>
            )
          },
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
          tabBarIcon:({ color, size })=>{
            return (
              <Box 
                bg={color === "#0f0f0f" ? "$traderGreen500" : "$traderPrimaryGray"} 
                p="$2" 
                w="$12" 
                h="$12" 
                justifyContent="center" 
                alignItems="center" 
                rounded="$md" 
                overflow="hidden">
              <MessageCircle color={color} size={size} strokeWidth={2}/>
            </Box>
          )
        },
        }}
      />

      <Screen 
        name="profile" 
        component={Profile}
        options={{
          tabBarIcon:({ color, size })=>{
            return (
              <Box 
                bg={color === "#0f0f0f" ? "$traderGreen500" : "$traderPrimaryGray"} 
                p="$2" 
                w="$12" 
                h="$12" 
                justifyContent="center" 
                alignItems="center" 
                rounded="$md" 
                overflow="hidden">
                <CircleUserRound color={color} size={size} strokeWidth={2}/>
              </Box>
            )
          },
        }}
      />
    </Navigator>

  )
}