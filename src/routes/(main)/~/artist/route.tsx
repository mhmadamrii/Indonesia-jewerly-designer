import { useEffect } from "react";
import { Header } from "~/components/header";
import { RoleRedirectProvider } from "~/components/role-redirect-provider";
import { useTheme } from "~/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useIsMobile } from "~/hooks/use-mobile";
import { authClient } from "~/lib/auth/auth-client";
import { useRoleStore } from "~/lib/store/role.store";

import {
  ClientOnly,
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/animate-ui/radix/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "~/components/animate-ui/radix/sidebar";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  DollarSign,
  FileArchive,
  HelpCircle,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  PackagePlus,
  Receipt,
  Sparkles,
  Upload,
  Users,
  UserSquare,
} from "lucide-react";

const ARTIST_SIDEBAR = [
  {
    labelGroup: "Dashboard",
    items: [
      {
        label: "Artist Dashboard",
        link: "/~/artist/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    labelGroup: "Manage Models",
    items: [
      {
        label: "My 3D Models",
        link: "/~/artist/my-models",
        icon: PackagePlus,
      },
      {
        label: "Upload New Model",
        link: "/~/artist/publishing",
        icon: Upload,
      },
      {
        label: "Drafts & Previews",
        link: "/~/artist/lah",
        icon: FileArchive,
      },
    ],
  },
  {
    labelGroup: "Orders & Earnings",
    items: [
      {
        label: "Earnings & Payouts",
        link: "/~/artist/earnings",
        icon: DollarSign,
      },
      {
        label: "Order Details",
        link: "/~/artist/orders",
        icon: Receipt,
      },
    ],
  },
  {
    labelGroup: "Profile",
    items: [
      {
        label: "Artist Profile Page",
        link: "/~/artist/profile",
        icon: UserSquare,
      },
      {
        label: "Portfolio Showcase",
        link: "/~/artist/my-showcases",
        icon: Image,
      },
    ],
  },
  {
    labelGroup: "Community / Resources",
    items: [
      {
        label: "Artist Forum",
        link: "/~/artist/dashboard",
        icon: Users,
      },
    ],
  },
  {
    labelGroup: "Help & Support",
    items: [
      {
        label: "FAQ",
        link: "/~/artist/dashboard",
        icon: HelpCircle,
      },
      {
        label: "Contact Support",
        link: "/~/artist/dashboard",
        icon: Mail,
      },
    ],
  },
];

export const Route = createFileRoute("/(main)/~/artist")({
  component: MainLayout,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/" });
    }
  },
});

function MainLayout() {
  const isMobile = useIsMobile();
  const { setIsRoleChanging } = useRoleStore();
  const { theme } = useTheme();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    setIsRoleChanging(false);
  }, []);

  return (
    <main className="flex min-h-screen">
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <ClientOnly fallback={<div>Loading...</div>}>
              <Link className="w-full" to="/">
                <img
                  src={
                    theme === "dark" || theme === "system"
                      ? "/djiwaID-dark.svg"
                      : "/djiwaID.svg"
                  }
                  alt="djiwaID"
                  className="h-[100px] w-[120px] object-contain"
                />
              </Link>
            </ClientOnly>
          </SidebarHeader>
          <SidebarContent>
            {ARTIST_SIDEBAR.map((item) => (
              <SidebarGroup key={item.labelGroup}>
                <SidebarGroupLabel>{item.labelGroup}</SidebarGroupLabel>
                <SidebarMenu>
                  {item.items.map((item, idx) => (
                    <Link to={item.link} key={idx}>
                      <SidebarMenuItem className="cursor-pointer">
                        <SidebarMenuButton
                          className="cursor-pointer"
                          tooltip={item.label}
                        >
                          <item.icon />
                          {item.label}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            ))}
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={session?.user.image ?? ""} alt="avatar" />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {session?.user.name ?? ""}
                        </span>
                        <span className="truncate text-xs">
                          {session?.user.email ?? ""}
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src={session?.user?.image ?? ""} alt="avatar" />
                          <AvatarFallback className="rounded-lg">
                            {session?.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {session?.user.name}
                          </span>
                          <span className="truncate text-xs">{session?.user.email}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Sparkles />
                        Upgrade to Pro
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <BadgeCheck />
                        Account
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard />
                        Billing
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell />
                        Notifications
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        authClient.signOut({
                          fetchOptions: {
                            onSuccess: async () => {
                              await new Promise((resolve) => setTimeout(resolve, 500));
                              window.location.reload();
                            },
                          },
                        });
                      }}
                    >
                      <LogOut />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <section className="pt-3">
            {/* @ts-expect-error */}
            <RoleRedirectProvider sessionRole={session?.user?.role}>
              <Header />
              <Outlet />
            </RoleRedirectProvider>
          </section>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
