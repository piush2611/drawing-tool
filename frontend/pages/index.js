import { useCallback } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Board from '@/components/Board';

import { CanvasContextProvider } from 'contexts/CanvasContext';
import { useState } from 'react';
import ToolDetails from '@/components/toolDetails';

export default function Home() {

  const [stroke, setStroke] = useState(1);
  const [strokeStyle, setStrokeStyle] = useState('black');
  const [actionType, setActionType] = useState({});

  const handleSetActionType = useCallback((type) => {
    setActionType({type})
  }, [])

  return (
    <CanvasContextProvider value={{stroke, setStroke, strokeStyle, setStrokeStyle, handleSetActionType, actionType}}>
      <Board />
      <ToolDetails />
      </CanvasContextProvider>
  )
}
