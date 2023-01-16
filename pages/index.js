import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { PlayingCard } from '../components/playingCard';
import {getData} from '../components/getData'


export default function Index() {
  let [activeCard, setActiveCard] = React.useState([])
  let [cardData, setCardData] = React.useState()

  // カードのデータを取得
  let backImg = getData().backImg
  let data = dataForm(getData().card)

  // 一回のみ実行 データを二重にしてシャッフル
  React.useEffect(() => {
    setCardData(shuffleArray(data.concat(data)))
  }, [])

  // 切り替わりが早すぎて見えない
  React.useEffect(() => {
    console.log(cardData)
    console.log(activeCard)
    if ((new Set(activeCard)).size == 2) {
      if (cardData[activeCard[0]].img == cardData[activeCard[1]].img){
        setCardData(cardData.map((data, index) => (
          index == activeCard[0] || index == activeCard[1]
            ? {img: data.img, active: false}
            : data)))
        console.log('get !!');
      }
      setTimeout(() => {
        setActiveCard([])
      }, 500);
    }
  }, [activeCard])


  return (
    <Container maxWidth='lg'>
      <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
        {cardData && cardData.map(({img, active}, index) => {
          if (active) {
            return (
              <Box onClick={() => {
                setActiveCard([...activeCard, index])
              }}>
                <PlayingCard active={activeCard.includes(index)} activeImg={img} inactiveImg={backImg}/>
              </Box>
            )
          } else {
            return <PlayingCard/>
          }

        })}
      </Box>
    </Container>
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



