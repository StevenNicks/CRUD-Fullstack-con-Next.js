
"use client";

import { useEffect, useState } from "react";

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [empleadoId, setEmpleadoId] = useState(null);

  const [formulario, setFormulario] = useState({
    nombres: "",
    apellidos: "",
    correo: ""
  });

  // LISTAR EMPLEADOS
  const obtenerEmpleados = async () => {
    try {
      const response = await fetch("/api/empleados");
      const data = await response.json();

      setEmpleados(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  // CAPTURAR DATOS DEL FORMULARIO
  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  // ABRIR FORMULARIO PARA CREAR
  const nuevoEmpleado = () => {
    setEmpleadoId(null);

    setFormulario({
      nombres: "",
      apellidos: "",
      correo: ""
    });

    setMostrarFormulario(true);
  };

  // ABRIR FORMULARIO PARA EDITAR
  const editarEmpleado = (empleado) => {
    setEmpleadoId(empleado.id);

    setFormulario({
      nombres: empleado.nombres,
      apellidos: empleado.apellidos,
      correo: empleado.correo
    });

    setMostrarFormulario(true);
  };

  // GUARDAR EMPLEADO
  const guardarEmpleado = async (e) => {
    e.preventDefault();

    const url = empleadoId
      ? `/api/empleados/${empleadoId}`
      : "/api/empleados";

    const method = empleadoId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formulario)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMostrarFormulario(false);
      obtenerEmpleados();

    } catch (error) {
      alert(error.message);
    }
  };

  // ELIMINAR EMPLEADO
  const eliminarEmpleado = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar este empleado?"
    );

    if (!confirmar) return;

    try {
      const response = await fetch(`/api/empleados/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      obtenerEmpleados();

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main style={{ padding: "40px" }}>

      <h1>Gestión de empleados</h1>

      <button onClick={nuevoEmpleado}>
        Nuevo empleado
      </button>

      {mostrarFormulario && (
        <form onSubmit={guardarEmpleado}>

          <h2>
            {empleadoId ? "Editar empleado" : "Nuevo empleado"}
          </h2>

          <input
            name="nombres"
            placeholder="Nombres"
            value={formulario.nombres}
            onChange={handleChange}
            required
          />

          <input
            name="apellidos"
            placeholder="Apellidos"
            value={formulario.apellidos}
            onChange={handleChange}
            required
          />

          <input
            name="correo"
            type="email"
            placeholder="Correo"
            value={formulario.correo}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Guardar
          </button>

          <button
            type="button"
            onClick={() => setMostrarFormulario(false)}
          >
            Cancelar
          </button>

        </form>
      )}

      <hr />

      {loading ? (
        <p>Cargando empleados...</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td>{empleado.id}</td>
                <td>{empleado.nombres}</td>
                <td>{empleado.apellidos}</td>
                <td>{empleado.correo}</td>

                <td>
                  <button
                    onClick={() => editarEmpleado(empleado)}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarEmpleado(empleado.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
