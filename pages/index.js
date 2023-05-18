import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useRef } from 'react';

// 定时器
let timer = null
// 倒计时
let timer2 = null
const SECOND_DEFAULT = 5 // 循环播放开启的播放时长
const CYCLE_START = 30 // 循环播放的起始位置
export default function Home() {

  const videoRef = useRef(null)

  const jump = (min) => {
    if(timer) {
      clearInterval(timer)
    }
    if(timer2) {
      clearTimeout(timer2)
    }
    const anchor = min * 60
    videoRef.current.currentTime = anchor
    videoRef.current.play()
    // 视频播放5s后自动停止，开启循环
    timer = setTimeout(() => {
      console.log('开启循环')
      cycle()
    }, SECOND_DEFAULT * 1000)
  }

  // 循环播放
  const cycle = () => {
    if(timer2) {
      clearTimeout(timer2)
    }
    if(timer) {
      clearInterval(timer)
    }
    videoRef.current.currentTime = CYCLE_START
    timer2 = setTimeout(() => {
      console.log('倒计时10s结束，回溯')
      cycle()
    }, 10000)
  }

  return (
    <div className={styles.container}>

      <button onClick={() => jump(2)}>
        跳转指定进度 2mim
      </button>
      <button onClick={() => jump(3)}>
        跳转指定进度 3mim
      </button>
      <button onClick={() => jump(5)}>
        跳转指定进度 5mim
      </button>

      <main>
        <video ref={videoRef} id='video' style={{ width: 600 }} src={"http://127.0.0.1:5500/nextjs-blog/static/test.mp4"} controls={true}>
        </video>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
