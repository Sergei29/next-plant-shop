import React from "react"
import Link from "next/link"
import { fetchData } from "../../lib"
import { useUser } from "../../hooks"

const NavBar = (): JSX.Element => {
  const user = useUser()

  const handleSignOut = async () => {
    await fetchData(`/api/logout`)
    // FIXME setUser(null)
  }

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
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <li>
            <Link href="/sign-in">
              <a>Sign In</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
