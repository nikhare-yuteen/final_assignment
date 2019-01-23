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

    getRecordsWithinTimeRange = (records: any, time: any) => {
        return records.filter((rec: any) => {
            return (new Date(rec.startTime).getHours() == time.hour)
        })
    }

    details_of_event = (events: any) => {
        return (
            events.map((event: any, index: any) => {
                return <div>
                    <div className="data">
                        {event.title || ""}
                    </div>
                    <div className="data-button">
                        <Link to={`/editEvent/${event.id}`}><button className="button-content">Edit</button></Link>&nbsp;&nbsp;
                        <button className="button-content" onClick={() => this.props.deleteEvent(event.id)}>Delete</button>
                    </div>
                </div>
            })
        )
    }


    timeLine = [
        {hour : 9, type : "am"},{hour : 10, type : "am"},
        {hour : 11, type : "am"},{hour : 12, type : "pm"},
        {hour : 1, type : "pm"},{hour : 2, type : "pm"},
        {hour : 3, type : "pm"},{hour : 4, type : "pm"},
        {hour : 5, type : "pm"},{hour : 6, type : "pm"},
        {hour : 7, type : "pm"},{hour : 8, type : "pm"}
        ]
    createList = () =>{
        let todaysRecords = this.dateWiseRecords(this.props.events,this.props.currentDate)
        return this.timeLine.map((time : any) => {
            let dataWithRange = this.getRecordsWithinTimeRange(todaysRecords,time)
            return <div className="rowData">
                        <div className="time">{time.hour} {time.type}
                        <div className="data-content">
                            {this.details_of_event(dataWithRange)}
                        </div>
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
                <div>{this.createList()}</div>
        </div>
    )
    }
    }
    let mapStateToProps = (state:any) =>{
        console.log(state)
        return {events:state.events.event,currentDate:state.events.currentDate}
    
    }
    let mapDispatchToProps = (dispatch:any) => {
        // return {currentDate:dispatch}
        return bindActionCreators({editEvent : editEvent , deleteEvent : deleteEvent}, dispatch)
    }
export default connect(mapStateToProps,mapDispatchToProps)(ContentComponent);