import type { Paciente } from "../types/paciente";

interface PacienteTablaProps {
  pacientes: Paciente[];
}

export default function PacienteTabla({ pacientes }: PacienteTablaProps) {
  return (
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
  );
}