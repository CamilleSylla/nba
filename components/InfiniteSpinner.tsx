import { ArrowPathIcon } from "@heroicons/react/24/solid";

/**
 * Dummy UX component\
 * Taking full width and full height of the parent
 * @returns centered icon with infinite spin animation
 */
export default function InfiniteSpinner() {
  return (
    <div className="w-full h-60 flex flex-col justify-center items-center">
      <ArrowPathIcon className="size-8 animate-spin" />;
      <span className="block">Loading...</span>
    </div>
  );
}
