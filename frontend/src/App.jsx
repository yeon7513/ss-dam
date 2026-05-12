import { Route, Routes } from 'react-router-dom';
import UploadImage from './components/upload-image/UploadImage';
import Layout from './layout/Layout';
import Home from './pages/home/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/image-upload-test" element={<UploadImage />} />
      </Route>
    </Routes>
  );
}

export default App;
