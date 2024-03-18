import { Loading } from '@components/Loading';
import { useFonts,Poppins_400Regular,Poppins_700Bold } from '@expo-google-fonts/poppins'
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from "./config/gluestack-ui.config" // Optional if you want to use default theme
import { Text,StatusBar } from 'react-native';


export default function App() {
  const [ fontsLoaded ] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })
  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent      
      />
      { fontsLoaded ? <Text>Font Loaded</Text> : <Loading/> }
    </GluestackUIProvider>
  );
}
