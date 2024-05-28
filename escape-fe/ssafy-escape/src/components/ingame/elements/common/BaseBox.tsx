import { useBox } from "@react-three/cannon"
import { Mesh } from "three"

const BaseBox = ({ ...props }) => {
  const [ref] = useBox((index) => ({
    type: "Static",
    mass: 10,
    restitution: 0,
    onCollide: (e) => {
    },
    ...props,
  }))


  return (
    <mesh
      castShadow
      position={props.position}
      rotation={props.rotation}
      ref={ref as React.MutableRefObject<Mesh>}
      renderOrder={props.renderOrder}
    >
      <boxGeometry args={props.args} />
      <meshBasicMaterial
        color={props.color}
        transparent={true}
        opacity={props.opacity}
      />
    </mesh>
  )
}

export default BaseBox
