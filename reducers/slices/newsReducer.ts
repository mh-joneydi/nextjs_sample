import { TAction } from 'store';
import actionTypes from 'actions/types';

export interface INewsDetails {
    createDateTime: string,
    imageName: string,
    newsId: string,
    newsStaions: Array<{ stationId: string }> 
    rowCount: number
    shortDescription: string
    showInSlider: boolean
    tags: string[]
    text: string
    title: string
}

export type TNewsReducerState = { [ prop: string]: INewsDetails };
export type TNewsPayload = INewsDetails[];

type TUserReducerActions = TAction<actionTypes.FETCH_NEWS, TNewsReducerState> ;

export default function newsReducer(state: TNewsReducerState = {} , action: TUserReducerActions): TNewsReducerState {
    switch(action.type) {
        case actionTypes.FETCH_NEWS:
            return action.payload
        default:
            return state;
    }
}