const fetch = require('node-fetch');

exports.handler = async (event) => {
    const id = event.queryStringParameters.id;

    try {
        // Fetch the code from the InfinityFree URL
        const response = await fetch(`http://roscripts.infinityfreeapp.com/get_code.php?id=${id}`);

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: 'Error: Failed to fetch code from InfinityFree',
                headers: {
                    'Content-Type': 'text/plain',
                },
            };
        }

        const text = await response.text();

        // Use regex to extract the Lua code (adjust the regex as needed)
        const cleanCode = text.match(/print\(".*?"\)/); // Adjust regex to match your exact needs

        return {
            statusCode: 200,
            body: cleanCode ? cleanCode[0] : 'Error: No valid code found',
            headers: {
                'Content-Type': 'text/plain',
            },
        };
    } catch (error) {
        console.error('Fetch error:', error);
        return {
            statusCode: 500,
            body: 'Error: An unexpected error occurred',
            headers: {
                'Content-Type': 'text/plain',
            },
        };
    }
};
