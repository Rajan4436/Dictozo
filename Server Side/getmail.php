<?php
$servername = "sql202.byethost6.com";
$username = "b6_19164784";
$password = "R@jan123";
$dbname = "b6_19164784_wordosave";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $msg +=  "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
    }
} else {
    echo "0 results";
}

$conn->close();

mail("rajan4436@gmail.com","WOS Users",$msg);

?>