import { useEffect, useRef } from 'react'

export default function AutoPlayVideo({
  src,
  type = 'video/mp4',
  className,
  ariaHidden = true,
}) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.controls = false
    video.playsInline = true

    const playPromise = video.play()
    if (playPromise) playPromise.catch(() => {})
  }, [])

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload noplaybackrate noremoteplayback"
      preload="auto"
      aria-hidden={ariaHidden}
    >
      <source src={src} type={type} />
    </video>
  )
}
