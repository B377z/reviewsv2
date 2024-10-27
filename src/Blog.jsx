// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { PostDetail } from './components/PostDetail'
import { CreatePost } from './components/CreatePost'
import { EditPost } from './components/EditPost'
import { Navbar } from './components/Navbar'

export function Blog() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/edit/:id' element={<EditPost />} />
            <Route path='/posts/:postId' element={<PostDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
