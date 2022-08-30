import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import { Ground } from './components/Ground';
import Cubes from './components/Cubes';
import { Player } from './components/Player';
import { FPVControls } from './components/FPVControls';
import { BlockSelector } from './components/BlockSelector';
import { Cursor } from './components/Cursor';
import { Menu } from './components/Menu';

function App() {
  const pointerLockRef = useRef();

  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
        <FPVControls pointerLockRef={pointerLockRef} />
        <Physics gravity={[0, -30, 0]}>
          <Cubes />
          <Ground position={[0, 0.5, 0]} />
          <Player position={[0, 3, 10]} />
        </Physics>
      </Canvas>
      <BlockSelector />
      <Cursor onClick={() => {
        pointerLockRef.current.lock()
      }} />
      <Menu />
    </>
  );
}

export default App;
