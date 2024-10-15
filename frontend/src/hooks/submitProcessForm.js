import { API_URL } from '../../config'

export default async function submitProcessForm(walletAddress, data) {
  console.log('[submitProcessForm]')

  const url = `${API_URL}/process`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ walletAddress, data }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': 'cors'
      }
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    console.debug("[backendTokenResponse]", response)
    const json = await response.json();
    console.debug("[backendTokenResponse]", json)
    return json;
    
  } catch (error) {
    console.error(error.message);
  }
}

