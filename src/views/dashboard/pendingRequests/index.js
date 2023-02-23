// ** React Imports
import { useContext, useState } from 'react'

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Demo Components

import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import SideBar from './sideBar'
import PendingTable from './pendingTable'

const PendingRequests = () => {

    const [openTaskSidebar, setOpenTaskSidebar] = useState(false);
    const [userData, setUserData] = useState([]);
    // ** Context
    const { colors } = useContext(ThemeColors)

    // ** vars
    const trackBgColor = '#e9ecef';

    const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar);

    return (
        <div id='dashboard-owners'>
            <div id='dashboard-owners' style={{ width: '100%' }}>
                <Row className='match-height'>
                    <Col lg='12' xs='12'>
                        <PendingTable
                            userData={userData}
                            setUserData={setUserData}
                        />
                    </Col>
                </Row>
            </div>
            <SideBar
                open={openTaskSidebar}
                setOpen={setOpenTaskSidebar}
                handleTaskSidebar={handleTaskSidebar}
                requests={userData}         
            />
        </div>
    )
}

export default PendingRequests;
