const emailInput = document.getElementById("emailInput");
const emailList = document.getElementById("emailList");
const mainBtn = document.getElementById("mainBtn");

// Regex for email validation
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

// Load from localStorage
let emails = JSON.parse(localStorage.getItem("emails")) || [];

// Render emails
function renderEmails() {
  emailList.innerHTML = "";
  emails.forEach((email, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${email}</td>
      <td>
        <button class="edit" onclick="editEmail(${index})">Edit</button>
        <button class="delete" onclick="deleteEmail(${index})">Delete</button>
      </td>
    `;
    emailList.appendChild(row);
  });
}

// Add new email
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

// Delete email
function deleteEmail(index) {
  if (confirm("Are you sure you want to delete this email?")) {
    emails.splice(index, 1);
    localStorage.setItem("emails", JSON.stringify(emails));
    renderEmails();
  }
}

// Edit email using prompt
function editEmail(index) {
  const newEmail = prompt("Edit email:", emails[index]);
  if (newEmail !== null) { // user didn't press Cancel
    if (!emailPattern.test(newEmail.trim())) {
      alert("⚠️ Invalid email format!");
      return;
    }
    emails[index] = newEmail.trim();
    localStorage.setItem("emails", JSON.stringify(emails));
    renderEmails();
  }
}

// Button click
mainBtn.addEventListener("click", addEmail);

// Initial render
renderEmails();
