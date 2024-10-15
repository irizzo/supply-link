export default async function getProductHistory() {
    console.log('[getProductHistory]')

    const url = "http://localhost:8080/chain/getProductHistory";

    try {
        const response = await fetch(url, {
            method: 'GET',
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