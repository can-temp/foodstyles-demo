import { Action } from "redux";
import { accessTokenSelector, accessTokenExpirationSelector, refreshTokenSelector } from "./auth/selectors";
import { 
    REFRESH_TOKENS_PENDING, REFRESH_TOKENS_FAILURE, 
    LOGIN_WITH_TOKEN_FAILURE, REFRESH_TOKENS_SUCCESS
} from "./auth/constants";
import { refreshTokens } from "./auth/actions";
import { logout } from "./entity/actions";
import { PartialStore } from "types/state";
import now from "lodash/now";
import { presentAlert, requireVersionUpdate } from "./session/actions";
import { createAlert } from "utils/ui/alert/composition";

export const FIVE_MINUTES = 1000 * 60 * 5;

const deferredActions:Action<string>[] = []

export const apiPreMiddleware = (store:PartialStore) => (next:any) => (action:Action<string>) => {
    const state = store.getState();
    // console.log(action.type);
    if(action.type.endsWith('_PENDING') && action.type != REFRESH_TOKENS_PENDING){
        //this is an API request, check if our token is going to expire soon or is expired.
        const token = accessTokenSelector(state); 
        if(!token){
            //this might be a call without token, just pass it to next MW
            next(action);
        }else{
            if(deferredActions.length){
                //there are already deferred actions, indicating we're waiting for new token.
                //so this should go in there too.
                deferredActions.push(action);
            }else{
                const expiration = accessTokenExpirationSelector(state);
                const accessToken = accessTokenSelector(state)!;
                const refreshToken = refreshTokenSelector(state)!;
                if(expiration && (expiration * 1000) - now() < FIVE_MINUTES){
                    deferredActions.push(action);
                    store.dispatch(refreshTokens(accessToken, refreshToken));
                }else{
                    //not expired or we don't have expiration set, just fire and hope for the best.
                    next(action);
                }
            }
        }
    }else{
        next(action);
    }
}

export const apiPostMiddleware = (store:PartialStore) => (next:any) => (action:Action<string>) => {
    if(action.type.endsWith('_FAILURE')){
        const apiError = typeof (action as any)?.error !== 'undefined' ? (action as any).error as any : undefined;
        if(apiError?.status == 412){
            store.dispatch(requireVersionUpdate());
            return;
        }
        console.log('FAILED ACTION', action, accessTokenSelector(store.getState()));
        if(action.type == REFRESH_TOKENS_FAILURE){
            //the reason for commenting out the following is that since we switched to GQL, it always returns 200
            //in the future we might want to check the error in more detail to see if it's expired/revoked token
            //or something else. though it's an edge case. 
            // if(apiError?.res && (apiError.status >= 400 || apiError.status < 500)){
            if(apiError){
                if(apiError.message == "Network request failed"){
                    setTimeout(() => {
                        console.log('TODO: FIX THIS! OF COURSE WE DONT WANT TO DISPATCH _FAILED ACTION AGAIN!');
                        // store.dispatch(action);
                    }, 3000);
                    return;
                }
                //refresh token call resulted in 4xx. we can't recover, logout.
                const alert = createAlert({
                    title: 'Unable to Continue',
                    description: 'For your account security, you have been logged out. Please login again.',
                    actions: [
                        {
                            title: 'Okay',
                            onPress: () => store.dispatch(logout())
                        }
                    ]
                });
                store.dispatch(presentAlert(alert));
                return;
            }else{
                //we've failed for refresh token but it's not an API error.
                //e.g. a network error.
                next(action);
            }
        }else{
            //it's a failure but not refresh token. 
            //if it returned 403, we need to refresh tokens and reply the action.
            const apiError = typeof (action as any).error !== 'undefined' ? (action as any).error as Response : undefined;
            if(apiError && apiError.status == 403 && action.type != LOGIN_WITH_TOKEN_FAILURE){
                //we need to refresh the tokens.
                const state = store.getState();
                const accessToken = accessTokenSelector(state)!;
                const refreshToken = refreshTokenSelector(state)!;
                store.dispatch(refreshTokens(accessToken, refreshToken));
            }else{
                //it's a failure, but not related to tokens, just pass it.
                next(action);
            }
        }
    }else{
        if(action.type == REFRESH_TOKENS_SUCCESS){
            console.log(`refreshed tokens successfully. firing ${deferredActions.length} deferred actions.`)
            if(deferredActions.length){
                const capturedActions = [...deferredActions];
                setTimeout(() => {
                    capturedActions.forEach(a => store.dispatch(a));
                }, 100);
                deferredActions.splice(0, deferredActions.length);
            }
        }
        
        next(action);
    }
}