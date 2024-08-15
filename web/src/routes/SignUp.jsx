import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Flex, Box, Text, Input, Button, Link as CLink } from "@chakra-ui/react";
import { signUp } from "../lib/api/auth.js";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = async () => {
        try {
            const res = await signUp({ email, password });
            Cookies.set("_access_token", res.headers["access-token"]);
            Cookies.set("_client", res.headers["client"]);
            Cookies.set("_uid", res.headers["uid"]);
            navigate("/calendar");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Flex
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Box w="400px">
            <Text fontSize="24px" color="gray.700" fontWeight="bold" mb="24px">
              ユーザー登録ページ
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
            <Button w="400px" colorScheme="blue" mb="8px" onClick={register}>
              登録する
            </Button>
            <Box textAlign="right">
              <CLink color="blue.500">
                <Link to="/signUp">ログインはこちら</Link>
              </CLink>
            </Box>
          </Box>
        </Flex>
      );
};

export default SignUp;