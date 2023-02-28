import { useState } from "react";

const BASE_URL = process.env.REACT_APP_AUTH_SERVER_URL;

interface Account {
  id: string;
  name: string;
  app: string;
  account: string;
}

export interface UserInfo {
  profile: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    created: string;
    require_2fa: string;
  };
  accounts: Record<string, Account>;
  ticket: string;
  token?: string;
}

export function useToken() {
  const getToken = (): string | null => {
    const tokenString = sessionStorage.getItem("token");
    if (!tokenString) {
      return null;
    }
    const userToken = JSON.parse(tokenString) as UserInfo;
    return userToken.ticket;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userInfo: UserInfo | null) => {
    if (!userInfo) {
      sessionStorage.removeItem("token");
      setToken(null);
      return;
    }

    sessionStorage.setItem("token", JSON.stringify(userInfo));
    setToken(userInfo.ticket);
  };

  return {
    setToken: saveToken,
    token,
  };
}

export async function loginUserWithCreds(
  email: string,
  password: string
): Promise<UserInfo> {
  const authenticateResponse = await fetch(`/v1/account/authenticate`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      password,
    }),
  });

  if (!authenticateResponse.ok) {
    throw new Error("Authentication failed");
  }

  const userInfo = (await authenticateResponse.json()) as UserInfo;

  // Commented this because CORS is not enabled on the server
  const authTokenRes = await fetch(`/v1/account/authorize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ticket: userInfo.ticket,
      account: "dev", // TODO: hardcoded for now until know how to chose account
    }),
  });

  if (!authTokenRes.ok) {
    throw new Error("Authentication failed");
  }

  const { token } = (await authTokenRes.json()) as { token: string; account: Account };
  userInfo.token = token;

  return userInfo;
}
