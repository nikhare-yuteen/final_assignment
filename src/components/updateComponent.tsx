import * as React from 'react';
import { any } from 'prop-types';
import store from '../store';
import { addEvent, editEvent} from '../actions';
import { connect } from 'react-redux';
import moment from 'react-moment';
import '../css/style.css';
import { bindActionCreators } from "redux"

interface IProps {
    currentDate : any,
    match : any,
    events : any,
    editEvent ? (updatedObj : any ) : any
    history : any
}
interface IState{
    startTime : any,
    endTime : any,
    title : any,
    id : any
}

class updateComponent extends React.Component<IProps,IState> {
    constructor(props:any){
        super(props)

    }
    adjustDatepickerTime = (date : any) => {
        let myDate = new Date(date);
        let month = (myDate.getMonth() + 1) < 10 ? `0${myDate.getMonth() + 1}` : `${myDate.getMonth() + 1}`
        let hours = (myDate.getHours()) < 10 ? `0${myDate.getHours()}` : `${myDate.getHours()}`
        let minuts = (myDate.getMinutes()) < 10 ? `0${myDate.getMinutes()}` : `${myDate.getMinutes()}`
        let seconds = (myDate.getSeconds()) < 10 ? `0${myDate.getSeconds()}` : `${myDate.getSeconds()}`
        return `${myDate.getFullYear()}-${month}-${myDate.getDate()}T${hours}:${minuts}:${seconds}.${myDate.getMilliseconds()}`
    }
    handleSubmit = (e:any) => {
        // console.log(e.target['0'].value);
        let updatedObj = {
            startTime : new Date(e.target['0'].value).toString(),
            endTime : new Date(e.target['1'].value).toString(),
            title : e.target['2'].value,
            id : parseInt(e.target['3'].value),
        }
        console.log(updatedObj);
        this.props.editEvent(updatedObj)
        this.props.history.push("/")
    }
    render(){
        let eventId = this.props.match.params.id
        // console.log('ttttttttttttt',JSON.stringify(this.props))
        // console.log(this.props.events[eventId])
        let data = this.props.events.filter((event : any) => event.id == eventId)
        console.log(data[0]);
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="frmEdit">
                <div className="heading"><h3>Edit</h3></div>
                <div className="row">
                    <div className="label">Start Time</div>
                    <div className="input"><input type="datetime-local" defaultValue={this.adjustDatepickerTime(data[0].startTime)}></input></div>
                </div>
                <div className="row">
                    <div className="label">End Time</div>
                    <div className="input"><input type="datetime-local" defaultValue={this.adjustDatepickerTime(data[0].endTime)}></input></div>
                </div>
                <div className="row">
                    <div className="label">Event Title</div>
                    <div className="input"><input type="text" defaultValue={data[0].title}></input></div>
                </div>
                <div className="row">
                    <div className="label">Event Id</div>
                    <div className="input"><input type="number" min="0" defaultValue={this.props.match.params.id}></input></div>
                </div>
               <div className="button-submit">
                  <button type="submit">Submit</button>
               </div>
            </div>
            </form>
         )
    }
}
let mapStateToProps = (state:any) =>{
    // console.log(state.events.currentDate)
    return {events:state.events.event,currentDate:state.events.currentDate}
 }
 let mapDispatchToProps = (dispatch:any) => {
    // return {currentDate:dispatch}
    return bindActionCreators({editEvent:editEvent}, dispatch)
 }
export default connect(mapStateToProps,mapDispatchToProps)(updateComponent);