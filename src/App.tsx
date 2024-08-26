import React from 'react';
import Board from './component/Board';

function App() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-black ">
      <span className='text-[40px] text-white pt-10  font-mono font-bold tracking-widest w-full text-center absolute top-0 mx-0 '>SNAKE GAME RE-IMAGINED</span>
      <Board />
    </div>
  );
}

export default App;
