import { ADD_EVENT, EDIT_EVENT, DELETE_EVENT, PREV_DAY , NEXT_DAY , TODAY } from '../constants/action-types';
import { getTimezoneDifference } from "../actions/index"
const initialState = {
    event : [
        {
            "startTime": "Fri Jan 18 2019 01:00:00 GMT+0530 (IST)",
            "endTime": "Fri Jan 18 2019 01:30:00 GMT+0530 (IST)",
            "title": "Event 1",
            "id": 1
        },
        {
            "startTime": "Sat Jan 19 2019 04:00:00 GMT+0530 (IST)",
            "endTime": "Sat Jan 19 2019 06:00:00 GMT+0530 (IST)",
            "title": "Event 2",
            "id": 2
        },
        {
            "startTime": "Sun Jan 20 2019 20:00:00 GMT+0530 (IST)",
            "endTime": "Sun Jan 20 2019 21:30:00 GMT+0530 (IST)",
            "title": "Event 3",
            "id": 3
        },
        {
            "startTime": "Sun Jan 20 2019 21:30:00 GMT+0530 (IST)",
            "endTime": "Sun Jan 20 2019 22:15:00 GMT+0530 (IST)",
            "title": "Event 4",
            "id": 4
        },
        {
            "startTime": "Mon Jan 21 2019 01:00:00 GMT+0530 (IST)",
            "endTime": "Mon Jan 21 2019 02:00:00 GMT+0530 (IST)",
            "title": "Event 5",
            "id": 5
        },
        {
            "startTime": "Tue Jan 22 2019 03:00:00 GMT+0530 (IST)",
            "endTime": "Tue Jan 22 2019 04:00:00 GMT+0530 (IST)",
            "title": "Event 6",
            "id": 6
        },
        {
            "startTime": "Tue Jan 22 2019 04:00:00 GMT+0530 (IST)",
            "endTime": "Tue Jan 22 2019 05:00:00 GMT+0530 (IST)",
            "title": "Event 7",
            "id": 7
        },
        {
            "startTime": "Tue Jan 22 2019 01:00:00 GMT+0530 (IST)",
            "endTime": "Tue Jan 22 2019 02:00:00 GMT+0530 (IST)",
            "title": "Event 8",
            "id": 8
        },
        {
            "startTime": "Wed Jan 23 2019 02:00:00 GMT+0530 (IST)",
            "endTime": "Wed Jan 23 2019 03:00:00 GMT+0530 (IST)",
            "title": "Event 9",
            "id": 9
        }
    ],
    currentDate : new Date()
}

export default function(state=initialState , action : any){
    switch(action.type){
        case TODAY : {
            return {...state, currentDate : new Date()}
        }
        case PREV_DAY : {
            let day = new Date(action.payload.date.currentTarget.attributes[2].value)
            let prevDay = new Date(day.toLocaleDateString());
            prevDay.setDate(day.getDate()-1);
            console.log(state.currentDate)
            return {...state, currentDate : prevDay}
        }
        
        case NEXT_DAY : {
            let day = new Date(action.payload.date.currentTarget.attributes[2].value)
            let nextDay = new Date(day.toLocaleDateString());
            nextDay.setDate(day.getDate()+1);
            console.log(state.currentDate)
            return {...state, currentDate : nextDay}
        }

        case ADD_EVENT : {
            return {
                ...state,
                event : [ ...state.event , action.payload]
            }
        }

        case EDIT_EVENT : {
            let updateObj = action.payload
            let foundItem = state.event.filter((ele :any)=> {
               return ele.id == updateObj.event.id
            })
            foundItem[0].id = updateObj.event.id;
            foundItem[0].startTime = updateObj.event.startTime;
            foundItem[0].endTime = updateObj.event.endTime;
            foundItem[0].title = updateObj.event.title
            state.event = state.event.filter((ele : any)=> ele.id != updateObj.event.id)
            return { ...state, event : [...state.event,foundItem[0]]}
        }

        case DELETE_EVENT : {
            return {
                ...state,
                event : state.event.filter(event => event.id !== action.payload.eventId)
            }
        }

        default :
            return state

    }
}