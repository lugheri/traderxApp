import { useState } from "react"
import { ImageBackground,Center, VStack, Text, Image, Heading, ScrollView } from "@gluestack-ui/themed"

import BackgroundImg from '@assets/backgroundSignIn.png'
import Logo from '@assets/logo.png'
import { InputLogin } from "@components/Input"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRouterProps } from "@routes/auth.routes"

export const SignIn = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSigIn = () => {}
  const navigation = useNavigation<AuthNavigatorRouterProps>()

  const handleForgotPass = () => {
    navigation.navigate("forgotPass")
  }
  return(
    <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
      <VStack
        flex={1}
        
        bg="$traderLogin">

        <ImageBackground
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          flex={1}
          resizeMode="contain" >

          <Center my="$24">
            <Image 
              source={Logo}
              w="$1/2"
              resizeMode="contain" 
              alt="Logo Comunidade Traderx"/>

            <Text color="$white" fontSize="$xs">
              Bem-vindo à vida real do trader!
            </Text>
          </Center> 
          
          <Center px="$10">
            <Heading color="$white" fontSize="$xl" mb="$6">
              Faça seu Login
            </Heading>

            <InputLogin 
              placeholder="E-mail de Cadastro" 
              keyboardType="email-address"
              onChangeText={setUsername}
              autoCapitalize="none"/>
            
            <InputLogin 
              placeholder="Senha"
              onChangeText={setPassword}
              secureTextEntry />

            <Button title="Entrar Agora" onPress={handleSigIn}/>
          </Center> 

          <Center mt="$24" px="$10">
            <Text color="$white" fontSize="$sm">
              Esqueceu sua Senha?
            </Text>
            <Button 
              title="Recuperar Senha" 
              variant="outline"               
              onPress={handleForgotPass}/>
          </Center>
        
        </ImageBackground>
      </VStack>
    </ScrollView>
  )
}