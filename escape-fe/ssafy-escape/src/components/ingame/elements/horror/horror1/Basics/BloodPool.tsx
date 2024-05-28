import { memo, useEffect, useMemo } from "react"
import { useGLTF } from "@react-three/drei"

const BloodPool = memo(({ solved, isFlowerClicked }: BloodPoolProps) => {
  const bloodPoolPaths = [
    "/glb/horror/pool_blood1.glb",
    "/glb/horror/pool_blood2.glb",
    "/glb/horror/pool_blood3.glb",
  ]

  const [bloodPool1, bloodPool2, bloodPool3] = bloodPoolPaths
    .map((path) => useGLTF(process.env.NEXT_PUBLIC_IMAGE_URL + path, true))
    .map((gltf) => gltf.scene)

  const bloodPools = useMemo(() => {
    const pools = []

    if (isFlowerClicked === true)
      pools.push({
        object: <primitive object={bloodPool2} scale={450} />,
        position: [-36, 20, 44],
      })
    if (solved >= 1)
      pools.push({
        object: <primitive object={bloodPool1} scale={700} />,
        position: [-35, 0, -22],
      })
    if (solved >= 2 && isFlowerClicked === false)
      pools.push({
        object: <primitive object={bloodPool2} scale={450} />,
        position: [-36, 20, 44],
      })
    if (solved >= 3)
      pools.push({
        object: <primitive object={bloodPool3} scale={700} />,
        position: [113, 0, -80],
      })

    return pools
  }, [solved, isFlowerClicked, bloodPool1, bloodPool2, bloodPool3])

  useEffect(() => {
    bloodPools.forEach(({ object, position }) => {
      object.props.object.position.set(position[0], position[1], position[2])
    })
  }, [bloodPools])

  return <>{bloodPools.map(({ object }) => object)}</>
})
export default BloodPool
