export default async function FetchApi( endpoint, requestOptions ) {
    const response = await fetch(endpoint, requestOptions);
    const responseJson = await response.json();
    return responseJson;
  }
  