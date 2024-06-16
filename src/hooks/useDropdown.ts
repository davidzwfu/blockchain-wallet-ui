import { useEffect, useRef, useState } from 'react'

export function useDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node))
        setIsDropdownOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return { 
    dropdownRef,
    isDropdownOpen,
    setIsDropdownOpen,
  }
}
