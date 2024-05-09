import HangedDoll from "@/components/ingame/elements/horror/HangedDoll"
import HorrorRoom from "@/components/ingame/elements/horror/HorrorRoom"
import BasicScene from "../../BasicScene"
import Player from "../../elements/common/Player"
import MeshObjects from "../../elements/horror/MeshObjects"
import Floor from "../../elements/common/Floor"
import Blood from "../../elements/horror/Blood"
import { useEffect, useState } from "react"
import Skull from "../../elements/horror/Skull"
import Flower from "../../elements/horror/Flower"
import Wall from "../../elements/horror/Wall"
import Portrait from "../../elements/horror/Portrait"
import Art from "../../elements/horror/Art"
import BloodPool from "../../elements/horror/BloodPool"
import FirstProblemModal from "../../elements/horror/FirstProblemModal"
import useIngameSolvedStore from "@/stores/IngameSolved"
import SecondProblemObject from "../../elements/horror/SecondProblemObject"
import SecondProblemModal from "../../elements/horror/SecondProblemModal"
import ThirdProblemModal from "../../elements/horror/ThirdProblemModal"
import ThirdProblemObject from "../../elements/horror/ThirdProblemObject"
import Knob from "../../elements/horror/Knob"
import KnobObject from "../../elements/horror/KnobObject"
// import Start from "../../elements/horror/Start"
import Subtitle from "../../elements/common/Subtitle"
import HorrorRoom2 from "../../elements/horror2/HorrorRoom2"
import { Environment, Lightformer } from "@react-three/drei"
import Paper from "../../elements/horror2/Paper"
import Start from "../../elements/horror2/Start"
// import PlaySound from "../../elements/horror/PlaySound"

// const startPosition = { x: 8, y: 8, z: -2 }
// const startTargetPosition = { x: 4, y: 3, z: -2 }
// const lookAt = { x: -4, y: 2, z: 2 }

const HorrorTheme2 = ({ isGameStart, setIsModelLoaded }: IngameMainProps) => {
  const [isFlowerClicked, setIsFlowerClicked] = useState<boolean>(false)
  const [isEquipmentsClicked, setIsEquipmentsClicked] = useState<boolean>(false)
  const [twoMinLater, setTwoMinLater] = useState<boolean>(false)
  const [fiveMinLater, setFiveMinLater] = useState<boolean>(false)
  const [fanalty, setFanalty] = useState<number>(0)
  const [showFirstProblem, setShowFirstProblem] = useState<boolean>(false)
  const [showSecondProblem, setShowSecondProblem] = useState<boolean>(false)
  const [showThirdProblem, setShowThirdProblem] = useState<boolean>(false)
  const { solved } = useIngameSolvedStore()
  const [subtitle, setSubtitle] = useState<string>("")
  // const [soundNum, setSoundNum] = useState<number>(0)

  useEffect(() => {
    // 2분 경과 시
    const twoMintimer = setTimeout(() => {
      setFanalty(fanalty + 1)
      setTwoMinLater(true)
    }, 60000 * 2)

    // 5분 경과 시
    const fiveMintimer = setTimeout(() => {
      setFiveMinLater(true)
    }, 60000 * 5)

    return () => {
      clearTimeout(twoMintimer), clearTimeout(fiveMintimer)
    }
  }, [])

  // 시간 경과에 따른 조명 연출
  const getEnvironmentIntensity = (
    twoMinLater: boolean,
    fiveMinLater: boolean,
  ): number => {
    if (twoMinLater && !fiveMinLater) {
      return 0.2
    } else if (fiveMinLater) {
      return 0.1
    } else {
      return 0.3
    }
  }
  const environmentIntensity = getEnvironmentIntensity(
    twoMinLater,
    fiveMinLater,
  )

  // 침대 위 꽃 클릭 시 이벤트
  const handleFlowerClick = () => {
    setIsFlowerClicked(true)
  }

  // 필요한 물품들을 다 챙겼을 시 이벤트
  const handleEquipmentsClick = () => {
    setIsEquipmentsClicked(true)
    setSubtitle("이제 필요한 건 다 챙긴 것 같은데.")
    setTimeout(() => {
      setSubtitle("슬슬 나가지 않으면 늦겠어.")
      setTimeout(() => {
        setSubtitle("")
      }, 4000)
    }, 4000)
  }

  // 마지막 문 클릭 시 이벤트
  const handleFinal = () => {
    // 탈출 성공 로직
    console.log("탈출성공")
  }

  // 첫 번째 문제 모달
  const handleFirstProblem = () => {
    if (solved === 0) {
      setShowFirstProblem(!showFirstProblem)
    }
  }

  // 두 번째 문제 모달
  const handleSecondProblem = () => {
    if (solved === 1) {
      setShowSecondProblem(!showSecondProblem)
    }
  }

  // 세 번째 문제 모달
  const handleThirdProblem = () => {
    if (solved === 2) {
      setShowThirdProblem(!showThirdProblem)
    }
  }

  return (
    <>
      {isGameStart ? <Start setSubtitle={setSubtitle} /> : null}
      <Subtitle text={subtitle} />
      {/* {showFirstProblem ? (
        <FirstProblemModal
          onClose={handleFirstProblem}
          fanalty={fanalty}
          setFanalty={setFanalty}
          setSubtitle={setSubtitle}
        />
      ) : null}
      {showSecondProblem ? (
        <SecondProblemModal
          onClose={handleSecondProblem}
          fanalty={fanalty}
          setFanalty={setFanalty}
          setSubtitle={setSubtitle}
        />
      ) : null}
      {showThirdProblem ? (
        <ThirdProblemModal
          onClose={handleThirdProblem}
          fanalty={fanalty}
          setFanalty={setFanalty}
          setSubtitle={setSubtitle}
        />
      ) : null} */}
      {/* <PlaySound soundNum={soundNum} fanalty={fanalty} /> */}
      <BasicScene interactNum={1}>
        <Player position={[3, 40, 0]} speed={100} />
        <Floor
          rotation={[Math.PI / -2, 0, 0]}
          color="white"
          position={[0, -0.5, 0]}
        />
        <Environment
          files="/hdr/concrete_tunnel_02_1k.hdr"
          environmentIntensity={environmentIntensity}
          resolution={90}
        >
          <Lightformer intensity={0.5} scale={1} target={[0, 0, 0]} />
        </Environment>
        <Paper twoMinLater={twoMinLater} />
        {/* <MeshObjects /> */}
        {/* <Lights fanalty={fanalty} solved={solved} />
        {!isFlowerClicked ? <Flower onClick={handleFlowerClick} /> : null}
        <BloodPool solved={solved} isFlowerClicked={isFlowerClicked} />
        <Skull onClick={handleFirstProblem} />
        <Wall />
        <Art twoMinLater={twoMinLater} />
        <Portrait twoMinLater={twoMinLater} fiveMinLater={fiveMinLater} />
        <HangedDoll />

        <Knob
          onClick={handleKnobClick}
          isFind={isKnobClicked}
          solved={solved}
        />
        <KnobObject
          onClick={handleFinal}
          isFind={isKnobClicked}
          solved={solved}
        />

        <Blood fanalty={fanalty} />
        <SecondProblemObject onClick={handleSecondProblem} />
        <ThirdProblemObject onClick={handleThirdProblem} /> */}
        <HorrorRoom2 onLoaded={setIsModelLoaded} />
      </BasicScene>
    </>
  )
}

export default HorrorTheme2
