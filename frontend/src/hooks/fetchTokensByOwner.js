export default async function fetchTokensByOwner(walletAddress, signature) {
  const url = `http://localhost:8080/chain/getTokens`;
  const data = {walletAddress, signature}
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': 'cors'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error.message);
  }
}
