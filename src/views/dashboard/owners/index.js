// ** React Imports
import { useContext } from 'react'

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
import OwnersTable from './ownersTable'

const EcommerceDashboard = () => {
    // ** Context
    const { colors } = useContext(ThemeColors)

    // ** vars
    const trackBgColor = '#e9ecef'

    return (
        <div id='dashboard-ecommerce'>
            <div id='dashboard-ecommerce' style={{ width: '100%' }}>
                <Row className='match-height'>
                    <Col lg='4' xs='12'>
                        <Button color='primary' block onClick={() => { }}>
                            <span className='align-middle'>Add Owner</span>
                        </Button>
                    </Col>
                </Row>
                <Row className='match-height'>
                    <Col lg='12' xs='12'>
                        <OwnersTable />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default EcommerceDashboard
