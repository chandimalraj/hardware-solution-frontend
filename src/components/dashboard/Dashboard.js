import React from 'react'
import { useIsUserLoggedIn } from '../../hooks/authentication';

export default function Dashboard() {
  useIsUserLoggedIn();
  return (
    <div>Dashboard</div>
  )
}
