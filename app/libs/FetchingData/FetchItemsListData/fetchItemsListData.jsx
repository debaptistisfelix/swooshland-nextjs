// Function to fetch sneakers list data from server 

export default async function getItemsListData(tag){
  const baseUrl =  `https://${process.env.VERCEL_URL}`  || `${process.env.BASE_URL}` 
   /* const baseUrl = `${process.env.BASE_URL}` */
    const response = await fetch(`${baseUrl}/api/item`, {
      cache: "no-store",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
   /*  console.log("list data - response: ", response)
    console.log("list data - responseOK: ", response.ok)
    console.log("list data - responseStatus: ", response.status)
    console.log("list data - responseBody: ", response.body)
    const responseBody = await response.text();
    console.log("list data - responseBodyJSON: ", responseBody) */
    if(!response.ok){
      throw new Error("Error while requesting Sneakers from server")
    }
    const data = await response.json()
    const filteredData = data.filter(item => item.tag === tag).reverse();
    return filteredData
  }