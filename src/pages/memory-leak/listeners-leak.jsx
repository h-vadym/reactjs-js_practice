import { useState, useEffect, useRef } from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';

const metadataStore = new Map();

const LeakyComponent = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      console.log('🐭 Миша рухається! (Логіка працює)');

      // Спроба оновити стейт.
      // Якщо компонент розмонтовано, це може викликати помилку або попередження в старих версіях React,
      // і точно споживає ресурси CPU.
      setCoords({ x: e.clientX, y: e.clientY });
    };

    // 🔴 ПІДПИСКА
    // Ми додаємо слухача до глобального об'єкта window
    window.addEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box border="1px solid purple" p={10}>
      <h3>Витік через додавання слухача подій і не видалення його</h3>
      <p>X: {coords.x}, Y: {coords.y}</p>
      <small>Кожен ре-маунт створює нову підписку, яка ніколи не видаляється.</small>
    </Box>
  );
};


export const ListenersLeak = () => {
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