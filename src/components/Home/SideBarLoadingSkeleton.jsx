import { VStack, HStack, Text, Circle, TabList, Tab } from "@chakra-ui/react";
import "../Styles/LoadingSkeleton.css";

const SideBarLoadingSkeleton = () => {

  const SideBarSkeletonItems = Array.from({ length: 15 }, (_, i) => (
    <HStack maxW="95%" as={Tab} key={i} >
      <Circle w="15px" h="15px" className="loading-animation" />
      <Text 
        h = "14px"
        w = "80px"
        borderRadius="5px"
        className="loading-animation"></Text>
    </HStack>
  ));

  return (
    <VStack as={TabList} w="100%" overflowY="scroll" overflowX="hidden">
      {SideBarSkeletonItems}
    </VStack>
  );
};

export default SideBarLoadingSkeleton;
