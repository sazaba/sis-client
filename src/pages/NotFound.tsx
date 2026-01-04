import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold">Página no encontrada</h1>
        <p className="mt-2 text-zinc-300">
          La ruta no existe o fue movida.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
