import { useEffect, useState } from "react";
import { obtenerPacientes } from "../services/pacienteService";
import type { Paciente } from "../types/paciente";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarPacientes() {
      try {
        const datos = await obtenerPacientes();
        setPacientes(datos);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      } finally {
        setCargando(false);
      }
    }

    cargarPacientes();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Pacientes</h1>

      {cargando ? (
        <div
          className="d-flex justify-content-center align-items-center gap-3 py-4"
          role="status"
        >
          <div className="spinner-border text-primary" aria-hidden="true" />
          <span>Cargando pacientes...</span>
        </div>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Edad</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-muted">
                  No hay pacientes registrados.
                </td>
              </tr>
            ) : (
              pacientes.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.especie}</td>
                  <td>{p.raza}</td>
                  <td>{p.edad}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
