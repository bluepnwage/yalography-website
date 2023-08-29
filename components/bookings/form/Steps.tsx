type PropTypes = {
  currentStep: number;
};

const steps = ["Contact information", "Photoshoot details", "Add-ons", "Summary", "Success"];

export function Steps({ currentStep }: PropTypes) {
  return (
    <div className="border border-primary-600 dark:border-primary-500 relative   w-full h-full  rounded-md">
      <div
        aria-hidden
        className="absolute top-0 left-0 -inset-0.5 rounded-md hidden dark:block dark:bg-primary-500 blur-sm"
      ></div>
      <div className="space-y-5 pl-16 py-10 h-full svg-background w-full rounded-md dark:bg-neutral-900 bg-white relative">
        {steps.map((step, key) => {
          return (
            <div key={step} className="flex gap-2 items-center relative">
              <span
                className={`h-10 w-10 rounded-full duration-200 ease-out border-2 flex items-center justify-center text-lg font-semibold ${
                  currentStep === key + 1
                    ? "bg-primary-600 border-primary-600 text-gray-100"
                    : "text-gray-900 dark:text-gray-100 border-gray-600 dark:border-gray-400"
                }`}
              >
                {key + 1}
              </span>
              <div className="text-gray-900 dark:text-gray-100">
                <p className="uppercase font-semibold text-sm text-gray-600 dark:text-gray-300">
                  Step {key + 1}
                </p>
                <p className="uppercase text-sm font-semibold">{step}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
