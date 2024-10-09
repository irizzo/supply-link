export default async function getTokenByOwner() {
    const url = `http://localhost:8080/chain/owner-chain`;
    try {
      const response = await fetch(url, {
        headers: {
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
  