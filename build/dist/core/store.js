import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// import rootReducer from '../../setup/redux/reducers';
import { createReducer } from 'redux-plus';
import { rootEpic } from './rootEpic';
var epicMiddleware = createEpicMiddleware();
var composeEnhancers = process.env.REACT_APP_ENV !== 'DEPLOY' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
var store = createStore(createReducer({}), // rootReducer
// composeEnhancers(
applyMiddleware(epicMiddleware)
// )
);
store.asyncReducers = {};
store.injectReducer = function (key, reducer) {
    if (store.asyncReducers[key]) {
        return;
    }
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
};
epicMiddleware.run(rootEpic);
export { store };
//# sourceMappingURL=store.js.map