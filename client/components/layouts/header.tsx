import { useNavigate } from 'react-router'
import { HomeIcon, SettingsIcon, LogOutIcon } from 'lucide-react'

import { Logo } from '@/client/components/logo'
import { Button } from '@/client/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/client/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/client/components/ui/dropdown-menu'
import { authClient } from '@/client/lib/auth-client'
import pathsConfig from '@/shared/config/paths.config'

export function Header() {
  const navigate = useNavigate()
  const { data: session, isPending } = authClient.useSession()

  const user = session?.user

  const handleSignOut = async () => {
    await authClient.signOut()
    navigate('/')
  }

  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-2">
        <Logo />

        <div className="flex-1" />

        {!isPending && (
          user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer rounded-full outline-none">
                  <Avatar>
                    <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex flex-col gap-0.5 px-2 py-1.5">
                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate(pathsConfig.app.home)}>
                    <HomeIcon />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(pathsConfig.app.account)}>
                    <SettingsIcon />
                    Account Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOutIcon />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate(pathsConfig.auth.signIn)}>
                Sign In
              </Button>
              <Button onClick={() => navigate(pathsConfig.auth.signUp)}>
                Get Started
              </Button>
            </div>
          )
        )}
      </div>
    </header>
  )
}
