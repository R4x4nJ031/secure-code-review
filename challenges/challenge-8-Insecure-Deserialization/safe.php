if (isset($_POST['submit'])) {
    $data = json_decode($_POST['data'], true);

    if (!is_array($data) || !isset($data['username'])) {
        echo "Invalid input";
    } else {
        // 🔒 role is NOT taken from user
        $username = $data['username'];
        $role = 'user'; // always default (or fetch from DB)

        $_SESSION['user'] = new User($username, $role);
    }
}
