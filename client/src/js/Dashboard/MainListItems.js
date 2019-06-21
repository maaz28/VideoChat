import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';

const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Avatar>K</Avatar>
      </ListItemIcon>
      <ListItemText primary="Kane Williamson" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Avatar>J</Avatar>
      </ListItemIcon>
      <ListItemText primary="John Doe" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Avatar>R</Avatar>
      </ListItemIcon>
      <ListItemText primary="Rabada" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Avatar>S</Avatar>
      </ListItemIcon>
      <ListItemText primary="Sultan" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Avatar>M</Avatar>
      </ListItemIcon>
      <ListItemText primary="Mitchell Starc" />
    </ListItem>
  </div>
);

export default mainListItems;