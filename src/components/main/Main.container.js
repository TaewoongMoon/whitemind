import { useEffect, useState } from 'react'
import axios from 'axios'

import MainUI from './Main.presenter'
const MainPage = () => {
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

  return <MainUI items={items} totalItems={totalItems} fetchData={fetchData} />
}

export default MainPage
