import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="container py-5 text-center">
      <h1 className="mb-3">Página no encontrada</h1>
      <p className="text-muted">La dirección que buscas no existe.</p>
      <Link className="btn btn-primary" to="/login">
        Volver al inicio
      </Link>
    </main>
  );
}

export default NotFoundPage;
