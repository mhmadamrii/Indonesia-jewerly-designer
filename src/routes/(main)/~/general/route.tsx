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
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronsUpDown,
  Clock,
  Command,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  Heart,
  HelpCircle,
  Home,
  Library,
  LogOut,
  Mail,
  Map,
  PieChart,
  Receipt,
  Search,
  Settings2,
  ShoppingCart,
  Sparkles,
  SquareTerminal,
  UserCog,
} from "lucide-react";

const USER_SIDEBAR = [
  {
    labelGroup: "General",
    items: [
      {
        label: "Home",
        link: "/~/general/feed",
        icon: Home,
      },
      {
        label: "Explore",
        link: "/~/general/explore",
        icon: Search,
      },
    ],
  },
  {
    labelGroup: "My Library",
    items: [
      {
        label: "Purchased Models",
        link: "/~/general/purchased-models",
        icon: Library,
      },
      // {
      //   label: "Downloads",
      //   link: "/~/general/purchased-models",
      //   icon: Download,
      // },
      {
        label: "Favorites / Wishlist",
        link: "/~/general/favorites",
        icon: Heart,
      },
    ],
  },
  {
    labelGroup: "Cart & Orders",
    items: [
      {
        label: "My Cart",
        link: "/~/general/cart",
        icon: ShoppingCart,
      },
      {
        label: "Orders & Invoices",
        link: "/~/general/invoices",
        icon: Receipt,
      },
    ],
  },
  {
    labelGroup: "Account",
    items: [
      {
        label: "Settings",
        link: "/~/general/invoices",
        icon: UserCog,
      },
      {
        label: "Payment Methods",
        link: "/~/general/invoices",
        icon: CreditCard,
      },
      {
        label: "Notifications",
        link: "/~/general/invoices",
        icon: Bell,
      },
      {
        label: "Billing History",
        link: "/~/general/invoices",
        icon: Clock,
      },
    ],
  },
  {
    labelGroup: "Help & Support",
    items: [
      {
        label: "FAQ",
        link: "/~/general/invoices",
        icon: HelpCircle,
      },
      {
        label: "Contact Support",
        link: "/~/general/invoices",
        icon: Mail,
      },
    ],
  },
];

const DATA = {
  user: {
    name: "Skyleen",
    email: "skyleen@example.com",
    avatar:
      "https://pbs.twimg.com/profile_images/1909615404789506048/MTqvRsjo_400x400.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export const Route = createFileRoute("/(main)/~/general")({
  component: MainLayout,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/auth" });
    }

    // `context.queryClient` is also available in our loaders
    // https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query
    // https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading
  },
});

function MainLayout() {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const { setIsRoleChanging } = useRoleStore();
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
              <Link className="w-full" to="/~/general/feed">
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
            {USER_SIDEBAR.map((item) => (
              <SidebarGroup key={item.labelGroup}>
                <SidebarGroupLabel>{item.labelGroup}</SidebarGroupLabel>
                <SidebarMenu>
                  {item.items.map((item, idx) => (
                    <Link to={item.link} key={idx}>
                      <SidebarMenuItem className="cursor-pointer">
                        <SidebarMenuButton tooltip={item.label}>
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
                            onSuccess: () => {
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
