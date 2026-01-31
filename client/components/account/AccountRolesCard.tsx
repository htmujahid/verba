import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import ShieldIcon from '@mui/icons-material/Shield'
import PersonIcon from '@mui/icons-material/Person'

interface AccountRolesCardProps {
  role?: string | null
}

export default function AccountRolesCard({ role }: AccountRolesCardProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <ShieldIcon color="primary" />
          <Typography variant="h6">Account Roles</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Your account has the following roles and permissions.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {role ? (
            <Chip
              icon={role === 'admin' ? <ShieldIcon /> : <PersonIcon />}
              label={role.charAt(0).toUpperCase() + role.slice(1)}
              color={role === 'admin' ? 'primary' : 'default'}
              variant="filled"
            />
          ) : (
            <Chip
              icon={<PersonIcon />}
              label="User"
              variant="filled"
            />
          )}
        </Stack>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
          Contact an administrator if you need different permissions.
        </Typography>
      </CardContent>
    </Card>
  )
}
