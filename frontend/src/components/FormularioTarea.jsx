import { useState } from 'react'

export default function FormularioTarea({ onAgregar }) {
  const [titulo, setTitulo] = useState('')

  function manejarEnvio(e) {
    e.preventDefault()

    if (titulo.trim()) {
      onAgregar(titulo)
      setTitulo('')
    }
  }

  return (<form onSubmit={manejarEnvio} className="p-4 border rounded shadow-sm">
  <label
    htmlFor="titulo-tarea"
    className="form-label fw-bold"
  >
    Nueva tarea
  </label>

  <input
    id="titulo-tarea"
    className="form-control mb-3"
    value={titulo}
    onChange={(e) => setTitulo(e.target.value)}
  />

  <button
    type="submit"
    className="btn btn-primary"
  >
    Agregar
  </button>
</form>
  )
}