export const getArticles = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",

  };

  const response = await fetch("https://v1.nocodeapi.com/josefosaurus/pocket/wPjBEbshEdXcqvJd", requestOptions)
  if (response.ok) {
    const json = await response.json()
    const keys = Object.keys(json.list).slice(0, 2)
    const articles = keys.map(key => json.list[key])
    console.log('😂', articles.length)
    return articles

  } else {
    throw new Error(`Failed to request access token: ${response.status} - ${response.statusText}`);
  }
}