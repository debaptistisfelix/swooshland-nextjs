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

    if(!response.ok){
      throw new Error("Error while fetching item")
    }
    const data = await response.json()
    return data
}