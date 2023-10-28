import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import UpdateUserDelete from './UpdateUserDelete';

class UpdateUser extends React.Component{
    render(){
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.employeenumber}</TableCell>              
                <TableCell>{this.props.department}</TableCell>
                <TableCell>{this.props.ip}</TableCell>
                <TableCell>{this.props.mac}</TableCell>
                <TableCell>{this.props.wpmersion}</TableCell>
                <TableCell><UpdateUserDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        )
    }
}
export default UpdateUser;