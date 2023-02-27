// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Table, Card, Spinner, Col, CardText, Label } from 'reactstrap'

// ** Icons Imports
import { Monitor, Coffee, Watch, TrendingUp, TrendingDown, ChevronDown } from 'react-feather';
import Select from 'react-select'

// ** Icons Imports
import starIcon from '@src/assets/images/icons/star.svg'
import bookIcon from '@src/assets/images/icons/book.svg'
import brushIcon from '@src/assets/images/icons/brush.svg'
import rocketIcon from '@src/assets/images/icons/rocket.svg'
import toolboxIcon from '@src/assets/images/icons/toolbox.svg'
import speakerIcon from '@src/assets/images/icons/speaker.svg'
import parachuteIcon from '@src/assets/images/icons/parachute.svg'
import { useEffect } from 'react'
import { useState } from 'react';
import SpinnerGrowColors from '../../components/spinners/SpinnerGrowingColored'
import { isEmpty } from 'lodash'
import { columns, getAllOwners, getArray, Paginantion } from './utils'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '../../../utility/Utils';

const OwnersTable = (props) => {

    const { userData, setUserData } = props;

    const options = [
        { id: '1', label: '5', value: 5 },
        { id: '2', label: '10', value: 10 },
        { id: '3', label: '15', value: 15},
    ]
    // ** vars
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState({id: 1, value: '5', name: '5'})

    const colorsArr = {
        Technology: 'light-primary',
        Grocery: 'light-success',
        Fashion: 'light-warning'
    }

    const callOwnersApi = async () => {
        setLoading(true);
        await getAllOwners(setUserData)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    };

    const renderData = () => {
        return userData?.
            slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(col => {
                return (
                    <tr key={col.name}>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='avatar rounded'>
                                    <div className='avatar-content'>
                                        {/* <img src={col.img} alt={col.name} /> */}
                                    </div>
                                </div>
                                <div>
                                    <div className='fw-bolder'>&nbsp;{col.name}</div>
                                    {/* <div className='font-small-2 text-muted'>{col.email}</div> */}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                {/* <Avatar className='me-1' color={colorsArr[col.category]} icon={col.icon} /> */}
                                <span>{col.unit}</span>
                            </div>
                        </td>
                        <td>{`A`}</td>
                        <td>{col.phone}</td>
                    </tr>
                )
            })
    };

    useEffect(() => {
        if (isEmpty(userData)) {
            callOwnersApi();
        } else {
            console.log('userdata exists', userData)
        }
    }, []);

    // console.log('total pages when 5', Math.ceil(userData?.length / rowsPerPage))

    return (
        <>
            {
                loading ?
                    <Col md='6' sm='12'>
                        <SpinnerGrowColors />
                    </Col>
                    :
                    (!isEmpty(userData)) ?
                        <Card className='card-company-table mt-5'>
                            <Table
                                responsive
                                className={'table table-hover'}
                            >
                                <thead>
                                    <tr>
                                        <th>Flat owner</th>
                                        <th>Flat/Flats</th>
                                        <th>Wing name</th>
                                        <th>Contact number</th>
                                    </tr>
                                </thead>
                                <tbody>{renderData()}</tbody>
                            </Table>
                        </Card> :
                        <div className='d-flex justify-content-center mt-40'>
                            <p>No Results</p>
                        </div>
            }
            {
                !isEmpty(userData) &&
                <div className='d-flex align-items-center justify-content-between px-0 mb-5 '>
                    <Paginantion
                        length={Math.ceil(userData?.length / rowsPerPage)}
                        data={getArray(Math.ceil(userData?.length / rowsPerPage))}
                        page={page}
                        setPage={setPage}
                    />
                    <div className='d-flex flex-row align-items-center'>
                        <Label className='form-label' for='task-title'>
                            Rows per page&nbsp;&nbsp;
                        </Label>
                        <Select
                            id='rows-per-page'
                            className='react-select'
                            classNamePrefix='select'
                            isClearable={false}
                            options={options}
                            theme={selectThemeColors}
                            placeholder={rows.name}
                            value={rows.name}
                            onChange={(data) => {
                                setRows(data)
                                setRowsPerPage(data?.value)
                            }}
                        />
                    </div>
                </div>
            }
        </>
    )
}

export default OwnersTable
