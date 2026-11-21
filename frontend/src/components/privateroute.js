import { useAuth } from "../context/Authcontext";

function PrivateRoute({ children, fallback }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return children;
  }

  return (
    fallback || (
      <section className="page-section narrow">
        <p className="eyebrow">Account required</p>
        <h1>Please log in to continue.</h1>
      </section>
    )
  );
}

export default PrivateRoute;
