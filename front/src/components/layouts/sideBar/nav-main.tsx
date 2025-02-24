import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const path = useLocation().pathname;

  return (
    <SidebarGroup>
      <SidebarGroupLabel
        className="text-xs font-bold text-blue-800
       uppercase"
      >
        Menu
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map(({ title, url, icon: Icon, isActive, items }) => (
          <Collapsible
            key={title}
            asChild
            defaultOpen={isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {items && items.length > 0 ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={title}>
                      {Icon && (
                        <div>
                          <Icon
                            width={20}
                            height={20}
                            className="text-gray-300 mr-2"
                          />
                        </div>
                      )}
                      <span className="text-md font-bold">{title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-gray-300" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link to={subItem.url}>
                              <span
                                className={
                                  "text-md  w-full p-2 rounded-lg " +
                                  (path === subItem.url
                                    ? "text-blue-600 bg-blue-100 font-semibold"
                                    : "text-gray-600 group-hover:text-gray-800")
                                }
                              >
                                {subItem.title}
                              </span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : (
                <SidebarMenuButton
                  asChild
                  isActive={path === url}
                  className={path === url ? "!bg-blue-100 text-blue-600" : ""}
                >
                  <Link to={url}>
                    {Icon && (
                      <div>
                        <Icon
                          width={20}
                          height={20}
                          className="text-gray-300 mr-2"
                        />
                      </div>
                    )}
                    <span
                      className={
                        "text-md font-bold " +
                        (path === url
                          ? "text-blue-600"
                          : "text-gray-600 group-hover:text-gray-800")
                      }
                    >
                      {title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
