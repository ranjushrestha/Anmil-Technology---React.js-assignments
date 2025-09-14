const emailInput = document.getElementById("emailInput");
const emailList = document.getElementById("emailList");
const mainBtn = document.getElementById("mainBtn");
const errorMsg = document.getElementById("errorMsg");

// Regex for email validation
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

// Load from localStorage
let emails = JSON.parse(localStorage.getItem("emails")) || [];
let editIndex = -1;

function renderEmails() {
  emailList.innerHTML = "";
  emails.forEach((email, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${email}</td>
      <td>
        <button class="edit" onclick="startEdit(${index})">Edit</button>
        <button class="delete" onclick="deleteEmail(${index})">Delete</button>
      </td>
    `;
    emailList.appendChild(row);
  });
}

function addEmail() {
  const email = emailInput.value.trim();
  errorMsg.textContent = ""; // clear error first

  if (!emailPattern.test(email)) {
    errorMsg.textContent = "⚠️ Invalid email format!";
    return;
  }

  emails.push(email);
  localStorage.setItem("emails", JSON.stringify(emails));
  emailInput.value = "";
  renderEmails();
}

function deleteEmail(index) {
  emails.splice(index, 1);
  localStorage.setItem("emails", JSON.stringify(emails));
  renderEmails();
}

function startEdit(index) {
  emailInput.value = emails[index];
  editIndex = index;
  mainBtn.textContent = "Update";
  mainBtn.className = "update";
  mainBtn.setAttribute("onclick", "updateEmail()");
  errorMsg.textContent = ""; // clear any old error
}

function updateEmail() {
  const email = emailInput.value.trim();
  errorMsg.textContent = ""; // clear error first

  if (!emailPattern.test(email)) {
    errorMsg.textContent = "Please enter a valid email address";
    return;
  }

  emails[editIndex] = email;
  localStorage.setItem("emails", JSON.stringify(emails));
  emailInput.value = "";
  editIndex = -1;
  mainBtn.textContent = "Add";
  mainBtn.className = "add";
  mainBtn.setAttribute("onclick", "addEmail()");
  renderEmails();
}

// 🔹 Live validation as user types
emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();
  if (email === "" || emailPattern.test(email)) {
    errorMsg.textContent = "";
  } else {
    errorMsg.textContent = "Please enter a valid email address!";
  }
});

// Initial render
renderEmails();
