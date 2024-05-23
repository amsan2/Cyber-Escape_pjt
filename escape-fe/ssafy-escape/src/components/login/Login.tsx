"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { styled } from "styled-components"
import postSignUp from "@/services/user/postSignUp"
import useUserStore from "@/stores/UserStore"
import ALERT_MESSAGES from "@/constants/alertMessages"
import ERROR_MESSAGES from "@/constants/errorMessages"
import CustomAlert from "../common/CustomAlert"
import AuthForm from "./AuthForm"
import CheckValidateId from "@/utils/CheckValidateId"
import Button from "@/components/common/Button"
import Container from "@/components/common/Container"
import { MainColor } from "@/styles/palette"


// 로그인
const Login = ({ handleLoginback }: LoginProps) => {
  const router = useRouter()
  const { login } = useUserStore()
  const [loginId, setLoginId] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isSignUpClicked, setIsSignUpClicked] = useState<boolean>(false) // 회원가입 창인지 여부

  // 로그인 버튼 클릭 시
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 아이디 유효성 검사
    if (!CheckValidateId(loginId)) return

    // 아이디 유효성 검사 통과 시
    try {
      await login(loginId, password)
      CustomAlert({ title: ALERT_MESSAGES.AUTH.LOGIN })
      router.push("/main") // 로그인 후 메인 페이지로 이동
    } catch (error) {
      if (error instanceof Error) {
        CustomAlert({ title: error.message || ERROR_MESSAGES.GENERIC_ERROR })
      }
    }
  }

  // 회원가입 버튼 클릭 시
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 아이디 유효성 검사
    if (!CheckValidateId(loginId)) return

    // 아이디 유효성 검사 통과 시
    try {
      await postSignUp(loginId, password)
      CustomAlert({ title: ALERT_MESSAGES.AUTH.SIGNUP })
      handleLoginback()
    } catch (error) {
      if (error instanceof Error) {
        CustomAlert({ title: error.message || ERROR_MESSAGES.GENERIC_ERROR })
      }
    }
  }

  // 회원가입 창에서 뒤로가기 클릭 시
  const handleSignUpBack = () => {
    setIsSignUpClicked(false)
    setLoginId("")
    setPassword("")
  }

  // 로그인 창에서 회원가입 클릭 시
  const handleGoSignUp = () => {
    setIsSignUpClicked(true)
    setLoginId("")
    setPassword("")
  }

  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      isBackButton={false}
    >
      {!isSignUpClicked ? (
        <div>
          <AuthForm
            mainText="LOGIN"
            buttonText="로그인"
            loginId={loginId}
            password={password}
            setLoginId={setLoginId}
            setPassword={setPassword}
            onBack={() => handleLoginback()}
            onSubmit={(e) => handleLogin(e)}
          />
          <hr />
          <SubContainer>
            <SubText>계정이 없으신가요?</SubText>
            <Button
              text="회원가입"
              theme="success"
              onClick={() => handleGoSignUp()}
            />
          </SubContainer>
        </div>
      ) : (
        <AuthForm
          mainText="SIGN UP"
          buttonText="회원가입"
          loginId={loginId}
          password={password}
          setLoginId={setLoginId}
          setPassword={setPassword}
          onBack={() => handleSignUpBack()}
          onSubmit={(e) => handleSignUp(e)}
        />
      )}
    </Container>
  )
}

export default Login

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 50px;
`

const SubText = styled.div`
  font-size: 12px;
  color: ${MainColor};
`
