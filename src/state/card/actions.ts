import { GET_CARDS_PENDING, CREATE_CARD_PENDING, SHARE_CARD_PENDING, DUPLICATE_CARD_PENDING, DELETE_CARD_PENDING, CLEAR_SHARE_LINK } from './constants'

export function getCards(){
    return {
        type: GET_CARDS_PENDING
    }
}

export function createCard(name:string){
    return {
        type: CREATE_CARD_PENDING,
        payload: { name }
    }
}

export function shareCard(id:number){
    return {
        type: SHARE_CARD_PENDING,
        payload: { id }
    }
}

export function clearShareLink(){
    return {
        type: CLEAR_SHARE_LINK,
    }
}

export function duplicateCard(id:number){
    return {
        type: DUPLICATE_CARD_PENDING,
        payload: { id }
    }
}

export function deleteCard(id:number){
    return {
        type: DELETE_CARD_PENDING,
        payload: { id }
    }
}