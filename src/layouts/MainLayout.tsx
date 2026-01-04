import { Outlet } from "react-router-dom";
import BackgroundFX from "../components/BackgroundFX";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
;

export default function App() {
  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <BackgroundFX />
      <Navbar />
      <main className="pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
