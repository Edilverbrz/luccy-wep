import { supabase } from './supabaseClient.js';

export const dbService = {
  // Guardar una nueva transacción
  async guardarTransaccion(datos) {
    // Hoy usamos Supabase:
    const { data, error } = await supabase
      .from('transacciones')
      .insert([datos]);

    if (error) throw new Error(error.message);
    return data;


  },

  // Obtener todas las transacciones
  async obtenerTransacciones() {
    const { data, error } = await supabase
      .from('transacciones')
      .select('*');

    if (error) throw new Error(error.message);
    return data;
  }
};