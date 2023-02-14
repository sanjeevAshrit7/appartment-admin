// ** Icons Import
import { Home, Activity, ShoppingCart } from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home />,
    children: [
      {
        id: 'analyticsDash',
        title: 'Analytics',
        icon: <Activity />,
        navLink: '/dashboard/analytics'
      },
      {
        id: 'eCommerceDash',
        title: 'Notices',
        icon: <ShoppingCart />,
        navLink: '/dashboard/ecommerce'
      },
      {
        id: 'owners',
        title: 'Owners',
        icon: <ShoppingCart />,
        navLink: '/dashboard/owners'
      }
    ]
  }
]
