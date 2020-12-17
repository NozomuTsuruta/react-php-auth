<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: access');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');
header(

'Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
);

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message,
    ], $extra);
}

// INCLUDING DATABASE AND MAKING OBJECT
require __DIR__ . '/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->db_connection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents('php://input'));
$returnData = [];

// IF REQUEST METHOD IS NOT POST
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    $returnData = msg(0, 404, 'Page Not Found!');

// CHECKING EMPTY FIELDS
} elseif (!isset($data->name)
    || !isset($data->email)
    || !isset($data->password)
    || empty(trim($data->name))
    || empty(trim($data->email))
    || empty(trim($data->password))
) {

    $fields = ['fields' => ['name', 'email', 'password']];
    $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
} else {
    $name = trim($data->name);
    $email = trim($data->email);
    $password = trim($data->password);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $returnData = msg(0, 422, 'Invalid Email Address!');
    } elseif (strlen($password) < 8) {
        $returnData = msg(0, 422,
            'Your password must be at least 8 characters long!');
    } else {
        try {
            $check_email_stmt = $conn->prepare(
                'SELECT email FROM users WHERE email=?');
            $check_email_stmt->bindValue(1, $email, PDO::PARAM_STR);
            $check_email_stmt->execute();

            if ($check_email_stmt->rowCount()) {
                $returnData = msg(0, 422, 'This E-mail already in use!');
            } else {
                $insert_stmt = $conn->prepare(
                    'INSERT INTO users SET name=?,email=?,password=?');
                // DATA BINDING
                $insert_stmt->bindValue(1, htmlspecialchars(strip_tags(
                    $name)), PDO::PARAM_STR);
                $insert_stmt->bindValue(2, $email, PDO::PARAM_STR);
                $insert_stmt->bindValue(3, password_hash($password,
                    PASSWORD_DEFAULT), PDO::PARAM_STR);
                $insert_stmt->execute();

                $returnData = msg(1, 201, 'You have successfully registered.');
            }

        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }

    }

}

echo json_encode($returnData);
