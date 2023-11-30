import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "@unform/web";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetalhe";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { VTextField } from "../../shared/forms";

export const DetalheDePessoas: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);

            PessoasService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoas');
                    } else {
                        setNome(result.nomeCompleto);
                        console.log(result);
                    }
                });
        }
    }, [id, navigate]);

    const handleSave = () => {
        console.log('save');
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Realmente deseja apagar o registro?')) {
            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro apagado com sucesso!');
                        navigate('/pessoas');
                    }
                });
        }
    };

    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova pessoa' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoCLicarEmSalvar={handleSave}
                    aoClicarEmSalvarFechar={handleSave}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                />
            }
        >
            <Form onSubmit={console.log}>
                <VTextField
                    name="nomeCompleto"
                />
            </Form>

            {/* {isLoading && (
                <LinearProgress variant="indeterminate" />
            )} */}
        </LayoutBaseDePagina>
    )
}