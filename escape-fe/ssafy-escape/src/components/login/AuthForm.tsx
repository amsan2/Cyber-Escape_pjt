import styled from "styled-components"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import Button from "../common/Button"
import Input from "../common/Input"
import { MainColor } from "@/styles/palette"

const AuthForm = ({
  mainText,
  buttonText,
  loginId,
  password,
  setLoginId,
  setPassword,
  onBack,
  onSubmit,
}: AuthFormProps) => {
  return (
    <div>
      <BackIcon onClick={() => onBack()}>
        <ArrowBackIosNewIcon />
      </BackIcon>
      <Form onSubmit={(e) => onSubmit(e)}>
        <MainText>{mainText}</MainText>
        <Input
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          required
        />
        <Input
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          minLength={6}
          maxLength={20}
          required
        />
        <Button text={buttonText} theme="success" type="submit" />
      </Form>
    </div>
  )
}

export default AuthForm

const MainText = styled.div`
  font-size: 35px;
  color: ${MainColor};
`

const BackIcon = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`
