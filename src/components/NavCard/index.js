import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
export default props => {
  const { title, desc, icon, path ,outer} = props;
  const Content = (
    <div style={{display:'flex',height:'100%',width:'100%'}}>
      <div className="nav-left">{icon}</div>
      <div className="nav-right">
        <div className="nav-right-up">{title}</div>
        <div className="nav-right-down">{desc}</div>
      </div>
    </div>
  );
  return outer ? (
    <a href={path} target="_blank" rel="noopener noreferrer" className='navcard-wrapper'>
      {Content}
    </a>
  ) : (
    <Link to={path} className="navcard-wrapper">
      {Content}
    </Link>
  );
};
