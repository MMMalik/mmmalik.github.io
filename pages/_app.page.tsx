import '../styles/globals.css';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <div className="site">
            <Component {...pageProps} />
        </div>
    );
};

export default App;
