import useIngameStateStore from "@/stores/IngameStateStore"
import Subtitle from "@/components/ingame/elements/common/Subtitle"
import PlayPenaltySound from "@/components/ingame/elements/horror/common/PlayPenaltySound"
import BloodText from "@/components/ingame/elements/horror/common/BloodText"
import ShowGhost from "@/components/ingame/elements/horror/common/ShowGhost"
import PlaySound from "@/components/ingame/elements/horror/common/PlaySound"
import BlackOut from "@/components/ingame/elements/horror/common/BlackOut"

// 연출
const Productions = ({ isFiveMinLater, ghostIndex }: ProductionsProps) => {
  const { penalty, subtitle } = useIngameStateStore()
  return (
    <>
      <Subtitle text={subtitle} />
      <ShowGhost penalty={penalty} index={ghostIndex} />
      <BlackOut penalty={penalty} />
      <BloodText penalty={penalty} role="experiment" />
      <PlayPenaltySound penalty={penalty} role="experiment" />
      {isFiveMinLater && <PlaySound audioFileName="door_bang" play={true} />}
      {penalty === 6 && <PlaySound audioFileName="man_scream" play={true} />}
    </>
  )
}

export default Productions
