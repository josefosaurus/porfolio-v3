
export const getAuth = async (clientId: string) => {
  var redirect_uri = "http://localhost:4321";
  var state = "1234567890123456";

  // localStorage.setItem("stateKey", state);
  var scope = 'user-read-recently-played';

  // TODO: revisar la generacion del token  y ver si puedo auto renovarlo

  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(clientId);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);

  const urlToken = window.location.href;
  const queryString = urlToken.substring(urlToken.indexOf('#') + 1);
  const params = new URLSearchParams(queryString);
  const accessToken = params.get('access_token');
  console.log("💿💿", accessToken)
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
  } else {
    window.location.href = url;
  }


}