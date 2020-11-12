import React from 'react';
import { ProfileOutlined } from '@ant-design/icons';
import Posts from './components/Posts/Posts';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

function App() {
    return (
        <>
            <div className="App">

                <div className="header">
                    <h1 className="title"> <ProfileOutlined /> Postagens </h1>
                    <br />
                    <center>
                        <Provider store={store}>
                            <Posts className="posts" />
                        </Provider>
                    </center>
                </div>

            </div>
        </>
    );
}

export default App;
