import React, { useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

//import component
import HeaderDashboard from '../../resource/HeaderDashboard/HeaderDashboard'
import SectionDashboard from '../../resource/SectionDashboard/SectionDashboard'

import PhanCongNhanVien from './Chil_Screens/PhanCongNhanVien'
import TienDoCongTrinh from './Chil_Screens/TienDoCongTrinh/TienDoCongTrinh'
import ChiTietTienDoCongTrinh from './Chil_Screens/TienDoCongTrinh/Child_Screen/ChiTietTienDoCongTrinh'
import ChiTietNhanVien from './Chil_Screens/ChiTietNhanVien'
import DanhSachCongTrinh from './Chil_Screens/DanhSachCongTrinh'
import DanhSachNhanVien from './Chil_Screens/DanhSachNhanVien'
import DSHoanThanhCongTrinh from './Chil_Screens/DSHoanThanhCongTrinh'
import BangLuong from './Chil_Screens/BangLuong'

//import icon material
import Brightness4Icon from '@material-ui/icons/Brightness4'

function Dashboard() {
    const [isChecked, SetChecked] = useState(false)

    const styleDarkMode = {
        backgroundColorDark: '#18191a',
        colorDark: '#E4E6EB',
    }

    const styleLightMode = {
        backgroundColorLight: 'white',
        colorLight: 'black',
    }

    return (
        <Router>
            <div
                style={{
                    width: '100%',
                    minHeight: '100vh',
                    position: 'relative',
                    backgroundColor: '#e7ecf0',
                }}
            >
                <HeaderDashboard styleDarkMode={styleDarkMode} />

                <Switch>
                    <Route
                        exact
                        path="/Dashboard/"
                        component={SectionDashboard}
                    />
                    <Route
                        path="/Dashboard/PhanCongNhanVien"
                        component={PhanCongNhanVien}
                    />
                    <Route
                        path="/Dashboard/ChiTietNhanVien"
                        component={ChiTietNhanVien}
                    />

                    <Route
                        exact
                        path="/Dashboard/TienDoCongTrinh"
                        component={TienDoCongTrinh}
                    />
                    <Route
                        path="/Dashboard/TienDoCongTrinh/ChiTietTienDoCongTrinh"
                        component={ChiTietTienDoCongTrinh}
                    />

                    <Route
                        path="/Dashboard/DanhSachNhanVien"
                        component={DanhSachNhanVien}
                    />
                    <Route
                        path="/Dashboard/DanhSachCongTrinh"
                        component={DanhSachCongTrinh}
                    />
                    <Route
                        path="/Dashboard/DSHoanThanhCongTrinh"
                        component={DSHoanThanhCongTrinh}
                    />

                    <Route path="/Dashboard/BangLuong" component={BangLuong} />
                </Switch>

                {/* Dark mode */}
                {/* <label for="dark-mode">
                    <Brightness4Icon
                        style={{
                            position: 'fixed',
                            top: '88%',
                            left: '92%',
                            fontSize: '60px',
                            cursor: 'pointer',
                            color: 'black',
                            zIndex: '1',
                        }}
                    />
                </label>
                <input
                    type="checkbox"
                    id="dark-mode"
                    hidden
                    onChange={(e) => {
                        SetChecked(!isChecked)
                    }}
                /> */}
            </div>
        </Router>
    )
}

export default Dashboard
