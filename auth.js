// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
// import CredentialProvider from "next-auth/providers/credentials"

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   providers: [
//     CredentialProvider({
//         name: "Credentials",
//         credentials: {
//             email: {},
//             password: {}
//         },
//         async authorize(credentials, req) {
//             console.log('credentials')
//             console.log(credentials )
//             const user = { id: 1, name: "J Smith", email: ""}
//             if (user) {
//                 return user
//             } else {
//                 return null
//             }
//         }
//     })

//   ],
//     pages: {
//         signIn: "/login",
//     },
// })