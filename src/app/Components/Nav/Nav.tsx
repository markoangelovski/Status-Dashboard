import Logout from "../Logout/Logout";

// Nav template https://larainfo.com/blogs/tailwind-css-navbar-ui-example
const Nav = () => {
  return (
    <nav className="container mx-auto flex justify-between bg-white">
      <div className="flex items-center">
        <h3 className="text-2xl font-medium text-blue-500">STATUS</h3>
      </div>

      <div className="items-center  space-x-8 lg:flex">
        <Logout />
      </div>
    </nav>
  );
};

export default Nav;
