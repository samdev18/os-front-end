import React from 'react'

import { IconButton, List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AccountCircle, AttachMoney, Settings } from '@material-ui/icons'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const RenderSellerMenuMobile = (props) => {
    const menuSellers = [
        { name: 'Products', endpoint: '/productlist/seller' },
        { name: 'Orders', endpoint: '/orderlist/seller' },
    ]
    return (
        <Menu
            anchorEl={props.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={props.menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={props.isMenuOpen}
            onClose={props.handleMenuClose}
        >
            {menuSellers.map(menu => <MenuItem><Link to={menu.endpoint}>{menu.name}</Link></MenuItem>)}
        </Menu>
    )
}

const RenderAdminMenuMobile = (props) => {
    const menus = [
        { name: 'Dashboard', endpoint: '/dashboard' },
        { name: 'Products', endpoint: '/productlist' },
        { name: 'Orders', endpoint: '/orderlist' },
        { name: 'Users', endpoint: '/userlist' },
        { name: 'Support', endpoint: '/support' },
        { name: 'Sign Out', endpoint: '#signout', click: props.signoutHandler }
    ]
    return (
        <Menu
            anchorEl={props.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={props.menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={props.isMenuOpen}
            onClose={props.handleMenuClose}
        >
            {menus.map(menu => <MenuItem><Link to={menu.endpoint}>{menu.name}</Link></MenuItem>)}
        </Menu>
    )
}

const RenderUserMenuMobile = (props) => {
    const menus = [
        { name: 'User Profile', endpoint: '/profile' },
        { name: 'Order History', endpoint: '/orderhistory' },
        { name: 'Sign Out', endpoint: '#signout', click: props.signoutHandler }
    ]
    return (
        <Menu
            anchorEl={props.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={props.menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={props.isMenuOpen}
            onClose={props.handleMenuClose}
        >
            {menus.map(menu => <MenuItem><Link to={menu.endpoint}>{menu.name}</Link></MenuItem>)}
        </Menu>
    )
}


const RenderSellerMenu = (props) => {
    const menuSellers = [
        { name: 'Products', endpoint: '/productlist/seller' },
        { name: 'Orders', endpoint: '/orderlist/seller' },
    ]

    return (
        <div className="dropdown">
            <Link to="#admin">
                <IconButton edge="start" color="inherit" >
                    <AttachMoney className={props.classes.cartButton} />
                </IconButton>
            </Link>
            <div className="dropdown-content">
                <List>
                    {menuSellers.map(menu => <ListItem button>
                        <Link onClick={eval(menu.click) ?? ''} to={menu.endpoint}>{menu.name}</Link>
                    </ListItem>)}
                </List>
            </div>
        </div>)
}

const RenderAdminMenu = (props) => {
    const menusAdmin = [
        { name: 'Dashboard', endpoint: '/dashboard' },
        { name: 'Products', endpoint: '/productlist' },
        { name: 'Orders', endpoint: '/orderlist' },
        { name: 'Users', endpoint: '/userlist' },
        { name: 'Support', endpoint: '/support' },
        { name: 'Sign Out', endpoint: '#signout', click: props.signoutHandler }
    ]

    return (<div className="dropdown">
        <Link to="#admin">
            <IconButton edge="start" color="inherit" >
                <Settings className={props.classes.cartButton} />
            </IconButton>
        </Link>
        <div className="dropdown-content">
            <List>
                {menusAdmin.map(menu =>
                    <ListItem button>
                        <Link onClick={eval(menu.click) ?? ''} to={menu.endpoint}>{menu.name}</Link>
                    </ListItem>
                )}
            </List>
        </div>
    </div>)
}
const RenderUserMenu = (props) => {
    const userMenu = [
        { name: 'User Profile', endpoint: '/profile' },
        { name: 'Order History', endpoint: '/orderhistory' },
        { name: 'Sign Out', endpoint: '#signout', click: props.signoutHandler }
    ]

    return (<div className="dropdown">
        <Link to="#">
            <IconButton edge="start" color="inherit" >
                <AccountCircle className={props.classes.cartButton} />

            </IconButton>
        </Link>
        <div className="dropdown-content">
            {userMenu.map(menu => <ListItem button>
                <Link onClick={eval(menu.click) ?? ''} to={menu.endpoint}>{menu.name}</Link>
            </ListItem>)}
        </div>
    </div>)
}
export default { RenderAdminMenu, RenderUserMenu, RenderSellerMenu, RenderSellerMenuMobile, RenderAdminMenuMobile, RenderUserMenuMobile }






