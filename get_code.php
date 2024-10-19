<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection for scripts
$conn = new mysqli('sql103.infinityfree.com', 'if0_37533349', 'vKFWCP5cj6ZyIPV', 'if0_37533349_scripts');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the unique ID from the URL (e.g., ?id=UNIQUE_ID)
$unique_id = $_GET['id'];

// Retrieve the Roblox code associated with the unique ID
$query = "SELECT roblox_code FROM codes WHERE id='$unique_id'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    // Output the code as plain text so it can be used by Roblox's loadstring()
    $row = $result->fetch_assoc();
    header('Content-Type: text/plain');
    echo $row['roblox_code'];
} else {
    echo "Error: Script not found";
}

$conn->close();
?>
