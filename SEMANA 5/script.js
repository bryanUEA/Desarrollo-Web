// ====== Referencias al DOM ======
const urlInput = document.getElementById("imageUrl");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const gallery = document.getElementById("gallery");
const msg = document.getElementById("msg");

// Estado: elemento seleccionado (solo uno)
let selectedCard = null;

// ====== Utilidades ======
function setMessage(text, type = "") {
  msg.textContent = text;
  msg.className = `msg ${type}`.trim();
}

function isValidUrl(value) {
  // Validación simple: que sea URL válida y que empiece con http/https
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function updateButtons() {
  const hasValidUrl = isValidUrl(urlInput.value.trim());
  addBtn.disabled = !hasValidUrl;
  deleteBtn.disabled = selectedCard === null;
}

// ====== Selección (clic) ======
function selectCard(card) {
  // Deseleccionar anterior
  if (selectedCard) selectedCard.classList.remove("selected");

  selectedCard = card;
  selectedCard.classList.add("selected");
  updateButtons();
  setMessage("Imagen seleccionada. Puedes eliminarla con Del/Backspace.", "ok");
}

function clearSelection() {
  if (selectedCard) selectedCard.classList.remove("selected");
  selectedCard = null;
  updateButtons();
  setMessage("Selección eliminada.", "ok");
}

// ====== Crear y agregar imagen ======
function createImageCard(imageUrl) {
  const card = document.createElement("div");
  card.classList.add("card", "enter");

  const badge = document.createElement("span");
  badge.classList.add("badge");
  badge.textContent = "Clic para seleccionar";

  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = "Imagen agregada por URL";
  img.loading = "lazy";

  // Si la imagen falla en cargar
  img.addEventListener("error", () => {
    setMessage("No se pudo cargar la imagen. Verifica la URL.", "error");
    card.remove();
    if (selectedCard === card) selectedCard = null;
    updateButtons();
  });

  // Click para seleccionar (evento requerido)
  card.addEventListener("click", () => selectCard(card));

  card.appendChild(badge);
  card.appendChild(img);

  // Quitar clase "enter" para que no se reanime siempre
  setTimeout(() => card.classList.remove("enter"), 250);

  return card;
}

function addImage() {
  const value = urlInput.value.trim();

  if (!isValidUrl(value)) {
    setMessage("Ingresa una URL válida (http/https).", "error");
    updateButtons();
    return;
  }

  const newCard = createImageCard(value);
  gallery.prepend(newCard);

  urlInput.value = "";
  updateButtons();
  setMessage("Imagen agregada correctamente.", "ok");
}

// ====== Eliminar seleccionada ======
function deleteSelected() {
  if (!selectedCard) {
    setMessage("No hay imagen seleccionada para eliminar.", "error");
    updateButtons();
    return;
  }

  // Animación de salida simple (opcional)
  selectedCard.style.opacity = "0";
  selectedCard.style.transform = "scale(0.98)";

  const toRemove = selectedCard;
  selectedCard = null;
  updateButtons();

  setTimeout(() => {
    toRemove.remove();
    setMessage("Imagen eliminada.", "ok");
  }, 160);
}

// ====== Eventos requeridos ======

// input: habilitar/deshabilitar botón Agregar según URL
urlInput.addEventListener("input", () => {
  const value = urlInput.value.trim();
  if (value.length === 0) setMessage("");
  updateButtons();
});

// click: botones
addBtn.addEventListener("click", addImage);
deleteBtn.addEventListener("click", deleteSelected);

// keydown: atajos de teclado (requisito)
document.addEventListener("keydown", (e) => {
  // Evitar que Enter agregue cuando estás en un textarea (aquí no hay, pero buena práctica)
  if (e.key === "Enter") {
    // Agregar solo si el input está enfocado o si hay URL válida
    if (document.activeElement === urlInput || isValidUrl(urlInput.value.trim())) {
      if (!addBtn.disabled) addImage();
    }
  }

  if (e.key === "Delete" || e.key === "Backspace") {
    // Para evitar borrar texto si estás escribiendo en el input, solo borra si NO estás en el input
    if (document.activeElement !== urlInput) {
      if (!deleteBtn.disabled) deleteSelected();
    }
  }

  if (e.key === "Escape") {
    clearSelection();
  }
});

// ====== Imágenes por defecto (opcional) ======
const defaultImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1520975958225-0a120b1cba63?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=60"
];

defaultImages.forEach((u) => gallery.appendChild(createImageCard(u)));

updateButtons();
