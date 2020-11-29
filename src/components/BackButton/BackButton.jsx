import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

import "./BackButton.scss";

function BackButton(props) {
  const onBackClick = () => {
    props.history.push("/");
  };

  return (
    <div className="back-container">
      <Button
        className="back-button"
        variant="outline-dark"
        size="lg"
        onClick={onBackClick}
      >
        <FontAwesomeIcon icon={faLongArrowAltLeft} />
      </Button>
    </div>
  );
}

export default BackButton;
