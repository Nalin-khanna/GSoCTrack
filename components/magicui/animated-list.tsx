"use client"

import React, { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export interface AnimatedListProps {
  className?: string
  children: React.ReactNode
  delay?: number
}

export const AnimatedList = React.memo(({ className, children, delay = 1000 }: AnimatedListProps) => {
  const [index, setIndex] = useState(0)
  const childrenArray = React.Children.toArray(children)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)
    }, delay)

    return () => clearInterval(interval)
  }, [childrenArray.length, delay])

  const itemsToShow = useMemo(() => {
    const result = []
    for (let i = 0; i < 3 && i < childrenArray.length; i++) {
      result.push(childrenArray[(index + i) % childrenArray.length])
    }
    return result
  }, [index, childrenArray])

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <AnimatePresence>
        {itemsToShow.map((item, idx) => {
          const actualIndex = (index + idx) % childrenArray.length
          return (
            <motion.div
              key={actualIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: idx === 0 ? 1 : 0.4,
                y: 0,
                scale: idx === 0 ? 1 : 0.95,
              }}
              exit={{ opacity: 0, y: -50 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              style={{
                zIndex: itemsToShow.length - idx,
              }}
            >
              {item}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
})

AnimatedList.displayName = "AnimatedList"
