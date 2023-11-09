//建立一個get API的函式
export async function get(url: string) {
  const response = await fetch(url)
  const data = await response.json() as unknown

  if(!response.ok) {
    throw new Error('Failed to fetch data. ')
  }
  return data
}

