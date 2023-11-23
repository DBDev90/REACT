import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";


export const Dashboard = () => {
    return (
        <LayoutBaseDePagina
            titulo="Início"
            barraDeFerramentas={(
                <FerramentasDaListagem
                    mostrarInputBusca
                />
            )}
        >
            Teste
        </LayoutBaseDePagina>
    );
};