import React, { useState } from 'react'
import './styles/Login.css'
import userApi from '../api/user/user'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Login = () => {
  const [id, setId] = useState('admin')
  const [pwd, setPwd] = useState('admin')
  const navigate = useNavigate()
  const {
    mutate: postLogin,
    isPending,
    isError,
    error,
    data,
  } = userApi.usePostLogin({
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data?.jwtToken?.accessToken)
      localStorage.setItem('refreshToken', data?.jwtToken?.refreshToken)
      alert('환영합니다!')
    },
    onError: (error) => {
      alert(error)
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    await postLogin({ id, pwd })
  }


  return (
    <div className='login-card'>
      <h2>Login example</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor='id'>ID</label>
          <input
            disabled={true}
            type='text'
            id='id'
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Password</label>
          <input
            disabled={true}
            type='password'
            id='password'
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
        </div>
        <button type='submit' disabled={isPending} className='login-button'>
          {isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {data?.jwtToken?.accessToken && (
        <div className='login-info'>
          <h3>JWT token / Localstorage 사용 방식으로 구현하기</h3>
          <ul>
            <li>
              <strong>Button event 호출</strong>
            </li>
            <li>
              <strong>Controller 단에서 PWD → SHA256 변환</strong>
              <br />
              데이터베이스에 저장된 비밀번호는 이미 암호화된 상태로 존재합니다. 이 과정은 단방향
              암호화 방식이기 때문에 만약 사용자가 비밀번호를 잃어버린 경우 재발급으로 비밀번호를
              설정할 수 있습니다.
            </li>
            <li>
              <strong>Service 회원 확인</strong>
              <br />
              일치하는 사용자를 조회하고 없으면 로그인 실패 메세지를 return 합니다.
            </li>
            <li>
              <strong>Access token, Refresh token 생성</strong>
              <br />
              인증 성공 시, Access Token과 Refresh Token을 생성합니다.
              <br />
              Access Token: 사용자의 정보와 만료시간 그리고 비밀키가 들어있습니다.
              <br />
              Refresh Token: Access Token이 만료되었을 때 새로 생성하기 위한 Token 입니다.
              <br />
              Refresh Token 의 시간이 만료되지 않는다면 무한 Refresh 가능한 방식입니다.
            </li>
            <li>
              <strong>Localstorage 에 Token 저장</strong>
              <br />
              서버로부터 전달 받은 Access token 과 Refresh token 을 Localstorage 에 저장합니다.
            </li>
            <li>
              <strong>Axios 에서 Token 사용</strong>
              <br />
              Token 은 Header 에 담아 서버에 전달합니다.<br />
              api 호출 시, Axios intercepter 에서 Token 검증을 미리 할 수 있습니다.
              이를 통해 클라이언트는 상태를 유지할 수 있습니다.
            </li>
            <li>
              <strong>서버에서 Token 확인</strong>
              <br />
              Header 에 담긴 Token 을 Spring filter 단계에서 추출 후 검증합니다. 이후 올바른 Token 이면
              Controller 에 접근할 수 있습니다.
            </li>
            <li>
              <strong>Refresh token 사용</strong>
              <br />
              Access token 이 만료된 경우, 저장된 Refresh token 을 사용하여 새로운 Access token 을
              요청합니다. 이 과정에서 Refresh token 이 유효한지 검증한 후 새로운 Access token 을
              발급받습니다.
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Login
