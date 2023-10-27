import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-toastify';

export default function SelectPlayer({ onPlayerChange, label }) {
    const [data, setData] = useState([{ id: 0, name: 'Retrieving data' }]);
    const [selected, setSelected] = useState(data[0])

    /* eslint-disable */
    useEffect(() => {
        axios.get("http://localhost:3000/players")
        .then((response) => {
            setData(response.data);
            setSelected(response.data[0]);
            onPlayerChange(response.data[0]);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            toast.error("Error fetching data : " + error.message);
        });
    }, []);
    /* eslint-enable */

    const handlePlayerSelected = (player) => {
        setSelected(player);

        if (onPlayerChange) {
            onPlayerChange(player);
        }
    };

    return (
        <Listbox value={selected} onChange={handlePlayerSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="playerListbox">{label}</Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button  id="playerListbox"  className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <span className="block truncate">{selected?.name ? selected.name : ""}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
  
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {data.map((player) => (
                    <Listbox.Option
                      key={player.id}
                      className={ player.id == selected.id ? 'bg-indigo-600 text-white relative cursor-default select-none py-2 pl-3 pr-9' : 'text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9'
                      }
                      value={player}
                    >
                        <>
                          <span
                            className={selected ? 'font-semibold block truncate' : 'font-normal block truncate'}
                          >
                            {player.name}
                          </span>
  
                          {player.id == selected.id ? (
                            <span
                              className={player.id == selected.id ? 'text-white absolute inset-y-0 right-0 flex items-center pr-4' : 'text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4'}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    );
}
