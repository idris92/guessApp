import { checkPropTypes } from "prop-types";
import rootReducer from '../reducers'
import { createStore, applyMiddleware } from "redux";
import {middlewares} from '../store/configureStore'

export const storeFactory = (initialState)=>{
    return createStore(rootReducer, initialState, applyMiddleware(...middlewares))
}

export const findByTestAttr = (wrapper, val)=>{
    return wrapper.find(`[data-test='${val}']`);
}


export const checkProps = (component, conformingProps)=>{
    const propsError = checkPropTypes(component.propTypes, conformingProps, 'prop',component.name);
    expect(propsError).toBeUndefined();
}