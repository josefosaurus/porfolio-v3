import { Buffer } from "buffer"

interface userData {
  authorizationCode: string
  clientId: string
  clientSecret: string
}

// Step 1: Get Authorization Code
export const getAuthorizationCode = (clientId: string) => {
  const scopes = ["user-read-recently-played"]
  const redirectUri = `${window.location.href}`
  let lastSlashIndex = redirectUri.lastIndexOf("/");
  let updatedUrl = redirectUri.slice(0, lastSlashIndex) + redirectUri.slice(lastSlashIndex + 1);
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=https://joseavila.dev&scope=${scopes.join(
    "%20"
  )}`

  console.log("🤌🏽🔗", updatedUrl)
  window.location.href = authUrl
}

// Step 2: Exchange Authorization Code for Access Token
export const getAuthToken = async (user: userData) => {
  const authString = btoa(`${user.clientId}:${user.clientSecret}`)
  const tokenUrl = "https://accounts.spotify.com/api/token"
  const data = {
    grant_type: "authorization_code",
    code: user.authorizationCode,
    redirect_uri: "https://joseavila.dev",
  }

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  })

  const tokenData = await response.json()
  return tokenData.access_token
}

// TODO: buscar la forma de evitar la redirección

export const getParam = (paramName: string) => {
  // Get the current URL
  const url = window.location.href

  // Create a URLSearchParams object
  const params = new URL(url)

  // Get the value of a specific parameter
  const paramValue = params.searchParams.get(paramName)

  // Print the value to the console
  return paramValue
}

export const removeUrlParam = (url: string, param: string) => {
  const urlObj = new URL(url)
  const searchParams = new URLSearchParams(urlObj.search)

  searchParams.delete(param)

  urlObj.search = searchParams.toString()

  return urlObj.toString()
}
