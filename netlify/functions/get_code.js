// In your get_code.php file, before outputting any content:
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    // Database connection configuration
    const connectionConfig = {
        host: 'sql103.infinityfree.com',
        user: 'if0_37533349',
        password: 'vKFWCP5cj6ZyIPV',
        database: 'if0_37533349_scripts',
    };

    // Get the unique ID from the query string
    const uniqueId = event.queryStringParameters.id;

    try {
        // Create a connection to the database
        const connection = await mysql.createConnection(connectionConfig);
        
        // Execute the SQL query
        const [rows] = await connection.execute('SELECT roblox_code FROM codes WHERE id = ?', [uniqueId]);

        // Close the connection
        await connection.end();

        if (rows.length > 0) {
            // Return the code as JSON
            return {
                statusCode: 200,
                body: JSON.stringify({ code: rows[0].roblox_code }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Code not found" }),
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Database error" }),
        };
    }
};
