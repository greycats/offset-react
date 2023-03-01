import { http } from "./http";

export type Customer = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
};

type CustomerSearchResponse = Record<string, Customer>;

export async function searchCustomers(
  query?: Record<string, string>,
): Promise<Customer[]> {
  try {
    const q = new URLSearchParams(query).toString();
    const { data } = await http.get<CustomerSearchResponse>(
      `/v1/customers/search/${q ? encodeURIComponent(q): '%2A'}`
    );

    return Object.values(data);
  } catch (error) {
    throw error;
  }
}
