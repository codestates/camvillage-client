import React, { useEffect, useState } from 'react';
import axios from "axios";
import { userAlter } from '../actions/index';
import { withRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function Alter(props) {

  const state = useSelector((state) => state)
  console.log('Alter state = ', state)
  
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    UserId: state.userInfo.user_id,
    Password: '',
    ConfirmPassword: '',
    Name: state.userInfo.name,
    NickName: state.userInfo.nickname,
    Email: state.userInfo.email,
  })
  const { UserId, Password, ConfirmPassword, Name, NickName, Email } = inputs;

  const [errorInputs, setErrorInputs] = useState({
    ErrorAll: '',
    ErrorPassword: '',
  })
  const { ErrorAll, ErrorPassword} = errorInputs;

  const onChange = (e) => {
    const {value, name} = e.currentTarget;
    console.log(e.currentTarget)
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const handleError = (name, value) => {
    setErrorInputs({
      ...errorInputs,
      [name]: value,
    })
  }

  useEffect(() => {
    if (Password !== ConfirmPassword) {
      handleError('ErrorPassword', '비밀번호, 비밀번호확인란이 일치하지 않습니다.')
    } else {
      handleError('ErrorPassword', '');
    }
  }, [ConfirmPassword, Password])

  const handleAlter = () => {
  
    console.log('userId', UserId, 'password', Password)

    const isTrue = UserId !== '' && Password !== '' &&
      NickName !== '' && Name !== '' && Email !== '';

    if (!isTrue) {
      handleError('ErrorAll', '모든 항목을 입력하지 않았습니다.')
    } else {
      handleError('ErrorAll', '')
      axios
      .put('http://localhost:4000/user/alter',
      {
        user_id: UserId,
        password: Password,
        nickname: NickName,
        email: Email,
      },
      {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data)
        dispatch(userAlter(res.data))
      })
      .then((res) => {
        console.log('회원정보수정에 성공했습니다');
        props.history.push('/user/mypage')
      })
      .catch((e) => {
        console.log(e)
      })
    }
  }

  return (
    <div id='alter-body'>
      <div id='leftside'>
        <img alt=""></img>
        <div>
          <button>사진 추가/변경</button>
        </div>
      </div>
      <div id='alter-rightside'>
        <div>
          <span>아이디:  </span>
          <input type='alterId' value={UserId} name="UserId" onChange={onChange}></input>
        </div>
        <div>
          <span>닉네임:   </span>
          <input type='alterNickname' value={NickName} name="NickName" onChange={onChange}></input>
        </div>
        <div>
          <span>이름:   </span>
          <div type='alterName' value={Name} name="Name">{props.userInfo.name}</div>
        </div>
        <div>
          <span>이메일:   </span>
          <input type='alterEmail' value={Email} name="Email" onChange={onChange}></input>
        </div>
        <div>
          <span>비밀먼호:   </span>
          <input type='alterPassword' name="Password" onChange={onChange}></input>
        </div>
        <div>
          <span>비밀먼호 확인:   </span>
          <input type='alterConfirmPassword' name="ConfirmPassword" onChange={onChange}></input>
        </div>
        <Route
          render={() => {
            if (ErrorPassword !== '') {
              return (
                <div className='alert-box'>
                  {ErrorPassword}
                </div>
              );
            }
          }}
        />
        <button className='btnalter' type='submit' onClick={handleAlter}>
          수정하기
      </button>
        <Route
          render={() => {
            if (ErrorAll !== '') {
              return (
                <div className='alert-box'>
                  {ErrorAll}
                </div>
              );
            }
          }}
        />
      </div>
    </div>
  );
}

export default withRouter(Alter);