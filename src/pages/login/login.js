import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text, RadioGroup, Label, Radio, Input } from "@tarojs/components";
import { AtButton, AtIcon, AtInput } from "taro-ui";
import GradientButton from "@app/component/GradientButton";

import "./Login.scss";

function Login(props) {
  const [numberVal, setNumberVal] = useState("");
  const [psd, setPsd] = useState("");
  const [numberIsNull, setNumberIsnull] = useState(false);
  const [psdIsNull, setPsdIsnull] = useState(false);
  const list = [
    {
      value: '家长',
      text: '家长',
      checked: true
    },
    {
      value: '老师',
      text: '老师',
      checked: false
    },
  ]
  const handleNumberChange = (e) => {
    if (e.length == 0) {
      setNumberIsnull(true);
    } else {
      setNumberVal(e);
      setNumberIsnull(false);
    }
  };
  const handlePsdChange = (e) => {
    if (e.length == 0) {
      setPsdIsnull(true);
    } else {
      setPsd(e);
      setPsdIsnull(false);
    }
    setPsd(e);
  };
  const handleLogin = () => {
    if (numberVal.length == 0) {
      setNumberIsnull(true);
    } else if (psd.length == 0) {
      setPsdIsnull(true);
    } else {
      Taro.switchTab({ url: "/pages/class/class" });
    }
  };
  const handleSign = (e) => {
    // Taro.getSetting({
    //     success: (res) => {
    //         if(!res.authSetting['scope.record']){
    //             console.log(111)
    //             Taro.authorize({
    //                 scope:'scope.record',
    //                 success:() => {
    //                     Taro.startLocationUpdateBackground()
    //                 }
    //             })
    //         }
    //         console.log(res)
    //     }
    // })
    // Taro.login({
    //   success: (res) => {
    //     console.log(res,'res');
    //     if (res.code) {
    //       Taro.request({
    //         url: "https://api.weixin.qq.com/sns/jscode2session",
    //         method:'GET',
    //         data: {
    //           code: res.code,
    //         },
    //       });
    //     } else {
    //       console.log("登录失败！" + res.errMsg);
    //     }
    //   },
    // });
    Taro.navigateTo({ url: `/pages/login/Register/Register?type=${e}` });
  };
  return (
    <View className='index'>
      <View className='container'>
        <View className='head'>
          <View className='avatar'></View>
          <View>家校共育</View>
        </View>
        <View className='login-input'>
          <View className='forget' onClick={() => handleSign(0)}>忘记密码？</View>
          <AtInput
            className={numberIsNull ? "error" : ""}
            title={<AtIcon value='user' size={25} color='#28a1fc'></AtIcon>}
            placeholder='请输入手机号'
            type='phone'
            value={numberVal}
            onChange={handleNumberChange}
          />
          {numberIsNull && <View className='error-tip'>请输入手机号</View>}
          <AtInput
            className={psdIsNull ? "error" : ""}
            title={<AtIcon value='lock' size={25} color='#28a1fc'></AtIcon>}
            placeholder='请输入密码'
            type='password'
            value={psd}
            onChange={handlePsdChange}
          />
          {psdIsNull && <View className='error-tip'>密码不能为空</View>}
        </View>
        <RadioGroup>
          {list.map((item,index) => {
            return<Label key={index}>
              <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio></Label>
          })}
        </RadioGroup>
        <View className='login-button'>
          <GradientButton
            type='primary'
            className='login'
            onClick={handleLogin}
          >
            登录
          </GradientButton>
          <GradientButton
            type='primary'
            className='signin'
            onClick={() => handleSign(1)}
          >
            注册
          </GradientButton>
        </View>
      </View>
    </View>
  );
}
export default Login;
