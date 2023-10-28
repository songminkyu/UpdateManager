import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography  from '@material-ui/core/Typography';

class UpdateUserDelete extends React.Component{

    constructor(props){
        super(props);
        this.state={
            open: false
        }
    }
    deleteUpdateUser(id){
        const url = '/api/updateinfo/' + id;

        fetch(url,{
            method : 'DELETE'
        });
        this.props.stateRefresh();
    }
    handleClickOpen = () => {
        this.setState({
          open: true
       });
    }
    
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
    }
    render() {
        return (
            <div>
            <Button variant="contained" color="secondary" onClick={this.handleClickOpen} >삭제</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle onClose={this.handleClose}>삭제 경고</DialogTitle>
                <DialogContent>
                <Typography gutterBottom>선택한 사용자 정보가 삭제됩니다.</Typography>
                </DialogContent>
                <DialogActions>
                <Button variant="contained" color="primary" onClick={e => {this.deleteUpdateUser(this.props.id);}}>삭제</Button>
                <Button variant="outlined" color="primary" onClick={this.handleClose}> 닫기 </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}    


export default UpdateUserDelete;