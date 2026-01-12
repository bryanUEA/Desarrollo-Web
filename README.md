# Desarrollo-Web
Desarrollo Web

# Galería Interactiva (Semana 5)

Aplicación web hecha con **HTML + CSS + JavaScript** que permite:
- Agregar imágenes por URL (creando elementos dinámicos en el DOM).
- Seleccionar una imagen con clic (solo una seleccionada a la vez).
- Eliminar la imagen seleccionada.
- Usar atajos de teclado.

## Funcionalidades
### Agregar
1. Pega una URL válida (http/https).
2. Haz clic en **Agregar imagen** o presiona **Enter**.

### Seleccionar
- Haz clic en cualquier imagen para resaltarla (borde/sombra).

### Eliminar
- Haz clic en **Eliminar imagen seleccionada**.
- O presiona **Del / Backspace** (si no estás escribiendo en el input).

### Atajos
- **Enter**: Agregar
- **Del / Backspace**: Eliminar seleccionada
- **Esc**: Deseleccionar

## Tecnologías y conceptos
- DOM: `querySelector / getElementById`, `createElement`, `appendChild/prepend`, `remove`
- Eventos: `click`, `input`, `keydown`
- CSS Grid + estilos para selección

