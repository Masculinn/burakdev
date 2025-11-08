import dynamic from "next/dynamic";

const Meteor_s = () => (
  <div className="absolute top-0 left-0 size-full -z-10">
    {Array.from({ length: 20 }).map((_, idx) => {
      const position = idx * 40;
      return (
        <span
          key={`meteor-${idx}`}
          className={
            "animate-meteor-effect absolute h-0.5 w-0.5 rotate-45 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-[50%] before:transform before:bg-linear-to-r before:from-[#64748b] before:to-transparent before:content-['']"
          }
          style={{
            top: "-40px",
            left: `${position}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.floor(Math.random() * (10 - 2) + 5)}s`,
          }}
        />
      );
    })}
  </div>
);

const Meteors = dynamic(() => Promise.resolve(Meteor_s), { ssr: false });
export default Meteors;
