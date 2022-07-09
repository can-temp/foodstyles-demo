import { takeEvery, all, call, put } from 'redux-saga/effects'
import { GET_CARDS_PENDING, GET_CARDS_SUCCESS, GET_CARDS_FAILURE, CREATE_CARD_SUCCESS, CREATE_CARD_FAILURE, CREATE_CARD_PENDING, SHARE_CARD_SUCCESS, SHARE_CARD_PENDING, DUPLICATE_CARD_SUCCESS, SHARE_CARD_FAILURE, DUPLICATE_CARD_FAILURE, DUPLICATE_CARD_PENDING, DELETE_CARD_SUCCESS, DELETE_CARD_FAILURE, DELETE_CARD_PENDING } from './constants'
import { apiSuccess, apiError } from 'utils/saga'
import { createCardQuery, deleteCardMutation, duplicateCardMutation, getCardsQuery, shareCardMutation } from 'services/foodstyles';
import { createCard, deleteCard, duplicateCard, getCards, shareCard } from './actions';
import { Alert } from 'react-native';

export default function* cardRootSaga(){
    yield all([
        takeEvery(GET_CARDS_PENDING, getCardsSaga),
        takeEvery(CREATE_CARD_PENDING, createCardSaga),
        takeEvery(SHARE_CARD_PENDING, shareCardSaga),
        takeEvery(DUPLICATE_CARD_PENDING, duplicateCardSaga),
        takeEvery(DELETE_CARD_PENDING, deleteCardSaga),
    ])
}

function* getCardsSaga() {
    try{
        const response = yield getCardsQuery();
        yield apiSuccess(GET_CARDS_SUCCESS, response);
    }catch(e){
        yield apiError(GET_CARDS_FAILURE, e);
    }
}


function* createCardSaga(action:ReturnType<typeof createCard>) {
    try{
        const response = yield call(createCardQuery, action.payload.name)
        yield apiSuccess(CREATE_CARD_SUCCESS, response);
    }catch(e){
        Alert.alert('Error', 'Unable to create card.');
        yield apiError(CREATE_CARD_FAILURE, e);
    }
}

function* shareCardSaga(action:ReturnType<typeof shareCard>) {
    try{
        const response = yield call(shareCardMutation, action.payload.id);
        yield apiSuccess(SHARE_CARD_SUCCESS, response);
    }catch(e){
        Alert.alert('Error', 'Unable to share card.');
        yield apiError(SHARE_CARD_FAILURE, e);
    }
}

function* duplicateCardSaga(action:ReturnType<typeof duplicateCard>) {
    console.log('action', action)
    try{
        const response = yield call(duplicateCardMutation, action.payload.id);
        yield apiSuccess(DUPLICATE_CARD_SUCCESS, response);
    console.log('dupe', response)

    }catch(e){
        Alert.alert('Error', 'Unable to duplicate card.');
        yield apiError(DUPLICATE_CARD_FAILURE, e);
    }
}

function* deleteCardSaga(action:ReturnType<typeof deleteCard>) {
    try{
        const response = yield call(deleteCardMutation, action.payload.id);
        yield apiSuccess(DELETE_CARD_SUCCESS, response);

    }catch(e){
        Alert.alert('Error', 'Unable to delete card.');
        yield put(getCards());
        yield apiError(DELETE_CARD_FAILURE, e);
    }
}