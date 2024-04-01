import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "@screens/SignIn";
import { ForgotPass } from "@screens/ForgotPass";


type AuthRoutes = {
  signIn: undefined;
  forgotPass:undefined
}

export type AuthNavigatorRouterProps = NativeStackNavigationProp<AuthRoutes>
const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export const AuthRoutes = () => {
  return(
    <Navigator screenOptions={{headerShown:false}}>
      <Screen
        name="signIn"
        component={SignIn}/>
      <Screen
        name="forgotPass"
        component={ForgotPass}/>
    </Navigator>
  )
}