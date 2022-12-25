import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Ground } from './components/Ground'
import { Player } from './components/Player'
import { FPV } from './components/FPV'
import { Cubes } from './components/Cubes'
import { TextureSelector } from './components/TextureSelector';
import { Menu } from './components/Menu';
import { FacePosition } from './components/FacePosition';
import { useState } from 'react';

function App() {
  const [facePos, setFacePos] = useState([0, 0])
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <FPV />
        <Physics>
          <Player facePos={facePos} />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      <div className='absolute centered cursor'>+</div>
      <TextureSelector />
      <Menu />
      <FacePosition onNewFacePosition={(pos) => {
        setFacePos(pos)
      }} />
    </>
  );
}

export default App;
