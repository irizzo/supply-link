import { API_URL } from '../../config'

/**
 * 
 * @param { walletAddress: string, signature: string } data 
 * @returns 
 */
export default async function fetchTokensByOwner(data) {
  console.log('[fetchTokensByOwner]')
  console.log('[fetchTokensByOwner] data: ', data)


  const url = `${API_URL}/chain/getOwnerTokensIds`;

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

    const json = await response.json();
    return json;
    
  } catch (error) {
    console.error(error.message);
  }
}
