import React, { useState, useEffect } from "react"
import Link from "next/link"
import { fetchData } from "../../lib"
import { UserShort } from "../../types"

type Props = {}

const NavBar = ({}: Props): JSX.Element => {
  const [user, setUser] = useState<UserShort | null>(null)

  useEffect(() => {
    let mounted = true
    const getUser = async () => {
      try {
        const user = await fetchData<UserShort>(`/api/user`)
        if (mounted) {
          setUser(user)
        }
      } catch (error) {
        setUser(null)
      }
    }
    getUser()
    return () => {
      mounted = false
    }
  }, [])

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
            <button>Sign Out</button>
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
