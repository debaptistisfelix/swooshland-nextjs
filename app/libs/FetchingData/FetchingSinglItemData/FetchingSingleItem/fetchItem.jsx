// Function to fetch Items data from server 

export default async function getItemData(id){
  let baseUrl;

  if(process.env.NODE_ENV === 'development'){
    baseUrl =  `${process.env.BASE_URL}`
  } else {
    baseUrl =  `https://${process.env.VERCEL_URL}`  
  }
    const response = await fetch(`/api/item/${id}`,{
      cache: "no-store",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    if(!response.ok){
      const data = await response.json()
      console.log(data)
      throw new Error("Error while requesting Item from server")
    }
    const data = await response.json()
    return data
  }