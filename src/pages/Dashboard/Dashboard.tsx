import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Customer, searchCustomers } from "../../services/customers";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [input, setInput] = useState<string>("");

  const loadCustomers = useCallback(async (query?: Record<string, string>) => {
    try {
      setIsLoading(true);
      const customers = await searchCustomers({ ...query });
      setCustomers(customers);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const query = input.length > 0 ? { last_name: input } : undefined;
      loadCustomers(query);
    },
    [loadCustomers, input]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  return (
    <Flex h="calc(100vh - 70px)" direction={"column"}>
      <Box>
        <Heading m={4}>Customer Search</Heading>
        <Box m={4}>
          <form onSubmit={(e) => handleSearch(e)}>
            <FormControl>
              <FormLabel>Label</FormLabel>
              <Input
                onChange={handleInputChange}
                pr="4.5rem"
                type={"text"}
                placeholder="Name..."
              />
            </FormControl>
            <Button isLoading={isLoading} width="full" mt={4} type="submit">
              Search
            </Button>
          </form>
        </Box>
      </Box>
      <Box overflowX="scroll" m={4}>
        <TableContainer mt={4}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Company</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map((customer: Customer) => (
                <Tr key={customer.id}>
                  <Td>{customer.first_name + " " + customer.last_name}</Td>
                  <Td>{customer.email}</Td>
                  <Td>{customer.company}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
};

export default Dashboard;
