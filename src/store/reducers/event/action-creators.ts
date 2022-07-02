import { IEvent } from './../../../models/IEvent';
import { IUser } from '../../../models/IUser';
import { AppDispatch } from './../../index';
import { EventActionEnum, SetGuestsAction, SetEventsAction } from './types';
import UserService from '../../../api/UserService';

export const EventActionCreators = {
    setGuests: (guests: IUser[]): SetGuestsAction => ({ type: EventActionEnum.SET_GUESTS, payload: guests }),
    setEvents: (events: IEvent[]): SetEventsAction => ({ type: EventActionEnum.SET_EVENTS, payload: events }),
    dataUser: (username: string): IEvent[] | undefined => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            return json.filter(e => e.author === username || e.guest === username);
        } catch (error) {
            console.log((error as Error).message);
        }
    },
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers();
            dispatch(EventActionCreators.setGuests(response.data));
        } catch (error) {
            console.log((error as Error).message);
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            localStorage.setItem('events', JSON.stringify(json));
            
            const currentEvents = EventActionCreators.dataUser(event.author);
            if (currentEvents) {
                dispatch(EventActionCreators.setEvents(currentEvents));
            }
        } catch (error) {
            console.log((error as Error).message);
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const currentEvents = EventActionCreators.dataUser(username);
            if (currentEvents) {
                dispatch(EventActionCreators.setEvents(currentEvents));
            }
        } catch (error) {
            console.log((error as Error).message);
        }
    },
    deleteEvents: (username: string) => async (dispatch:AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            const deleteUserEvents = json.filter(e => e.author !== username && e.guest !== username);
            localStorage.setItem('events', JSON.stringify(deleteUserEvents));

            const currentEvents = EventActionCreators.dataUser(username);
            if (currentEvents) {
                dispatch(EventActionCreators.setEvents(currentEvents));
            }
        } catch (error) {
            console.log((error as Error).message);
        }
    }
};