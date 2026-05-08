import { ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import type { Route } from "./+types/home";
import { Button } from "../../components/ui/Button";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
  <div className="home">
    <Navbar />
    <section className="hero">
      <div className="announce">
        <div className="dot">
          <div className="pulse">

          </div>
        </div>
        <p>Introducing PlotiVisuals AI 2.0</p>
      </div>
      <h1>Turn Your Plot into a Palace with AI-Powered 3D Renders.</h1>
      <p className="subtitle">Stop guessing what your house will look like. Upload your 2D blue-prints and watch our AI generate photorealistic 3D renders in seconds—optimized for the Kenyan landscape.</p>
      <div className="actions">
        <a href="#upload" className="cta">Start Building <ArrowRight className="icon"/></a>
        <Button variant="outline" size="lg" className="demo">Learn More</Button>
      </div>
      </section>
      </div>
);
}
