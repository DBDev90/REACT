import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { VTextField, VForm, useVForm } from "../../shared/forms";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
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

    const { formRef, save, isSaveAndNew, isSaveAndClose } = useVForm();

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
        } else {
            formRef.current?.setData({
                email: '',
                codCidade: '',
                nomeCompleto: '',
            })
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
                        if (isSaveAndClose()) {
                            navigate('/pessoas');
                        } else {
                            navigate(`/pessoas/detalhe/${result}`);
                        }
                    }
                });
        } else {
            PessoasService
                .updateById(Number(id), { id: Number(id), ...dados })
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        if (isSaveAndClose()) {
                            navigate('/pessoas');
                        }
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

                    aoCLicarEmSalvar={save}
                    aoClicarEmSalvarFechar={isSaveAndClose}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                />
            }
        >
            <VForm ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

                    <Grid container direction="column" padding={2}>
                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant="indeterminate" />
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={8} md={6} xl={2}>
                                <VTextField
                                    fullWidth
                                    label="Nome completo"
                                    name="nomeCompleto"
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} xl={1}>
                                <VTextField
                                    fullWidth
                                    label="E-mail"
                                    name="email"
                                    disabled={isLoading}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={2} xl={1}>
                                <VTextField
                                    fullWidth
                                    label="Código da cidade"
                                    name="codCidade"
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBaseDePagina>
    )
}