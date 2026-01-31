import { useState } from 'react'
import { Box, CircularProgress, Stack, Tab, Tabs, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import SecurityIcon from '@mui/icons-material/Security'
import WarningIcon from '@mui/icons-material/Warning'

import { authClient } from '@/client/lib/auth-client'
import { ProfileImageCard } from '@/client/components/account/ProfileImageCard'
import { AccountDetailsForm } from '@/client/components/account/AccountDetailsForm'
import { AccountRolesCard } from '@/client/components/account/AccountRolesCard'
import { ChangePasswordCard } from '@/client/components/account/ChangePasswordCard'
import { SessionsCard } from '@/client/components/account/SessionsCard'
import { DeleteAccountCard } from '@/client/components/account/DeleteAccountCard'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  if (value !== index) return null
  return <Box sx={{ pt: 3 }}>{children}</Box>
}

export default function Account() {
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user
  const [tabIndex, setTabIndex] = useState(0)

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto' }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Account Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Manage your account information, security, and preferences.
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        aria-label="account settings tabs"
      >
        <Tab icon={<PersonIcon />} iconPosition="start" label="Profile" />
        <Tab icon={<SecurityIcon />} iconPosition="start" label="Security" />
        <Tab
          icon={<WarningIcon />}
          iconPosition="start"
          label="Danger Zone"
          sx={{ '&.Mui-selected': { color: 'error.main' } }}
        />
      </Tabs>

      {/* Profile Tab */}
      <TabPanel value={tabIndex} index={0}>
        <Stack spacing={3}>
          <ProfileImageCard user={user} />
          <AccountDetailsForm user={user} />
          <AccountRolesCard role={user?.role} />
        </Stack>
      </TabPanel>

      {/* Security Tab */}
      <TabPanel value={tabIndex} index={1}>
        <Stack spacing={3}>
          <ChangePasswordCard />
          <SessionsCard />
        </Stack>
      </TabPanel>

      {/* Danger Zone Tab */}
      <TabPanel value={tabIndex} index={2}>
        <Stack spacing={3}>
          <DeleteAccountCard />
        </Stack>
      </TabPanel>
    </Box>
  )
}
