export default function LoadingGallery() {
  return (
    <>
      {Array(50)
        .fill("")
        .map((value, key) => (
          <div className="w-full mx-0.5 animate-pulse" key={key}>
            <div className="bg-white dark:bg-dark-400 border border-slate-200 dark:border-white/10 rounded">
              <div className="h-28 rounded-tr rounded-tl bg-slate-200 dark:bg-dark-900"></div>
              <div className="p-2">
                <div className="flex items-center">
                  <div className="w-4 h-5 bg-slate-200 dark:bg-dark-900 mr-1.5"></div>
                  <div className="w-3/5 h-2.5 bg-slate-200 dark:bg-dark-900 rounded-sm"></div>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-[76px] h-[19px] bg-slate-200 dark:bg-dark-900 rounded-full"></div>
                  <div className="w-3/5 h-2.5 bg-slate-200 dark:bg-dark-900 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
