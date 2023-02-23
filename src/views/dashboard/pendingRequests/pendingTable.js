// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Table, Card, Spinner, Col, CardText, Button } from 'reactstrap'

// ** Icons Imports
import { Monitor, Coffee, Watch, TrendingUp, TrendingDown } from 'react-feather'

// ** Icons Imports
import starIcon from '@src/assets/images/icons/star.svg'
import bookIcon from '@src/assets/images/icons/book.svg'
import brushIcon from '@src/assets/images/icons/brush.svg'
import rocketIcon from '@src/assets/images/icons/rocket.svg'
import toolboxIcon from '@src/assets/images/icons/toolbox.svg'
import speakerIcon from '@src/assets/images/icons/speaker.svg'
import parachuteIcon from '@src/assets/images/icons/parachute.svg'
import { Fragment, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import SpinnerGrowColors from '../../components/spinners/SpinnerGrowingColored'
import { isEmpty } from 'lodash'
import { Confirmation, getAllRequests, verifyUser } from './utils'

const PendingTable = (props) => {

    const { userData, setUserData } = props;
    // ** vars
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedrequest, setSelectedrequest] = useState([]);

    const colorsArr = {
        Technology: 'light-primary',
        Grocery: 'light-success',
        Fashion: 'light-warning'
    };

    const callPendingRequestsApi = async () => {
        setLoading(true);
        await getAllRequests(setUserData)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    };

    const renderData = () => {
        return userData?.map(col => {
            return (
                <tr key={col.name}>
                    <td>
                        <div className='d-flex align-items-center'>
                            <div>
                                <div className='fw-bolder'>&nbsp;{col.name}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className='d-flex align-items-center'>
                            <span>{col.unit}</span>
                        </div>
                    </td>
                    <td>{col.phone}</td>
                    <td>
                        <Button
                            color='primary'
                            onClick={async() => {
                                setIsOpen(!isOpen)
                                setSelectedrequest(col)
                            }}
                        >
                            Approve
                        </Button>
                    </td>
                </tr>
            )
        })
    };

    useEffect(() => {
        callPendingRequestsApi()
    }, [])

    return (
        <div className='mt-5'>
            {
                loading ?
                    <Col md='6' sm='12'>
                        <SpinnerGrowColors />
                    </Col>
                    :
                    (!isEmpty(userData)) ?
                        <Card className='card-company-table'>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Flat/Flats</th>
                                        <th>phone number</th>
                                        <th>Approve</th>
                                    </tr>
                                </thead>
                                <tbody>{renderData()}</tbody>
                            </Table>
                            <Confirmation
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                header={'Note'}
                                onConfirm={async () => {
                                    await verifyUser({ phone: selectedrequest?.phone, isVerifiedByAdmin: true }, callPendingRequestsApi)
                                }}
                                message={'Are you sure you want to mark this request as approved?'}
                            />
                        </Card> :
                        <div className='d-flex justify-content-center mt-40'>
                            <p>No Results</p>
                        </div>
            }
        </div>
    )
}

export default PendingTable
