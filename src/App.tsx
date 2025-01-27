import Header from "./components/Header"
import Main from "./components/Main"
import { BrowserRouter, Routes, Route } from "react-router"


const App = () => {
  return (
    <>
     <BrowserRouter>
     <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:country" element={<Main />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App