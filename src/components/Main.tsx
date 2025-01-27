import Search from './Search'



import Countries from "./Countries";


const Main = () => {
  
  return (
    <main className="dark:bg-Dark-Mode-Background bg-Light-Mode-Background w-full h-full dark:text-white dark:placeholder:text-white px-[5rem] py-[2.7rem]">
      <Search />
      <Countries />
    </main>
  );
};
export default Main;
