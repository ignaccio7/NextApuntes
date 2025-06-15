import { getFromLocalStorage, setInLocalStorage } from "@/actions/localStorage";
import { User } from "@/interfaces/user.interface";
import { auth, getDocument } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export function useUser() {

  const [user, setUser] = useState<User | undefined | DocumentData>(undefined)
  const router = useRouter()

  const pathName = usePathname()
  const protectedRoutes = [
    "/dashboard",
  ]
  const isInProtectedRoute = protectedRoutes.includes(pathName)


  const getUserFromDB = async (uid: string) => {
    const userPath = `users/${uid}`
    try {
      const res = await getDocument(userPath)
      setUser(res)
      setInLocalStorage("user", res)
    } catch (error) {

    }
  }

  useEffect(() => {
    console.log("Esto cada vez");
    
    return onAuthStateChanged(auth, async (authUser) => {
      // Exist auth user?
      if (authUser) {
        const userInLocal = getFromLocalStorage("user")

        if (userInLocal) setUser(userInLocal)
        else getUserFromDB(authUser.uid)

        // Does not exist user
      } else {
        if (isInProtectedRoute) router.push("/")
      }

    })
  }, [])

  return user

}