import { useEffect } from "react";
import { Header } from "~/components/header";
import { RoleRedirectProvider } from "~/components/role-redirect-provider";
import { useTheme } from "~/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useIsMobile } from "~/hooks/use-mobile";
import { authClient } from "~/lib/auth/auth-client";
import { getUser } from "~/lib/auth/functions/getUser";
import { useRoleStore } from "~/lib/store/role.store";

import {
  ClientOnly,
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
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
  Clock,
  CreditCard,
  Heart,
  HelpCircle,
  Home,
  Library,
  LogOut,
  Mail,
  MessagesSquare,
  Search,
  ShoppingCart,
  Sparkles,
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
      {
        label: "Favorites / Wishlist",
        link: "/~/general/wishlists",
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
        label: "Messages & Custom",
        link: "/~/general/messages",
        icon: MessagesSquare,
      },
    ],
  },
  {
    labelGroup: "Account",
    items: [
      {
        label: "Settings",
        link: "/~/general/settings",
        icon: UserCog,
      },
      {
        label: "Payment Methods",
        link: "/~/general/payment-methods",
        icon: CreditCard,
      },
      {
        label: "Notifications",
        link: "/~/general/notifications",
        icon: Bell,
      },
      {
        label: "Billing History",
        // link: "/~/general/billing-history",
        link: "/~/general/payments/receipt",
        icon: Clock,
      },
    ],
  },
  {
    labelGroup: "Help & Support",
    items: [
      {
        label: "FAQ",
        link: "/~/general/faq",
        icon: HelpCircle,
      },
      {
        label: "Contact Support",
        link: "/~/general/contact-support",
        icon: Mail,
      },
    ],
  },
];

export const Route = createFileRoute("/(main)/~/general")({
  component: MainLayout,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: ({ signal }) => getUser({ signal }),
    });

    if (!user) {
      throw redirect({ to: "/auth" });
    }
    // `context.queryClient` is also available in our loaders
    // https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query
    // https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading
  },
});

function MainLayout() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
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
          <ScrollArea className="h-[calc(100vh-190px)] w-full">
            <SidebarContent>
              {USER_SIDEBAR.map((item) => (
                <SidebarGroup key={item.labelGroup}>
                  <SidebarGroupLabel>{item.labelGroup}</SidebarGroupLabel>
                  <SidebarMenu>
                    {item.items.map((item, idx) => (
                      <Link className="cursor-pointer" to={item.link} key={idx}>
                        <SidebarMenuButton
                          className="cursor-pointer"
                          tooltip={item.label}
                        >
                          <item.icon />
                          {item.label}
                        </SidebarMenuButton>
                      </Link>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </ScrollArea>
          <SidebarFooter className="bottom-0">
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
                      <DropdownMenuItem
                        onClick={() => {
                          if (session?.user.email === "ijd.indonesia@gmail.com") {
                            navigate({
                              to: "/admin",
                            });
                          }
                        }}
                      >
                        <Sparkles />
                        {session?.user.email === "ijd.indonesia@gmail.com"
                          ? "Admin"
                          : "Upgrade to Pro"}
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
          <section>
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
