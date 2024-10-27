// src/components/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/create'>Create Post</Link>
        </li>
      </ul>
    </nav>
  )
}
