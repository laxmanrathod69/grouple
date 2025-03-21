import GlassSheet from "@/components/global/glass-sheet"
import Search from "@/components/global/search"
import SideBar from "@/components/global/sidebar"
import { UserWidget } from "@/components/global/user-widget"
import { Button } from "@/components/ui/button"
import { CheckBadge } from "@/icons"
import { currentUser } from "@clerk/nextjs/server"
import { Menu } from "lucide-react"
import Link from "next/link"

interface NavbarProps {
  groupId: string
  userId: string
}

export const Navbar = async ({ groupId, userId }: NavbarProps) => {
  const user = await currentUser()

  return (
    <div className="bg-[#1A1A1D] py-2 px-3 md:px-7 flex gap-5 justify-between md:justify-end items-center">
      <GlassSheet trigger={<Menu className="md:hidden cursor-pointer" />}>
        <SideBar groupid={groupId} userid={userId} mobile />
      </GlassSheet>
      {/* TODO: Implement search for groups */}
      <Search
        searchType="POSTS"
        className="rounded-full border-themeGray bg-black !opacity-100 px-3"
        placeholder="Search..."
      />
      <Link href={`/group/create`} className="hidden md:inline">
        <Button
          variant="outline"
          className="bg-themeBlack rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray"
        >
          <CheckBadge /> Create Group
        </Button>
      </Link>
      <UserWidget userId={userId} image={user?.imageUrl!} groupId={groupId} />
    </div>
  )
}
