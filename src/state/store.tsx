import { Provider } from 'react-redux'
import React from 'react';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { rootReducer } from '.'
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import cardRootSaga from './card/sagas';
import { configureStore } from '@reduxjs/toolkit';

const middlewares:Middleware[] = [];

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);


export const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
});

const masterSaga = function*(){
    yield all([
        fork(cardRootSaga),
    ])
}

sagaMiddleware.run(masterSaga);


export function StateWrapper(props:{children:any}){
    return (<Provider store={store}>
       {props.children}
    </Provider>)
}