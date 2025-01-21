'use client'
//npm install date-fns
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {use, useState, useEffect} from 'react';
export default function ArticuloPage({params}){
    const {id} = use(params);
    const [articulo, setArticulo] = useState({});
    
    useEffect(() => {
            fetchData();
    }, [])
    
    async function fetchData() {
        const url = "/api/blog/articulo?id=" + id
        const res = await fetch(url);
        const data = await res.json();
        setArticulo(data);
    }

    if (!articulo) {
        return <h1>Articulo no encontrado</h1>;
    }

    
    return <div>
            <h1>{articulo.titulo}</h1>
            <main className='datos'>
                <p>ID: {id}</p>
                <p>Articulo: {articulo.titulo}</p>
                <p>Contenido: {articulo.contenido}</p>
                <p>Autor: {articulo.autor}</p>
                {articulo.fecha_publicacion && <p>Fecha de publicación: 
                    {format(new Date(articulo.fecha_publicacion), "dd/MM/yyyy HH:mm", { locale: es })}
                </p>}
            </main>
    </div>
}