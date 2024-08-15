import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Flex, Box, Text, Input, Button, Link as CLink } from "@chakra-ui/react";
import { signIn, getUser } from "./lib/api/auth.js";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await signIn({ email, password });
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      navigate("calendar");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getUser();
        if (res.data.isLogin) {
          navigate("calendar");
        }
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, [navigate])
  
  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="400px">
        <Text fontSize="24px" color="gray.700" fontWeight="bold" mb="24px">
          ログインページ
        </Text>
        <Input
          placeholder="メールアドレス"
          mb="16px"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          placeholder="パスワード"
          mb="16px"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button w="400px" colorScheme="blue" mb="8px" onClick={login}>
          ログインする
        </Button>
        <Box textAlign="right">
          <CLink color="blue.500">
            <Link to="/signUp">ユーザー登録はこちら</Link>
          </CLink>
        </Box>
      </Box>
    </Flex>
  );
}

export default App;
