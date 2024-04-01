import { useState } from "react"
import { ScrollView, Center, VStack, Text, Heading, Button } from "@gluestack-ui/themed"

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

  const [name, setName ] = useState('Glauco Lugheri')
  const [email] = useState('lugheri@live.com')

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
              source={{uri:'https://github.com/lugheri.png'}}
              alt="User Photo"
              size={PHOTO_SIZE}
            />
          }
          <TouchableOpacity>
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