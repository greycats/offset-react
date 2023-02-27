import { useState } from "react";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export interface UserInfo {
  profile: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
  };
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
  const authenticateResponse = await fetch(`${BASE_URL}/v1/account/authenticate`, {
    method: "POST",
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
  // const authTokenRes = await fetch(`${BASE_URL}/v1/account/authorize`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     ticket: userInfo.ticket,
  //     account: 'figureapi',
  //   }),
  // });
  
  // if (!authTokenRes.ok) {
  //   throw new Error("Authentication failed");
  // }

  // const { token } = await authTokenRes.json() as { token: string };
  // userInfo.token = token;

  return userInfo;
}
