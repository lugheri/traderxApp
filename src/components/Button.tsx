import { ButtonSpinner } from "@gluestack-ui/themed";
import { Button as ButtonGlueStack,ButtonText } from "@gluestack-ui/themed"

type Props = {
  title:string;
  variant?:"link" | "outline" | "solid";
  isLoading?:boolean;
  onPress?:()=>void
}
export const Button = ({title,variant,isLoading = false,onPress }:Props) => {
  return(
    <ButtonGlueStack   
      variant={variant}   
      w="$full"
      h="$14"
      bg={variant === "outline" ? "transparent" : "$traderGreen500" }
      borderWidth={variant === "outline" ? 1 : 0 }
      borderColor="$traderGreen500"
      rounded="$sm"
      $pressed-bg="$green700"
      $active-bg="$success700"
      onPress={onPress}
      isDisabled={isLoading}
    >
      {isLoading ? 
        <>
          <ButtonSpinner mr="$1" />
          <ButtonText fontWeight="$medium" fontSize="$sm">
            Aguarde...
          </ButtonText>
        </>
      : 
      <ButtonText
        color={variant === "outline" ? "$traderGreen500" : "$black" }
        fontFamily="$heading"
        fontSize="$sm"
        $pressed-color="$white">
        {title}
      </ButtonText>}
    </ButtonGlueStack>
  )
}