import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Role from './User Management/Role';
import Page from './User Management/Page';
import User from './User Management/User';
import City from './User Management/City';
import State from './User Management/State';
import Country from './User Management/Country';
import Category from './Product Management/Category';
import SubCategory from './Product Management/SubCategory';
import Tag from './Product Management/Tag';
import Attribute from './Product Management/Attribute';
import Author from './Product Management/Author';
import AddAuthor from './Product Management/AddAuthor';

function App() {
  const AuthenticatedLayout = ({ children }) => (
    <div className="app-layout">
      {/* <Sidebar /> */}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
  return (
    <Router>
       <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
         <Route path="/register" element={<Register />} />

          {/* Protected Routes with Sidebar */}
         <Route path="/role" element={
          <AuthenticatedLayout><Role /></AuthenticatedLayout>
        } /> 
         <Route path="/page" element={
          <AuthenticatedLayout><Page /></AuthenticatedLayout>
        } /> 
         <Route path="/user" element={
          <AuthenticatedLayout><User /></AuthenticatedLayout>
        } />
        <Route path="/country" element={
          <AuthenticatedLayout><Country /></AuthenticatedLayout>
        } />
        <Route path="/state" element={
          <AuthenticatedLayout><State /></AuthenticatedLayout>
        } />
        <Route path="/city" element={
          <AuthenticatedLayout><City /></AuthenticatedLayout>
        } />
        <Route path="/category" element={
          <AuthenticatedLayout><Category /></AuthenticatedLayout>
        } />
        <Route path="/sub-category" element={
          <AuthenticatedLayout><SubCategory /></AuthenticatedLayout>
        } />
         <Route path="/tag" element={
          <AuthenticatedLayout><Tag /></AuthenticatedLayout>
        } />
         <Route path="/attribute" element={
          <AuthenticatedLayout><Attribute /></AuthenticatedLayout>
        } />
         <Route path="/author" element={
          <AuthenticatedLayout><Author /></AuthenticatedLayout>
        } />
         <Route path="/add-author" element={
          <AuthenticatedLayout><AddAuthor /></AuthenticatedLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
