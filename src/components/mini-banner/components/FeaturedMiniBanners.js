import MiniBanner1 from "./MiniBanner1";
import MiniBanner2 from "./MiniBanner2";
import MiniBanner3 from "./MiniBanner3";

export default function FeaturedMiniBanners() {
  return (
    <section className="grid grid-cols-2 gap-4 w-[90%] h-[350px] mx-auto mt-[50px] sm:mt-[50px] sm:mb-[50px]">
      <div className="flex flex-col gap-4 h-full align-middle ">
        <div className="h-full rounded-xl ">
          <MiniBanner1 />
        </div>
        <div className="h-full  rounded-xl">
          <MiniBanner2 />
        </div>
      </div>
      <div className="">
        <div className="col-span-1 row-span-2 h-full bg-slate-700 rounded-xl hover:rounded-[10%] duration-700">
          <MiniBanner3 />
        </div>
      </div>
    </section>
  );
}
