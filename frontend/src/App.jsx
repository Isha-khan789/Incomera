import { useEffect } from "react";
import useLegacyScripts from "./hooks/useLegacyScripts.js";
import CrmDocTemplate from "./components/CrmDocTemplate.jsx";
import Nav from "./components/Nav.jsx";
import Top from "./components/Top.jsx";
import Outbound from "./components/Outbound.jsx";
import Serve from "./components/Serve.jsx";
import Fit from "./components/Fit.jsx";
import Offer from "./components/Offer.jsx";
import Packages from "./components/Packages.jsx";
import Stack from "./components/Stack.jsx";
import Sec from "./components/Sec.jsx";
import Faq from "./components/Faq.jsx";
import Dmodal from "./components/Dmodal.jsx";
import Amodal from "./components/Amodal.jsx";
import Lmodal from "./components/Lmodal.jsx";
import Pmodal from "./components/Pmodal.jsx";
import Careerswrap from "./components/Careerswrap.jsx";
import Crexit2 from "./components/Crexit2.jsx";
import Adminwrap from "./components/Adminwrap.jsx";
import Aemwrap from "./components/Aemwrap.jsx";
import Evmwrap from "./components/Evmwrap.jsx";
import Crtoast from "./components/Crtoast.jsx";
import Rvwwrap from "./components/Rvwwrap.jsx";
import Footer from "./components/Footer.jsx";
import Crmroot from "./components/Crmroot.jsx";
import Crmframewrap from "./components/Crmframewrap.jsx";
import Bkmodal from "./components/Bkmodal.jsx";
import Chatw from "./components/Chatw.jsx";

export default function App() {
  // The stylesheet styles #crmRoot and a lot of body-level state classes, so
  // the legacy scripts expect to be able to toggle classes on <body>.
  useEffect(() => {
    document.documentElement.classList.remove("no-js");
  }, []);

  useLegacyScripts();

  return (
    <>
      <Nav />
      <Top />
      <Outbound />
      <Serve />
      <Fit />
      <Offer />
      <Packages />
      <Stack />
      <Sec />
      <Faq />
      <Dmodal />
      <Amodal />
      <Lmodal />
      <Pmodal />
      <Careerswrap />
      <Crexit2 />
      <Adminwrap />
      <Aemwrap />
      <Evmwrap />
      <Crtoast />
      <Rvwwrap />
      <Footer />
      <Crmroot />
      <Crmframewrap />
      <Bkmodal />
      <Chatw />
      <CrmDocTemplate />
    </>
  );
}
