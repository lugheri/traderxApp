import { Button as ButtonGlueStack,ButtonText } from "@gluestack-ui/themed"

type Props = {
  title:string;
  variant?:"link" | "outline" | "solid";
  onPress?:()=>void
}
export const Button = ({title,variant,onPress }:Props) => {
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
     >
      <ButtonText
        color={variant === "outline" ? "$traderGreen500" : "$black" }
        fontFamily="$heading"
        fontSize="$sm"
        $pressed-color="$white">
        {title}
      </ButtonText>
    </ButtonGlueStack>
  )
}