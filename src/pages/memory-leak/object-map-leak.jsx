import { useState, useEffect } from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';

const metadataStore = new Map();

const LeakyComponent = () => {
  useEffect(() => {
    for (let i = 0; i < 100000; i++) {
      let componentConfig = {
        id: Math.random(),
        type: 'temporary-config'
      };
      metadataStore.set(componentConfig, { status: 'active', lastSeen: Date.now() });

      componentConfig = null;
    }

    console.log('🔑 Об\'єкт додано як ключ. Розмір Map:', metadataStore.size);

    // ❌ ПРОБЛЕМА:
    // Навіть коли цей useEffect закінчиться і компонент зникне,
    // об'єкт `componentConfig` НЕ БУДЕ видалений Garbage Collector-ом.
    // Він застряг всередині metadataStore навічно.
  }, []);

  return (
    <Box border="1px solid purple" p={10}>
      <h3>Витік через Об'єкт-ключ</h3>
      <p>
        Активних об'єктів у пам'яті (через Map): <strong>{metadataStore.size}</strong>
      </p>
      <small>Кожен ре-маунт створює новий об'єкт, який ніколи не видаляється.</small>
    </Box>
  );
};


export const ObjectMapLeak = () => {
  const [show, setShow] = useState(false);

  return (
    <Flex p="20px" direction="column" alignItems="center" gap={2}>
      <Button onClick={() => setShow(!show)} bg="green" color="white">
        {show ? 'Видалити компонент' : 'Показати компонент'}
      </Button>
      {show && (
        <>
          <LeakyComponent />
        </>
      )}
    </Flex>
  );
};