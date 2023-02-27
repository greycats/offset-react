import { http } from "./http";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

type CustomerSearchResponse = Record<string, Customer>;

export async function searchCustomers(query?: string): Promise<Customer[]> {
  try {
    const { data } = await http.get<CustomerSearchResponse>(
      `/v1/customer/search/?${query}`
    );

    return Object.values(data);
  } catch (error) {
    console.log("error from service", error);
    throw error;
  }
}
