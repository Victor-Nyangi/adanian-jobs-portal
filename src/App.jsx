import { Route, Routes } from "react-router-dom";
import Jobs from './jobs/Index'
import Create from './jobs/Create'

const App = () => {
  return (
  <>
  <Routes>
    <Route path="/" element={<Jobs />}/>
    <Route path="/create/job" element={<Create />}/>
    <Route path="*" element={<Jobs />} />
  </Routes>
  </>
  )
}

export default App
