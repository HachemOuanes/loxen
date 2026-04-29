'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function CMSPage() {
  return (
    <div suppressHydrationWarning style={{ height: '100vh' }}>
      <NextStudio config={config} />
    </div>
  )
}