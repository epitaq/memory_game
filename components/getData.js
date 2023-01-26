// import React from 'react'
// import useSWRImmutable from 'swr/immutable'

// const fetcher = (...args) => fetch(...args).then(res => res.json())

// export const getData = (url) => {
//   const {data, error, isLoading} = useSWRImmutable(url, fetcher)

//   React.useEffect( () => {
//     if (!error && !isLoading){
//       console.log(data);
//       return data
//     }
//   }, [data])

//   if (error) return 0
// }

import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())

export const getData = (url) => {
    const {data, error} = useSWR(url, fetcher)
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

