import { getRandomName } from "utils/card";

const GRAPH_API_BASE_URL = 'https://api-dev.foodstyles.com/graphql';

//hardcoded for demo purposes
const ACCESS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQ5LCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNjU3MzU4NDA0LCJleHAiOjE2NTc5NjMyMDR9.BdCjKFY0Vqk0GyaWECHwL50XYk_FG6UqX_ibgJxPojHeA1UjNaEaxZh7fUI9yNpiewyIEBZFIy4cYMnWaEVlvayR78fVfgHRg7hztbKzZ5HRVU4o0rFcMJ3z003IIbdyKpEFGZxkMq3bgOaeC19Mn7uQFbrbYCbeNrmVx3Lt03LIzp1SrI0kayWv1fmT8PAroE0PeCw3We4jERTf3qQjeu2iBCCyOtIyDaeauJ8qxSdB0DQB_Lyxx_ljZB_kEJZTKERjsclbRFh4C1hXoRf01D79MLPvPrHB2LZHn3dprlLj4MmzA1JK1wSeu4-edcbM6nMugVfgfxKNVvXmqHC-oQ';

const CARDS_QUERY = `query {
    cards {
        id
        name       
    }
 }
 `

const CREATE_CARD_MUTATION = `mutation {
    createCard(
        data: {
            name: "{{name}}",
            minPrice: null,
            maxPrice: null,
            locationTypeIds: [],
            locationCuisineTypeIds: [],
            dishTypeIds: [],
            courseTypeIds: [],
            dietIds: [],
            excludedIngredientIds: []
        }
    ) {
        id
        name       
  }
 }`

 const SHARE_CARD_MUTATION = `mutation {
    shareCard(
        id: {{id}}
    )
 }
 `

 const DUPLICATE_CARD_MUTATION = `mutation {
    duplicateCard(
        id: {{id}}       
    ) {
        id
        name           
  }
 }
 `

 const DELETE_CARD_MUTATION = `mutation {
    deleteCard(
        id: {{id}}
    )
 }
 `

async function apiCall(query:string, replacementMap?:any){
    if(replacementMap){
        Object.keys(replacementMap).forEach(key => {
            query = query.replaceAll(`{{${key}}}`, replacementMap[key])
        });
    }
    console.log('api call', query)
    const result = await fetch(GRAPH_API_BASE_URL, {
        body: JSON.stringify({
            query
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
    });
    console.log('success');
    return (await result.json()).data;
}

export function getCardsQuery(){
    return apiCall(CARDS_QUERY);
}

export function createCardQuery(name: string){
    return apiCall(CREATE_CARD_MUTATION, {
        name
    });
}

export function duplicateCardMutation(id:number){
    return apiCall(DUPLICATE_CARD_MUTATION, {
        id
    });
}

export function shareCardMutation(id:number){
    return apiCall(SHARE_CARD_MUTATION, {
        id
    });
}

export function deleteCardMutation(id:number){
    return apiCall(DELETE_CARD_MUTATION, {
        id
    });
}

