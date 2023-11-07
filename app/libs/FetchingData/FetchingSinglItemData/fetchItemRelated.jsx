//fetching the related items of a single item

export default async function getItemRelated(id){

  let baseUrl;

  if(process.env.NODE_ENV === 'development'){
    baseUrl =  `${process.env.BASE_URL}`
  } else {
    baseUrl =  `https://${process.env.VERCEL_URL}`  
  }
    const response = await fetch(`/api/item/related/${id}`, {
      cache: "no-store",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    console.log("Related fetch - response: ", response)
    console.log("Related fetch - responseOK: ", response.ok)
    console.log("Related fetch - responseStatus: ", response.status)
    console.log("Related fetch - responseBody: ", response.body)
    if(!response.ok){
      throw new Error("Error while fetching item")
    }
    const data = await response.json()
    return data
}