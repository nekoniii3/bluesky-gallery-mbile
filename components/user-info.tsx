import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserInfoProps {
  username: string
  avatar: string
}

export function UserInfo({ username, avatar }: UserInfoProps) {
  return (
    <div className="flex items-center">
      <Avatar className="h-8 w-8 border-2 border-white">
        <AvatarImage src={avatar || "/placeholder.svg"} alt={username} />
        <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="ml-2 font-bold ">{username}</span>
    </div>
  )
}
