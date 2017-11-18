<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "entries";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$word = $_POST["word"];
$result = $_POST["definition"];

for ($i=0; $i < sizeof($result); $i++) { 
	
	$sql = "INSERT INTO entries (word, wordtype, definition, new)
	VALUES ('".$word."', '".$result[$i]["partOfSpeech"]."', '".$result[$i]["definition"]."', 1)";

	if ($conn->query($sql) === TRUE) {
	    echo "New record created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}
}


$conn->close();
?>