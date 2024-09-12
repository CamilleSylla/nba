import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function InfiniteSpinner() {
  return (
    <div className="w-full h-60 flex flex-col justify-center items-center">
      <ArrowPathIcon className="size-8 animate-spin" />;
      <span className="block">Loading...</span>
    </div>
  );
}
