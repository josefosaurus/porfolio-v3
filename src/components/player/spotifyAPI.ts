const getAuthToken = async (clientId: string, clientSecret: string) => {
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const encodedAuth = btoa(clientId + ':' + clientSecret);

  const data = new URLSearchParams({
    'grant_type': 'client_credentials',
    'scope': 'user-read-recently-played'
  });


  const requestOptions = {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + encodedAuth
    },
    body: data
  }

  const response = await fetch(tokenUrl, requestOptions);

  if (response.ok) {
    const json = await response.json();
    const authToken = json.access_token;
    return authToken;
  } else {
    throw new Error(`Failed to request access token: ${response.status} - ${response.statusText}`);
  }
};


export const getToken = async (clientId: string, clientSecret: string) => {
  let authToken: string

  try {
    authToken = await getAuthToken(clientId, clientSecret);
    return authToken;
  } catch (error) {
    console.error(error);
  }
}