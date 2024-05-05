import { HStack, Icon, Image, View } from "@gluestack-ui/themed"
import Logo from '@assets/logo.png'
import { EllipsisVertical } from 'lucide-react-native';
import { TouchableOpacity } from "react-native"

export const Header = () => {
  return(
    <HStack bg="$traderSecondaryGray" pt="$10" pb="$4" px="$6" alignItems="center">
      <View flex={1}>
        <Image source={Logo} w="40%" h="$10" resizeMode="contain"  alt="Logo Trader X" />
      </View>
      <TouchableOpacity>
        <EllipsisVertical color="#0f0" size={24} strokeWidth={2} />
      </TouchableOpacity>
    </HStack>
  )
}