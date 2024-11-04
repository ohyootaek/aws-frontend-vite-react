import axios from 'axios'
import { RefreshResponse } from './type'

const accessToken = localStorage.getItem('accessToken')
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 2000,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // 토큰 만료 에러 코드 확인 및 토큰 갱신 로직
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // 중복 요청 방지 플래그

      try {
        // 리프레시 토큰을 사용해 새 액세스 토큰 요청
        const refreshToken = localStorage.getItem('refreshToken')
        const response: Axios.AxiosXHR<RefreshResponse> = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user/refresh`,
          {
            refreshToken,
          },
        )

        // 새로운 액세스 토큰 저장 후 다시 요청
        const newAccessToken = response.data.accessToken
        const newRefleshToken = response.data.refreshToken
        localStorage.setItem('accessToken', newAccessToken)
        localStorage.setItem('refreshToken', newRefleshToken)
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

        return axiosInstance(originalRequest) // 원래 요청 재실행
      } catch (err) {
        localStorage.clear();
        return Promise.reject(err)
      }
    }
    localStorage.clear();
    return Promise.reject(error)
  },
)
export default axiosInstance
