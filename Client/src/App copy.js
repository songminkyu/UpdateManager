
import React, { Component } from 'react'
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles'
import CircularProgress   from '@material-ui/core/CircularProgress';
const { default: UpdateUser } = require("./components/UpdateUser");
const { default: UpdateUserAdd } = require("./components/UpdateUserAdd");

const styles = theme => ({
  root : {
    width : '100%',
    marginTop : theme.spacing.unit * 5,
    overflowX : "auto"
  },
  table : {
    minWidth : 1080
  },
  progress : {
    margin : theme.spacing.unit * 2
  }
})



/*
Component 라이프 싸이클
   
  1) constructor()
  
  2) componentWillMout()
  
  3) render()
  
  4) componetDidMount()

 */

/*
  props or state => shouldComponentUpdate()

*/
class App extends Component{

  state = {
    customers : "",
    completed : 0

  }

  componentDidMount(){
    this.timer = setInterval(this.progress,20);
    this.callApi()
    .then(res =>this.setState({customers : res}))
    .catch(err => console.log("123123444" + err));
  }

  callApi = async () => {
    const response = await fetch('/api/updateinfo');
    const body = await response.json();
    return body;
  }
  progress = () => {
    const {completed} = this.state;
    this.setState({completed : completed >=100 ? 0 : completed + 1});
  }  
  stateRefresh = () =>{
    this.setState({
      customers : '',
      completed : 0
    });
    this.callApi()
      .then(res=> this.setState({customers:res}))
      .catch(err=> console.log("123123555" +err));
  }
  render(){
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
            <Table className={classes.table} align="center">
              <TableHead> 
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>이미지</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>성별</TableCell>
                  <TableCell>사원번호</TableCell>
                  <TableCell>부서</TableCell>
                  <TableCell>IP</TableCell>
                  <TableCell>MAC</TableCell>
                  <TableCell>프로그램 버전</TableCell>
                  <TableCell>설정</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { this.state.customers ? this.state.customers.map(cs => { return ( 
                <UpdateUser 
                  stateRefresh={this.stateRefresh}
                  key={cs.id} 
                  id={cs.id} 
                  image={cs.image} 
                  name={cs.name} 
                  gender={cs.gender} 
                  employeenumber={cs.employeenumber} 
                  department={cs.department} 
                  ip={cs.ip} 
                  mac={cs.mac} 
                  wpmersion={cs.wpmversion}
                  />);
              }): 
                <TableRow>
                  <TableCell colSpan="9" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
                }
              </TableBody>          
            </Table>        
        </Paper>
        <UpdateUserAdd stateRefresh={this.stateRefresh} />
      </div>

    );
  }
}
export default withStyles(styles)(App);