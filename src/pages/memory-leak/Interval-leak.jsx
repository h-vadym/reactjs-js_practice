import { useState, useEffect } from 'react';
import { Text, Box, Button, Flex } from '@chakra-ui/react';

const LeakyComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Інтервал працює! Count:', count);
      setCount((prev) => prev + 1);
    }, 1000);

  }, [count]);

  return (
    <Box p="20px" border="1px solid red">
      <Text as="h3">Виток через неочищення інтервалів, вони тільки створюються</Text>
      <Text as="p">Секунд минуло: {count}</Text>
    </Box>
  );
};


export const IntervalLeak = () => {
  const [show, setShow] = useState(false);

  return (
    <Flex p="20px" direction="column" alignItems="center" gap={2}>
      <Button onClick={() => setShow(!show)} bg="green" color="white">
        {show ? 'Видалити компонент' : 'Показати компонент'}
      </Button>
      {show && (
        <>
          <LeakyComponent />
          <Text as="p">Відкрийте консоль (F12) і натисніть кнопку <b>Видалити компонент</b></Text>
        </>
      )}
    </Flex>
  );
};
