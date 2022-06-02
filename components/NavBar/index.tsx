import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useUser, useSignOut } from "../../hooks"

const NavBar = (): JSX.Element => {
  const { pathname } = useRouter()
  const user = useUser()
  const { signOut, signOutLoading } = useSignOut()
  const isAuthPage = pathname === "/sign-in" || pathname === "/register"

  return (
    <nav className="px-2 py-1 text-sm">
      <ul className="flex gap-2 items-baseline">
        <li className="text-lg font-extrabold">
          <Link href="/">
            <a>Next Shop</a>
          </Link>
        </li>
        <li role="separator" className="flex-1" />
        {user ? (
          <>
            <li>{user.name}</li>
            <button onClick={signOut} disabled={signOutLoading}>
              Sign Out
            </button>
          </>
        ) : (
          !isAuthPage && (
            <li>
              <Link href="/sign-in">
                <a>Sign In</a>
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  )
}

export default NavBar
