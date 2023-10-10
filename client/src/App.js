import Header from "./components/Header";
import { Routes, Route } from 'react-router-dom';
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";

function App() {
  return (

    <>

      <Header />
      <Routes>

        <Route path="/" element={<Blog />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/my-blog" element={<UserBlogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
