import axiosInstance from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';
import {JwtTokenVo, UserResponseDto, UserInDto} from "./type";

const userApi = () => {
  const usePostLogin = (opts = {}) => {
    const url = '/user/login';
    const fn = async (data: UserInDto): Promise<UserResponseDto> => {
      const response = await axiosInstance.post<UserResponseDto>(url, data);
      return response.data;
    };
    return useMutation({mutationFn:fn, ...opts});
  };

  const usePostRefreshToken = (opts = {}) => {
    const url = '/user/refresh';
    const fn = async (data: string): Promise<JwtTokenVo> => {
      const response = await axiosInstance.post<JwtTokenVo>(url, data);
      return response.data;
    };
    return useMutation({mutationFn:fn, ...opts});
  };


  return { usePostLogin, usePostRefreshToken }
}

export default userApi()
