import { BarraDeFerramentas } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";


export const Dashboard = () => {
    return (
        <LayoutBaseDePagina
            titulo="Início"
            barraDeFerramentas={(
                <BarraDeFerramentas
                    mostrarInputBusca
                />
            )}
        >
            Teste
        </LayoutBaseDePagina>
    );
};