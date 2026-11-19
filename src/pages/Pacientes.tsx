import { useEffect, useState } from "react";
import { obtenerPacientes } from "../services/pacienteService";
import type { Paciente } from "../types/paciente";
import PacienteTabla from "../components/PacienteTabla";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    async function cargarPacientes() {
      try {
        const datos = await obtenerPacientes();
        setPacientes(datos);
      } catch (e) {
        console.error("Error al cargar pacientes:", e);
        setError("Error al cargar pacientes");
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
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
  </div>
      ) : (
        <PacienteTabla pacientes={pacientes} />
      )}
    </div>
  );
}
