import { useCallback, useState } from "react"

interface IListItem {
    title: string;
    isSelected: boolean;
}

export const Dashboard = () => {
    const [lista, setLista] = useState<IListItem[]>([])

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;

            e.currentTarget.value = '';

            setLista((oldLista) => {
                if (oldLista.some((ListItem) => ListItem.title === value)) return oldLista;

                return [
                    ...oldLista,
                    {
                        title: value,
                        isSelected: false,
                    }
                ];
            });
        }
    }, []);

    return (
        <>
            <p>Lista</p>

            <input onKeyDown={handleInputKeyDown} />

            <p>{lista.filter((ListItem) => ListItem.isSelected).length}</p>

            <ul>
                {lista.map((ListItem) => {
                    return <li key={ListItem.title}>
                        <input
                            type="checkbox"
                            checked={ListItem.isSelected}
                            onChange={() => {
                                setLista(oldLista => {
                                    return oldLista.map(oldListItem => {
                                        const newIsSelected = oldListItem.title === ListItem.title
                                            ? !oldListItem.isSelected
                                            : oldListItem.isSelected;

                                        return {
                                            ...oldListItem,
                                            isSelected: newIsSelected,
                                        };
                                    });
                                });
                            }}
                        />
                        {ListItem.title}
                    </li>
                })}
            </ul>
        </>
    )
}