type MediaProps = {
  className?: string
  src?: string
}

type ImageProps = {
  alt?: string
}

type PlaybackProps = {
  Component: 'audio' | 'video'
}

export function Audio(props: MediaProps) {
  return <Playback Component="audio" {...props} />
}

export function Image(props: MediaProps & ImageProps) {
  return <img className={props.className} src={props.src} alt={props.alt} />
}

function Playback(props: MediaProps & PlaybackProps) {
  const { Component } = props
  return (
    <Component className={props.className} controls muted src={props.src} />
  )
}

export function Video(props: MediaProps) {
  return <Playback Component="video" {...props} />
}
