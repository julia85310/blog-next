'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link'

export default function AgendaPage(){

    const [contactos, setArticulos] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const res = await fetch('http://localhost:3000/api/agenda');
        const data = await res.json();
        setArticulos(data);
    }

    async function eliminarArticulo(articulo) {
        const result = window.confirm(`¿Deseas eliminar a ${articulo.nombre} ${articulo.apellidos}?`);
        if (!result) {
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/api/blog", {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: articulo.id}),
            });

            const data = await res.json();

            if (res.ok) {
                fetchData();
            } else {
                alert(`Error: ${data.error}`);
            }
            
        } catch (error) {
            alert('Error estableciendo la conexión');
        }
    }

    return <div>
        <h1>Articulos</h1>
        <main>
            <ul>
                {articulos.map((articulo) =>
                    <li key={articulo.id}>
                        <Link href={"/blog/" + articulo.id }>{articulo.titulo}</Link>   
                        <p>    Contenido: {articulo.contenido}</p>
                        <p>    Autor: {articulo.autor}</p>
                        <button className='eliminar' onClick={() => eliminarArticulo(articulo)}>Eliminar</button>
                    </li>
                )}
            </ul>
        </main>
    </div>
}