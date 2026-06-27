import { useNavigate } from 'react-router-dom';
import { LogOut, LogIn, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const getInitials = (email?: string | null) => {
  if (!email) return '?';
  return email.slice(0, 2).toUpperCase();
};

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <button
        onClick={() => navigate('/auth')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 h-11 px-4 rounded-full gradient-border glow-primary text-sm font-semibold hover:scale-105 transition-transform duration-300"
        aria-label="Ingia"
      >
        <LogIn className="w-4 h-4 text-primary" />
        Ingia
      </button>
    );
  }

  return (
    <div className="fixed top-6 left-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="w-12 h-12 rounded-full gradient-border glow-primary flex items-center justify-center hover:scale-105 transition-transform duration-300"
            aria-label="Profile menu"
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold text-xs">
                {getInitials(user.email)}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel className="flex items-center gap-2 text-xs text-muted-foreground truncate">
            <UserIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{user.email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()} className="text-destructive focus:text-destructive cursor-pointer">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
