import * as types from '../constants/action-types'

export const today = (date:any) => ({
    type : types.TODAY
  })

export const prevDay = (date:any) => ({
    type : types.PREV_DAY,
    payload : {date}
  })

export const nextDay = (date:any) => ({
    type : types.NEXT_DAY,
    payload : {date}
})

export const addEvent = (startTime : any , endTime : any , title : any , id : any) => ({
    type : types.ADD_EVENT,
    payload : { startTime , endTime , title , id}
})

export const editEvent = ( event : any) => ({
    type : types.EDIT_EVENT,
    payload : { event}
}) 

export const deleteEvent = (eventId : any) => ({
    type : types.DELETE_EVENT,
    payload : { eventId }
})

export const getTimezoneDifference = (time : any) =>{
    return time + new Date().getTimezoneOffset()*60*1000
}

export const adjustDatepickerTime = (date : any) => {
    let myDate = new Date(date);
    let month = (myDate.getMonth() + 1) < 10 ? `0${myDate.getMonth() + 1}` : `${myDate.getMonth() + 1}`
    let hours = (myDate.getHours()) < 10 ? `0${myDate.getHours()}` : `${myDate.getHours()}`
    let minuts = (myDate.getMinutes()) < 10 ? `0${myDate.getMinutes()}` : `${myDate.getMinutes()}`
    let seconds = (myDate.getSeconds()) < 10 ? `0${myDate.getSeconds()}` : `${myDate.getSeconds()}`
    return `${myDate.getFullYear()}-${month}-${myDate.getDate()}T${hours}:${minuts}:${seconds}.${myDate.getMilliseconds()}`
}