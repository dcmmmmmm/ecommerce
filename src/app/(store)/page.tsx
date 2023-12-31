'use client'
import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
  // const { data: session } = useSession()
  // const router = useRouter();
  // if(session) {
  //   return <>
  //     Signed in as {session.user?.email} <br/>
  //     <button onClick={() => signOut({callbackUrl: '/login'})}>Sign out</button>
  //     <Button onClick={() => router.push('/dashboard')} >Go to dashboard</Button>
  //   </>
  // }
  // return <>
  //   Not signed in <br/>
  //   <button>
  //     <Link href='/login'>
  //       Sign in
  //     </Link>
  //   </button>
  // </>
  return(
    <div>
      <h2>Ecommerce</h2>
    </div>
  )
}