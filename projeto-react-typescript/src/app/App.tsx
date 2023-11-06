import { Routes } from "../routes";
import { UsuarioLogadoProvides } from "../shared/contexts";

export const App = () => {
  return (
    <UsuarioLogadoProvides>
      <Routes />
    </UsuarioLogadoProvides>
  );
}
