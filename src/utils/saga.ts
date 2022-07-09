import { put } from "redux-saga/effects";

export function apiSuccess(type:string, payload?:any, requestParams?:any){
    const obj = {
        type, 
        payload, 
        requestParams
    };
    return put(obj);
}

export function apiError(type:string, error?:any, requestParams?:any){
    const obj = {
        type, 
        error, 
        requestParams
    };
    return put(obj);
}