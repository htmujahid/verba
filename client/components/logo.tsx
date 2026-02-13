import { Link } from 'react-router'
import { BookOpenIcon } from 'lucide-react'
import { cn } from '@/client/lib/utils'

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
}

export function Logo({ size = 'medium' }: LogoProps) {
  const sizes = {
    small: { container: 'size-5', icon: 'size-3', text: 'text-sm' },
    medium: { container: 'size-6', icon: 'size-4', text: 'text-base' },
    large: { container: 'size-8', icon: 'size-5', text: 'text-lg' },
  }

  const { container, icon, text } = sizes[size]

  return (
    <Link
      to="/"
      className="flex items-center gap-2 self-center font-medium"
    >
      <div
        className={cn(
          'bg-primary text-primary-foreground flex items-center justify-center rounded-md',
          container
        )}
      >
        <BookOpenIcon className={icon} />
      </div>
      <span className={text}>Verba</span>
    </Link>
  )
}
