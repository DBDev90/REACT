import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { VTextField } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetalhe";

interface IFormData {
    email: string;
    cidade: number;
    nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

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
                        formRef.current?.setData(result);
                    }
                });
        }
    }, [id, navigate]);

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);

        if (id === 'nova') {
            PessoasService
                .create(dados)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        navigate(`/pessoas/detalhe/${result}`)
                    }
                });
        } else {
            PessoasService
                .updateById(Number(id), { id: Number(id), ...dados })
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    }
                });
        }
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

                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoCLicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarEmSalvarFechar={() => formRef.current?.submitForm()}
                />
            }
        >
            <Form ref={formRef} onSubmit={handleSave}>
                <VTextField placeholder="Nome completo" name="nomeCompleto" />
                <VTextField placeholder="E-mail" name="email" />
                <VTextField placeholder="Código da cidade" name="codCidade" />
            </Form>

            {/* {isLoading && (
                <LinearProgress variant="indeterminate" />
            )} */}
        </LayoutBaseDePagina>
    )
}