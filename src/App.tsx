import { ReactNode, useEffect, useState } from "react"
import { get } from "./util/http"
import BlogPosts, { type BlogPost } from "./components/BlogPosts"
import fetchingImg from './assets/data-fetching.png'
import ErrorMessage from "./components/ErrorMessage"

type RawDataBlogPost = {
  id: number
  useId: number
  body: string
  title: string
}
//使用async function來取得API，並判斷fetching或是error來顯示content要顯示在畫面上的內容
function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>()
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<string>()

  
  useEffect(()=> {
    async function fetchPosts() {
      try {
        setIsFetching(true)
        const data = await get('https://jsonplaceholder.typicode.com/posts') as RawDataBlogPost[]
        const blogPosts:BlogPost[] = data.map(rawPost => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body
          }
        })

        setFetchedPosts(blogPosts)
      } catch(error) {
        if(error instanceof Error) {
          setError(error.message)
        }
      }

      setIsFetching(false)
    }

    fetchPosts()
  },[])

  let content: ReactNode

  if(error) {
    content = <ErrorMessage text={error}/>
  }

  if(fetchedPosts) {
    content= <BlogPosts posts={fetchedPosts}/>
  }

  if(isFetching) {
    content = <p id="loading-fallback">Fetching posts...</p>
  }

  return (
    <main>
      <img src={fetchingImg} alt="An abstract image depicting a data fetching process." />
      {content}
    </main>
  )
}

export default App
