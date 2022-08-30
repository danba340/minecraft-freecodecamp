import React, { useMemo } from 'react';
import { usePlane } from '@react-three/cannon';
import {
  TextureLoader,
  RepeatWrapping,
  NearestFilter,
} from 'three';

import grass from '../images/grass.jpg';
import { useStore } from '../hooks/useStore';

export const Ground = (props) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  const [addCube, activeTexture] = useStore((state) => [
    state.addCube,
    state.texture,
  ]);
  const texture = useMemo(() => {
    return new TextureLoader().load(grass)
  }, [])

  texture.magFilter = NearestFilter;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(100, 100);

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((coord) =>
          Math.ceil(coord)
        );
        addCube(x, y, z, activeTexture);
      }}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial map={texture} attach="material" />
    </mesh>
  );
};
