import React from 'react';
import { useStore } from '../hooks/useStore';

import Cube from './Cube';

export default function Cubes() {
  const [cubes, addCube, removeCube] = useStore((state) => [
    state.cubes,
    state.addCube,
    state.removeCube,
  ]);

  return cubes.map((cube) => {
    return (
      <Cube
        key={cube.key}
        texture={cube.texture}
        position={cube.pos}
        addCube={addCube}
        removeCube={removeCube}
      />
    );
  });
}
