import {
  CardContainer,
  ContentWrapper,
  FirstContentCommentId,
  FirstContentNumbering,
  FirstContentWrapper,
  FourthContentDetail,
  FourthContentWrapper,
  SecondContentEmail,
  SecondContentNumbering,
  SecondContentWrapper,
  ThirdContentComment,
  ThirdContentWrapper,
  Wrapper,
} from './Mains.styles'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller'
import { useEffect, useState } from 'react'

const MainUI = () => {
  const [items, setItems] = useState([])
  const [totalItems, setTotalitems] = useState([])
  useEffect(() => {
    async function getTotal() {
      await axios
        .get('https://jsonplaceholder.typicode.com/comments')
        .then((res) => setTotalitems(res.data))
        .catch((error) => console.log(error))
    }
    getTotal()
    fetchData(items.length / 10 + 1)
  }, [])

  async function fetchData(page) {
    if (totalItems.length === items.length) return
    let url = 'https://jsonplaceholder.typicode.com/comments'
    if (page) {
      url = `${url}?_page=${page}&_limit=10`
    }
    await axios
      .get(url)
      .then((res) => setItems([...items, ...res.data]))
      .catch((err) => console.log(err))
  }

  return (
    <Wrapper>
      <InfiniteScroll
        pageStart={1}
        loadMore={() => fetchData(items.length / 10 + 1)}
        hasMore={true || false}
        loader={
          items?.length === totalItems?.length ? null : (
            <div className="loader" key={0}>
              Loading ...
            </div>
          )
        }
      >
        {items?.map((data, index) => (
          <CardContainer key={index}>
            <ContentWrapper>
              <FirstContentWrapper>
                <FirstContentCommentId>Comment Id</FirstContentCommentId>
                <FirstContentNumbering>{data.id}</FirstContentNumbering>
              </FirstContentWrapper>
              <SecondContentWrapper>
                <SecondContentEmail>Email</SecondContentEmail>
                <SecondContentNumbering>{data.email}</SecondContentNumbering>
              </SecondContentWrapper>
              <ThirdContentWrapper>
                <ThirdContentComment>Comment</ThirdContentComment>
              </ThirdContentWrapper>
              <FourthContentWrapper>
                <FourthContentDetail>{data.body}</FourthContentDetail>
              </FourthContentWrapper>
            </ContentWrapper>
          </CardContainer>
        ))}
      </InfiniteScroll>
    </Wrapper>
  )
}

export default MainUI
