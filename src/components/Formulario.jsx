import { useState, useEffect} from "react"
import Error from "./Error"

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')

    const [error, setError] = useState(false)

    useEffect(() => {
        // vacio se pasa una vez, si le aisgnas un valor cuando se ejecute ese componente
        if(Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        } 
    }, [paciente])

    const generarId = () => {
        const ramdom = Math.random().toString(36).substr(2)
        const fecha = Date.now().toString(36)

        return ramdom + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // validacion del formulario
        if([nombre, propietario, email, fecha, sintomas]. includes('') ) {
            setError(true)
            return
        } 
        setError(false)

        //Objeto de PACIENTE
        const objetoPaciente = {
        nombre, 
        propietario, 
        email, 
        fecha, 
        sintomas
       
        }

        if(paciente.id) {
            // editando el registro
            objetoPaciente.id = paciente.id
           

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

            setPacientes(pacientesActualizados)
            // se limpia el state para borrar de la memoria
            setPaciente({})
            
        } else {
            // nuevo registro
            objetoPaciente.id =  generarId()
            setPacientes([...pacientes, objetoPaciente])
        }

       

        // reiniciar el formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        
    }
   
    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg text-center mt-5 mb-10">Añade Pacientes y <span className="text-indigo-600 font-bold">Administralos</span></p>

            <form 
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5" 
                onSubmit={handleSubmit}
            >
                {   error && /* si error es true */
                        <Error>
                            <p>Todos los campos son obligatorios</p>
                        </Error>
                }
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre Mascota</label>
                    <input 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="mascota"
                        type="text" 
                        placeholder="Nombre de la Mascota"
                        value = {nombre}
                        onChange = {(e) => setNombre(e.target.value)}

                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>
                    <input 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="propietario"
                        type="text" 
                        placeholder="Nombre del Propietario"
                        value = {propietario}
                        onChange = {(e) => setPropietario(e.target.value)}

                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email Contacto Propietario</label>
                    <input 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="email"
                        type="email" 
                        placeholder="Email Contacto Propietario"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Alta</label>
                    <input 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="alta"
                        type="date" 
                        value = {fecha}
                        onChange = {(e) => setFecha(e.target.value)}

                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Sintomas</label>
                <textarea
                    id="sintomas"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Describe los Sintomas"
                    value = {sintomas}
                    onChange = {(e) => setSintomas(e.target.value)}
                />
                </div>

                <input type="submit" 
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
                />
            </form>
        </div>
    )
}

export default Formulario

