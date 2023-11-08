import { createUseStyles } from 'react-jss'
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
        </>
    )
}