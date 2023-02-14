// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Table, Card } from 'reactstrap'

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

const OwnersTable = () => {
    // ** vars

    const data = [
        {
            img: toolboxIcon,
            name: 'John Smith',
            email: 'meguc@ruj.io',
            icon: <Monitor size={18} />,
            category: 'CAB',
            views: 'A',
            time: '24 hours',
            revenue: '9090909090',
            sales: 'A-201'
        },
        {
            img: toolboxIcon,
            name: 'Dinesh Mongia',
            email: 'vecav@hodzi.co.uk',
            icon: <Monitor size={18} />,
            category: 'CAB',
            views: 'B',
            time: '2 days',
            revenue: '9090909090',
            sales: 'C-100',
            salesUp: true
        },
        {
            img: toolboxIcon,
            name: 'Shoib Aktar',
            email: 'davcilse@is.gov',
            icon: <Monitor size={18} />,
            category: 'FOOD',
            views: 'B',
            time: '5 days',
            revenue: '9090909090',
            sales: 'A-22',
            salesUp: true
        },
        {
            img: toolboxIcon,
            name: 'Robert D souza',
            email: 'us@cuhil.gov',
            icon: <Monitor size={18} />,
            category: 'Courrier',
            views: 'A',
            time: '24 hour',
            revenue: '9090909090',
            sales: 'E-143',
            salesUp: true
        },
        {
            img: toolboxIcon,
            name: 'Vinay Angadi',
            email: 'pudais@jife.com',
            icon: <Monitor size={18} />,
            category: 'Grocery',
            views: 'C',
            time: '1 week',
            revenue: '9090909090',
            sales: 'A-25'
        },
        {
            img: toolboxIcon,
            name: 'Vikas K S',
            email: 'bipri@cawiw.com',
            icon: <Monitor size={18} />,
            category: 'Courrier',
            views: 'A',
            time: '1 month',
            revenue: '9090909090',
            sales: 'A-110',
            salesUp: true
        },
        {
            img: toolboxIcon,
            name: 'Lungi ingidi',
            email: 'luk@izug.io',
            icon: <Monitor size={18} />,
            category: 'Friend',
            views: 'B',
            time: '12 hours',
            revenue: '9090909090',
            sales: 'B-201',
            salesUp: true
        }
    ]
    const colorsArr = {
        Technology: 'light-primary',
        Grocery: 'light-success',
        Fashion: 'light-warning'
    }

    const renderData = () => {
        return data.map(col => {
            const IconTag = col.salesUp ? (
                <TrendingUp size={15} className='text-success' />
            ) : (
                <TrendingDown size={15} className='text-danger' />
            )

            return (
                <tr key={col.name}>
                    <td>
                        <div className='d-flex align-items-center'>
                            <div className='avatar rounded'>
                                <div className='avatar-content'>
                                    <img src={col.img} alt={col.name} />
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
                            <span>{col.sales}</span>
                        </div>
                    </td>
                    {/* <td className='text-nowrap'>
            <div className='d-flex flex-column'>
              <span className='fw-bolder mb-25'>{col.views}</span>
              <span className='font-small-2 text-muted'>in {col.time}</span>
            </div>
          </td> */}
                    <td>{col.views}</td>
                    <td>{col.revenue}</td>
                    {/* <td>
                        <div className='d-flex align-items-center'>
                            <span className='fw-bolder me-1'>{col.sales}</span>
                        </div>
                    </td> */}
                </tr>
            )
        })
    }

    return (
        <Card className='card-company-table'>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Flat owner</th>
                        <th>Flat/Flats</th>
                        <th>Wing name</th>
                        <th>Contact number</th>
                        {/* <th>Flat</th> */}
                    </tr>
                </thead>
                <tbody>{renderData()}</tbody>
            </Table>
        </Card>
    )
}

export default OwnersTable
