import { Buffer } from "buffer"


interface userData {
  authorizationCode: string,
  clientId: string,
  clientSecret: string,
}

// Step 1: Get Authorization Code
export const getAuthorizationCode = (clientId: string) => {
  const scopes = ['user-read-recently-played'];
  const redirectUri = "https://joseavila.dev"; //TODO: revisar el tema de las variables de entorno
  console.log('🔗', redirectUri)
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}`;

  window.location.href = authUrl;
}

// Step 2: Exchange Authorization Code for Access Token
export const getAuthToken = async (user: userData) => {
  const authString = btoa(`${user.clientId}:${user.clientSecret}`);
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const data = {
    grant_type: 'authorization_code',
    code: user.authorizationCode,
    redirect_uri: import.meta.env.PUBLIC_SITE_URL,
  };

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(data),
  });

  const tokenData = await response.json();
  return tokenData.access_token;
}

// TODO: buscar la forma de evitar la redirección

export const getParam = (paramName: string) => {
  // Get the current URL
  const url = window.location.href;

  // Create a URLSearchParams object
  const params = new URL(url);

  // Get the value of a specific parameter
  const paramValue = params.searchParams.get(paramName);

  // Print the value to the console
  return paramValue
}

export const removeUrlParam = (url: string, param: string) => {
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams(urlObj.search);

  searchParams.delete(param);

  urlObj.search = searchParams.toString();

  return urlObj.toString();
}
