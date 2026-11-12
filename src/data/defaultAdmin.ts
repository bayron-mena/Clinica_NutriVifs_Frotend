import type { Profile, Role, Session } from "../context/AppContext";

export const ADMIN_SEED_KEY = "clinica-nutridifs-admin-seeded-v1";
// Cuenta inicial para esta aplicación local; se instala una sola vez.
export const DEFAULT_ADMIN: Profile = {
  name: "administrador", apellido: "", email: "admin@duoc.cl",
  birthDate: "2003-05-06", phone: "", direccion: "abogado 0509",
  region: "Metropolitana de Santiago", comuna: "Puente Alto",
  genero: "prefiero-no-decir", password: "Acab1312",
  role: "Administrador", failedAttempts: 0, locked: false,
};

export function seedAdmin(profiles: Profile[], initialized: boolean): Profile[] {
  if (initialized) return profiles;
  const others = profiles.filter(profile => profile.email.trim().toLowerCase() !== DEFAULT_ADMIN.email);
  return [...others, { ...DEFAULT_ADMIN }];
}

export function sessionFromProfile(profile: Profile): Session {
  return { name: profile.name, apellido: profile.apellido, email: profile.email,
    birthDate: profile.birthDate, phone: profile.phone, role: profile.role || "Cliente" };
}

export function routeForRole(role: Role): string {
  return role === "Administrador" ? "/administrar" : role === "Vendedor" ? "/vendedor" : "/";
}
