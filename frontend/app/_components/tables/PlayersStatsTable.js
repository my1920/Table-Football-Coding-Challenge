'use client'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ChevronUpDownIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";
import { useTable, useSortBy } from 'react-table';
import { toast } from 'react-toastify';

export default function PlayersStatsTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/players/stats')
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data : " + error.message);
            });
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Player Name',
                accessor: 'name'
            },
            {
                Header: 'Games Played',
                accessor: 'gamesPlayed'
            },
            {
                Header: 'Wins',
                accessor: 'wins'
            },
            {
                Header: 'Losses',
                accessor: 'losses'
            },
            {
                Header: 'Ratio',
                accessor: 'ratio'
            },
            {
                Header: 'Goals For',
                accessor: 'goalsFor'
            },
            {
                Header: 'Goals Against',
                accessor: 'goalsAgainst'
            },
            {
                Header: 'Goals Difference',
                accessor: 'goalsDifference'
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data }, useSortBy);    

    return (
        <>
            <table {...getTableProps()} className=" min-w-full divide-y divide-gray-200 text-center">
                <thead>
                    {headerGroups.map((headerGroup) => {
                        const { key: headerKey, ...restHeaderProps } = headerGroup.getHeaderGroupProps();

                        return (
                            <tr key={headerKey} {...restHeaderProps} className=" ">
                                {headerGroup.headers.map((column) => {
                                    const { key: columnKey, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps());

                                    return (
                                        <th
                                            key={columnKey}
                                            {...restColumnProps}
                                            className={`px-1 md:px-3 lg:px-6 py-1 md:py-3 first:rounded-tl-xl last:rounded-tr-xl  bg-gray-50 text-left text-xs leading-3 md:leading-4 font-medium text-gray-500 md:uppercase tracking-wider ${column.isSorted ? (column.isSortedDesc ? 'sorted-desc' : 'sorted-asc') : ''}`}
                                        >
                                            <div className="flex items-center justify-center">
                                                <div className=" text-center">{column.render('Header')}</div>
                                                <div className=" ">
                                                    {column.isSorted ? (column.isSortedDesc ? <ChevronDownIcon className="w-4"/> : <ChevronUpIcon  className="w-4"/>) : <ChevronUpDownIcon  className="w-4"/>}
                                                </div>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);

                        const { key: rowKey, ...restRowProps } = row.getRowProps();

                        return (
                            <tr key={rowKey} {...restRowProps} className=" border border-gray-200">
                                {row.cells.map((cell) => {
                                    const { key: cellKey, ...restCellProps } = cell.getCellProps();

                                    return (
                                        <td key={cellKey} {...restCellProps} className="px-1 md:px-3 lg:px-6 py-1 md:py-3 whitespace-no-wrap">
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>

    );
}
