import { useEffect, useMemo, useState } from "react";

import { useDebounce } from "../../../shared/hooks";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";
import { useField } from "@unform/core";

type TAutoCompleteOptions = {
    id: number;
    label: string;
}

interface IAutoCompleteCidadesProps {
    isExternalLoading?: boolean;
}

export const AutoCompleteCidades: React.FC<IAutoCompleteCidadesProps> = ({ isExternalLoading = false }) => {
    const { debounce } = useDebounce();
    const [busca, setBusca] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [opcoes, setOpcoes] = useState<TAutoCompleteOptions[]>([]);
    const { fieldName, registerField, defaultValue, error, clearError } = useField('codCidade');
    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
        })
    }, [registerField, fieldName, selectedId])

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            CidadesService.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        // alert(result.message);
                    } else {
                        console.log(result);

                        setOpcoes(result.data.map(cidade => ({ id: cidade.id, label: cidade.nome })));
                    }
                });
        });
    }, [debounce, busca]);

    const autoCompleteOption = useMemo(() => {
        if (!selectedId) return undefined;

        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);

        return selectedOption;
    }, [selectedId, opcoes]);

    return (
        <Autocomplete
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Sem opções"
            loadingText="Carregando..."

            disablePortal

            options={opcoes}
            loading={isLoading}
            value={autoCompleteOption}
            disabled={isExternalLoading}
            onInputChange={(_, newValue) => setBusca(newValue)}
            onChange={(_, newValue) => { setSelectedId(newValue?.id); setBusca(''); clearError(); }}
            popupIcon={isExternalLoading || isLoading ? <CircularProgress size={28} /> : undefined}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label="Cidade"
                    error={!!error}
                    helperText={error}
                />
            }
        />
    );
}