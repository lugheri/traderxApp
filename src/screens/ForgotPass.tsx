import { ImageBackground,Center, VStack, Text, Image, Heading, ScrollView } from "@gluestack-ui/themed"

import { InputLogin } from "@components/Input"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"

import Logo from '@assets/logo.png'
import BackgroundImg from '@assets/backgroundSignIn.png'

export const ForgotPass = () => {
  const navigation = useNavigation()
  const handleGoBack = () => {
    navigation.goBack()
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
              Recuperar Senha
            </Heading>

            <InputLogin 
              placeholder="E-mail de Cadastro" 
              keyboardType="email-address"
              autoCapitalize="none"/>
            
            <Text color="$white" fontSize="$sm" textAlign="center" my="$2">
              Um e-mail com instruções para recuperar seu acesso será enviado. Confira sua caixa de entrada e caixa de spam.
            </Text>

            <Button title="Recuperar Senha"/>
          </Center> 

          <Center mt="$24" px="$10">
            <Button 
              title="Entrar" 
              variant="outline"               
              onPress={handleGoBack}/>
          </Center>
        
        </ImageBackground>
      </VStack>
    </ScrollView>
  )
}