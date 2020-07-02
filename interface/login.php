<?php
    include('conn.php');
    $username=$_REQUEST['username'];
    $password=$_REQUEST['password'];
    $sql="SELECT * FROM `users` WHERE user_name='$username' and user_password ='$password'";
    $result = $mysqli->query($sql);
    if($result->num_rows>0){
        echo '<script>alert("登录成功");</script>';
        echo '<script>location.href="http://localhost/midea/src/html/index.html";</script>';
    }else{
        echo '<script>alert("账号或密码错误");</script>';
        echo '<script>location.href="http://localhost/midea/src/html/login.html#";</script>';
    }
    $mysqli->close();
?>