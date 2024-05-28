// 인게임 관련 인터페이스

interface BasicSceneProps {
  interactNum: number
  children: ReactNode
  mouseSpeed: number
}

interface CountdownTimerHandle {
  applyPenalty: () => void
  getTime: () => { minutes: number; seconds: number }
}

interface CountdownTimerProps {
  onTimeOut: () => void
  color: string
  minutes?: number
}

interface CrosshairProps {
  interactNum: number
}

interface IngameMainProps {
  isGameStart: boolean
  setIsModelLoaded: (isModelLoaded: boolean) => void
  progressUpdate?: () => void
  progressReset?: () => void
  roomData?: PubResponseData | null
}

interface RoomProps {
  onLoaded: (isLoaded: boolean) => void
}

interface HorrorProblemProps {
  onClose: () => void
  penalty: number
  timePenalty: () => void
  setPenalty: (penalty: number | ((prevPenalty: number) => number)) => void
  setSubtitle: (subtitle: string) => void
  setShowSpider?: (showSpider: boolean) => void
  progressUpdate?: () => void
}

interface SSAFYProblemProps {
  onClose: () => void
  timePenalty: () => void
  progressUpdate?: () => void
  setIsSolvedProblem: (isSolved: boolean) => void
}

interface ClickObjectProps {
  onClick: () => void
  isFind?: boolean
  solved?: number
  isSolvedProblem?: boolean
  setInteractNum: (interactNum: number) => void
}

interface SequenceAction {
  subtitle: string
  delay?: number
  action?: () => void
  endAction?: () => void
}

interface StartProps {
  setSubtitle: (subtitle: string) => void
  bgmName?: string
  firstSubtitle?: string
  sequenceActions?: SequenceAction[]
}

interface SolvedObjectProps {
  solved: number
}

interface chatData {
  userName: string
  message: string
}

interface OptionList {
  [key: string]: string[]
}

interface HorrorOptionData {
  [key: string]: OptionList
}

interface ChoiceButtonProps {
  optionData: HorrorOptionData
  quizData: QuizDataProps[]
  handleAnswerCheck: (answer: string) => void
  themeIndex: number
  problemIndex: number
  choiceIndex: number
}

interface HintProps {
  setIsHintModalOpen
  hint: number
  setHint: (hint: number) => void
  openHint: boolean
  setOpenHint: (open: boolean) => void
  timePenalty: () => void
  isHintModalOpen: boolean
  quizData: QuizDataProps[]
  problemIndex: number
  left?: string
  top?: string
  bottom?: string
}

interface HintIconBoxProps {
  left?: string
  top?: string
  bottom?: string
}

interface ContainerProps {
  opacity: number
}

interface TimeProps {
  isTwoMinLater?: boolean
  isFiveMinLater?: boolean
}

declare module "three/examples/jsm/utils/SkeletonUtils" {
  import { Object3D } from "three"
  export function clone(source: Object3D): Object3D
}

interface PenaltyProps {
  penalty: number | undefined
  index?: number
  role?: "experiment" | "scientist"
  isShowGhost?: boolean
}

interface RenderThemeProps {
  selectedTheme: number
  setIsModelLoaded: (isModelLoaded: boolean) => void
  isGameStart: boolean
}

interface LoadingTextProps {
  selectedTheme: number
  isModelLoaded: boolean
}

interface PlaySoundProps {
  audioFileName: string
  play: boolean
}

interface SingleVictoryProps {
  userUuid: string | null
  selectedTheme: number
  setClearTime: (clearTime: string) => void
  setResult: (result: string) => void
  setIsGameFinished: (isGameFinished: boolean) => void
  timerRef?: React.RefObject<CountdownTimerHandle>
  minute: number
}

interface ProblemModalsProps {
  showFirstProblem: boolean
  showSecondProblem: boolean
  showThirdProblem: boolean
  isSolvedFirstProblem?: boolean
  isSolvedSecondProblem?: boolean
  isSolvedThirdProblem?: boolean
  penalty?: number
  role: string
  handleFirstProblem: () => void
  handleSecondProblem: () => void
  handleThirdProblem: () => void
  timePenalty: () => void
  progressUpdate?: (progress: number) => void
  setPenalty?: (penalty: number | ((prevPenalty: number) => number)) => void
  setSubtitle?: (subtitle: string) => void
  setShowSpider?: (show: boolean) => void
  setIsSolvedFirstProblem?: (solve: boolean) => void
  setIsSolvedSecondProblem?: (solve: boolean) => void
  setIsSolvedThirdProblem?: (solve: boolean) => void
}

interface ProductionsProps {
  isFiveMinLater: boolean
  ghostIndex: number
  penalty: number
  subtitle: string
}

interface LightProps {
  penalty: number
  solved: number
}

interface InteractionsProps {
  isTwoMinLater?: boolean
  isFiveMinLater?: boolean
  isFlowerClicked?: boolean
  setIsFlowerClicked?: (isClicked: boolean) => void
  progressUpdate?: () => void
  handleFirstProblem: () => void
  handleSecondProblem: () => void
  handleThirdProblem: () => void
  timerRef?: React.RefObject<CountdownTimerHandle>
}

interface BloodPoolProps {
  solved: number
  isFlowerClicked: boolean
}

interface SpiderProps {
  showSpider: boolean
}
