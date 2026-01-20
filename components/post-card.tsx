import type { MediaData } from "@/types/post"
import { UserInfo } from "@/components/user-info"
import { HeartIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: MediaData
  imageHeight: number
}

function cutText (text: string) {

  const maxByte = 32
  let refByte = maxByte
  let flg = true

  // 改行削除
  text = text.replace(/\r?\n/g, ' ')

  while (flg) {
      text = text.substring(0, refByte)
      const byte = new Blob([text]).size;
      (byte > maxByte) ? refByte -= 1 : flg = false;
  }

  return text

}

function judgeSize (imageHeight : number) {
  
  if (imageHeight*0.8 < 450) {
    return "size-[400px]"
  } else if (imageHeight*0.8 < 480) {
    return "size-[460px]"
  } else if (imageHeight*0.8 < 500) {
    return "size-[480px]"
  } else if (imageHeight*0.8 < 520) {
    return "size-[500px]"
  } else if (imageHeight*0.8 < 540) {
    return "size-[520px]"
  } else if (imageHeight*0.8 < 560) {
    return "size-[540px]"
  } else if (imageHeight*0.8 < 580) {
    return "size-[560px]"
  } else if (imageHeight*0.8 < 600) {
    return "size-[580px]"
  } else if (imageHeight*0.8 < 620) {
    return "size-[600px]"
  } else {
    return "size-[620px]"
  }
}

export function PostCard({ post, imageHeight }: PostCardProps) {

  return (
    <div className="relative w-full h-full max-w-md mx-auto overflow-hidden rounded-xl">
      <div className="bg-white rounded-lg overflow-hidden">
          {post.uri !== "dummy" ? <>
            <img src={post.imageUrl} alt={post.imageUrl} className={cn("object-cover", judgeSize(imageHeight))}/>
            <div className="flex items-center p-3">
                <a href={"https://bsky.app/profile/" + post.author.handle} target="_blank">
                  <UserInfo username={post.author.displayName.substring(0,14)} avatar={post.author.avatar} />
                </a>
              <div className="ml-auto text-pink-500 hover:text-pink-600 transition-colors mr-0.5 mt-0.5">
                <HeartIcon className="w-5"/>
              </div>
              <div className="text-pink-500 hover:text-pink-600 transition-colors mr-0.5 mt-0.5">
                  {post.likes.toLocaleString()}
              </div>
            </div>
              <p className="text-base font-semibold ml-4 mb-4"><a href={post.postUrl} target="_blank">{post.text!=="" ? cutText(post.text) : "　"}</a></p>
          </>
            : 
          /* ロード中（ダミーページ）のとき */
          <img src={post.imageUrl} alt={post.imageUrl} className={cn("object-cover", judgeSize(imageHeight*1.25))}/>
          }
      </div>
    </div>
  )
}
