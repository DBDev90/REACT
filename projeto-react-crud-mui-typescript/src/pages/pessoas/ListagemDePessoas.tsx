import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";

import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";


export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(1000);

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCont, setTotalCont] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(1, busca)
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
    }, [busca, debounce]);

    return (
        <LayoutBaseDePagina
            titulo="Listagem de pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputBusca
                    textoBotaoNovo="Nova"
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
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
                                <TableCell>Ações</TableCell>
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
                    </TableFooter>
                </Table>
            </TableContainer>

        </LayoutBaseDePagina>
    );
};