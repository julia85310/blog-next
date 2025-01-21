
'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link'

export default function BlogPage(){
    const emptyForm = {titulo: '', contenido: '', autor: '', fecha_publicacion: ''};
    const [formData, setFormData] = useState(emptyForm);
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const res = await fetch('http://localhost:3000/api/blog');
        const data = await res.json();
        setArticulos(data);
    }
    async function addArticulo(e){
        e.preventDefault();
        if(!comprobaciones()){
            return;
        }
        let nuevoArticulo;
        if(!formData.fecha_publicacion){
            nuevoArticulo = {titulo: formData.titulo, contenido: formData.contenido, autor: formData.autor};
        }else{
            nuevoArticulo = formData
        }
        try {
            const res = await fetch("http://localhost:3000/api/blog", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoArticulo),
            });

            const data = await res.json();

            if (res.ok) {
                setFormData(emptyForm);
                alert('Articulo añadido');
                fetchData();
            } else {
                alert(`Error: ${data.error}`);
            }
            
        } catch (error) {
            alert('Error estableciendo la conexión');
        }
    }
    async function eliminarArticulo(articulo) {
        const result = window.confirm(`¿Deseas eliminar el articulo ${articulo.titulo}?`);
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

    function comprobaciones(){
        let todoGuay = true;
        if(!formData.titulo){
            alert('Titulo requerido');
            todoGuay = false;
        }else if(!formData.contenido){
            alert('Contenido requerido');
            todoGuay = false;
        }else if(!formData.autor){
            alert('Autor requerido');
            todoGuay = false;
        }else if(formData.titulo > 150){
            alert('El titulo no debe superar los 150 caracteres');
            todoGuay = false;
        }
        return todoGuay;
    }

    return <div>
        <h1>Articulos</h1>
        <main>
            <h2>Articulos existentes</h2>
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
            <h2>Añadir articulos</h2>
            <form onSubmit={(e) => addArticulo(e)}>
                <label>Titulo: <input type="text" value={formData.titulo} onChange={(e) => setFormData({...formData, titulo: e.target.value})} maxLength={150} required></input></label><br></br>
                <label>Contenido: <input type="text" value={formData.contenido} onChange={(e) => setFormData({...formData, contenido: e.target.value})} required></input></label><br></br>
                <label>Autor: <input type="text" value={formData.autor} required onChange={(e) => setFormData({...formData, autor: e.target.value})}></input></label><br></br>
                <label>Fecha de publicación: <input type="datetime-local" value={formData.fecha_publicacion} onChange={(e) => setFormData({...formData, fecha_publicacion: e.target.value})}></input></label><br></br>
                <input type='submit' className='submit' value='Añadir articulo'></input>
            </form>
        </main>
    </div>
}