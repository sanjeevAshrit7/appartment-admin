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

const CompanyTable = () => {
  // ** vars

  const data = [
    {
      img: toolboxIcon,
      name: 'Ola',
      email: 'meguc@ruj.io',
      icon: <Monitor size={18} />,
      category: 'CAB',
      views: '11:30 AM',
      time: '24 hours',
      revenue: '11:00 AM',
      sales: 'A-201'
    },
    {
      img: parachuteIcon,
      name: 'Uber',
      email: 'vecav@hodzi.co.uk',
      icon: <Coffee size={18} />,
      category: 'CAB',
      views: '12:00 AM',
      time: '2 days',
      revenue: '1:10 PM',
      sales: 'C-100',
      salesUp: true
    },
    {
      img: brushIcon,
      name: 'Zomato',
      email: 'davcilse@is.gov',
      icon: <Watch size={18} />,
      category: 'FOOD',
      views: '2:25 PM',
      time: '5 days',
      revenue: '2:30 PM',
      sales: 'A-22',
      salesUp: true
    },
    {
      img: starIcon,
      name: 'Blue-dart',
      email: 'us@cuhil.gov',
      icon: <Monitor size={18} />,
      category: 'Courrier',
      views: '1:55 PM',
      time: '24 hour',
      revenue: '02:00 PM',
      sales: 'E-143',
      salesUp: true
    },
    {
      img: bookIcon,
      name: 'Swiggy',
      email: 'pudais@jife.com',
      icon: <Coffee size={18} />,
      category: 'Grocery',
      views: '11:30 AM',
      time: '1 week',
      revenue: '12:00 PM',
      sales: 'A-25'
    },
    {
      img: rocketIcon,
      name: 'Proffessional courriers',
      email: 'bipri@cawiw.com',
      icon: <Watch size={18} />,
      category: 'Courrier',
      views: '11:20 AM',
      time: '1 month',
      revenue: '11:30 AM',
      sales: 'A-110',
      salesUp: true
    },
    {
      img: speakerIcon,
      name: 'Visitor',
      email: 'luk@izug.io',
      icon: <Watch size={18} />,
      category: 'Friend',
      views: '8:00 AM',
      time: '12 hours',
      revenue: '--',
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
              <Avatar className='me-1' color={colorsArr[col.category]} icon={col.icon} />
              <span>{col.category}</span>
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
          <td>
            <div className='d-flex align-items-center'>
              <span className='fw-bolder me-1'>{col.sales}</span>
              {/* {IconTag} */}
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <Card className='card-company-table'>
      <Table responsive>
        <thead>
          <tr>
            <th>Entry Type</th>
            <th>Category</th>
            <th>Check-in time</th>
            <th>Check-out time</th>
            <th>Flat</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  )
}

export default CompanyTable
