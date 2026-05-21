// import { createContext, useReducer } from "react";
// import { tweetsReducer } from "./TweetsReducer";
//
// export const FeedContext = createContext();
//
// export default function FeedContextProvider({children}) {
//     const [ state, dispatch ] = useReducer(tweetsReducer, { tweets: [] });
//
//     return (
//         <FeedContext.Provider value={{state, dispatch}}>
//             {children}
//         </FeedContext.Provider>
//     );
//
//     }