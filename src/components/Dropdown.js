import { useState } from 'react';   
import Graph from "./Graph"; 
/*import React from "react";
import { useTheme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withRouter } from "react-router-dom";*/

function Dropdown( {selected, setSelected}) {
    const [isActive, setIsActive] = useState(false);
    const options = [   'Authorization', 'Users', 'Cart', 'Suggestions', 'Billing']

    return (
        <div className='dropdown'>
            <div className='dropdown-btn' onClick={(e) => setIsActive(!isActive)} >
                {selected} <i class="fa">&#xf0d7;</i>
            </div>

            {isActive && (
                <div className='dropdown-content'>
                    {options.map((option) => (
                        <div
                            onClick={(e)  => {
                                setSelected(option);
                                setIsActive(false);
                            }}
                            className='dropdown-item'>{option}
                        </div>
                    ))}
                </div> 
            )}
        </div>
    );
}

export default Dropdown;

/*const Header = props => {
    const { history } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
  
    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClick = pageURL => {
      history.push(pageURL);
      setAnchorEl(null);
    };

    const menuItems = [
        {
          menuTitle: "Authorization",
          pageURL: "/"
        },
        {
          menuTitle: "User",
          pageURL: "/"
        },
        {
          menuTitle: "Cart",
          pageURL: "/graph"
        }
      ];

      return (
        <div className={classes.root}>
            <Dropdown
                edge="star t"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </Dropdown>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuItems.map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            )
        </div>
    );
};

export default withRouter(Header);*/