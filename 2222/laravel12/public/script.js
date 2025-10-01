const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));

document.querySelectorAll('a[href^="#"]').forEach(a => {
	a.addEventListener("click", e => {
		const id = a.getAttribute("href");
		if (!id || id === "#") return;
		const el = document.querySelector(id);
		if (!el) return;
		e.preventDefault();
		navLinks.classList.remove("open");
		window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
	});
});

document.getElementById("year").textContent = new Date().getFullYear();

// Modal login
const loginLink = document.getElementById("login-link");
const loginModal = document.getElementById("login-modal");
const closeLogin = document.getElementById("close-login");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const registerLink = document.getElementById("register-link");

function updateNav() {
	const userEmail = localStorage.getItem("userEmail");
	loginLink.textContent = userEmail ? userEmail : "เข้าสู่ระบบ";
	loginLink.title = userEmail ? "ออกจากระบบ" : "";

	// แสดงลิงก์ Admin Panel เฉพาะ admin
	let adminMenu = document.getElementById("admin-menu");
	if (!adminMenu) {
		adminMenu = document.createElement("a");
		adminMenu.id = "admin-menu";
		adminMenu.href = "admin.html";
		adminMenu.textContent = "Admin Panel";
		adminMenu.style.display = "none";
		document.getElementById("nav-links").appendChild(adminMenu);
	}
	if (userEmail === "admin@college.ac.th") {
		adminMenu.style.display = "inline-block";
	} else {
		adminMenu.style.display = "none";
	}
}

// เปิด modal
loginLink.onclick = function(e) {
	e.preventDefault();
	const userEmail = localStorage.getItem("userEmail");
	if (userEmail) {
		// ออกจากระบบ
		localStorage.removeItem("userEmail");
		localStorage.removeItem("userPassword");
		updateNav();
		alert("ออกจากระบบแล้ว");
	} else {
		loginModal.style.display = "flex";
	}
};

// ปิด modal
closeLogin.onclick = function() {
	loginModal.style.display = "none";
	loginMessage.textContent = "";
};

// ล็อกอิน
loginForm.addEventListener("submit", function(e) {
	e.preventDefault();
	const email = document.getElementById("loginEmail").value;
	const password = document.getElementById("loginPassword").value;

	let users = JSON.parse(localStorage.getItem("users") || "[]");
	const user = users.find(u => u.email === email && u.password === password);

	if (user) {
		loginMessage.textContent = "เข้าสู่ระบบสำเร็จ!";
		loginMessage.className = "success";
		localStorage.setItem("userEmail", email);
		setTimeout(() => {
			loginModal.style.display = "none";
			updateNav();
			loginMessage.textContent = "";
		}, 800);
	} else {
		loginMessage.textContent = "อีเมลหรือรหัสผ่านไม่ถูกต้อง!";
		loginMessage.className = "error";
	}
});

// สมัครสมาชิก
registerLink.onclick = function(e) {
	e.preventDefault();
	const email = prompt("กรอกอีเมลใหม่:");
	const password = prompt("กรอกรหัสผ่านใหม่:");
	if (email && password) {
		// ดึง users เดิมจาก localStorage
		let users = JSON.parse(localStorage.getItem("users") || "[]");
		// ตรวจสอบว่ามี email นี้อยู่แล้วหรือไม่
		if (users.some(u => u.email === email)) {
			alert("อีเมลนี้ถูกใช้แล้ว กรุณาใช้บัญชีอื่น");
			return;
		}
		// เพิ่มผู้ใช้ใหม่
		users.push({ email, password });
		localStorage.setItem("users", JSON.stringify(users));
		alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
	}
};

// ปิด modal เมื่อคลิกนอกกล่อง
window.onclick = function(event) {
	if (event.target == loginModal) {
		loginModal.style.display = "none";
		loginMessage.textContent = "";
	}
};

// อัปเดต nav เมื่อโหลดหน้า
updateNav();
