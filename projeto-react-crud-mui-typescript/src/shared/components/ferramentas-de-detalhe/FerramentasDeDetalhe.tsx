import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from '@mui/material';

interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: string;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarFechar?: boolean;

    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: string;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarFecharCarregando?: boolean;

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoCLicarEmSalvar?: () => void;
    aoClicarEmSalvarFechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = 'Novo',

    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarFechar = false,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarFecharCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoCLicarEmSalvar,
    aoClicarEmSalvarFechar
}) => {
    const theme = useTheme();

    return (
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display='flex'
            alignItems='center'
            height={theme.spacing(5)}
            component={Paper}
        >
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    onClick={aoCLicarEmSalvar}
                    startIcon={<Icon>save</Icon>}
                >
                    Salvar
                </Button>
            )}

            {mostrarBotaoSalvarCarregando && (
                <Skeleton width={165} height={63} animation='wave' />
            )}

            {(mostrarBotaoSalvarFechar && !mostrarBotaoSalvarFecharCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoClicarEmSalvarFechar}
                    startIcon={<Icon>save</Icon>}
                >
                    Salvar e Voltar
                </Button>
            )}

            {mostrarBotaoSalvarFecharCarregando && (
                <Skeleton width={165} height={63} animation='wave' />
            )}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoClicarEmApagar}
                    startIcon={<Icon>delete</Icon>}
                >
                    Apagar
                </Button>
            )}

            {mostrarBotaoApagarCarregando && (
                <Skeleton width={110} height={63} animation='wave' />
            )}

            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoClicarEmNovo}
                    startIcon={<Icon>add</Icon>}
                >
                    {textoBotaoNovo}
                </Button>
            )}

            {mostrarBotaoNovoCarregando && (
                <Skeleton width={110} height={63} animation='wave' />
            )}

            <Divider variant='middle' orientation='vertical' />

            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoClicarEmVoltar}
                    startIcon={<Icon>arrow_back</Icon>}
                >
                    Voltar
                </Button>
            )}

            {mostrarBotaoVoltarCarregando && (
                <Skeleton width={110} height={63} animation='wave' />
            )}
        </Box>
    );
};