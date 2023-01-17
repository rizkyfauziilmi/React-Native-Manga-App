import { VStack, Text } from "native-base"
import BottomBar from "../../components/BottomBar"

const Setting = ({ navigation, route }) => {
  return (
    <VStack>
        <Text>Setting</Text>
        <BottomBar navigationProps={navigation} routeProps={route} />
    </VStack>
  )
}

export default Setting