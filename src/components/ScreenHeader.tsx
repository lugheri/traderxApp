import { Center, Heading } from "@gluestack-ui/themed"

type Props = {
  title:string
}

export const ScreenHeader = ({title}:Props) => {
  return(
    <Center bg="$traderBg500"  pb="$6" pt="$16">
      <Heading color="$coolGray200" fontSize="$lg">
        {title}
      </Heading>
    </Center>
  )
}