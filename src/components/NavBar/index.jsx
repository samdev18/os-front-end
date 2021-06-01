import React from 'react'
import {
    AppBar, Toolbar, IconButton, Typography, Drawer, List, Divider,
    ListItem, ListItemText, useTheme,Badge,MenuItem,Menu
} from '@material-ui/core';

import {
    Menu as MenuIcon, ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,MoreVert as MoreIcon
} from '@material-ui/icons'

import SearchBox from '../SearchBox';
import MessageBox from '../MessageBox'
import { Link, Route } from 'react-router-dom';
import LoadingBox from '../LoadingBox';
import { signout } from '../../actions/userActions';
import { useDispatch } from 'react-redux';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Menus from '../Menus'
import { useStyles } from './styles'

export default function PrimarySearchAppBar(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
    };

    const cartItems = props.cartItems;
    const userInfo = props.userInfo
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = props.productCategoryList;

    const {
        RenderSellerMenu,
        RenderAdminMenu,
        RenderUserMenu,
        RenderSellerMenuMobile,
        RenderAdminMenuMobile,
        RenderUserMenuMobile
    } = Menus

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorAdmin, setAnchorAdmin] = React.useState(null);
    const [anchorUser, setAnchorUser] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMenuAdminOpen = Boolean(anchorAdmin);
    const isMenuUserOpen = Boolean(anchorUser);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAdminMenuOpen = (event) => {
        setAnchorAdmin(event.currentTarget);
    };
    const handleUserMenuOpen = (event) => {
        setAnchorUser(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMenuAdminClose = () => {
        setAnchorAdmin(null)
        handleMobileMenuClose();
    }
    const handleMenuUserClose = () => {
        setAnchorUser(null)
        handleMobileMenuClose();
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const renderSellerMenu = (<RenderSellerMenuMobile
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        menuId={menuId}
        isMenuOpen={isMenuOpen} />
    )
    const renderAdminMenu = <RenderAdminMenuMobile anchorEl={anchorAdmin}
        handleMenuClose={handleMenuAdminClose}
        menuId='z'
        isMenuOpen={isMenuAdminOpen} />

    const renderUserMenu = <RenderUserMenuMobile anchorEl={anchorUser}
        handleMenuClose={handleMenuUserClose}
        menuId='za'
        isMenuOpen={isMenuUserOpen} />


    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>
                <Link to="/cart">
                    <><IconButton edge="start" color="inherit" aria-label="menu">
                        {cartItems.length > 0 ? (
                            <Badge badgeContent={cartItems.length} color="secondary">
                                <ShoppingCartIcon className={classes.cartButton} />
                            </Badge>
                        ) : <ShoppingCartIcon className={classes.cartButton} />}
                    </IconButton>Carrinho</>

                </Link>
            </MenuItem>
            <MenuItem onClick={handleUserMenuOpen}>
                {userInfo ? (<><RenderUserMenu classes={classes} signoutHandler={signoutHandler} />Usuario</>) : (
                    <Link to="/signin">Sign In</Link>
                )}
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                {userInfo && userInfo.isSeller && (<><RenderSellerMenu classes={classes} />Vendedor</>)}
            </MenuItem>
            <MenuItem onClick={handleAdminMenuOpen}>
                {userInfo && userInfo.isAdmin && (<><RenderAdminMenu classes={classes}
                    signoutHandler={signoutHandler} />Admin</>)}
            </MenuItem>

        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={handleDrawerOpen} edge="start" className={classes.menuButton, open && classes.hide} color="inherit" aria-label="menu">
                        <MenuIcon className={classes.menuButtonIcon} />
                    </IconButton>

                    <Typography variant="h7" className={classes.title}>
                        <Link to="/">Omni Shopy</Link>
                    </Typography>

                    <div className={classes.search}>
                        <Route render=
                            {
                                ({ history }) => (<SearchBox history={history} />)
                            } />
                    </div>

                    <div className={classes.sectionDesktop}>
                        <div className="dropdown">
                            <Link to="/cart">
                                <IconButton edge="start" color="inherit" aria-label="menu">
                                    {cartItems.length > 0 ? (
                                        <Badge badgeContent={cartItems.length} color="secondary">
                                            <ShoppingCartIcon className={classes.cartButton} />
                                        </Badge>
                                    ) : <ShoppingCartIcon className={classes.cartButton} />}
                                </IconButton>

                            </Link></div>
                        {userInfo ? (<RenderUserMenu classes={classes} signoutHandler={signoutHandler} />) : (
                            <Link to="/signin">Sign In</Link>
                        )}
                        {userInfo && userInfo.isSeller && (<RenderSellerMenu classes={classes} />)}
                        {userInfo && userInfo.isAdmin && (<RenderAdminMenu classes={classes} signoutHandler={signoutHandler} />)}
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open}
                classes={{ paper: classes.drawerPaper }}>

                <div className={classes.drawerHeader}>
                    Omni Shopy
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>

                <Divider />

                <List>
                    {loadingCategories ? (
                        <LoadingBox></LoadingBox>
                    ) : errorCategories ? (
                        <MessageBox variant="danger">{errorCategories}</MessageBox>
                    ) : (
                        categories.map((text) => (
                            <Link to={`/search/category/${text}`} className={classes.categoriaDrawer}
                                onClick={() => setOpen(false)}>
                                <ListItem button key={text}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            </Link>
                        )))}
                </List>
            </Drawer>
            {renderMobileMenu}
            {renderSellerMenu}
            {renderUserMenu}
            {renderAdminMenu}
        </div>
    );
}
