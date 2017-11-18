<?php
// $servername = "sql202.byethost6.com";
// $username = "b6_19164784";
// $password = "R@jan123";

// $dbname = "b6_19164784_wordosave";

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "entries";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: ". $conn->connect_error);
} 

$word = $_POST["link"];	

$sql = "SELECT * from entries WHERE word = '".$word."'";
$result = $conn->query($sql);
$count = 0;
$rows = array();

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
	  // echo ++$count." ".$row["definition"]."\r\n";
		++$count;
	  $rows[] = $row;
		  if ($count > 6) {
	  	exit();
	  }
	}
  echo json_encode($rows);
} else {
	echo "0";
}

// $sql = "INSERT INTO entries (word) VALUES ('".$word."')";

// if ($conn->query($sql) === TRUE) {
//     echo "New record created successfully";
// } else {
//     echo "Error: " . $sql . "<br>" . $conn->error;
// }

$conn->close();

?>