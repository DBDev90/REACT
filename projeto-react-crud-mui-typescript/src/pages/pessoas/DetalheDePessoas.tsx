import { useNavigate, useParams } from "react-router-dom";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetalhe";

export const DetalheDePessoas: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const handleSave = () => {
        console.log('save');
    };

    const handleDelete = () => {
        console.log('delete');
    };

    return (
        <LayoutBaseDePagina
            titulo="Detalhe de pessoa"
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoCLicarEmSalvar={handleSave}
                    aoClicarEmSalvarFechar={handleSave}
                    aoClicarEmApagar={handleDelete}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                />
            }
        >

        </LayoutBaseDePagina>
    )
}