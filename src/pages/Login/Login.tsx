import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { loginUserWithCreds, UserInfo } from "../../services/auth";

type LoginProps = {
  setToken: (userInfo: UserInfo) => void;
};

const Login = ({ setToken }: LoginProps) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const toast = useToast()

  const handleSubmit: React.FormEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    if (!userEmail || !password) return;
    try {
      setIsLoading(true);
      const userInfo = await loginUserWithCreds(userEmail, password);
      setToken(userInfo);
    } catch (error) {
      toast({
        title: "Error logging in",
        position: "top",
        description: (error as Error).message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        w="400px"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        <Input
          placeholder="User Email"
          type="email"
          variant="filled"
          mb={3}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          mb={6}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button isLoading={isLoading} colorScheme="teal" mb={8} onClick={handleSubmit}>
          Log In
        </Button>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            Enable Dark Mode?
          </FormLabel>
          <Switch
            id="dark_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
        </FormControl>
      </Flex>
    </Flex>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
