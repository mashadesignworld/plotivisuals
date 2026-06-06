import {useLocation} from "react-router";

const visualizerId = () => {
  const location = useLocation();
   const initialImage = location.state?.initialImage;
  const initialRendered = location.state?.initialRendered;
  const name = location.state?.name;
  
  return (
    <section>
      <h1>{name || 'Untitled Project'}</h1>
      <div className="visualizer">
        {initialImage &&  (
          <div classname="image-container">
            <h2>Source Image</h2>
            <img src={initialImage} alt="source" />
          </div>
        )}
      </div>
    </section>
  )
}

export default visualizerId