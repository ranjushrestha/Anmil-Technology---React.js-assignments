const emailInput = document.getElementById("emailInput");
const emailList = document.getElementById("emailList");
const mainBtn = document.getElementById("mainBtn");

// Regex for email validation
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

// Load from localStorage
let emails = JSON.parse(localStorage.getItem("emails")) || [];

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

  if (!emailPattern.test(email)) {
    alert("⚠️ Invalid email format!");
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
  const newEmail = prompt("Edit the email:", emails[index]);
  if (newEmail === null) return; // User canceled
  const trimmedEmail = newEmail.trim();

  if (!emailPattern.test(trimmedEmail)) {
    alert("⚠️ Invalid email format!");
    return;
  }

  emails[index] = trimmedEmail;
  localStorage.setItem("emails", JSON.stringify(emails));
  renderEmails();
}

// Initial render
renderEmails();
