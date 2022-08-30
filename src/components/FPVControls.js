import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';
import { useThree, extend } from '@react-three/fiber';

extend({ PointerLockControlsImpl });

export const FPVControls = ({ pointerLockRef }) => {
  const { camera, gl } = useThree();

  return (
    <pointerLockControlsImpl
      ref={pointerLockRef}
      args={[camera, gl.domElement]}
    />
  );
};
