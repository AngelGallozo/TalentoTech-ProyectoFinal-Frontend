export default function validarFormulario(producto) {
    const errores = {};
    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;

    if (!producto.title?.trim()) {
        errores.title = 'El título es obligatorio.';
    }
    if (!producto.price || parseFloat(producto.price) <= 0) {
        errores.price = 'El precio debe ser mayor a 0.';
    }
    if (!producto.description?.trim() || producto.description.length < 10) {
        errores.description = 'La descripción debe tener al menos 10 caracteres.';
    }
    if (!producto.category) {
        errores.category = 'Selecciona una categoría.';
    }
    if (!producto.image || !urlRegex.test(producto.image)) {
        errores.image = 'La URL de la imagen no es válida.';
    }
    if (!producto.rating?.rate || parseFloat(producto.rating.rate) <= 0) {
        errores.rate = 'El rate debe ser mayor a 0.';
    }
    if (!producto.rating?.count || parseInt(producto.rating.count) <= 0) {
        errores.count = 'El count debe ser mayor a 0.';
    }
    if (!producto.stock || producto.stock < 0) {
    errores.stock = "El stock debe ser un número mayor o igual a 0.";
    }

    return errores;
}
