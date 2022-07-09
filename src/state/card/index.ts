import update from "immutability-helper";
import { createReducer } from '@reduxjs/toolkit'
import { CLEAR_SHARE_LINK, CREATE_CARD_FAILURE, CREATE_CARD_PENDING, CREATE_CARD_SUCCESS, DELETE_CARD_PENDING, DUPLICATE_CARD_FAILURE, DUPLICATE_CARD_PENDING, DUPLICATE_CARD_SUCCESS, GET_CARDS_PENDING, GET_CARDS_SUCCESS, SHARE_CARD_PENDING, SHARE_CARD_SUCCESS } from "./constants";
import { Card, WithPayload } from "state/types";
import { createCard, deleteCard, duplicateCard } from "./actions";

export type CardState = {
    cards: Card[],
    lastShareLinkId?: string
}

export type PartialCardState = {
    card: CardState;
}

const defaultState: CardState = {
    cards: [],
};

const handlers = {
    [GET_CARDS_SUCCESS]: (state: CardState, data:WithPayload<{cards:Card[]}>) =>
    update(state, { 
        cards: {
            $set: data.payload.cards
        }
    }),
    [SHARE_CARD_PENDING]: (state: CardState) =>
    update(state, { 
        $unset: ['lastShareLinkId']
    }),
    [CLEAR_SHARE_LINK]: (state: CardState) =>
    update(state, { 
        $unset: ['lastShareLinkId']
    }),
    [SHARE_CARD_SUCCESS]: (state: CardState, data:WithPayload<{shareCard:string}>) =>
    update(state, { 
        lastShareLinkId: {
            $set: data.payload.shareCard
        }
    }),
    [DELETE_CARD_PENDING]: (state: CardState, request:ReturnType<typeof deleteCard>) =>
    update(state, { 
        cards: {
            $apply: (prev:Card[]) => prev.filter(c => c.id != request.payload.id)
        }
    }),
    [DUPLICATE_CARD_PENDING]: (state: CardState, request:ReturnType<typeof duplicateCard>) =>
    update(state, { 
        cards: {
            $apply: (prev:Card[]) => [...prev, {name: `Duplicate of ${prev.find(c => c.id == request.payload.id)!.name}`, id: -1}]
        }
    }),
    [DUPLICATE_CARD_FAILURE]: (state: CardState) =>
    update(state, { 
        cards: {
            $apply: (prev:Card[]) => prev.filter(c => c.id != -1)
        }
    }),
    [DUPLICATE_CARD_SUCCESS]: (state: CardState, data:WithPayload<{duplicateCard:Card}>) =>
    update(state, { 
        cards: {
            $apply: (prev:Card[]) => [...prev.filter(c => c.id != -1), data.payload.duplicateCard]
        }
    }),
    [CREATE_CARD_PENDING]: (state: CardState, request:ReturnType<typeof createCard>) =>
    update(state, { 
        cards: {
            $apply: (prev:Card[]) => [...prev, {name: request.payload.name, id: -1}]
        }
    }),
    [CREATE_CARD_FAILURE]: (state: CardState) =>
    update(state, { 
        cards: {
            $apply: (prev:Card[]) => prev.filter(c => c.id != -1)
        }
    }),
    [CREATE_CARD_SUCCESS]: (state: CardState, data:WithPayload<{createCard:Card}>) =>
    update(state, { 
        cards: {
            $apply: (prev:Card[]) => [...prev.filter(c => c.id != -1), data.payload.createCard]
        }
    }),


}
export const cardReducer = createReducer(defaultState, handlers)

