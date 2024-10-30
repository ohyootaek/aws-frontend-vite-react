export interface JwtTokenVo {
  accessToken: string
  refreshToken: string
}

export interface UserInDto {
  id: string
  pwd: string
}

export interface UserOutVo {
  id: string
  pwd: string
  phone: string
  name: string
  address: string
  email: string
  image_path: string
  role: string
}

export interface UserResponseDto {
  userInfo: UserOutVo
  jwtToken: JwtTokenVo
}
