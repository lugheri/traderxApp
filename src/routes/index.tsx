import { Box, useStyled } from "@gluestack-ui/themed";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

export function Routes(){
  const glueUiTheme= useStyled()
  const theme = DefaultTheme;
  theme.colors.background = glueUiTheme.config.tokens.colors.traderLogin
  const { user, isLoadingUserStorageData } = useAuth()
  if(isLoadingUserStorageData){
    return <Loading/>
  }
  return(
    <Box flex={1} bg="$traderLogin">
      <NavigationContainer theme={theme}>
        { user.id ? <AppRoutes/> : <AuthRoutes/> }
        
      </NavigationContainer>
    </Box>
  )
}