import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function PageNotFound() {
  return(
    <>  
      <div className="not-found">
        <h3 className="not-found__title">
         <span>404</span> - Страница не найдена
        </h3>
        <Link className="not-found__button link-effect" to="/">На главную страницу</Link>
      </div>
    <Footer />
    </>
    )
}

export default PageNotFound