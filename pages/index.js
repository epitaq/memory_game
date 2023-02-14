import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { PlayingCard } from '../components/playingCard';
import { Setting } from '../components/setting/setting';
import { Select } from '../components/setting/select';
import { LevelSlider } from '../components/setting/levelSlider';

export default function Index() {
  let [activeCard, setActiveCard] = React.useState([]) // クリックされ表にされているカード
  let [cardData, setCardData] = React.useState() // 全てのカードのデータ
  let [backImg, setBackImg] = React.useState() //カードの裏面
  let [cardType, setCardType] = React.useState('nijisanji') // カードの種類
  let [level, setLevel] = React.useState(20) //難しさ、これでカードの枚数を制御

  const cardTypeList = [{id:'hinatazaka46', display:'日向坂46'}, {id:'nijisanji', display:'にじさんじ'}]
  
  // カードのデータを取得
  React.useEffect(() => {
    fetch('/api/'+cardType)
      .then(res => res.json())
      .then(data => {
        setActiveCard([]) //選択されたカードを初期化
        setBackImg(data.backImg) //裏面を登録
         //カードの組み合わせ レベルに応じて数を変更
        let tmpData = shuffleArray(
            dataForm(data.data)
          )
          .slice(0, Math.floor(level/4))
          .map(data => addKey(data, 'primary')
        )
        // カードを複製＆シャッフル
        setCardData(
          shuffleArray(
            tmpData.concat(tmpData)
          )
          .map(data => addKey(data, 'secondary'))
        ) 
      })
    console.log(cardData);
  }, [cardType, level])

  // 判定
  React.useEffect(() => {
    console.log(activeCard)
    if ((new Set(activeCard)).size == 2) {
      if (cardData[activeCard[0]].img == cardData[activeCard[1]].img){
        setTimeout(() => {
          setCardData(cardData.map((data, index) => (
            index == activeCard[0] || index == activeCard[1]
              ? {img: data.img, active: false}
              : data)))
        }, 500)
        console.log('get !!');
      }
      setTimeout(() => {
        setActiveCard([])
      }, 500);
    }
  }, [activeCard])


  return (
    <>
      {/* メイン */}
      <Container maxWidth='lg'>
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
          {cardData && cardData.map(({img, active, key}, index) => {
            if (active) {
              return (
                <Box id={index} key={index} onClick={() => {
                  setActiveCard([...activeCard, index])
                }}>
                  <PlayingCard active={activeCard.includes(index)} activeImg={img} inactiveImg={backImg}/>
                </Box>
              )
            } else {
              return (
                <Box key={index} sx={{opacity: 0}}>
                  <PlayingCard />
                </Box>
              )
            }

          })}
        </Box>
        {/* 設定 */}
        <Setting option={[
          <Select setCardType={setCardType} cardTypeList={cardTypeList} />, 
          <LevelSlider value={level} setValue={setLevel}/>
        ]}/>
      </Container>
    </>
  );
}

const shuffleArray = (array) => {
  const cloneArray = [...array]

  for (let i = cloneArray.length - 1; i >= 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1))
    // 配列の要素の順番を入れ替える
    let tmpStorage = cloneArray[i]
    cloneArray[i] = cloneArray[rand]
    cloneArray[rand] = tmpStorage
  }

  return cloneArray
}

const dataForm = (array) => {
  let data = []
  for (const img of array){
    data.push({img: img, active: true})
  }
  return data
}

const addKey = (origin, option) => {
  console.log(origin)
  if (!origin.key) {
    console.log('add key!!');
    origin.key = origin.img + option
  }
  return origin
}