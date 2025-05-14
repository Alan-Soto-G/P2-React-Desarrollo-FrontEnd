import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../styles/loading.css'


const Loading: React.FC = () => {

    return (
        <div id='loading-container'>
            <div id="loading">
                <DotLottieReact
                    src="https://lottie.host/b1c2bde9-63f6-441c-a576-ae9ba3102cb9/e13WMOtUQd.lottie"
                    loop
                    autoplay
                />
                <h1>Cargando...</h1>
            </div>
        </div>
    );
}
export default Loading