<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="{{ asset('styles.css') }}">
    <style>
        body {
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
        }

        .container {
            width: 320px;
            margin: 80px auto;
            padding: 30px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        h2 { text-align: center; margin-bottom: 20px; }
        input, button {
            width: 100%; padding: 12px; margin-bottom: 15px;
            border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;
        }
        button {
            background-color: #0B94E9; color: white; font-size: 16px;
            border: none; cursor: pointer;
        }
        button:hover { background-color: #0B94E9; }
        p { text-align: center; font-size: 14px; }
        a { color: #0B94E9; text-decoration: none; }
        .error { color: red; }
        .success { color: green; }
    </style>
</head>
<body>
    <!-- Login Form -->
    <div class="container">
        <h2>เข้าสู่ระบบ</h2>
        <form id="loginForm">
            <input type="email" id="loginEmail" placeholder="อีเมล" required>
            <input type="password" id="loginPassword" placeholder="รหัสผ่าน" required>
            <button type="submit">Login</button>
            <p id="loginMessage"></p>
        </form>
        <p>ยังไม่มีบัญชี? <a href="{{ route('register') }}">สมัครสมาชิก</a></p>
    </div>

    <script>
        // ล็อกอินตรวจจาก localStorage
        document.getElementById("loginForm").addEventListener("submit", function(e) {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const message = document.getElementById("loginMessage");

            const savedEmail = localStorage.getItem("userEmail");
            const savedPassword = localStorage.getItem("userPassword");

            if (email === savedEmail && password === savedPassword) {
                message.textContent = "เข้าสู่ระบบสำเร็จ!";
                message.className = "success";
                // เช่น: window.location.href = "dashboard.html";
                // ✅ เพิ่มตรงนี้ เพื่อกลับไปหน้าหลัก
            setTimeout(() => {
                window.location.href = "{{ route('index') }}";
            }, 1000); // ดีเลย์ 1 วินาทีให้เห็นข้อความ
            } else {
                message.textContent = "อีเมลหรือรหัสผ่านไม่ถูกต้อง!";
                message.className = "error";
            }
        });
    </script>
</body>
</html>
