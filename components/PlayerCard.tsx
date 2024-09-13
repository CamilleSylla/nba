import { Player } from "../types";

/**
 *
 * Dummy component displying target player informations
 *
 * @param {Player} player Player object data to be rendered in card
 * @param {boolean} draft Optional parameter that allow component to display draft section to be rendered
 * @param {boolean} mensurations Optional parameter that allow component to display mensurations section to be rendered
 * @param {string} [size="md"] Optional parameter take an enum ` "xs" | "md" | "lg" ` set default to `"md"`\
 * \
 * Here are classes in relation with size param
 * ```
 * const classes = {
    lg: {
      img: "size-20",
      title: "text-3xl",
      titleInner: "text-xl",
      country: " text-base",
      number: "text-5xl",
    },
    md: {
      img: "size-16",
      title: "text-2xl",
      titleInner: "text-lg",
      country: "text-xs",
      number: "text-2xl",
    },
    xs: {
      img: "size-10",
      title: "text-2xl",
      titleInner: "text-sm",
      country: "text-xs",
      number: "text-2xl",
    },
  };
 * ```
 * @returns UI card with player infos
 */
export default function PlayerCard({
  player,
  draft,
  mensurations,
  size = "md",
}: {
  player: Player;
  draft?: boolean;
  mensurations?: boolean;
  size?: "xs" | "md" | "lg";
}) {
  const classes = {
    lg: {
      img: "size-20",
      title: "text-3xl",
      titleInner: "text-xl",
      country: " text-base",
      number: "text-5xl",
    },
    md: {
      img: "size-16",
      title: "text-2xl",
      titleInner: "text-lg",
      country: "text-xs",
      number: "text-2xl",
    },
    xs: {
      img: "size-10",
      title: "text-2xl",
      titleInner: "text-sm",
      country: "text-xs",
      number: "text-2xl",
    },
  };

  return (
    <div className="flex gap-10 h-full p-5">
      <img
        src={`https://ui-avatars.com/api/?name=${player.first_name}+${player.last_name}`}
        className={`${size && classes[size].img} rounded-full overflow-hidden border-2 border-slate-400 object-cover`}
      />
      <div className="flex-1 space-y-5">
        <div className="flex justify-between">
          <h1 className={`${size && classes[size].title} font-bold`}>
            {player.first_name} {player.last_name}{" "}
            <span className={`${size && classes[size].titleInner} block`}>
              {player.position} - {player.team.full_name}
            </span>
            <span className={`${size && classes[size].country} block`}>
              From {player.country}
            </span>
          </h1>
          <p className={`${size && classes[size].number} font-bold`}>
            #{player.jersey_number}
          </p>
        </div>
        <div className="flex justify-between w-2/3">
          {/* Draft Infos */}
          {draft && (
            <ul>
              <li>
                College : <span>{player.college}</span>
              </li>
              <li>
                Draft year : <span>{player.draft_year}</span>
              </li>
              <li>
                round : <span>{player.draft_round}</span>, pick :{" "}
                <span>{player.draft_number}</span>
              </li>
            </ul>
          )}
          {/* Physical attributes */}
          {mensurations && (
            <ul>
              <li>
                Height : <span>{player.height}</span>
              </li>
              <li>
                Weight : <span>{player.weight}</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
