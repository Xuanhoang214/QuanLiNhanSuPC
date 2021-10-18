import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { lengthDSNV } from '../../screens/Dashboard/Chil_Screens/DanhSachNhanVien'
import { lengthDSCT } from '../../screens/Dashboard/Chil_Screens/DanhSachCongTrinh'

//import icon react material ui
import EventIcon from '@material-ui/icons/Event'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ListIcon from '@material-ui/icons/List'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import DateRangeIcon from '@material-ui/icons/DateRange'
import AssignmentIcon from '@material-ui/icons/Assignment'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'

//import component react material ui
import Paper from '@material-ui/core/Paper'

import { makeStyles } from '@material-ui/core/styles'

//import component react bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const useStyles = makeStyles((theme) => ({
    title: {
        width: '100%',
        height: '40px',
        fontWeight: '600',
        fontSize: '22px',
        color: 'gray',
        padding: '0 10px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
    },
    detailSinhVienContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    imgSinhVien: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detail: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    detailSinhVienLeft: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    detailSinhVienRight: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    diemDanh: {
        width: '50px',
        height: '50px',
        border: '1px solid gray',
        boxShadow: '0px 0px 4px',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '30px',
        alignItems: 'center',
        transition: 'all .2s linear',
        flex: '0 0 50px',
        marginLeft: '50px',

        '&:hover': {
            color: '#007bff !important',
        },
    },
}))

function Section() {
    const classes = useStyles()
    const URL_API = 'https://qlnsclouds.herokuapp.com/truongphong/'
    const PARAMATER_NHANVIEN = 'ToanBoNhanVien'
    const TOKEN = sessionStorage.getItem('token')

    const URP_API_GET_NOTIFYCATION =
        'https://qlnsclouds.herokuapp.com/notifycation/DanhSachThongBao?token='

    const data_info_person = JSON.parse(sessionStorage.getItem('info'))

    const [UIThongBao, setUIThongBao] = useState()

    const [data, setData] = useState()
    const [modalShowThongBao, setModalShowThongBao] = useState(false)

    const [lengthTB, setLengthTB] = useState()

    function getNotify() {
        if (window.fetch) {
            fetch(URP_API_GET_NOTIFYCATION + TOKEN)
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    setLengthTB(result.data.length)
                    RenderUIThongBao(result.data)
                })
                .catch((error) => {
                    console.log('Lỗi', error)
                })
        } else {
            console.log('fetch not found')
        }
    }

    function RenderUIThongBao(data) {
        setUIThongBao(
            data.map((e) => {
                return <p>{e.NoiDung}</p>
            })
        )
    }

    useEffect(() => {
        getNotify()
    }, [])

    function ViewDS(props) {
        return (
            <Paper
                style={{
                    padding: '15px',
                    backgroundColor: `${props.bgColor}`,
                }}
            >
                <p
                    style={{
                        fontSize: '13px',
                        color: 'black',
                    }}
                >
                    {props.title}
                </p>
                <span
                    style={{
                        fontSize: '25px',
                        paddingBottom: '10px',
                        color: 'gray',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    {props.sl}
                    {props.icon}
                </span>
                <Link
                    to={props.link}
                    style={{
                        textDecoration: 'none',
                    }}
                    onClick={props.onClick}
                >
                    Xem
                </Link>
            </Paper>
        )
    }

    function ModalThongBao(props) {
        return (
            <Modal
                show={modalShowThongBao}
                onHide={() => setModalShowThongBao(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h5>Thông Báo</h5>
                </Modal.Header>
                <Modal.Body>{UIThongBao}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function ItemDiemDanh(props) {
        const [checkedDiemDanh, setCheckedDiemDanh] = useState(false)

        return (
            <label
                for={props.date}
                className={classes.diemDanh}
                style={{
                    backgroundColor: checkedDiemDanh
                        ? 'rgb(51, 122, 183)'
                        : 'white',
                    color: checkedDiemDanh ? 'white' : 'black',
                }}
            >
                {props.date}
                <input
                    id={props.date}
                    type="checkbox"
                    value={props.date}
                    onChange={(e) => {
                        setCheckedDiemDanh(!checkedDiemDanh)
                    }}
                    checked={checkedDiemDanh}
                    hidden
                />
            </label>
        )
    }

    return (
        <Container
            fluid="md"
            style={{
                marginTop: '13px',
            }}
        >
            <ModalThongBao />
            <Row style={{ height: '300px' }}>
                <Col
                    md={7}
                    style={{
                        height: '100%',
                    }}
                >
                    <Paper className={classes.detailSinhVienContainer}>
                        <div className={classes.title}>Thông tin cá nhân</div>
                        <Row
                            style={{
                                height: ' 100%',
                            }}
                        >
                            <Col
                                md={4}
                                xl={4}
                                lg={4}
                                className={classes.imgSinhVien}
                            >
                                <img
                                    src={data_info_person.Avatar}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        marginBottom: '7px',
                                        objectFit: 'cover',
                                        backgroundColor: 'white',
                                    }}
                                />
                                <Link
                                    to="/Dashboard/ChiTietNhanVien"
                                    style={{
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                    }}
                                >
                                    Xem chi tiết
                                </Link>
                            </Col>
                            <Col
                                md={8}
                                xl={8}
                                lg={8}
                                className={classes.detail}
                            >
                                <div className={classes.detailSinhVienLeft}>
                                    <ItemThongTinNV
                                        dataName="Họ Tên: "
                                        data={data_info_person.HoTen}
                                    />
                                    <ItemThongTinNV
                                        dataName="Mã Số: "
                                        data={data_info_person.MaNV}
                                    />
                                    <ItemThongTinNV
                                        dataName="Mã Phòng Ban: "
                                        data={data_info_person.MaPB}
                                    />
                                </div>
                                <div className={classes.detailSinhVienRight}>
                                    <ItemThongTinNV
                                        dataName="Mã Chức Vụ: "
                                        data={data_info_person.MaCV}
                                    />
                                    <ItemThongTinNV
                                        dataName="Giới Tính: "
                                        data={data_info_person.GioiTinh}
                                    />
                                    <ItemThongTinNV
                                        dataName="Ngày Sinh: "
                                        data={data_info_person.NgaySinh}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Paper>
                </Col>

                <Col
                    md={5}
                    style={{
                        height: '100%',
                    }}
                >
                    <Row
                        style={{
                            height: '100%',
                        }}
                    >
                        <Col
                            md={12}
                            style={{
                                marginBottom: '25px',
                            }}
                        >
                            <ViewDS
                                title="Thông Báo"
                                sl={lengthTB ? lengthTB : '0'}
                                onClick={() => {
                                    setModalShowThongBao(true)
                                    console.log('Show thong bao')
                                }}
                                icon={
                                    <NotificationsIcon
                                        style={{ fontSize: '30px' }}
                                    />
                                }
                            />
                        </Col>

                        <Col md={6}>
                            <ViewDS
                                title="Xem Danh Sách Nhân Viên"
                                sl={lengthDSNV ? lengthDSNV : '0'}
                                bgColor="#e0fbff"
                                link="/Dashboard/DanhSachNhanVien"
                                icon={<ListIcon style={{ fontSize: '30px' }} />}
                            />
                        </Col>

                        <Col md={6}>
                            <ViewDS
                                title="Xem Danh Sách Công Trình"
                                sl={lengthDSCT ? lengthDSCT : '0'}
                                bgColor="#fff2d4"
                                link="/Dashboard/DanhSachCongTrinh"
                                icon={<ListIcon style={{ fontSize: '30px' }} />}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row
                style={{
                    marginTop: '20px',
                }}
            >
                <Col md={2}>
                    <Viewother
                        txtView="Báo cáo tiến độ công trình"
                        link="/Dashboard/TienDoCongTrinh"
                        Icon={
                            <DonutLargeIcon
                                style={{
                                    fontSize: '40px',
                                    color: '#337ab7',
                                    marginBottom: '12px',
                                }}
                            />
                        }
                    />
                </Col>
                <Col md={2}>
                    <Viewother
                        txtView="Phân Công Nhân Viên"
                        link="/Dashboard/PhanCongNhanVien"
                        Icon={
                            <DateRangeIcon
                                style={{
                                    fontSize: '40px',
                                    color: '#337ab7',
                                    marginBottom: '12px',
                                }}
                            />
                        }
                    />
                </Col>
                <Col md={2}>
                    <Viewother
                        txtView="Bảng Lương"
                        link="/Dashboard/BangLuong"
                        Icon={
                            <MonetizationOnOutlinedIcon
                                style={{
                                    fontSize: '40px',
                                    color: '#337ab7',
                                    marginBottom: '12px',
                                }}
                            />
                        }
                    />
                </Col>
                <Col md={2}>
                    <Viewother
                        txtView="Danh sách công trình hoàn thành"
                        link="/Dashboard/DSHoanThanhCongTrinh"
                        Icon={
                            <CheckCircleOutlineIcon
                                style={{
                                    fontSize: '40px',
                                    color: '#337ab7',
                                    marginBottom: '12px',
                                }}
                            />
                        }
                    />
                </Col>
                <Col md={2}>
                    <Viewother
                        txtView="Đang tiến hành"
                        Icon={
                            <AssignmentIcon
                                style={{
                                    fontSize: '40px',
                                    color: '#337ab7',
                                    marginBottom: '12px',
                                }}
                            />
                        }
                    />
                </Col>
                <Col md={2}>
                    <Viewother
                        txtView="Đang tiến hành"
                        Icon={
                            <DonutLargeIcon
                                style={{
                                    fontSize: '40px',
                                    color: '#337ab7',
                                    marginBottom: '12px',
                                }}
                            />
                        }
                    />
                </Col>
            </Row>
            {data_info_person.TypeNV == 1 ? (
                <div
                    style={{
                        width: '100%',
                        marginTop: '30px',
                    }}
                >
                    <h3
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Điểm danh ngày
                    </h3>
                    <div
                        style={{
                            width: '100%',
                            height: '100px',
                            display: 'flex',
                            justifyItems: 'center',
                            alignItems: 'center',
                            overflowX: 'scroll',
                        }}
                    >
                        <ItemDiemDanh date="13" />
                        <ItemDiemDanh date="2" />
                        <ItemDiemDanh date="3" />
                        <ItemDiemDanh date="4" />
                        <ItemDiemDanh date="5" />
                        <ItemDiemDanh date="9" />
                        <ItemDiemDanh date="4" />
                        <ItemDiemDanh date="2" />
                        <ItemDiemDanh date="4" />
                        <ItemDiemDanh date="0" />
                        <ItemDiemDanh date="9" />
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </Container>
    )
}

export default Section

function Viewother(props) {
    return (
        <Paper
            style={{
                height: '110px',
            }}
        >
            <Link
                to={props.link}
                style={{
                    width: '100%',
                    height: '100%',
                    textDecoration: 'none',
                    fontSize: '13   px',
                }}
            >
                <div
                    style={{
                        color: 'gray',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%',
                        lineHeight: '16px',
                        height: '100%',
                    }}
                >
                    {props.Icon}
                    {props.txtView}
                </div>
            </Link>
        </Paper>
    )
}

function ItemThongTinNV(props) {
    return (
        <label
            style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#667580',
                margin: '12px 0',
            }}
        >
            {props.dataName}
            <span
                style={{
                    fontWeight: '600',
                    color: '#333',
                    fontSize: '15px',
                }}
            >
                {props.data}
            </span>
        </label>
    )
}
