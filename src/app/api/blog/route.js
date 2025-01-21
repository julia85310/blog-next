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
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(articulos), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

function comprobaciones(body){
  if(!body.titulo){
    return new Response(
      JSON.stringify({ error: 'Titulo requerido'}),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if(!body.contenido){
    return new Response(
      JSON.stringify({ error: 'Contenido requerido'}),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if(body.titulo.length > 151){
    return new Response(
      JSON.stringify({ error: 'El titulo no puede superar los 150 caracteres'}),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if(!body.autor ){
    return new Response(
      JSON.stringify({ error: 'Autor requerido'}),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  return body;
}

export async function POST(request) {
  const body = await request.json();
  const res = comprobaciones(body);
  console.log(res)

  if(res instanceof Response){
    return res;
  }

  let nuevoArticulo;
  if(!body.fecha_publicacion){
      nuevoArticulo = {titulo: body.titulo, contenido: body.contenido, autor: body.autor};
  }else{
      nuevoArticulo = body
  }

  try {
    const { data: data, error } = await supabase.from('articulo').insert([nuevoArticulo]);
    if (error) {
      return new Response(
        JSON.stringify({ error: 'Error al actualizar los datos', details: error.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

}

export async function DELETE(request){
  const body = await request.json();
  
  try{
    const {data: data, error} = await supabase.from('articulo').delete().eq('id', body.id);

    if (error) {
      return new Response(
        JSON.stringify({ error: 'Error al actualizar los datos', details: error.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}