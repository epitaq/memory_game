import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { PlayingCard } from '../components/playingCard';
import { Setting } from '../components/setting/setting';
import { Select } from '../components/setting/select';


export default function Index() {
  let [activeCard, setActiveCard] = React.useState([]) // クリックされ表にされているカード
  let [cardData, setCardData] = React.useState() // 全てのカードのデータ
  let [backImg, setBackImg] = React.useState() //カードの裏面
  let [cardType, setCardType] = React.useState('nijisanji') // カードの種類

  const cardTypeList = [{id:'hinatazaka46', display:'日向坂46'}, {id:'nijisanji', display:'にじさんじ'}]
  
  // カードのデータを取得
  React.useEffect(() => {
    fetch('/api/'+cardType)
      .then(res => res.json())
      .then(data => {
        setBackImg(data.backImg)
        let tmpData = dataForm(data.data)
        setCardData(shuffleArray(tmpData.concat(tmpData)))
      })
  }, [cardType])

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
      <Setting option={[<Select setCardType={setCardType} cardTypeList={cardTypeList} />, ]}/>
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



