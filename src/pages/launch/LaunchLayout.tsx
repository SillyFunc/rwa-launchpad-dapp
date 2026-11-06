import { Outlet } from 'react-router'

import { PageTitle } from '@/components/common/PageTitle.tsx'
import { m } from '@/paraglide/messages.js'

export function LaunchLayout() {
  return (
    <div className="px-4 py-4">
      <PageTitle title={m.launch_title()} />
      <Outlet />
    </div>
  )
}
