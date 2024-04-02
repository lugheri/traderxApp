import { useState } from "react";
import { ScrollView, Center, VStack, Text, Heading, Button, useToast, Toast, ToastDescription, ToastTitle } from "@gluestack-ui/themed";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import ContentLoader,{ Circle }  from "react-content-loader/native"
import { TouchableOpacity, useWindowDimensions } from "react-native"
import { Input } from "@components/Input"
import { ButtonText } from "@gluestack-ui/themed"

export const Profile = () => {
  const { width } = useWindowDimensions()
  const PHOTO_SIZE = 128
  const MARGIN = 20

  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto ] = useState('https://github.com/lugheri.png')
  const toast = useToast()

  const [name, setName ] = useState('Glauco Lugheri')
  const [email] = useState('lugheri@live.com')

  const handleUserPhotoSelect = async () => {
    setPhotoIsLoading(true)
    try{
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality:1,
        aspect:[4,4],
        allowsEditing: true,
      })
  
      if(photoSelected.canceled){
        return
      }  
      if(photoSelected.assets[0].uri){
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri) as any     
        if(photoInfo.size && photoInfo.size / 1024 /1024 > 5){
          return toast.show({
            placement:'bottom',
            render: ({id}) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} action="error" variant="accent">
                  <VStack space="xs">
                  <ToastTitle color="$red500">Erro !</ToastTitle>
                  <ToastDescription>Essa imagem é muito grande. Escolha uma de até 5MB</ToastDescription>
                  </VStack>
                </Toast>
              )
            }            
          })
          return
        }
        setUserPhoto(photoSelected.assets[0].uri)
      }

    }catch(err){
      console.log(err)
    } finally{
      setPhotoIsLoading(false)
    }   
  }

  return(
    <VStack flex={1}>
      <ScreenHeader title="Perfil"/>
      <ScrollView>
        <Center mt="$6" px="$10">
          { photoIsLoading ? 
            <ContentLoader            
              width={width}
              height={PHOTO_SIZE+MARGIN}
              viewBox={`0 0 ${width} ${PHOTO_SIZE*2+MARGIN}`}
              backgroundColor="#333"
              foregroundColor="#241e1e">
              <Circle cx={width/2} cy={PHOTO_SIZE} r={PHOTO_SIZE}/>
            </ContentLoader>
            :
            <UserPhoto
              source={{uri:userPhoto}}
              alt="User Photo"
              size={PHOTO_SIZE}
            />
          }
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text 
              color="$traderGreen500" 
              fontWeight="$bold" 
              fontSize="$md" 
              mt="$2" 
              mb="$8">
                Alterar foto
            </Text>
          </TouchableOpacity>

          <Input 
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
          <Input 
            placeholder="E-mail"
            value={email}
            isDisabled
          />
        </Center>

       
        <VStack px="$10" mt="$12" mb="$9">
          <Heading color="$coolGray200" fontSize="$md" mb="$2">
            Alterar senha
          </Heading>
         
          <Input 
            placeholder="Senha Antiga"
            secureTextEntry
          />
          <Input 
            placeholder="Nova Senha"
            secureTextEntry
          />
          <Input 
            placeholder="Confirme a nova Senha"
            secureTextEntry
          />
          <Button bg="$traderGreen500" mt="$4" w="$full" h="$14">
            <ButtonText 
              color="$black" 
              fontFamily="$heading"
              fontSize="$sm"
              $pressed-color="$white">Atualizar</ButtonText>
          </Button>
        </VStack>


      </ScrollView>
    </VStack>
  )
}