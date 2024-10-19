const fetch = require('node-fetch');

exports.handler = async (event) => {
    const id = event.queryStringParameters.id;
    const response = await fetch(`http://roscripts.infinityfreeapp.com/get_code.php?id=${id}`);
    const text = await response.text();

    // Strip out any injected HTML/JS from InfinityFree
    const cleanCode = text.match(/print\(.+\)/g); // or any pattern that extracts Lua code

    return {
        statusCode: 200,
        body: cleanCode ? cleanCode[0] : 'Error: No valid code found',
        headers: {
            'Content-Type': 'text/plain',
        },
    };
};
