import { createUseStyles } from 'react-jss'
import styled from 'styled-components';
import './Dashboard.css'

const useClasses = createUseStyles({
    paragraph: {
        backgroundColor: 'black',
        color: 'white',
        '&:hover': {
            backgroundColor: 'red'
        },
        '&:active': {
            backgroundColor: 'blue'
        }
    }
});

const Paragraph = styled.p`
    background-color: green;
    color: yellow;
    &:hover{
        background-color: aqua;
    };
    &:active{
        background-color: gray;
    }
`;

export const Dashboard = () => {
    const classes = useClasses();

    return (
        <>
            <div>
                <p>
                    Teste
                </p>
            </div>

            <div>
                <p className={classes.paragraph}>Teste 2 JSS</p>
            </div>

            <div>
                <Paragraph >Teste 3 STYLED-COMPONENTS</Paragraph>
            </div>
        </>
    )
}