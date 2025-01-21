import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hiltuhxwiptrgbnerjrp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpbHR1aHh3aXB0cmdibmVyanJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDgzMTUsImV4cCI6MjA1MjY4NDMxNX0.mHcAkPWO7_NDTIbUZ5xWyoeHrfGsUz_fYy6VgIuWTm0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  try {
    const { data: articulos, error } = await supabase.from('articulo').select('*');

    if (error) {
      return new Response(
        JSON.stringify({ error: 'Error al obtener los datos', details: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(articulos), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}