import { Link } from 'react-router'
import { Box, Typography } from '@mui/material'
import { AutoStories } from '@mui/icons-material'

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'inherit'
}

export default function Logo({ size = 'medium', color = 'primary' }: LogoProps) {
  const sizes = {
    small: { icon: 24, text: 'h6' as const },
    medium: { icon: 32, text: 'h5' as const },
    large: { icon: 40, text: 'h4' as const },
  }

  const { icon, text } = sizes[size]

  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
        color: color === 'inherit' ? 'inherit' : 'primary.main',
      }}
    >
      <AutoStories sx={{ fontSize: icon }} />
      <Typography variant={text} fontWeight={700}>
        Verba
      </Typography>
    </Box>
  )
}
