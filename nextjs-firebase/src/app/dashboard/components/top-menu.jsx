import { ProfileDropdown } from "./profile-dropdown";

export default function TopMenu() {
  return(
    <header className="max-w-7xl mx-auto px-8 py-4 w-full flex justify-between">
      <div className="logo">
        <h1 className="text-2xl font-semibold">🔥 Dashboard</h1>
      </div>
      <nav>
        <ProfileDropdown />
      </nav>
    </header>
  )
}