import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './index.css';
import App from 'components/app/app';
import {store} from 'services/store';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
);
