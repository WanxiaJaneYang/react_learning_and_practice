import './index.css'
import avatar from './images/avatar.png'
import { useState } from 'react'

// 依赖的数据
const state = {
  // hot: 热度排序  time: 时间排序
  tabs: [
    {
      id: 1,
      name: '热度',
      type: 'hot',
      active: true
    },
    {
      id: 2,
      name: '时间',
      type: 'time',
      active: false
    }
  ],
  list: [
    {
      id: 1,
      author: '刘德华',
      comment: '给我一杯忘情水',
      time: new Date('2021-10-10 09:09:00'),
      // 1: 点赞 0：无态度 -1:踩
      attitude: 1
    },
    {
      id: 2,
      author: '周杰伦',
      comment: '哎哟，不错哦',
      time: new Date('2021-10-11 09:09:00'),
      // 1: 点赞 0：无态度 -1:踩
      attitude: 0
    },
    {
      id: 3,
      author: '五月天',
      comment: '不打扰，是我的温柔',
      time: new Date('2021-10-11 10:09:00'),
      // 1: 点赞 0：无态度 -1:踩
      attitude: -1
    }
  ]
}

//time is an instance of Date 
function formatDate(time) {
  return time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate()
}

function App() {
  //默认active值为"hot"
  const [active, setActive] = useState("hot")
  const [state, setState] = useState({
    tabs: [
      {
        id: 1,
        name: '热度',
        type: 'hot',
        active: true
      },
      {
        id: 2,
        name: '时间',
        type: 'time',
        active: false
      }
    ],
    list: [
      {
        id: 1,
        author: '刘德华',
        comment: '给我一杯忘情水',
        time: new Date('2021-10-10 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1
      },
      {
        id: 2,
        author: '周杰伦',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0
      },
      {
        id: 3,
        author: '五月天',
        comment: '不打扰，是我的温柔',
        time: new Date('2021-10-11 10:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1
      }]
  })
  //通过点击对应type改变active取值
  function handleSortClick(type) {
    setActive(type);
  }

  function handleFavorClick(id) {
    const updateState = { ...state }
    const index = updateState.list.findIndex(comment => comment.id === id)
    if (updateState.list[index].attitude === 1) {
      updateState.list[index].attitude = 0
    } else {
      updateState.list[index].attitude = 1
    }
    setState(updateState)
  }

  function handleHateClick(id) {
    const updateState = { ...state }
    const index = updateState.list.findIndex(comment => comment.id === id)
    if (updateState.list[index].attitude === -1) {
      updateState.list[index].attitude = 0
    } else {
      updateState.list[index].attitude = -1
    }
    setState(updateState)
  }

  return (
    <div className="App">
      <div className="comment-container">
        {/* 评论数 */}
        <div className="comment-head">
          <span>5 评论</span>
        </div>
        {/* 排序 */}
        <div className="tabs-order">
          <ul className="sort-container">{
            //用map 列出两个tab(按热度排序和按时间排序)，点击对应tab会改变active值
            state.tabs.map(sort => (
              //如果不写()=>就丧失作用
              <li onClick={() => handleSortClick(sort.type)} key={sort.id} className={sort.type === active ? "on" : ""}>按{sort.name}排序</li>
            ))
          }
          </ul>
        </div>

        {/* 添加评论 */}
        <div className="comment-send">
          <div className="user-face">
            <img className="user-head" src={avatar} alt="" />
          </div>
          <div className="textarea-container">
            <textarea
              cols="80"
              rows="5"
              placeholder="发条友善的评论"
              className="ipt-txt"
            />
            <button className="comment-submit">发表评论</button>
          </div>
          <div className="comment-emoji">
            <i className="face"></i>
            <span className="text">表情</span>
          </div>
        </div>

        {/* 评论列表 */}
        <div className="comment-list">{
          state.list.map(item => (
            <div className="list-item">
              <div className="user-face">
                <img className="user-head" src={avatar} alt="" />
              </div>
              <div className="comment">
                <div className="user">{item.author}</div>
                <p className="text">{item.comment}</p>
                <div className="info">
                  <span className="time">{formatDate(item.time)}</span>
                  <span onClick={() => handleFavorClick(item.id)} className={item.attitude === 1 ? "like liked" : "like"}>
                    <i className="icon" />
                  </span>
                  <span onClick={() => handleHateClick(item.id)} className={item.attitude === -1 ? "hate hated" : "hate"}>
                    <i className="icon" />
                  </span>
                  <span className="reply btn-hover">删除</span>
                </div>
              </div>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default App
