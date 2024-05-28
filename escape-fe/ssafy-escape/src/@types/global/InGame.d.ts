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

interface ProblemProps {
  onClose: () => void
  penalty?: number
  timePenalty: () => void
  setPenalty?: (penalty: number) => void
  setSubtitle?: (subtitle: string) => void
  setShowSpider?: (showSpider: boolean) => void
  progressUpdate?: () => void
}

interface SSAFTYProblemProps {
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
  bgmName: string
  firstSubtitle: string
  sequenceActions: SequenceAction[]
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
  left: string
  top: string
}

interface HintIconBoxProps {
  left: string
  top: string
}

interface ContainerProps {
  opacity: number
}

interface ArtProps {
  isTwoMinLater: boolean
}

interface PortraitProps extends ArtProps {
  isFiveMinLater: boolean
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
}

interface ProblemModalsProps {
  showFirstProblem: boolean
  showSecondProblem: boolean
  showThirdProblem: boolean
  handleFirstProblem: () => void
  handleSecondProblem: () => void
  handleThirdProblem: () => void
  penalty?: number
  timePenalty: () => void
  setPenalty?: (penalty: number) => void
  setSubtitle?: (subtitle: string) => void
}

interface ProductionsProps {
  isFiveMinLater: boolean
  ghostIndex: number
}

interface LightProps {
  penalty: number
  solved: number
}

interface Horror1InteractionsProps {
  isTwoMinLater: boolean
  isFiveMinLater: boolean
  isFlowerClicked: boolean
  setIsFlowerClicked: (isClicked: boolean) => void
  setIsModelLoaded: (isModelLoaded: boolean) => void
  handleFirstProblem: () => void
  handleSecondProblem: () => void
  handleThirdProblem: () => void
}

interface BloodPoolProps {
  solved: number
  isFlowerClicked: boolean
}
