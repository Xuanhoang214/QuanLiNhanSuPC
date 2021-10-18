import React, { useEffect, useState } from 'react'

import InputText from '../../../resource/InputText/InputText'

//import func valid
import {
    validatedPhone,
    validatedPassword,
    validatedText,
} from '../../../validated/validated'

//import component React Bootstrap
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

//import icon react material ui
import SearchIcon from '@material-ui/icons/Search'

//Import react material-ui
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import { Paper } from '@material-ui/core'

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
        backgroundColor: 'white',
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
        fontSize: '18px',
        fontWeight: '600',
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
    iconLoad: {
        position: 'absolute',
        minHeight: '500px',
        right: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10',
    },
    itemDialog: {
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
}))

function PhanCongNhanVien(props) {
    const URL_API = 'https://qlnsclouds.herokuapp.com/ngaycong2/'
    const GET_DSNC = 'ToanBoNgayCong'
    const UPDATE_NC = 'CapNhatNgayCong'
    const ADD_NGAYCONG = 'ThemNgayCongCuaNhanVien'
    const DEL_NGAYCONG = 'XoaNgayCongNhanVien'
    const TOKEN = sessionStorage.getItem('token')

    const [thongTinCT, setThongTinCT] = useState()
    const [valueRating, setValueRating] = useState()

    const [UITableNgayCong, setUITableNgayCong] = useState()
    const [loadDSNC, setLoadDSNC] = useState(false)
    const [loading, setLoading] = useState(false)

    const [showMess, setShowMess] = useState(false)
    const [textMess, setTextMess] = useState('')
    const [severityMess, setSeverityMess] = useState('')

    const [isNetWork, setIsNetWork] = useState(true)

    const [modalShowDialogAddNC, setModalShowDialogAddNC] = useState(false)
    const [modalShowDialogDelNC, setModalShowDialogDelNC] = useState(false)
    const [modalShowDialogUpdateNC, setModalShowDialogUpdateNC] = useState(
        false
    )

    const classes = useStyles()

    function getDanhSachNgayCong() {
        setLoading(true)
        if (window.fetch) {
            fetch(URL_API + GET_DSNC + '?token=' + TOKEN)
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    RenderUITableNgayCong(result.data)
                    setLoading(false)
                    setLoadDSNC(false)
                })
                .catch((error) => console.log('Lỗi', error))
        } else {
            console.log('fetch not found')
        }
    }

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

    useEffect(() => {
        checkNetWork()
        getDanhSachNgayCong()
    }, [loadDSNC])

    function RenderUITableNgayCong(data) {
        setUITableNgayCong(
            data.map((e) => {
                return ItemCongTrinh(e)
            })
        )
    }

    var stt = 0
    function ItemCongTrinh(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.MaNV}</TableCell>
                <TableCell>{props.MaNC}</TableCell>
                <TableCell>{props.SoNgayCong}</TableCell>
                <TableCell>{props.DateWorking}</TableCell>
                <TableCell>
                    <Rating
                        // name="simple-controlled"
                        value={props.DanhGia}
                        readOnly
                        // onChange={(event, newValue) => {
                        //     setValueRating(event.target.value)
                        //     console.log(valueRating)
                        // }}
                    />
                </TableCell>
                <TableCell
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        variant="outline-danger"
                        style={{
                            width: '170px',
                            fontSize: '16px',
                        }}
                        onClick={() => {
                            console.log('sua ngay cong')
                            setThongTinCT(props)
                            setModalShowDialogUpdateNC(true)
                        }}
                    >
                        Thêm ngày công
                    </Button>
                    <Button
                        variant="danger"
                        style={{
                            marginLeft: '5px',
                            width: '100px',
                            fontSize: '17px',
                        }}
                        onClick={() => {
                            console.log('xoa ngay cong')
                            setThongTinCT(props)
                            setModalShowDialogDelNC(true)
                        }}
                    >
                        Xóa
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

    function ModalDialogUpdateSLNgayCong() {
        const objCT = { ...thongTinCT }
        const [newSLNgayCong, setNewSLNgayCong] = useState()

        function updateSLNgayCong() {
            if (window.fetch) {
                fetch(URL_API + UPDATE_NC + '?token=' + TOKEN, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        MaNV: objCT.MaNV,
                        SLNgayCong: newSLNgayCong,
                    }),
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((result) => {
                        if (result.success) {
                            setLoadDSNC(true)
                            setShowMess(true)
                            setTextMess(
                                'Cập nhật số lượng ngày công thành công!'
                            )
                            setSeverityMess('success')
                            return
                        } else {
                            setShowMess(true)
                            setTextMess(result.mess)
                            setSeverityMess('error')
                            return
                        }
                    })
                    .catch((error) => console.log('Lỗi', error))
            } else {
                console.log('fetch not found')
            }
        }

        return (
            <Modal
                show={modalShowDialogUpdateNC}
                onHide={() => setModalShowDialogUpdateNC(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h5>Cập nhật số lượng ngày công nhân viên</h5>
                </Modal.Header>
                <Modal.Body>
                    <InputText
                        placeholder="Số lượng ngày công mới"
                        setInputContent={setNewSLNgayCong}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setModalShowDialogUpdateNC(false)}
                    >
                        Từ Chối
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            updateSLNgayCong()
                            setModalShowDialogUpdateNC(false)
                        }}
                    >
                        Đồng Ý
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function ModalDialogDelNgayCong() {
        const objNC = { ...thongTinCT }
        const [sdt, setSdt] = useState()
        const [pass, setPass] = useState()

        function ItemDialog(props) {
            return (
                <div className={classes.itemDialog}>
                    <span>{props.label}</span>
                    <span style={{ fontWeight: '600', color: 'gray' }}>
                        {props.data}
                    </span>
                </div>
            )
        }

        function delNgayCong() {
            if (window.fetch) {
                fetch(URL_API + DEL_NGAYCONG + '?token=' + TOKEN, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        MaNV: objNC.MaNV,
                        SDT: sdt,
                        Pass: pass,
                    }),
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((result) => {
                        if (result.success) {
                            setLoadDSNC(true)
                            setShowMess(true)
                            setTextMess('Xóa ngày công thành công!')
                            setSeverityMess('success')
                            return
                        } else {
                            setShowMess(true)
                            setTextMess(result.mess)
                            setSeverityMess('error')
                        }
                    })
                    .catch((error) => {
                        console.log('Lỗi', error)
                    })
            } else {
                console.log('fetch not found')
            }
        }

        return (
            <Modal
                show={modalShowDialogDelNC}
                onHide={() => setModalShowDialogDelNC(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <h5>Bạn có muốn xóa ngày công này ?</h5>
                </Modal.Header>
                <Modal.Body>
                    <div
                        style={{
                            padding: '0 30px',
                        }}
                    >
                        <ItemDialog label="Mã nhân viên: " data={objNC.MaNV} />
                        <ItemDialog label="Mã ngày công: " data={objNC.MaNC} />
                        <ItemDialog
                            label="Số lượng ngày công: "
                            data={objNC.SLNgayCong}
                        />
                    </div>
                    <hr />
                    <h5>Nhập tài khoản xác nhận</h5>
                    <InputText
                        type="number"
                        placeholder="Số điện thoại"
                        setInputContent={setSdt}
                    />
                    <InputText
                        type="password"
                        placeholder="Mật khẩu"
                        setInputContent={setPass}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setModalShowDialogDelNC(false)}
                    >
                        Từ Chối
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (
                                validatedText(sdt, 'số điện thoại') &&
                                validatedText(pass, 'mật khẩu')
                            ) {
                                delNgayCong()
                                setModalShowDialogDelNC(false)
                            }
                        }}
                    >
                        Đồng Ý
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function ModalDialogAddNgayCong() {
        const [maNV, setMaNV] = useState()
        const [SLNgayCong, setSLNgayCong] = useState()
        const [dateWorking, setDateWorking] = useState()
        const [nhanXet, setNhanXet] = useState()
        const [diemDanh, setDiemDanh] = useState(false)

        const [danhGia, setDanhGia] = useState(1)

        function addNgayCong() {
            if (window.fetch) {
                fetch(URL_API + ADD_NGAYCONG + '?token=' + TOKEN, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        MaNV: maNV,
                        SLNgayCong: SLNgayCong,
                        isDiemDanh: diemDanh,
                        DateWorking: dateWorking,
                        NhanXet: nhanXet,
                        DanhGia: danhGia,
                    }),
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((result) => {
                        console.log(result)
                        if (result.success) {
                            setLoadDSNC(true)
                            setShowMess(true)
                            setTextMess('Thêm ngày công thành công!')
                            setSeverityMess('success')
                            return
                        } else {
                            setShowMess(true)
                            setTextMess(result.mess)
                            setSeverityMess('error')
                            return
                        }
                    })
                    .catch((error) => console.log('Lỗi', error))
            } else {
                console.log('fetch not found')
            }
        }

        return (
            <Modal
                show={modalShowDialogAddNC}
                onHide={() => setModalShowDialogAddNC(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h4>Thêm Ngày Công</h4>
                </Modal.Header>
                <Modal.Body>
                    <InputText
                        placeholder="Mã nhân viên"
                        setInputContent={setMaNV}
                    />
                    <InputText
                        placeholder="Số lượng ngày công"
                        type="number"
                        setInputContent={setSLNgayCong}
                    />
                    {/* <h6>Điểm danh</h6>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <input
                                type="radio"
                                name="diemdanh"
                                id="co"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setDiemDanh(true)
                                        return
                                    }
                                }}
                            />
                            <label
                                for="co"
                                style={{
                                    marginLeft: '7px',
                                    fontWeight: '600',
                                }}
                            >
                                Có
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="diemdanh"
                                id="khong"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setDiemDanh(false)
                                        return
                                    }
                                }}
                            />
                            <label
                                for="khong"
                                style={{
                                    marginLeft: '7px',
                                    fontWeight: '600',
                                }}
                            >
                                Không
                            </label>
                        </div>
                    </div> */}
                    <InputText
                        placeholder="Ngày làm việc"
                        type="number"
                        setInputContent={setDateWorking}
                    />

                    <InputText
                        placeholder="Nhận xét"
                        setInputContent={setNhanXet}
                    />
                    <h6>Đánh giá</h6>
                    <Rating
                        // name="simple-controlled"
                        value={danhGia}
                        onChange={(event) => {
                            setDanhGia(+event.target.value)
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setModalShowDialogAddNC(false)
                        }}
                    >
                        Hủy Bỏ
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            console.log('tao nhan vien')
                            setModalShowDialogAddNC(false)
                            addNgayCong()
                        }}
                    >
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <Container fluid>
            {/* <ModalDialogAddNgayCong /> */}
            <ModalDialogDelNgayCong />
            <ModalDialogUpdateSLNgayCong />
            <Snackbar
                open={showMess}
                autoHideDuration={3000}
                onClose={() => {
                    setShowMess(false)
                }}
            >
                <Alert
                    onClose={() => {
                        setShowMess(false)
                    }}
                    severity={severityMess}
                >
                    {textMess}
                </Alert>
            </Snackbar>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '20px 0',
                }}
            >
                <h1
                    style={{
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    Phân Công Nhân Viên
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
                                    placeholder="Tìm Kiếm Nhân Viên"
                                    className={classes.inputSearch}
                                />
                                <SearchIcon className={classes.searchIcon} />
                            </form>
                        </div>

                        <TableContainer
                            style={{
                                maxHeight: '65vh',
                                width: '100%',
                                backgroundColor: 'white',
                            }}
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Mã Nhân Viên</TableCell>
                                        <TableCell>Mã Ngày Công</TableCell>
                                        <TableCell>
                                            Số Lượng Ngày Công
                                        </TableCell>
                                        <TableCell>Ngày Làm Việc</TableCell>
                                        <TableCell>Đánh giá</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>{UITableNgayCong}</TableBody>
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

export default PhanCongNhanVien
