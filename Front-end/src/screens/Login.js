import React, { useRef } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/URL";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Tooltip,
  Overlay,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { logged, messageAlram, tokenData } from "../Apollo";
import { useCookies } from "react-cookie";
import { addPath } from "graphql/jsutils/Path";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [LoginError, setLoginError] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["login"]);
  const target = useRef(null);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickLogin = () => {
    const data = {
      email: email,
      password: password,
    };
    console.log(data);

    axios
      .post(SERVER_URL + "/api/v1/auth/login", data)
      .then((res) => {
        console.log(res);
        if (res.status === 400 || res.status === 500) {
          console.log("here");
          setLoginError(true);
        } else {
          localStorage.setItem(
            "TOKEN",
            `${res.data.data.grantType} ` + `${res.data.data.accessToken}`
          );
          console.log(localStorage.getItem("TOKEN"));
          setLoginError(false);
          tokenData(localStorage.getItem("TOKEN"));
          logged(true);
          props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginError(true);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  return (
    <Container
      className="justify-content-center align-self-center"
      style={{ height: "100vh" }}
    >
      <Row
        className="justify-content-md-center "
        style={{ marginTop: "10rem" }}
      >
        {/* <Link to="/"> */}
        <h1 style={{ marginBottom: "3rem", color: "#03c7f5" }}>
          HighSchool Time
        </h1>
        {/* </Link> */}
      </Row>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <Form>
            <Form.Group controlId="formHorizontalEmail">
              <Col>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={onChangeEmail}
                  onKeyPress={handleKeyPress}
                />
              </Col>
            </Form.Group>
            <Form.Group controlId="formHorizontalPassword">
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={onChangePassword}
                  onKeyPress={handleKeyPress}
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Col>
                <Button
                  type="button"
                  style={{
                    width: "100%",
                    backgroundColor: "#03c7f5",
                    border: "none",
                  }}
                  onClick={() => {
                    onClickLogin();
                  }}
                  ref={target}
                >
                  로그인
                </Button>
                <Overlay
                  target={target.current}
                  show={LoginError}
                  placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      로그인 오류!<br></br>
                      <strong>이메일</strong> 또는 <strong>비밀번호</strong>를{" "}
                      <br />
                      확인해주세요.
                    </Tooltip>
                  )}
                </Overlay>

                <Button
                  type="button"
                  style={{
                    width: "100%",
                    marginTop: "0.3rem",
                    backgroundColor: "#03c7f5",
                    border: "none",
                  }}
                  onClick={() => {
                    props.history.push("/register");
                  }}
                >
                  회원가입
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
