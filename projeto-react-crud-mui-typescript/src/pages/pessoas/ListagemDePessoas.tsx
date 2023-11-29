import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Icon, IconButton, LinearProgress,
    Pagination, Paper, Table, TableBody, TableCell,
    TableContainer, TableFooter, TableHead, TableRow
} from "@mui/material";

import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";
import { Enviroment } from "../../shared/environment";


export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(1000);
    const navigate = useNavigate();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCont, setTotalCont] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(pagina, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        console.log(result);

                        setRows(result.data);
                        setTotalCont(result.totalCount);
                    }
                });
        });
    }, [busca, debounce, pagina]);

    const handleDelete = (id: number) => {
        if (window.confirm('Realmente deseja apagar o registro?')) {
            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        setRows(oldRows => [
                            ...oldRows.filter(oldRow => oldRow.id !== id),
                        ]);
                        alert('Registro apagado com sucesso!');
                    }
                });
        }
    }

    return (
        <LayoutBaseDePagina
            titulo="Listagem de pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputBusca
                    textoBotaoNovo="Nova"
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
                />
            }
        >

            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>E-mail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleDelete(row.id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell>{row.nomeCompleto}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant="indeterminate" />
                                </TableCell>
                            </TableRow>
                        )}
                        {(totalCont > 0 && totalCont > Enviroment.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination
                                        page={pagina}
                                        count={Math.ceil(totalCont / Enviroment.LIMITE_DE_LINHAS)}
                                        onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>

        </LayoutBaseDePagina>
    );
};