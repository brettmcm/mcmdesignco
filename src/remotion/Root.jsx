import { Composition } from 'remotion'
import { McmSizzleReel } from './SizzleReel'

export function RemotionRoot() {
  return (
    <Composition
      id="McmSizzleReel"
      component={McmSizzleReel}
      durationInFrames={300}
      fps={30}
      width={1080}
      height={1920}
    />
  )
}
