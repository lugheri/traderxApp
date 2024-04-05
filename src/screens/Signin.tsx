import { ImageBackground,Center, VStack, Text, Image, Heading, ScrollView } from "@gluestack-ui/themed"

import BackgroundImg from '@assets/backgroundSignIn.png'
import Logo from '@assets/logo.png'
import { InputLogin } from "@components/Input"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRouterProps } from "@routes/auth.routes"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from "@hooks/useAuth"
import { useState } from "react"
import useErrorHandling from "@hooks/useErrorHandling"

type FormDataProps = {
  email:string,
  password:string
}

const signUpSchema = yup.object({
  email:yup.string().required('Informe o email.').email('E-mail inválido.'),
  password:yup.string().required('Informe a senha.').min(6,'A senha informada é muito curta.')
})

export const SignIn = () => {  
  const { handleErrors } = useErrorHandling();
  const { control, handleSubmit, formState:{errors} } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })

  const { signIn } = useAuth()
  const [ isLoading, setIsLoading] = useState(false)

  const handleSigIn = async ({email,password}: FormDataProps) => {
    try{
      setIsLoading(true)
      await signIn(email,password)
    }catch(error){
      handleErrors(error as Error);
    }
  }

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

            <Controller 
              control={control}
              name="email"              
              render={({field:{onChange, value}})=>(
                <InputLogin 
                  placeholder="E-mail de Cadastro" 
                  keyboardType="email-address"
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  errorMessage={errors.email?.message}/>
              )}
            />
          

            <Controller 
              control={control}
              name="password"             
              render={({field:{onChange, value}})=>(
                <InputLogin 
                  placeholder="Senha" 
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}                  
                  onSubmitEditing={handleSubmit(handleSigIn)}
                  returnKeyType="send"
                  errorMessage={errors.password?.message}/>
              )}
            />

            <Button 
              title="Entrar Agora"  
              isLoading={isLoading} 
              onPress={handleSubmit(handleSigIn)}/>
          </Center> 

          <Center mt="$24" px="$10">
            <Text color="$white" fontSize="$sm">
              Esqueceu sua Senha?
            </Text>
            <Button 
              title="Recuperar Senha" 
              variant="outline"               
              onPress={handleForgotPass}
             />
          </Center>
        
        </ImageBackground>
      </VStack>
    </ScrollView>
  )
}