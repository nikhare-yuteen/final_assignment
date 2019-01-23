import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route,Link, withRouter } from 'react-router-dom';
import store from '../store';
import { nextDay, prevDay, today} from '../actions';
import Moment from 'react-moment';
import Hello from './AddComponent';
import { bindActionCreators } from "redux"
interface IProps {
    //    compiler: string,
    //    framework: string,
    //    bundler: string
    events : [],
    currentDate : any,
    nextDay ? (event : any) : any,
    prevDay ? (event : any) : any,
    today ? (event : any) :any
    }

interface IState{
    currentDate: any
}
class HeaderComponent extends React.Component<IProps, IState> {
    constructor(props:any){
        super(props)
        this.state = {
            currentDate : this.props.currentDate
        }
    }
    
    render() {
        let eventsData:any =[]
        console.log(this.props.currentDate)
        for (let i = 0 ; i < this.props.events.length ; i++ ){
            eventsData.push(this.props.events[i]);
        }

        // let unsubscribe = store.subscribe(() =>
        //     console.log(store.getState())
        // );
        // store.dispatch(addEvent('Sat May 23 2017 20:00:00 GMT+0530 (IST)','Sat May 23 2017 21:30:00 GMT+0530 (IST)','Event 3',3))
        // unsubscribe();
    return (
            <div className="header">
                
                <button className="button" type="button" onClick={this.props.today}>Today</button>&nbsp;&nbsp;
                <button className="button-sm" type="button" onClick={this.props.prevDay} data-val ={this.props.currentDate}>&nbsp; &lt; &nbsp;</button> &nbsp;&nbsp;
                <button className="button-sm" type="button" onClick={this.props.nextDay} data-val ={this.props.currentDate}>&nbsp; &gt; &nbsp;</button>&nbsp;
                <label><Moment format="DD MMM YYYY">{this.props.currentDate}</Moment></label>&nbsp;
                <Link to="/addEvent">
                    <button className="button" type="button">Add Event</button>
                </Link>
                
            </div>
    )
    }
    }
    let mapStateToProps = (state:any) =>{
        return {events:state.events.event,currentDate:state.events.currentDate}
    }

    let mapDispatchToProps = (dispatch:any) => {
        // return {currentDate:dispatch}
        return bindActionCreators({nextDay : nextDay, prevDay : prevDay, today : today }, dispatch)
    }
export default connect(mapStateToProps,mapDispatchToProps)(HeaderComponent);