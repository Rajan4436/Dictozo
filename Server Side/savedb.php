<?php
// $servername = "sql202.byethost6.com";
// $username = "b6_19164784";
// $password = "R@jan123";

// $dbname = "b6_19164784_wordosave";

$servername = "198.71.225.55:3306";
$username = "wos";
$password = "R@jan123";

$dbname = "sarcnitj_wosusers";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$email = $_POST["email"];

$sql = "INSERT INTO users (email, created_at)
VALUES ('".$email."', UTC_TIMESTAMP())";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>