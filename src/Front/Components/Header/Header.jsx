import Nav from "./Nav";
import NavInfo from "./NavInfo";

export default function Header(params) {
  return(
    <>
      <header className="navbar-wrapper">
        <NavInfo/> {/* not in use */}
        <Nav/>
      </header>
    </>
  )
}