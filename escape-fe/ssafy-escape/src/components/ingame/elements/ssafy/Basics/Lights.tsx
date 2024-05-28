const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 15, 15]} intensity={10} />
    </>
  )
}

export default Lights
