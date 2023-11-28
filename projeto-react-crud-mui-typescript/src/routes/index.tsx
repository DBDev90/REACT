import { Routes, Route, Navigate } from 'react-router-dom'
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListagemDePessoas } from '../pages';

export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Início'
            },
            {
                icon: 'people',
                path: '/pessoas',
                label: 'Pessoas'
            }
        ]);
    }, [setDrawerOptions]);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard />} />
            <Route path='/pessoas' element={<ListagemDePessoas />} />

            <Route path='*' element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
}