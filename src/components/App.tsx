import * as React from 'react';
import Header from './HeaderComponent';
import Content from './ContentComponent';
import Hello from './AddComponent';
import { BrowserRouter as Router, Route,Switch, Redirect, withRouter} from 'react-router-dom';
interface IProps {
//    compiler: string,
//    framework: string,
//    bundler: string
}
export class App extends React.Component<IProps, {}> {
   render() {
   return (
       <div className="main">
           <Header></Header>
           <Content></Content>
       </div>
   )
   }
}