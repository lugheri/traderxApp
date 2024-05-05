import { StatusBar } from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from "./config/gluestack-ui.config" // Optional if you want to use default theme
import { useFonts,Poppins_400Regular,Poppins_700Bold } from '@expo-google-fonts/poppins'

import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/AuthContext';

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
      <AuthContextProvider>
      { fontsLoaded ? <Routes/> : <Loading/> }
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}

