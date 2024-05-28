interface HandlePointerOverProps {
  solved: number | undefined
  targetSolved: number
  targetInteractNum: number
  setInteractNum: (num: number) => void
}

interface SetStartSubtitleProps {
  setSubtitle: (subtitle: string) => void
  setSequence: (sequence: number | ((prevSequence: number) => number)) => void
  subtitle: string
  delay?: number
}