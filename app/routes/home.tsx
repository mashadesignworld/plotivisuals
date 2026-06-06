import {ArrowRight, ArrowUpRight, Clock, Layers} from "lucide-react";
import Navbar from "../../components/Navbar";
import type { Route } from "./+types/home";
import { Button } from "../../components/ui/Button";
import Upload from "../../components/Upload";
import { useNavigate } from "react-router";
import { useState } from "react";
import {createProject} from "../../Lib/puter.action.ts"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [projects,setProjects] = useState<DesignItem[]>([]);

  const handleComplete = async (base64Image: string) => {
    const newId = Date.now().toString();
    const name = `Residence ${newId }`;

    const newItem = {
       id: newId, name, sourceImage: base64Image,
       renderedImage: undefined,
       timestamp: Date.now(), 
    }

    const saved = await createProject({ item: newItem, visibility: 'private'});

    if(!saved) {
      console.error("Failed to create project");
      return false;
    }
    setProjects((prev) => [newItem, ...prev]);
    // Store the base64 image in localStorage (or you can use a more robust state management solution)
    try {
      localStorage.setItem(`plot-${newId}`, base64Image);
    } catch (error) {
      console.warn("Could not cache image locally", error);
    }
    // Navigate to the visualizer page with the new ID
    navigate(`/visualizer/${newId}`,{
      state: {
        initialImage: saved.sourceImage,
        initialRendered: saved.renderedImage || null,
        name
      }
    });

      return true;
    
  };

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
      <div id="upload" className="upload-shell">
        <div className="grid-overlay"/>
        <div className="upload-card">
          <div className="upload-head">
            <div className="upload-icon">
                <Layers className="icon"/>
            </div>
            <h3>
              Upload your  floor plan and let our AI do the rest.
            </h3>
            <p>Supports JPG, PNG, formats up to 10MB</p>
          </div>
          <Upload onComplete={handleComplete} />
        </div>

      </div>
      </section>
<section className="projects py-12">
  <div className="section-inner max-w-7xl mx-auto px-4">
    <div className="section-head mb-8">
      <div className="copy">
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="text-slate-500">Your Latest work and shared community projects, all in one place</p>
      </div>
    </div>

    <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* --- Start Project Card --- */}
      {projects.map(({id, name, renderedImage, sourceImage, timestamp}) => {
        return (
          <div key={id} className="project-card group relative flex flex-col bg-white rounded-4xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-md">
    {/* Image Section */}
  <div className="relative aspect-video w-full overflow-hidden">
    <img 
      src={renderedImage || sourceImage}
      alt="Project"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute top-4 left-4">
      <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-800 shadow-sm uppercase tracking-wider">
        Community
      </span>
    </div>
  </div>
   {/* Card Body */}
  <div className="card-body">
                                  <div>
                                      <h3>{name}</h3>

                                      <div className="meta">
                                          <Clock size={12} />
                                          <span>{new Date(timestamp).toLocaleDateString()}</span>
                                          <span>By JS Mastery</span>
                                      </div>
                                  </div>
                                  <div className="arrow">
                                      <ArrowUpRight size={18} />
                                  </div>
                              </div>
</div>
        );
})}
   

 
      {/* --- End Project Card --- */}
    </div>
  </div>
</section>
      </div>
);
}
