'use client'
import React, { useEffect, useState } from 'react'
import { FiSun } from "react-icons/fi";
import { useTheme } from "next-themes"
import { FaMoon } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import './styles.css';

const ThemeSwitch = ({mr, ml}) => {
  const {theme, setTheme } = useTheme()
  const [localTheme, setLocalTheme ] = useState(true)

  
  useEffect(() => {
    if(theme === 'dark') {
      setLocalTheme(true)
    } else {
      setLocalTheme(false)
    }
  }, [])

  const handleClick = () => {
        if(theme === 'dark') {
          setTheme('light')
          setLocalTheme(true)
        } else {
          setTheme('dark')
          setLocalTheme(false)
        }
      
  }


  return (
    <Button onClick={handleClick} className='theme_switch'  size="icon">
        {!localTheme ? <FaMoon  /> :<FiSun />}
    </Button>
  )
}

export default ThemeSwitch