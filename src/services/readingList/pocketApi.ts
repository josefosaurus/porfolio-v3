export const getArticles = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",

  };

  try {
    const response = await fetch(import.meta.env.POCKET_API, requestOptions)
    if (response.ok) {
      const json = await response.json()
      const keys = Object.keys(json.list).slice(0, 2)
      const articles = keys.map(key => json.list[key])
      console.log('🫵', json)
      // return articles

    } else {
      console.log('🫠', `Failed to request access token: ${response.status} - ${response.statusText}`);
      throw new Error(`Failed to request access token: ${response.status} - ${response.statusText}`);
    }

  }
  catch (error) {
    console.error('🙅‍♂️', error);
  }
}