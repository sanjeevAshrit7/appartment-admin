import { lazy } from 'react'

const DashboardAnalytics = lazy(() => import('../../views/dashboard/analytics'))
const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'))
const DashboardOwners = lazy(() => import('../../views/dashboard/owners'))
const PendingRequests = lazy(() => import('../../views/dashboard/pendingRequests'))

const DashboardRoutes = [
  {
    path: '/dashboard/analytics',
    element: <DashboardAnalytics />
  },
  {
    path: '/dashboard/ecommerce',
    element: <DashboardEcommerce />
  },
  {
    path: '/dashboard/owners',
    element: <DashboardOwners />
  },
  {
    path: '/dashboard/unVerifiedUsers',
    element: <PendingRequests/>
  }
]

export default DashboardRoutes
