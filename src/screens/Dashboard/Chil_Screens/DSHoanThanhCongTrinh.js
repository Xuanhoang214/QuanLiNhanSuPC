import React, { useEffect } from 'react'

//import component React Bootstrap
import Container from 'react-bootstrap/Container'
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
}))

function DSCongTrinhHoanThanh(props) {
    const classes = useStyles()

    var stt = 0
    function ItemCTHoanThanh(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>1234567</TableCell>
                <TableCell>Công Trình A</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
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
                    Danh Sách Công Trình Hoàn Thành
                </h1>
            </div>

            <div className={classes.searchContainer}>
                <form className={classes.formSearch}>
                    <input
                        type="text"
                        placeholder="Tìm Kiếm Công Trình Hoàn Thành"
                        className={classes.inputSearch}
                    />
                    <SearchIcon className={classes.searchIcon} />
                </form>
            </div>

            <TableContainer
                style={{
                    maxHeight: '75vh',
                    width: '100%',
                    backgroundColor: 'white',
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Mã Công Trình</TableCell>
                            <TableCell>Tên Công Trình</TableCell>
                            <TableCell>Test</TableCell>
                            <TableCell>Test</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <ItemCTHoanThanh />
                        <ItemCTHoanThanh />
                        <ItemCTHoanThanh />
                        <ItemCTHoanThanh />
                        <ItemCTHoanThanh />
                        <ItemCTHoanThanh />
                        <ItemCTHoanThanh />
                        <ItemCTHoanThanh />
                        <ItemCTHoanThanh />
                        <ItemCTHoanThanh />
                        <ItemCTHoanThanh />
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default DSCongTrinhHoanThanh
