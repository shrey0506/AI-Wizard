import './App.css';
import  Login  from './authentication/Login';
import  Layout from './layout/Layout';
import   MainHome from './mortgages-processing/MainHome';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AgreementInPrinciple from './mortgages-processing/AgreementInPrinciple';
import MortgageIntroduction from './mortgages-processing/MortgageIntroduction';
import ApiFinal from './mortgages-processing/AipFinal';
import ScrollToTop from './utils/ScrollToTop';
import { ToastProvider } from './mortgages-processing/ToastContext';
import SignupSuccess from './mortgages-processing/SignupSuccess';
import ProfilePage from './mortgages-processing/ProfilePage';
import DocumentUploader from './mortgages-processing/DocumentUploader';
import Result from './mortgages-processing/Result';



function App() {
  return (
    <div className="App">
       {/* <Layout
          header={<Header />}
          left={
            <LeftHome />
          }
          right={<Home />}
          footer={<Typography>Copyright &copy; {new Date().getFullYear()} Mortgage Agentic</Typography>}
        /> */}

   <Router>
    <ScrollToTop />
    <ToastProvider>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<MainHome />} />
          <Route path="login" element={<Login />} />
          <Route path="document-uploader" element={<DocumentUploader />} />
          <Route path='userprofile' element={<ProfilePage />} />
          <Route path='result' element={<Result />} />
          <Route path="signup" element={<AgreementInPrinciple />} />
          <Route path='agreementip' element={<AgreementInPrinciple />}/>
          <Route path='mortgage-introduction' element={<MortgageIntroduction />}/>

          <Route path='signup-success' element={<SignupSuccess/>}></Route>
          
          
          <Route path='apifinal' element={<ApiFinal />}/>
          
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
       </ToastProvider>
    </Router>
    </div>
  );
}

export default App;
