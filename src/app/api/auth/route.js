export async function POST() {
    
    
    let res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            email: "giannis.chiout@gmail.com",
            password: "1234c"
        }),
      })
       let json = await res.json()
      console.log(json)
      
   
   
    return Response.json(json)
  }