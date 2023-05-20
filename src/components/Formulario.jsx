import { useEffect, useState } from "react";
import { db } from '../firebase';
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc,query } from 'firebase/firestore';

const Formulario = () =>{
  const [nombreLibro, setNombreLibro] = useState('');
  const [nombreAutor, setnombreAutor] = useState('');
  const [listaLibros, setListaLibros] = useState([]);
  const [Id, setID]= useState(0)
  const [modoEdicion, setModoEdicion] = useState(false)

  useEffect(() =>{
    const obtenerDatos = async()=>{
      try{
        await onSnapshot(collection(db, 'libros'), (query) =>{
          setListaLibros(query.docs.map((doc) => ({...doc.data(), id:doc.id})))
        })
      } catch (error){
        console.log(error)
      }
    }
    obtenerDatos();
  }, [])
  const guardarLibros = async (e) => {
    e.preventDefault()
    try{
  
  const data= await addDoc (collection(db, 'libros'),{
        nombreLibro: nombreLibro,
        nombreAutor: nombreAutor
      })

      setListaLibros([...listaLibros,{
        nombreLibro:nombreLibro,
        nombreAutor:nombreAutor,
        id:data,id
      }])
    } catch (error){
      console.log(error)
   }
  }
  
  const Eliminar = async id =>{
    try{
      await deleteDoc(doc(db,'libros', id))
    } catch(error){
      console.log(error)
    }
  }
  
  const Editar = item => {
    setNombreLibro(item.nombreLibro)
    setnombreAutor(item.nombreAutor)
    setID(item.id)
    setModoEdicion(true)
  }

  const editarLibros = async e =>{
    e.preventDefault();
    try{
      const docRef= doc (db,'libro', id);
      await updateDoc(docRef, {
        nombreLibro: nombreLibro,
        nombreAutor: nombreAutor
      })

      const nuevoArray = listaLibros.map(
        item => item.id === id ? {id:id, nombreLibro:nombreLibro , nombreAutor:nombreAutor}:item
      )
      setListaLibros(nuevoArray)
      setnombreAutor('')
      setNombreLibro('')
      setID('')
      setModoEdicion(false)

    }catch(error){
      console.log(error)
    }
  }

  const cancelar =() =>{
    setModoEdicion(false)
    setNombreLibro('')
    setnombreAutor('')
    setID('')
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Crud de Libros</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Listado de Libros</h4>
          <ul className="list-group">

          { 
          listaLibros.map(item =>(
          <li className="list-group-item" key={item.id}>
              <span className="lead">{item.nombreLibro}-{item.nombreAutor}</span>
              <button className="btn btn-danger btn-sm float-end mx-2" onClick= {()=>Eliminar(item.id)}>Eliminar</button>
              <button className="btn btn-warning btn-sm float-end" onClick={()=> Editar(item)}>Editar</button>
            </li>
          )
          )
            }

          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">{modoEdicion ? 'Editar Libros' : 'Agregar Libros'}</h4>
          <form action= " " onSubmit= {modoEdicion ? editarLibros: guardarLibros}>
            <input type="text" className="form-control mb-2" placeholder="Ingrese Nombre del Libro" 
            value = {nombreLibro}
            onChange= {(e) => setNombreLibro(e.target.value)}/>
            {
              modoEdicion ?
              (
                <>
                <button className= "btn btn-warning btn-block"> Editar</button>
                <button className= "btn btn-dark btn-block mx-2" onClick={()=> cancelar()}> Cancelar</button>
                </>
              )
              :
              <button className= "btn btn-primary btn-block"> Agregar</button>
            }
          </form>
        </div>
      </div>
    </div>
  )
}

export default Formulario