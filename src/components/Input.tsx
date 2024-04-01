import { Input as GlueStackInput, InputField } from "@gluestack-ui/themed"
import { TextInputProps } from "react-native"

export const InputLogin = ({...rest}:TextInputProps) => {

  return(
    <GlueStackInput
     
      h="$14"
     
      borderWidth="$0"
      mb="$5"      
    >
      <InputField 
        px="$4"
        bg="$traderBg800"
        color="$white"  
        fontSize="$sm"
        fontFamily="$body"
        $focus-borderColor="$green800"
        $focus-borderWidth={2}       
        {...rest}/>
    </GlueStackInput>
  )
}

type InputProps = TextInputProps & {
  isDisabled?:boolean
} 

export const Input = ({isDisabled=false,...rest}:InputProps) => {
  return(
    <GlueStackInput     
      h="$14"     
      borderWidth="$0"
      mb="$5"
      isDisabled={isDisabled}
    >
      <InputField 
        px="$4"
        bg="$traderBg800"
        color="$white"
        fontSize="$sm"
        fontFamily="$body"
        $focus-borderColor="$green800"
        $focus-borderWidth={2}   
        {...rest}    
      />
    </GlueStackInput>
  )
}