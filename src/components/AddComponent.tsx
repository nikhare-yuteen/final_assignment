import * as React from 'react';
import { any } from 'prop-types';
import store from '../store';
import { addEvent} from '../actions';
import { connect } from 'react-redux';
import moment from 'react-moment';
import { bindActionCreators } from "redux"

interface IProps {
   currentDate : any,
   addEvent ? (startTime : any , endTime : any , title : any , id : any) : any
   history : any
}
interface IState {
   startTime : any,
   endTime : any,
   title : any,
   id : any
}
class AddComponent extends React.Component<IProps,IState> {
   constructor(props:any){
      super(props)
      this.state = {
         startTime : any,
         endTime : any,
         title : any,
         id : any
      }
   }

   handleStartTime = (e:any) => {
      this.setState({startTime : new Date(e.target.value).toString()})
   }

   handleEndTime = (e:any) => {
      this.setState({endTime : new Date(e.target.value).toString()})
   }

   handleTitle = (e:any) => {
      this.setState({title : e.target.value})
   }

   handleId = (e:any) => {
      this.setState({id : e.target.value})
   }
   
   
   render() {
      const handlesubmit = () => {
         if(this.state.startTime == '' || this.state.endTime == '' || this.state.title == '' || this.state.id == '')
         {
            return false;
         }
         else{
            this.props.addEvent(this.state.startTime,this.state.endTime,this.state.title,this.state.id);
            this.props.history.push("/")
         }
      }
   return (
      <div className="frmEdit">
         <div className="heading"><h3>Add Event</h3></div>
         <div className="row">
            <div className="label">Start Time</div>
            <div className="input"><input type="datetime-local" onChange={(evt) => this.handleStartTime(evt)}></input></div>
         </div>
         <div className="row">
            <div className="label">End Time</div>
            <div className="input"><input type="datetime-local" onChange={(evt) => this.handleEndTime(evt)}></input></div>
         </div>
         <div className="row">
            <div className="label">Event Title</div>
            <div  className="input"><input type="text" onChange={(evt) => this.handleTitle(evt)}></input></div>
         </div>
         <div className="row">
            <div className="label">Event Id</div>
            <div className="input"><input type="number" min="0" onChange={(evt) => this.handleId(evt)}></input></div>
         </div>
         <div className="button-submit">
            <button type="submit" onClick={handlesubmit}>Submit</button>
         </div>
      </div>
   )
   }
}
let mapStateToProps = (state:any) =>{
   // console.log(state.events.currentDate)
   return {currentDate:state.events.currentDate}
}
let mapDispatchToProps = (dispatch:any) => {
   // return {currentDate:dispatch}
   return bindActionCreators({addEvent : addEvent}, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(AddComponent);