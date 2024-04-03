import { AlertCircleIcon, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, Input as GlueStackInput, InputField } from "@gluestack-ui/themed"
import { TextInputProps } from "react-native"

type InputLoginProps = TextInputProps & {
  errorMessage?:string|null
  isInvalid?:boolean
}
export const InputLogin = ({errorMessage = null,isInvalid = false, ...rest}:InputLoginProps) => {
  const invalid = !!errorMessage || isInvalid
  return(
    <FormControl w="$full" mb="$5" isInvalid={invalid}>
      <GlueStackInput  h="$14" borderWidth="$0"  isInvalid={invalid}>
      <InputField 
        px="$4"
        bg="$traderBg800"
        color="$white"  
        fontSize="$sm"
        fontFamily="$body"
        $invalid-borderColor="$red500"
        $invalid-borderWidth={1}
        $focus-borderColor="$green800"
        $focus-borderWidth={2}             
        {...rest}/>
      </GlueStackInput> 
      { errorMessage && 
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            {errorMessage}
          </FormControlErrorText>
        </FormControlError>
      }
    </FormControl>
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