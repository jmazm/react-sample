import React from 'react';
import  ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux';
import store from './store'
import AppRoutes from './routes';


const render = (store) => {
    ReactDOM.render(
        <AppContainer>
          <Provider store={ store }>
            <AppRoutes/>
          </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
}

render(store);


if (process.env.NODE_ENV === 'development' && module.hot) {
    // accept 函数的第一个参数指出当前文件接受哪些子模块的替换，这里表示只接受 ./AppComponent 这个子模块
    // 第2个参数用于在新的子模块加载完毕后需要执行的逻辑
    module.hot.accept();
}