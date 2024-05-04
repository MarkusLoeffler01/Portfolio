import { useState, lazy, useEffect } from 'react'
import { useFetch } from 'react-async'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./css/fonts.css";
import Card from './Card';
import Tab from "./section/Tab";
import { Comment } from './types/guestbook'

function App() {


  return <>
    <Card />
    <Tab />
  </>
}

export default App
