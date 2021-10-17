import React from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'

//import icon react material ui
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'

import HomeWorkIcon from '@material-ui/icons/HomeWork'

//import component react material ui
import Paper from '@material-ui/core/Paper'

import { makeStyles } from '@material-ui/core/styles'

//import component react bootstrap
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'

function HeaderDashboard(props) {
    const styles = props.styleDarkMode

    const data_info_person = JSON.parse(sessionStorage.getItem('info'))

    const useStyles = makeStyles((theme) => ({
        styleHeaderContent: {
            minHeight: '60px',
            padding: '0 10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
        formSearch: {
            display: 'flex',
            justifyContent: 'center',
            alignItem: 'center',
            height: '100%',
            padding: '0 20px',
        },
        searchContainer: {
            height: '40px',
            width: '380px',
            borderRadius: '50px',
            marginLeft: '20px',
        },
        searchIcon: {
            fontSize: '26px',
            height: '100%',
            cursor: 'pointer',
            color: 'gray',
        },
        inputSearch: {
            border: 'none',
            outline: 'none',
            height: '100%',
            width: '100%',
            fontSize: '13px',
            fontWeight: '600',
        },
        Dropdown: {
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
        },
        userAccount: {
            display: 'flex',
            justifySelf: 'flex-end',
        },
        PersonIcon: {
            width: '30px',
            height: '30px',
        },
        DropdownToggle: {
            color: '#667580',
            fontSize: '15px',
            fontWeight: '600',
        },
        MenuIcon: {
            display: 'none',
            cursor: 'pointer',
        },
        PaperHeader: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            borderRadius: '0',
        },
        HomeWorkIcon: {
            fontSize: '40px',
        },
    }))

    const classes = useStyles()

    return (
        <Router>
            <Paper elevation={3} className={classes.PaperHeader}>
                <Container className={classes.styleHeaderContent} fluid="md">
                    <div
                        style={{
                            display: 'flex',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Link to="/Dashboard">
                            <HomeWorkIcon className={classes.HomeWorkIcon} />
                        </Link>

                        <Paper
                            variant="outlined"
                            className={classes.searchContainer}
                        >
                            <form className={classes.formSearch}>
                                <input
                                    type="text"
                                    placeholder="Tìm Kiếm..."
                                    className={classes.inputSearch}
                                />
                                <SearchIcon className={classes.searchIcon} />
                            </form>
                        </Paper>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div className={classes.userAccount}>
                            <img
                                src={data_info_person.Avatar}
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    backgroundColor: 'red',
                                    marginRight: '5px',
                                    objectFit: 'cover',
                                    backgroundColor: 'white',
                                }}
                            />
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="none"
                                    id="dropdown-basic"
                                    className={classes.DropdownToggle}
                                >
                                    {data_info_person.HoTen}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/Dashboard/ChiTietNhanVien">
                                        Thông Tin Cá Nhân
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/Changepassword">
                                        Đổi Mật Khẩu
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        href="#/"
                                        onClick={() => {
                                            console.log('đăng xuất')
                                            sessionStorage.removeItem('info')
                                            sessionStorage.removeItem('token')
                                        }}
                                    >
                                        Đăng Xuất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <MenuIcon className={classes.MenuIcon} />
                    </div>
                </Container>
            </Paper>
        </Router>
    )
}

export default HeaderDashboard
