import { IImageProps } from "@gluestack-ui/image/lib/typescript/types"
import { Image } from "@gluestack-ui/themed"

type Props = IImageProps & {
  size:number;
}

export const UserPhoto = ({size, ...rest}:Props) => {

  return(
    <Image
      w={size}
      h={size}
      rounded="$full"
      borderWidth="$2"
      borderColor="$coolGray400"   
      
      { ...rest }
    />
  )
}