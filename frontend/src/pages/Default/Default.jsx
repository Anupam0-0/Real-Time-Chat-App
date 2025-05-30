import React from 'react'
import styled from 'styled-components'
const Default = () => {
  return (
    <div className='h-screen px-20 pt-10 bg-neutral-950 flex flex-col justify-between'>

      <div className="text-sky-50 text-5xl">
        <h1 className='text-center' >404: Page not found!</h1>
      </div>

      <Loader />

    </div>
  )
}

export default Default


const Loader = () => {
  return (
    <StyledWrapper>
      <div className="master-container">
        <div className="container">
          <div className="crescent">
            <span /><span />
          </div>
          <div className="star s1">
            <span /><span />
          </div>
          <div className="star s2">
            <span /><span />
          </div>
          <div className="star s3">
            <span /><span />
          </div>
          <div className="star s4">
            <span /><span />
          </div>
          <div className="star s5">
            <span /><span />
          </div>
          <div className="small-star ss1">
            <span /><span />
          </div>
          <div className="small-star ss2">
            <span /><span />
          </div>
          <div className="small-star ss3">
            <span /><span />
          </div>
          <div className="small-star ss4">
            <span /><span />
          </div>
          <div className="small-star ss5">
            <span /><span />
          </div>
          <div className="small-star ss6">
            <span /><span />
          </div>
          <div className="small-star ss7">
            <span /><span />
          </div>
          <div className="small-star ss8">
            <span /><span />
          </div>
          <div className="hut">
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
            <div className="doorway">
              <hr className="split" />
            </div>
          </div>
          <div className="fire-pit">
            <div className="fire">
              <div className="inner-fire">
              </div>
            </div>
            <hr className="log1" />
            <hr className="log2" />
          </div>
          <div className="tree one">
            <hr className="trunc" />
            <hr className="leaves" />
            <hr className="leaves" />
            <hr className="leaves" />
            <hr className="leaves" />
          </div>
          <div className="tree two">
            <hr className="trunc" />
            <hr className="leaves" />
            <hr className="leaves" />
            <hr className="leaves" />
            <hr className="leaves" />
          </div>
          <div className="tree three">
            <hr className="trunc" />
            <hr className="leaves" />
            <hr className="leaves" />
            <hr className="leaves" />
            <hr className="leaves" />
          </div>
          <div className="tree four">
            <hr className="trunc" />
            <hr className="leaves" />
            <hr className="leaves" />
            <hr className="leaves" />
            <hr className="leaves" />
          </div>
          <div className="hill" />
        </div>
      </div>

    </StyledWrapper>
  )
}


const StyledWrapper = styled.div`
  .master-container {
    margin: 0;
    padding: 20px 40px;
    background-color: #0a0a0a;
    display: grid;
    border-radius: 13px;
    transform: scale(0.7);
  }

  .container {
    width: 600px;
    height: 600px;
    position: relative;
    margin: auto;
    border-radius: 50%;
    border: 2px solid white;
    overflow: hidden;
  }

  .crescent {
    position: relative;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    left: calc(50% - 25px);
    top: 12px;
    overflow: hidden;
    animation: rotate 3s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .crescent span:nth-child(2) {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 0 2px white;
    border-radius: 50%;
  }

  .crescent span:nth-child(1) {
    background-color: #131516;
    position: absolute;
    left: 40%;
    display: block;
    width: calc(70% - 6px);
    height: calc(70% - 6px);
    box-shadow: inset 0 0 0 2px white;
    border-radius: 50%;
    z-index: 9;
  }

  .star {
    position: absolute;
    overflow: hidden;
    border-radius: 50%;
    height: 20px;
    width: 20px;
  }

  .star span:nth-child(1)::before {
    content: "";
    border: 2px solid white;
    height: 50%;
    width: 50%;
    border-top-color: transparent;
    border-left-color: transparent;
    border-radius: 0% 0% 100% 10%;
    display: block;
    left: -3px;
    top: -3px;
    position: absolute;
  }

  .star span:nth-child(1)::after {
    content: "";
    border: 2px solid white;
    height: 50%;
    width: 50%;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-radius: 0% 100% 0% 0%;
    display: block;
    left: -3px;
    bottom: -3px;
    position: absolute;
  }

  .star span:nth-child(2)::before {
    content: "";
    border: 2px solid white;
    height: 50%;
    width: 50%;
    border-top-color: transparent;
    border-right-color: transparent;
    border-radius: 0% 0% 0% 100%;
    display: block;
    right: -3px;
    top: -3px;
    position: absolute;
  }

  .star span:nth-child(2)::after {
    content: "";
    border: 2px solid white;
    height: 50%;
    width: 50%;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-radius: 100% 0% 0% 0%;
    display: block;
    right: -3px;
    bottom: -3px;
    position: absolute;
  }

  .small-star {
    position: absolute;
    overflow: hidden;
    border-radius: 50%;
    height: 12px;
    width: 12px;
  }

  .small-star span:nth-child(1)::before {
    content: "";
    border: 1.5px solid white;
    height: 50%;
    width: 50%;
    border-top-color: transparent;
    border-left-color: transparent;
    border-radius: 0% 0% 100% 10%;
    display: block;
    left: -2px;
    top: -2px;
    position: absolute;
  }

  .small-star span:nth-child(1)::after {
    content: "";
    border: 1.5px solid white;
    height: 50%;
    width: 50%;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-radius: 0% 100% 0% 0%;
    display: block;
    left: -2px;
    bottom: -2px;
    position: absolute;
  }

  .small-star span:nth-child(2)::before {
    content: "";
    border: 1.5px solid white;
    height: 50%;
    width: 50%;
    border-top-color: transparent;
    border-right-color: transparent;
    border-radius: 0% 0% 0% 100%;
    display: block;
    right: -2px;
    top: -2px;
    position: absolute;
  }

  .small-star span:nth-child(2)::after {
    content: "";
    border: 1.5px solid white;
    height: 50%;
    width: 50%;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-radius: 100% 0% 0% 0%;
    display: block;
    right: -2px;
    bottom: -2px;
    position: absolute;
  }

  .s1 {
    left: 60px;
    top: 50px;
    animation: glow 1.1s 0.9s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .s2 {
    right: 35px;
    bottom: 155px;
    animation: glow 1.3s 0.5s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .s3 {
    left: calc(50% - 10px);
    top: 75px;
    animation: glow 1.5s 0.3s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .s4 {
    left: 35px;
    bottom: 155px;
    animation: glow 3s 0.7s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .s5 {
    right: 60px;
    top: 50px;
    animation: glow 2s 1.2s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .ss1 {
    right: 15px;
    bottom: 130px;
    animation: glow 2s 1s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .ss2 {
    left: 15px;
    bottom: 130px;
    animation: glow 1s 0s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .ss3 {
    left: 35px;
    bottom: 195px;
    animation: glow 1.9s 0.1s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .ss4 {
    right: 35px;
    bottom: 195px;
    animation: glow 1.6s 0.9s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .ss5 {
    left: 100px;
    bottom: 180px;
    animation: glow 1s 0.5s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .ss6 {
    right: 100px;
    bottom: 180px;
    animation: glow 1.7s 0.6s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .ss7 {
    right: 90px;
    top: 30px;
    animation: glow 0.8s 0.8s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .ss8 {
    left: 90px;
    top: 30px;
    animation: glow 1.8s 0.3s cubic-bezier(0.15, 0.83, 0.66, 1) infinite;
  }

  .hill {
    display: block;
    width: 140%;
    height: 100%;
    border: 2px solid white;
    border-radius: 50%;
    bottom: -40%;
    position: relative;
    left: -20%;
    background-size: 3%;
    background-repeat: repeat;
    opacity: 0.7;
  }

  .fire-pit {
    width: 18px;
    height: 30px;
    position: absolute;
    left: calc(50% - 9px);
    bottom: 25px;
    z-index: 99;
  }

  .fire {
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-bottom: 18px solid #ffffff;
    position: relative;
    top: -9px;
  }

  .fire:after {
    content: "";
    position: absolute;
    left: -9px;
    top: 18px;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-top: 9px solid #ffffff;
  }

  .inner-fire {
    width: 0;
    height: 0;
    border: 4.5px solid transparent;
    border-bottom: 9px solid #131516;
    top: 4.5px;
    position: absolute;
    z-index: 9;
    left: -4.5px;
  }

  .inner-fire:after {
    content: "";
    position: absolute;
    left: -4.5px;
    top: 9px;
    width: 0;
    height: 0;
    border: 4.5px solid transparent;
    border-top: 6px solid #131516;
  }

  .log1 {
    background-color: white;
    height: 2px;
    transform: rotate(35deg);
    transform-origin: center;
    position: relative;
    left: -3px;
    bottom: -1.5px;
  }

  .log2 {
    background-color: white;
    height: 2px;
    transform: rotate(-35deg);
    transform-origin: center;
    left: 3px;
    position: relative;
    bottom: -0px;
  }

  .hut {
    width: 0;
    height: 0;
    border-left: 38px solid transparent;
    border-right: 38px solid transparent;
    border-bottom: 75px solid #131516;
    position: absolute;
    left: calc(50% - 37.6px);
    z-index: 11;
    bottom: 80px;
    transform: scale(1.3);
  }

  .hut hr:nth-child(1) {
    height: 0px;
    position: absolute;
    width: 75px;
    bottom: -75px;
    left: calc(50% - 37.6px);
  }

  .hut hr:nth-child(2) {
    height: 0px;
    position: absolute;
    width: 96px;
    bottom: -32px;
    left: -32px;
    transform: rotate(63.5deg);
    border: 1px solid white;
  }

  .hut hr:nth-child(3) {
    height: 0px;
    position: absolute;
    width: 96px;
    bottom: -32px;
    right: -32px;
    transform: rotate(-63.5deg);
    border: 1px solid white;
  }

  .hut hr:nth-child(4) {
    height: 0px;
    position: absolute;
    width: 60px;
    bottom: -60px;
    left: -30px;
    border: 0.5px solid white;
  }

  .hut hr:nth-child(5) {
    height: 0px;
    position: absolute;
    width: 55px;
    bottom: -55px;
    left: -27.5px;
    border: 0.5px solid white;
  }

  .hut hr:nth-child(6) {
    height: 0px;
    position: absolute;
    width: 50px;
    bottom: -50px;
    left: -25px;
    border: 0.5px solid white;
  }

  .doorway {
    width: 0;
    height: 0;
    border-left: 22px solid transparent;
    border-right: 22px solid transparent;
    border-bottom: 42px solid #131516;
    position: relative;
    left: -22px;
    bottom: -32px;
  }

  .doorway::before {
    content: "";
    border-left: 1px solid white;
    width: 0px;
    height: 48px;
    display: inline-block;
    transform: rotate(-27deg);
    left: 11px;
    position: absolute;
    bottom: -45px;
  }

  .doorway::after {
    content: "";
    border-left: 1px solid white;
    width: 0px;
    height: 48px;
    display: inline-block;
    transform: rotate(27deg);
    left: -11px;
    position: absolute;
    bottom: -45px;
  }

  .doorway > hr.split {
    height: 44px;
    width: 1px;
    position: absolute;
    left: 0px;
    top: 0;
    display: inline-block;
    background-color: white;
    border: 0;
  }

  /* Trees */
  .tree {
    position: absolute;
    width: 25px;
    height: 48px;
    z-index: 21;
    transform: scale(1.3);
  }

  .tree .trunc {
    height: 48px;
    width: 1px;
    background-color: white;
    left: 12.5px;
    position: absolute;
    margin-top: 1.5px;
  }

  .tree .leaves {
    height: 18px;
    width: 18px;
    transform: rotate(45deg);
    border-left: 1.5px solid white;
    border-top: 1.5px solid white;
    border-bottom: 0;
    border-right: 0;
    margin-bottom: -15px;
    margin-top: 5px;
    left: 4px;
    position: relative;
  }

  .one {
    left: 30px;
    bottom: 90px;
  }

  .two {
    right: 30px;
    bottom: 90px;
  }

  .three {
    left: 80px;
    bottom: 115px;
  }

  .four {
    right: 80px;
    bottom: 115px;
  }

  .loading-text {
    color: white;
    font-family: 'Inter', sans-serif;
    display: block;
    text-align: center;
    padding: 20px 0 0 0;
    opacity: 0.8;
  }

  @keyframes glow {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    50% {
      transform: rotate(10deg);
    }

    100% {
      transform: rota(0);
    }
  }`;