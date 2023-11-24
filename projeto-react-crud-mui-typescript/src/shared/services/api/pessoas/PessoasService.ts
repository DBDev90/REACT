import { Enviroment } from "../../../environment";
import { Api } from "../axios-config";

interface IListagemPessoa {
    id: number;
    email: string;
    cidade: string;
    nomeCompleto: string;
}

interface IDetalhePessoa {
    id: number;
    email: string;
    cidade: string;
    nomeCompleto: string;
}

type IPessoasComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<IPessoasComTotalCount | Error> => {
    try {
        const urlRelativa = `/pessoas?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;

        const { data, headers } = await Api.get(urlRelativa);

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS),
            }
        }

        return new Error('Erro ao listar os registros.');

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
};

const getById = async (): Promise<any> => { };

const create = async (): Promise<any> => { };

const updateById = async (): Promise<any> => { };

const deleteById = async (): Promise<any> => { };


export const PessoasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
