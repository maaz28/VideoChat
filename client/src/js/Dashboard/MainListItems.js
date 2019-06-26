// import React from 'react';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import PeopleIcon from '@material-ui/icons/People';
// import BarChartIcon from '@material-ui/icons/BarChart';
// import LayersIcon from '@material-ui/icons/Layers';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import Avatar from '@material-ui/core/Avatar';
// import { getUsers } from '../../config/firebaseFunctions'

// class mainListItems extends Component{
//   constructor(){
//     super();
//     this.state={
//       data:[]
//     }
//   }

//   componentDidMount() {
//     this.getUsersOnLoad()
//   }

//   getUsersOnLoad = () => {
//     try {
//       const res = getUsers()
//       this.setState({ data: res })
//     }
//     catch (e) {
//       console.log(e)
//     }
//   }
//   render(){
//     const {data} = this.state;
//     console.log(data)
//     return(
//       <div>
//         {
//           data.map(item=>{
//             return( 
//                 <ListItem button>
//                   <ListItemIcon>
//                     <Avatar>{item.name.slice(0,1)}</Avatar>
//                   </ListItemIcon>
//                   <ListItemText primary={item.name} />
//                 </ListItem>
//             )
//           })
//         }

//       </div>
//     )
//   }
// }
  

// export default mainListItems;