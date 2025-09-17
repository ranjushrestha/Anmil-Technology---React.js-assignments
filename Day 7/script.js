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
const namePattern = /^[a-zA-Z\s]{2,15}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
const phonePattern = /^\+?[1-9]\d{6,14}$/;
       

// Load contacts from localStorage or initialize
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = -1;

// Utility: create a table row
function createRow(contact, index) {
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
  return row;
}

// Render all contacts (initial load)
function renderAllContacts() {
  emailList.innerHTML = "";

  if (contacts.length === 0) {
    const row = document.createElement("tr");
    row.id = "noDataRow";
    row.innerHTML = `<td colspan="4" style="text-align:center; color: gray;">No data entered</td>`;
    emailList.appendChild(row);
    return;
  }

  contacts.forEach((contact, index) => {
    const row = createRow(contact, index);
    emailList.appendChild(row);
  });
}

// Add new contact
function addContact() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  // Clear errors
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";

  // Validate
  if (!namePattern.test(name)) { nameError.textContent = "2-30 letters required"; return; }
  if (!emailPattern.test(email)) { emailError.textContent = "Invalid email"; return; }
  if (!phonePattern.test(phone)) { phoneError.textContent = "7-15 digits required"; return; }

  const contact = { name, email, phone };
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  // Clear inputs
  nameInput.value = ""; emailInput.value = ""; phoneInput.value = "";

  // Remove "No data" row if present
  const noDataRow = document.getElementById("noDataRow");
  if (noDataRow) noDataRow.remove();

  // Append new row with animation
  const newRow = createRow(contact, contacts.length - 1);
  newRow.classList.add("new-row");
  newRow.addEventListener("animationend", () => newRow.classList.remove("new-row"), { once: true });
  emailList.appendChild(newRow);
}

// Delete a contact
function deleteContact(index) {
  const row = emailList.children[index];
  row.classList.add("delete-row");
  row.addEventListener("animationend", () => {
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    row.remove();
    // Re-render remaining rows to fix indices
    emailList.querySelectorAll("tr").forEach((r, i) => {
      if (r.querySelector(".edit")) r.querySelector(".edit").setAttribute("onclick", `startEdit(${i})`);
      if (r.querySelector(".delete")) r.querySelector(".delete").setAttribute("onclick", `deleteContact(${i})`);
    });
    // If table is empty, show "No data"
    if (contacts.length === 0) renderAllContacts();
  }, { once: true });
}

// Start editing a contact
function startEdit(index) {
  const contact = contacts[index];
  nameInput.value = contact.name;
  emailInput.value = contact.email;
  phoneInput.value = contact.phone;
  editIndex = index;

  mainBtn.textContent = "Update";
  mainBtn.classList.add("update-btn");
  mainBtn.classList.remove("add-btn");
  mainBtn.setAttribute("onclick", "updateContact()");
}

// Update a contact
// Update a contact
function updateContact() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  // Clear errors
  nameError.textContent = ""; emailError.textContent = ""; phoneError.textContent = "";

  // Validate
  if (!namePattern.test(name)) { nameError.textContent = "2-30 letters required"; return; }
  if (!emailPattern.test(email)) { emailError.textContent = "Invalid email"; return; }
  if (!phonePattern.test(phone)) { phoneError.textContent = "7-15 digits required"; return; }

  const updatedContact = { name, email, phone };
  contacts[editIndex] = updatedContact;
  localStorage.setItem("contacts", JSON.stringify(contacts));

  // Remove the old row
  const oldRow = emailList.children[editIndex];
  const newRow = createRow(updatedContact, editIndex);

  // Animate the new row
  newRow.classList.add("new-row");
  newRow.addEventListener("animationend", () => newRow.classList.remove("new-row"), { once: true });

  // Replace old row with new row
  emailList.replaceChild(newRow, oldRow);

  // Reset
  editIndex = -1;
  mainBtn.textContent = "Add";
  mainBtn.classList.remove("update-btn");
  mainBtn.classList.add("add-btn");
  mainBtn.setAttribute("onclick", "addContact()");

  nameInput.value = ""; emailInput.value = ""; phoneInput.value = "";
}

// Live validation
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
renderAllContacts();
