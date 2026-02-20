"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Menu, 
  Heart, 
  Home, 
  Info, 
  GraduationCap, 
  BookOpen, 
  Building2, 
  HeartHandshake, 
  LogIn, 
  UserPlus, 
  X,
  LayoutDashboard,
  Settings,
  User as UserIcon
} from "lucide-react"
import { useSession, signIn, signOut } from "next-auth/react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/students", label: "Sponsor Students", icon: GraduationCap },
  { href: "/study-room", label: "Study Room", icon: BookOpen },
  { href: "/old-age-home", label: "Old Age Home", icon: Building2 },
  { href: "/donate", label: "Donate", icon: HeartHandshake },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()
  const isLoading = status === "loading"
  const isAuthenticated = !!session

  // In the real app, roles would come from the session
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "NGO_ADMIN"].includes(session?.user?.role || "")

  return (
    <div className="sticky top-0 md:top-5 z-50 w-full px-0 md:px-8">
      <nav className="mx-auto max-w-7xl md:rounded-2xl border-b md:border border-border bg-background/90 backdrop-blur-xl shadow-lg transition-all hover:shadow-xl supports-backdrop-filter:bg-background/60">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-24 md:h-12 md:w-32">
                <Image
                  src="/logo1.png"
                  alt="Samarpan Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full rounded-full" />
                </Link>
              ))}
            </div>

            {/* Desktop Auth & CTA */}
            <div className="hidden md:flex md:items-center md:gap-4">
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {session.user?.name?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-64" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-2 p-1">
                            <p className="text-sm font-bold leading-none">{session.user?.name}</p>
                            <p className="text-xs leading-none text-muted-foreground truncate">
                              {session.user?.email}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        
                        {isAdmin ? (
                          <>
                            <DropdownMenuItem asChild className="cursor-pointer py-3">
                              <Link href="/admin" className="flex items-center">
                                <LayoutDashboard className="mr-3 h-4 w-4 text-primary" />
                                <span className="font-semibold">Admin Dashboard</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer py-3">
                              <Link href="/admin/settings" className="flex items-center">
                                <Settings className="mr-3 h-4 w-4 text-primary" />
                                <span className="font-semibold">Settings</span>
                              </Link>
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem asChild className="cursor-pointer py-3">
                            <Link href="/profile" className="flex items-center">
                              <Heart className="mr-3 h-4 w-4 text-primary" />
                              <span className="font-semibold">My Donations</span>
                            </Link>
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="cursor-pointer py-3 text-destructive focus:text-destructive focus:bg-destructive/5" 
                          onSelect={() => signOut()}
                        >
                          <LogIn className="mr-3 h-4 w-4 rotate-180" />
                          <span className="font-semibold">Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" onClick={() => signIn()} className="text-muted-foreground hover:text-primary font-bold">
                        Login
                      </Button>
                      <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 font-bold rounded-xl px-6">
                        Join Us
                      </Button>
                    </div>
                  )}
                </>
              )}
              <Link href="/students">
                <Button className="bg-primary text-white font-bold rounded-xl px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                  Sponsor Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu (Sheet) */}
            <div className="md:hidden flex items-center gap-2">
               {!isLoading && isAuthenticated && (
                  <Avatar className="h-8 w-8 ring-2 ring-primary/10">
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback className="text-[10px] font-bold">
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
               )}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] sm:w-[400px] p-0 flex flex-col border-none shadow-2xl">
                  <div className="p-8 bg-linear-to-br from-primary/10 via-background to-background border-b border-border/50">
                    <SheetHeader className="text-left">
                      <SheetTitle className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary shadow-xl shadow-primary/20">
                          <Heart className="h-6 w-6 text-white" fill="white" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-2xl font-black tracking-tighter uppercase text-primary">
                             Samarpan
                           </span>
                           <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">NGO Foundation</span>
                        </div>
                      </SheetTitle>
                    </SheetHeader>
                  </div>

                  <div className="flex-1 overflow-y-auto py-8 px-6">
                    <div className="grid gap-2">
                      {navLinks.map((link) => {
                        const Icon = link.icon
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-4 px-4 py-4 text-lg font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-2xl transition-all group"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="p-3 rounded-xl bg-muted group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                              <Icon className="h-6 w-6 group-hover:text-primary" />
                            </div>
                            {link.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>

                  <div className="p-8 border-t border-border/50 bg-muted/20 mt-auto">
                    <div className="space-y-6">
                      {!isLoading && !isAuthenticated && (
                        <div className="grid grid-cols-2 gap-4">
                          <Button variant="outline" onClick={() => {signIn(); setIsOpen(false)}} className="w-full h-14 rounded-2xl font-bold border-border/50">
                            <LogIn className="mr-2 h-5 w-5" />
                            Login
                          </Button>
                          <Button className="w-full h-14 rounded-2xl font-bold shadow-xl shadow-primary/20" onClick={() => {signIn(); setIsOpen(false)}}>
                            <UserPlus className="mr-2 h-5 w-5" />
                            Join
                          </Button>
                        </div>
                      )}

                      {isAuthenticated && session.user && (
                        <div className="space-y-4 bg-background p-5 rounded-2xl border border-border/50 shadow-sm">
                          <div className="flex items-center gap-4 pb-4 border-b border-border/50">
                            <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                              <AvatarImage src={session.user.image || ""} />
                              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                {session.user.name?.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold truncate text-lg">{session.user.name}</p>
                              <p className="text-sm text-muted-foreground truncate">{session.user.email}</p>
                            </div>
                          </div>

                          <div className="grid gap-1">
                            {isAdmin ? (
                               <>
                                <Link 
                                  href="/admin" 
                                  className="flex items-center gap-3 px-3 py-3 font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <LayoutDashboard className="h-5 w-5" />
                                  Admin Panel
                                </Link>
                                <Link 
                                  href="/admin/settings" 
                                  className="flex items-center gap-3 px-3 py-3 font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <Settings className="h-5 w-5" />
                                  Settings
                                </Link>
                               </>
                            ) : (
                                <Link 
                                  href="/profile" 
                                  className="flex items-center gap-3 px-3 py-3 font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <Heart className="h-5 w-5" />
                                  My Impact
                                </Link>
                            )}
                            
                            <button
                              onClick={() => { signOut(); setIsOpen(false); }}
                              className="w-full flex items-center gap-3 px-3 py-3 font-bold text-destructive hover:bg-destructive/5 rounded-xl transition-all text-left"
                            >
                              <LogIn className="h-5 w-5 rotate-180" />
                              Sign Out
                            </button>
                          </div>
                        </div>
                      )}

                      <Link href="/students" onClick={() => setIsOpen(false)} className="block">
                        <Button className="w-full h-16 text-lg font-black uppercase tracking-tight shadow-2xl shadow-primary/30 rounded-2xl">
                          Sponsor a Student
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
