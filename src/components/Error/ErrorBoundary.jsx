import React from "react";
import { Card } from "react-bootstrap";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  goHome = () => {
    localStorage.clear();
    window.location.href = "/home";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Header
            history={this.props.history}
            setEngLangUI={this.props.setEngLang}
            engLangUI={this.props.engLang}
            toggleEye={this.props.toggleEye}
            setToggleEye={this.props.setToggleEye}
          />
          <Card style={{ textAlign: "center" }}>
            <Card.Header>
              {this.props.engLang
                ? "Something Went Wrong"
                : "केही गलत भयो, कृपया फेरि प्रयास गर्नुहोस्"}
            </Card.Header>
            <Card.Footer>
              <button className="btn btn-danger" onClick={this.goHome}>
                {this.props.engLang ? "Return Home" : "गृहपृष्ठ फर्किनु"}
              </button>
            </Card.Footer>
          </Card>
          <Footer />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
