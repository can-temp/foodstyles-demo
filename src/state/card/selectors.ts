import { PartialCardState } from ".";

export const cardsSelector = (state: PartialCardState) => state.card.cards;
export const lastShareLinkIdSelector = (state: PartialCardState) => state.card.lastShareLinkId;