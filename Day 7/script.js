// Get DOM elements
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const emailList = document.getElementById("emailList");
const mainBtn = document.getElementById("mainBtn");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");

// Validation patterns
const namePattern = /^[a-zA-Z\s]{2,30}$/;       // Letters & spaces, 2-30 chars
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
const phonePattern = /^[0-9]{7,15}$/;           // Digits only, 7-15 chars

// Load contacts from localStorage or initialize

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = -1;

// Render contacts in table
function renderContacts() {
  emailList.innerHTML = "";

  if (contacts.length === 0) {
    // Show placeholder row when no contacts exist
    const row = document.createElement("tr");
    row.id = "noDataRow";
    row.innerHTML = `<td colspan="4" style="text-align:center; color: gray;">No data entered</td>`;
    emailList.appendChild(row);
    return;
  }

  contacts.forEach((contact, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td>
        <button class="edit" onclick="startEdit(${index})">Edit</button>
        <button class="delete" onclick="deleteContact(${index})">Delete</button>
      </td>
    `;
    emailList.appendChild(row);
  });
}


// Add new contact
function addContact() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  // Clear previous errors
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";

  // Validate inputs
  if (!namePattern.test(name)) {
    nameError.textContent = "Please enter a valid name (2-30 letters)!";
    return;
  }
  if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email!";
    return;
  }
  if (!phonePattern.test(phone)) {
    phoneError.textContent = "Please enter a valid phone number (7-15 digits)!";
    return;
  }

  // Add contact
  contacts.push({ name, email, phone });
  localStorage.setItem("contacts", JSON.stringify(contacts));

  // Clear inputs
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";

  renderContacts();
}

// Delete a contact
function deleteContact(index) {
  const row = emailList.children[index]; 
  row.classList.add("delete-row"); // trigger animation

  // Remove after animation
  row.addEventListener("animationend", () => {
    contacts.splice(index, 1);          
    localStorage.setItem("contacts", JSON.stringify(contacts));
    renderContacts();                    
  }, { once: true }); // important: ensures it triggers only once
}

// Start editing a contact
function startEdit(index) {
  const contact = contacts[index];
  nameInput.value = contact.name;
  emailInput.value = contact.email;
  phoneInput.value = contact.phone;
  editIndex = index;

  // Change button to Update mode
  mainBtn.textContent = "Update";
  mainBtn.classList.add("update-btn");
  mainBtn.classList.remove("add-btn");
  mainBtn.setAttribute("onclick", "updateContact()");
}

// Update a contact
function updateContact() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  // Clear previous errors
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";

  // Validate inputs
  if (!namePattern.test(name)) {
    nameError.textContent = "Please enter a valid name (2-30 letters)!";
    return;
  }
  if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email!";
    return;
  }
  if (!phonePattern.test(phone)) {
    phoneError.textContent = "Please enter a valid phone number (7-15 digits)!";
    return;
  }

  // Update contact
  contacts[editIndex] = { name, email, phone };
  localStorage.setItem("contacts", JSON.stringify(contacts));
  editIndex = -1;

  // Reset button to Add mode
  mainBtn.textContent = "Add";
  mainBtn.classList.remove("update-btn");
 
  mainBtn.setAttribute("onclick", "addContact()");

  // Clear inputs
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";

  renderContacts();
}

// Live validation as user types
nameInput.addEventListener("input", () => {
  nameError.textContent = namePattern.test(nameInput.value.trim()) ? "" : "2-30 letters required";
});
emailInput.addEventListener("input", () => {
  emailError.textContent = emailPattern.test(emailInput.value.trim()) ? "" : "Invalid email";
});
phoneInput.addEventListener("input", () => {
  phoneError.textContent = phonePattern.test(phoneInput.value.trim()) ? "" : "7-15 digits required";
});

// Initial render
renderContacts();