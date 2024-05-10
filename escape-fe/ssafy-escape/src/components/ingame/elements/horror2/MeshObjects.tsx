import BaseBox from "../common/BaseBox"

const MeshObjects = () => {
  const boxes = [
    {
      position: [-40, 40, 5],
      rotation: [0, 0, 0],
      args: [5, 60, 70],
    },
    {
      position: [-30, 40, 37],
      rotation: [0, 33, 0],
      args: [5, 60, 50],
    },
    {
      position: [-5, 40, 50],
      rotation: [0, 0, 0],
      args: [5, 60, 30],
    },
  ]

  return (
    <>
      {/* {boxes.map((box, index) => (
        <BaseBox
          key={index}
          position={box.position}
          rotation={box.rotation}
          args={box.args}
          color="red"
          opacity={1}
          renderOrder={1}
        />
      ))} */}
      <BaseBox
        position={[-40, 40, 5]}
        rotation={[0, 0, 0]}
        args={[50, 150, 70]}
        color="red"
      />
      <BaseBox
        position={[-30, 40, 37]}
        rotation={[0, 33, 0]}
        args={[50, 150, 50]}
        color="red"
      />
      <BaseBox
        position={[-5, 40, 50]}
        rotation={[0, 0, 0]}
        args={[50, 150, 30]}
        color="red"
      />
    </>
  )
}

export default MeshObjects
