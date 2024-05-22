import styled from "styled-components"

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px;
  font-size: 17px;
  border-radius: 0.25rem;
`

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 30%;
  object-fit: cover;
`

export const ButtonBox = styled.div`
  display: flex;
  gap: 5px;
`

export const NoText = styled.div`
  font-size: 14px;
  text-align: center;
  padding: 5px;
`