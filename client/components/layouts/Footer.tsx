import { Box, Typography } from '@mui/material'

import { APP_CONFIG } from '../../../shared'

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {APP_CONFIG.appName} &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  )
}
