import { Flex, Text } from '@chakra-ui/react';
import { IntervalLeak } from './Interval-leak';
import { GlobalMapLeak } from './global-map-leak.jsx';
import { ObjectMapLeak } from './object-map-leak.jsx';
import { ListenersLeak } from './listeners-leak.jsx';

const MemoryLeaksPage = () => {

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      w="100%"
      h="100vh"
      gap={5}
    >
      <Flex flex={1} gap={2} p={10} bg="gray.100" direction="column" alignItems="center" h="100%">
        <Text as="h2">Виток через інтервал</Text>
        <IntervalLeak />
      </Flex>
      <Flex flex={1} gap={2} p={10} bg="gray.100" h="100%" direction="column" alignItems="center">
        <Text as="h2">Виток через глобальне сховище new Map</Text>
        <GlobalMapLeak />
      </Flex>
      <Flex flex={1} gap={2} p={10} bg="gray.100" h="100%" direction="column" alignItems="center">
        <Text as="h2">Виток через збереження обʼєктів як ключів new Map</Text>
        <ObjectMapLeak />
      </Flex>
      <Flex flex={1} gap={2} p={10} bg="gray.100" h="100%" direction="column" alignItems="center">
        <Text as="h2">Виток через забутий слухач подій</Text>
        <ListenersLeak />
      </Flex>
    </Flex>
  );
};

export default MemoryLeaksPage;