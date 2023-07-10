import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ScrollToTop(props) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return props.children;
}

export default ScrollToTop;
