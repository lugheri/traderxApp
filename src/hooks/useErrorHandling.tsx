import { useToast, Toast, ToastDescription, VStack} from "@gluestack-ui/themed";
import { AppError } from "@utils/AppError";

const useErrorHandling = () => {
  const toast = useToast() 

  const handleErrors = (error: Error) => {
    const isAppError = error instanceof AppError;
    const title = isAppError ? error.message : 'Não foi possível concluir a operação. Por favor, tente novamente mais tarde.';
    
    toast.show({
      placement:'top',
      render: ({id}) => {
        const toastId = "signIn-" + id
        return (
          <Toast nativeID={toastId} action="error" variant="accent" mt="$10"  bgColor="$red600">
            <VStack space="sm">
            <ToastDescription color="$white">{title}</ToastDescription>
            </VStack>
          </Toast>
        )
      }            
    })
  }

  return { handleErrors };
}
export default useErrorHandling;