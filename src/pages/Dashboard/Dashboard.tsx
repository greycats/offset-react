import { Flex } from "@chakra-ui/layout";
import React, { useCallback, useEffect, useState } from "react";
import { Customer, searchCustomers } from "../../services/customers";

const Dashboard = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadCustomers = useCallback(async (query?: string) => {
    console.log("Loading customers...");
    try {
      const customers = await searchCustomers(query);
      setCustomers(customers);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  return (
    <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
      <h1>Dashboard</h1>
      {customers.map((customer) => (
        <div key={customer.id}>
          <h2>{customer.name}</h2>
          <p>{customer.email}</p>
        </div>
      ))}
    </Flex>
  );
};

export default Dashboard;
