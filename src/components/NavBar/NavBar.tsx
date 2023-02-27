import React from 'react';
import {
  Flex,
  Heading,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

type NavBarProps = {
    removeToken: () => void;
  };

const NavBar = ({ removeToken }: NavBarProps) => {
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex h="70px">
      <Flex
        p={4}
        w="100%"
        bg={formBackground}
        justifyContent="space-between"
        alignItems="center"
        alignContent="center"
        boxShadow="lg"
      >
        <Heading>Offset Nav</Heading>
        <Button onClick={removeToken} colorScheme="teal">
          Log Out
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavBar;
