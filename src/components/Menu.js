import { useStore } from '../hooks/useStore';

export const Menu = () => {
  const [saveWorld, resetWorld] = useStore((state) => [
    state.saveWorld,
    state.resetWorld,
  ]);


  return (
    <div className="fixed menu">
      <button onClick={(e) => {
        saveWorld()
        e.stopPropagation()
      }}>Save</button>
      <button onClick={(e) => {
        resetWorld()
        e.stopPropagation()
      }}>Reset</button>
    </div>
  )
};
