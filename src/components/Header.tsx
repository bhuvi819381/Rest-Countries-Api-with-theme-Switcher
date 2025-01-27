import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <header className="w-full h-[80px] mx-auto px-[5rem] py-[1.58rem] flex items-center justify-between border-b-2   leading-0 dark:bg-Dark-Mode-Background bg-Light-Mode-Background">
      <h1 className=" text-2xl font-bold dark:text-White">Where in the world?</h1>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        
      </div>
    </header>
  );
};
export default Header;
