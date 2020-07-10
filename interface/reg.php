<?php
    include('conn.php');
    $username=$_REQUEST['username'];
    $password=$_REQUEST['password'];
    $email=$_REQUEST['email'];
    $sql="SELECT * FROM `users` WHERE user_name='$username'";
    $result = $mysqli->query($sql);
    if($result->num_rows>0){
        echo '<script>alert("用户名已存在");</script>';
        echo '<script>location.href="http://localhost/midea/src/html/login.html#";</script>';
        $mysqli->close();
        die;
    }
    $insertUser="INSERT INTO `users`( `user_name`, `user_password`, `user_email`) VALUES ('$username','$password','$email')";
    $res=$mysqli->query($insertUser);
    $mysqli->close();
    if($res){
        echo '<script>location.href="http://localhost/midea/src/html/login.html";</script>';
    }
    
?>