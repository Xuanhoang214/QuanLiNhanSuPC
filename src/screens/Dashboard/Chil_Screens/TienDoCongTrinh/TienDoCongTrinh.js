import React, { useEffect, useState } from 'react'
import {
    HashRouter as Router,
    Switch,
    Route,
    useParams,
    Link,
    useRouteMatch,
} from 'react-router-dom'

import ChiTietTienDoCongTrinh from './Child_Screen/ChiTietTienDoCongTrinh'

import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

//import component React Bootstrap
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

//import icon react material ui
import SearchIcon from '@material-ui/icons/Search'

//Import react material-ui
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    formSearch: {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        height: '100%',
        padding: '0 20px',
    },
    searchContainer: {
        border: '1px solid black',
        height: '50px',
        width: '100%',
        borderRadius: '50px',
    },
    searchIcon: {
        fontSize: '30px',
        height: '100%',
        cursor: 'pointer',
        color: 'gray',
    },
    inputSearch: {
        border: 'none',
        outline: 'none',
        height: '100%',
        width: '100%',
        fontSize: '15px',
        fontWeight: '600',
    },
    iconLoad: {
        position: 'absolute',
        minHeight: '500px',
        right: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notNetWok: {
        position: 'absolute',
        minHeight: '500px',
        right: '0',
        left: '0',
        fontSize: '30px',
        fontWeight: '600',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

function TienDoCongTrinh(props) {
    const classes = useStyles()
    const TOKEN = sessionStorage.getItem('token')
    const data_info_person = JSON.parse(sessionStorage.getItem('info'))
    const URL_API = 'https://qlnsclouds.herokuapp.com/congtrinh2/'
    const GET_CONGTRINH = 'ToanBoCongTrinh'

    const [UITableTienDo, setUITableTienDo] = useState()
    const [dataDSTD, setDataDSTD] = useState()
    const [isNetWork, setIsNetWork] = useState(true)
    const [loading, setloading] = useState(false)
    const [loadDSTD, setLoadDSTD] = useState()

    function checkNetWork() {
        window.addEventListener('online', () => {
            setIsNetWork(window.navigator.onLine)
            console.log('online')
            return
        })

        window.addEventListener('offline', () => {
            setIsNetWork(window.navigator.onLine)
            console.log('offline')
            return
        })
    }

    function getDanhSachCongTrinh() {
        setloading(true)
        if (window.fetch) {
            fetch(URL_API + GET_CONGTRINH + '?token=' + TOKEN)
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    setloading(false)
                    RenderUITableTienDoCT(result.data)
                    setDataDSTD(result.data)
                    setLoadDSTD(false)
                })
                .catch((error) => {
                    setloading(false)
                    console.error('Fetch to false', error)
                })
        } else {
            console.log('Fetch not found')
        }
    }

    useEffect(() => {
        getDanhSachCongTrinh()
        checkNetWork()
    }, [loadDSTD])

    function RenderUITableTienDoCT(data) {
        setUITableTienDo(
            data.map((e) => {
                return ItemCT(e)
            })
        )
    }

    var stt = 0
    function ItemCT(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.TenCT}</TableCell>
                <TableCell>{props.DiaDiem}</TableCell>
                <TableCell>{props.NgayCP}</TableCell>
                <TableCell>{props.NgayKC}</TableCell>
                <TableCell>{props.NgayHT}</TableCell>
                <TableCell>
                    <div
                        style={{
                            width: '55px',
                        }}
                    >
                        <CircularProgressbar
                            value={props.TienDo}
                            text={`${props.TienDo}/100`}
                        />
                    </div>
                </TableCell>
                {data_info_person.TypeNV == 2 ? (
                    <TableCell>
                        <Link to="/Dashboard/TienDoCongTrinh/ChiTietTienDoCongTrinh">
                            <Button
                                variant="danger"
                                style={{
                                    width: '110px',
                                    fontSize: '14px',
                                }}
                            >
                                Xem Chi Tiết
                            </Button>
                        </Link>
                        <Button
                            variant="info"
                            style={{
                                width: '110px',
                                fontSize: '14px',
                                marginLeft: '3px',
                            }}
                        >
                            In
                        </Button>
                    </TableCell>
                ) : (
                    <div></div>
                )}
            </TableRow>
        )
    }

    useEffect(() => {}, [])

    return (
        <Container fluid>
            <div
                style={{
                    display: 'flex',
                    margin: '20px 0',
                }}
            >
                <h1
                    style={{
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    Tiến Độ Công Trình
                </h1>
            </div>
            <Paper style={{ width: '100%' }}>
                {loading ? (
                    <div className={classes.iconLoad}>
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <div></div>
                )}
                {isNetWork ? (
                    <div>
                        <div className={classes.searchContainer}>
                            <form className={classes.formSearch}>
                                <input
                                    type="text"
                                    placeholder="Tìm Kiếm Công Trình"
                                    className={classes.inputSearch}
                                    onChange={(event) => {
                                        const textSearch = event.target.value.toLowerCase()
                                        const regex = new RegExp(textSearch)
                                        setUITableTienDo(
                                            dataDSTD.map((e) => {
                                                if (
                                                    regex.test(
                                                        e.TenCT.toLowerCase()
                                                    ) ||
                                                    regex.test(
                                                        e.DiaDiem.toLowerCase()
                                                    )
                                                ) {
                                                    return ItemCT(e)
                                                }
                                            })
                                        )
                                    }}
                                />
                                <SearchIcon className={classes.searchIcon} />
                            </form>
                        </div>
                        <TableContainer
                            style={{
                                maxHeight: '72vh',
                                width: '100%',
                            }}
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Tên Công Trình</TableCell>
                                        <TableCell>Địa Điểm</TableCell>
                                        <TableCell>Ngày Cấp Phép</TableCell>
                                        <TableCell>Ngày Khởi Công</TableCell>
                                        <TableCell>Ngày Hoàn Thành</TableCell>
                                        <TableCell>Tiến độ</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>{UITableTienDo}</TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ) : (
                    <div className={classes.notNetWok}>
                        Không có mạng, vui lòng thử lại
                    </div>
                )}
            </Paper>
        </Container>
    )
}

export default TienDoCongTrinh
