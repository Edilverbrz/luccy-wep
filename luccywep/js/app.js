import { dbService } from './dbService.js';

// Ejemplo al hacer clic en un botón de guardar
async function alEnviarFormulario(evento) {
  evento.preventDefault();

  const nuevaTransaccion = {
    descripcion: 'Compra de insumos',
    monto: 150.00,
    tipo: 'egreso'
  };

  try {
    // Llamas a tu servicio genérico
    await dbService.guardarTransaccion(nuevaTransaccion);
    alert('¡Transacción guardada exitosamente!');
  } catch (error) {
    alert('Error al guardar: ' + error.message);
  }
}