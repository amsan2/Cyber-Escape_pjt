import Image from "next/image"
import styled from "styled-components"

// 내 프로필 중 프로필 이미지 section 
const ProfileImageSection = ({
  profileImg,
  handleImgClick,
  handleChangeImg,
}: ProfileImageSectionProps) => {
  return (
    <ImageContainer>
      <ProfileImg src={profileImg} alt="내 프로필 이미지" />
      <WhiteEditIcon
        src={process.env.NEXT_PUBLIC_IMAGE_URL + "/image/edit_white.png"}
        alt="프로필 이미지 수정 아이콘"
        width={25}
        height={25}
        onClick={handleImgClick}
      />
      <input
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleChangeImg}
      />
    </ImageContainer>
  )
}

export default ProfileImageSection

const WhiteEditIcon = styled(Image)`
  opacity: 0.5;
  cursor: pointer;
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5));
  position: absolute;
  bottom: 13px;
  right: 13px;
`

const ProfileImg = styled.img`
  border-radius: 30px;
  width: inherit;
  height: inherit;
  object-fit: cover;
`

const ImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`

