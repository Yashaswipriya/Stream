import { useEffect, useRef, useState } from "react"
import { formatDuration } from "../utils/formatDuration"
import { formatTimeAgo } from "../utils/formatTimeAgo"

type VideoGridItemProps = {
  id: string
  title: string
  channel: {
    id: string
    name: string
    profileUrl: string
  }
  views: number
  postedAt: Date
  duration: number
  thumbnailUrl: string
  videoUrl: string
}

const VIEW_FORMATTER = Intl.NumberFormat(undefined, { notation: "compact" })

export function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isVideoPlaying) {
      video.currentTime = 0
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isVideoPlaying])
  function extractYouTubeId(url: string): string {
    const match = url.match(/(?:v=|\/embed\/|\.be\/)([^&\n?#]+)/)
    return match ? match[1] : ""
  }
  

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${isVideoPlaying ? "rounded-none" : "rounded-xl"}`}
        />
       <iframe
        src={`https://www.youtube.com/embed/${extractYouTubeId(videoUrl)}?autoplay=1&mute=1&controls=0`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        className={`absolute top-0 left-0 w-full h-full rounded-xl transition-opacity duration-200 z-10  ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"}`}
        />

        <div
          className="absolute bottom-2 right-2 text-sm px-1 rounded z-20"
          style={{
            backgroundColor: "#1f2937",
            color: "#e5e7eb",
          }}
        >
          {formatDuration(duration)}
        </div>
      </a>

      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img className="w-12 h-12 rounded-full" src={channel.profileUrl} />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  )
}
