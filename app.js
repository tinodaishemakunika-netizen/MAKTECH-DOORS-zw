class MakTechApp {
  constructor() {
    this.doors = JSON.parse(localStorage.getItem("maktech-doors")) || [];
    this.phone = localStorage.getItem("maktech-phone") || "263789009829";
    this.email = localStorage.getItem("maktech-email") || "info@maktechdoors.co.zw";
    this.date = localStorage.getItem("maktech-date") || "Available Now";
 
    this.initPublicView();
    this.initAdminView();
  }
 
  initPublicView() {
    if (document.getElementById("displayPhone")) document.getElementById("displayPhone").innerText = this.phone;
    if (document.getElementById("displayEmail")) document.getElementById("displayEmail").innerText = this.email;
    if (document.getElementById("displayAvailability")) document.getElementById("displayAvailability").innerText = this.date;
 
    this.renderGallery();
  }
 
  renderGallery() {
    const container = document.getElementById("doorsContainer");
    if (!container) return;
 
    container.innerHTML = "";
    if (this.doors.length === 0) {
      container.innerHTML = "<p>No doors currently listed. Check back soon!</p>";
      return;
    }
 
    this.doors.forEach(door => {
      const card = document.createElement("div");
      card.className = "door-card";
      card.innerHTML = `
        <img src="${door.image}" alt="${door.name}">
        <h3>${door.name}</h3>
        <p class="category">${door.category}</p>
        <p class="price">$${Number(door.price).toFixed(2)}</p>
        <button onclick="app.viewDoor(${door.id})" class="btn">View Details</button>
      `;
      container.appendChild(card);
    });
  }
 
  viewDoor(id) {
    const door = this.doors.find(d => d.id === id);
    if (!door) return;
 
    const modal = document.getElementById("doorModal");
    const body = document.getElementById("modalBody");
    const msg = `Hello MakTech Doors 👋\nI am interested in:\n- Item: ${door.name}\n- Price: $${Number(door.price).toFixed(2)}`;
    const link = `https://wa.me/${this.phone}?text=${encodeURIComponent(msg)}`;
 
    body.innerHTML = `
      <img src="${door.image}" style="width:100%; max-height:300px; object-fit:contain;">
      <h2>${door.name}</h2>
      <p><strong>Category:</strong> ${door.category}</p>
      <p><strong>Price:</strong> $${Number(door.price).toFixed(2)}</p>
      <p>${door.description}</p>
      <br>
      <a href="${link}" target="_blank" class="btn-wa"><i class="fa-brands fa-whatsapp"></i> Order via WhatsApp</a>
    `;
    modal.style.display = "block";
  }
 
  initAdminView() {
    const form = document.getElementById("adminDoorForm");
    if (form) {
      form.addEventListener("submit", (e) => this.handleAddDoor(e));
      if (document.getElementById("editPhone")) document.getElementById("editPhone").value = this.phone;
      if (document.getElementById("editEmail")) document.getElementById("editEmail").value = this.email;
      if (document.getElementById("availabilityDate")) document.getElementById("availabilityDate").value = this.date;
    }
  }
 
  handleAddDoor(e) {
    e.preventDefault();
    const imageInput = document.getElementById("doorImage");
    if (!imageInput.files[0]) return alert("Please select an image file.");
 
    const reader = new FileReader();
    reader.onload = (event) => {
      const newDoor = {
        id: Date.now(),
        name: document.getElementById("doorName").value,
        category: document.getElementById("doorCategory").value,
        price: parseFloat(document.getElementById("doorPrice").value),
        color: document.getElementById("doorColor").value,
        description: document.getElementById("doorDescription").value,
        image: event.target.result
      };
 
      this.doors.unshift(newDoor);
      localStorage.setItem("maktech-doors", JSON.stringify(this.doors));
      alert("Product successfully published!");
      document.getElementById("adminDoorForm").reset();
    };
    reader.readAsDataURL(imageInput.files[0]);
  }
}
 
function adminSaveSettings() {
  const phone = document.getElementById("editPhone").value;
  const email = document.getElementById("editEmail").value;
  const date = document.getElementById("availabilityDate").value;
 
  localStorage.setItem("maktech-phone", phone);
  localStorage.setItem("maktech-email", email);
  localStorage.setItem("maktech-date", date);
  alert("Settings updated successfully!");
}
 
const app = new MakTechApp();
 
const closeBtn = document.querySelector(".close");
if (closeBtn) {
  closeBtn.onclick = () => document.getElementById("doorModal").style.display = "none";
}
 
