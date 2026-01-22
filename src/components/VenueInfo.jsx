import { MapPinIcon, UsersFourIcon } from '@phosphor-icons/react';

export default function VenueInfo({ image, name, address, capacity }) {
  return (
    <>
      <img
        src={image}
        alt={name}
        className="w-full h-auto rounded-2xl mb-4"
      />

      <div className="flex flex-col gap-y-4 text-base text-text-default">
        <span className="font-semibold text-xl">
          {name}
        </span>
        <div className="gap-y-2 flex flex-col">
          <span>
            <MapPinIcon
              className="inline-block mr-2 text-icon-lighter"
              size={20}
              weight="duotone"
            />
            {address}
          </span>
          <span>
            <UsersFourIcon
              size={20}
              weight="duotone"
              className="inline-block mr-2 text-icon-lighter"
            />
            Capacidad: {capacity}
          </span>
        </div>
      </div>
    </>
  );
}
