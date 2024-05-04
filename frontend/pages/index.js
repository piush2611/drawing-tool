import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Board from '@/components/Board';
import Toolbar from '@/components/Toolbar';

import { CanvasContextProvider } from 'contexts/CanvasContext';
import { useState } from 'react';

export default function Home() {

  const [stroke, setStroke] = useState(1);
  const [strokeStyle, setStrokeStyle] = useState('black');

  return (
    <CanvasContextProvider value={{stroke, setStroke, strokeStyle, setStrokeStyle}}>
      <Toolbar />
      <Board />
      </CanvasContextProvider>
  )
}
