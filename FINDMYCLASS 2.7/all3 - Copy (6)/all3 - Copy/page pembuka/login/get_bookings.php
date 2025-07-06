<?php
header('Content-Type: application/json');

// Ganti dengan koneksi database kamu
$conn = new mysqli("localhost", "root", "", "kalender_db");

$tanggal = $_GET['tanggal'] ?? date('Y-m-d');

$stmt = $conn->prepare("SELECT jam_mulai, jam_selesai, status FROM bookings WHERE tanggal = ?");
$stmt->bind_param("s", $tanggal);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
  $data[] = [
    'jam' => substr($row['jam_mulai'], 0, 5) . " - " . substr($row['jam_selesai'], 0, 5),
    'status' => $row['status']
  ];
}
echo json_encode($data);
?>
