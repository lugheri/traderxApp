import { Center, Spinner } from "@gluestack-ui/themed"

export const Loading = () => {
  return(
    <Center 
      flex={1}
      bg="$traderBg700">
      <Spinner color="$traderGreen500"/>
    </Center> 
  )
}