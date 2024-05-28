const setStartSubtitle = ({
  setSubtitle,
  setSequence,
  subtitle,
  delay = 6000,
}: SetStartSubtitleProps) => {
  setSubtitle(subtitle)
  setTimeout(() => {
    setSequence((n) => n + 1)
    setSubtitle("")
  }, delay)
}

export default setStartSubtitle
