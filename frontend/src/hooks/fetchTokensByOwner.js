import { API_URL } from '../../config'

/**
 * 
 * @param { walletAddress: string, signature: string } data 
 * @returns 
 */
export default async function fetchTokensByOwner(data) {
  console.log('[fetchTokensByOwner]')
  console.debug('[fetchTokensByOwner]', data)

  const url = `${API_URL}/chain/getOwnerTokens`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': 'cors'
      }
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    console.debug("[frontendTokenResponse]", response)
    const json = await response.json();
    console.debug("[frontendTokenResponse]", json)
    return json;
    
  } catch (error) {
    console.error(error.message);
  }
}
