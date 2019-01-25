import * as React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import moment from 'react-moment';
import '../css/style.css';
import { BrowserRouter as Router, Route,Link, withRouter } from 'react-router-dom';
import { any } from 'prop-types';
import {editEvent,deleteEvent} from '../actions';
import { bindActionCreators } from "redux"
interface IProps {
    //    compiler: string,
    //    framework: string,
    //    bundler: string
    events:[],
    currentDate:'',
    deleteEvent ? (event : any) : any

}
interface IState{
    currentDate: any
}
class ContentComponent extends React.Component<IProps,IState, {}> {
    constructor(props:any){
        super(props)
        this.state = {
            currentDate : this.props.currentDate
        }
    }

    timeRange = (records: any, time: any) => {
        return records.filter((rec: any) => {
            return (new Date(rec.startTime).getHours() == time.hour )
        })
    }

    event_details = (events: any) => {
        return (
            events.map((event: any, index: any) => {
                return <div className="content">
                    <div className="data">
                        {event.title || ""}  {/*From {new Date(event.startTime).getHours()}:{new Date(event.startTime).getMinutes()}0 To {new Date(event.endTime).getHours()}:{new Date(event.endTime).getMinutes()}0 */}
                    </div> 
                    <div></div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="data-button">
                        <Link to={`/editEvent/${event.id}`}><button className="button-content">Edit</button></Link>&nbsp;&nbsp;
                        <button className="button-content" onClick={() => this.props.deleteEvent(event.id)}>Delete</button>&nbsp;&nbsp;
                    </div><br/>
                </div>
            })
        )
    }


    timeLine = [
        {hour : 1, type : "am"},{hour : 2, type : "am"},
        {hour : 3, type : "am"},{hour : 4, type : "am"},
        {hour : 5, type : "am"},{hour : 6, type : "am"},
        {hour : 7, type : "am"},{hour : 8, type : "am"},
        {hour : 9, type : "am"},{hour : 10, type : "am"},
        {hour : 11, type : "am"},{hour : 12, type : "pm"},
        {hour : 13, type : "pm"},{hour : 14, type : "pm"},
        {hour : 15, type : "pm"},{hour : 16, type : "pm"},
        {hour : 17, type : "pm"},{hour : 18, type : "pm"},
        {hour : 19, type : "pm"},{hour : 20, type : "pm"},
        {hour : 21, type : "pm"},{hour : 22, type : "pm"},
        {hour : 23, type : "pm"},{hour : 24, type : "pm"},
        ]
    eventList = () =>{
        let todaysEvent = this.dateWiseRecords(this.props.events,this.props.currentDate)
        return this.timeLine.map((time : any) => {
            let dataRange = this.timeRange(todaysEvent,time)
            return <div className="rowData">
                        <div className="time">{time.hour} {time.type}</div>
                        <div className="data-content">
                            {this.event_details(dataRange)}
                        </div>
                    </div>
        })
        
    }
    dateWiseRecords = (events :any,date:any) => {
            return events.filter((events : any) => {
            let startDate = new Date(events.startTime).toLocaleDateString();
            let endDate = new Date(events.endTime).toLocaleDateString();
            return (startDate === date.toLocaleDateString() && endDate == date.toLocaleDateString())
            })
        }
    render() {
    return (
        <div className="content">
                <div>{this.eventList()}</div>
        </div>
    )
    }
    }
    let mapStateToProps = (state:any) =>{
        return {events:state.events.event,currentDate:state.events.currentDate}
    
    }
    let mapDispatchToProps = (dispatch:any) => {
        // return {currentDate:dispatch}
        return bindActionCreators({editEvent : editEvent , deleteEvent : deleteEvent}, dispatch)
    }
export default connect(mapStateToProps,mapDispatchToProps)(ContentComponent);