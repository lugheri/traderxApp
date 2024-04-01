import { Box, useStyled } from "@gluestack-ui/themed";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { ThemeStyles } from "@gluestack-style/react/lib/typescript/types";

export function Routes(){
  const glueUiTheme= useStyled()
  const theme = DefaultTheme;
  theme.colors.background = glueUiTheme.config.tokens.colors.traderLogin

  return(
    <Box flex={1} bg="$traderLogin">
      <NavigationContainer theme={theme}>
        {/*<AuthRoutes/>*/}
        <AppRoutes/>
      </NavigationContainer>
    </Box>
  )
}