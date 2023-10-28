import React from "react";
import { post } from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  hidden: {
    display: "none"
  }
});

class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        file : null,
        userName : '',
        gender : '',
        employeenumber : '',
        department : '',
        ip : '',
        mac : '',
        wpmversion : '',
        fileName :'',
        open: false
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    this.addCustomer().then(response => {
      this.props.stateRefresh();
    });
    this.setState({
        file : null,
        userName : '',
        gender : '',
        employeenumber : '',
        department : '',
        ip : '',
        mac : '',
        wpmversion : '',
        fileName :'',
        open: false
    });
  };

  handleFileChange = e => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value
    });
  };

  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  addCustomer = () => {
    const url = "/api/updateinfo";
    const formData = new FormData();
    formData.append('image',this.state.file);
    formData.append('name',this.state.userName);
    formData.append('gender',this.state.gender);
    formData.append('employeenumber',this.state.employeenumber);
    formData.append('department',this.state.department);
    formData.append('ip',this.state.ip);
    formData.append('mac',this.state.mac);
    formData.append('wpmversion',this.state.wpmversion);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
        file : null,
        userName : '',
        gender : '',
        employeenumber : '',
        department : '',
        ip : '',
        mac : '',
        wpmversion : '',
        fileName :'',
        open: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>사용자 추가하기</Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>사용자 추가</DialogTitle>
          <DialogContent>
            <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
            <label htmlFor="raised-button-file">
              <Button variant="contained" color="primary" component="span" name="file" >
                {this.state.fileName === ""
                  ? "프로필 이미지 선택"
                  : this.state.fileName}
              </Button>
            </label>
            <br />
            <TextField label="이름" type = "text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
            <TextField label="성별" type = "text" name="gender" val={this.state.gender} onChange={this.handleValueChange}/><br/>
            <TextField label="사원번호" type = "text" name="employeenumber" value={this.state.employeenumber} onChange={this.handleValueChange}/><br/>
            <TextField label="부서" type = "text" name="department" value={this.state.department} onChange={this.handleValueChange}/><br/>                    
            <TextField label="ip" type = "text" name="ip" value={this.state.ip} onChange={this.handleValueChange}/><br/>
            <TextField label="mac" type = "text" name="mac" value={this.state.mac} onChange={this.handleValueChange}/><br/>
            <TextField label="프로그램버전" type = "text" name="wpmversion" value={this.state.wpmversion} onChange={this.handleValueChange}/><br/>              
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CustomerAdd);