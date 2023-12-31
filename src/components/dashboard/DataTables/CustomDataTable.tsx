"use client"
import React, { useState } from 'react'
import data from '../../../../data.json'
import { Button } from '../../ui/button';
import Heading from '../Heading';
export default function CustomDataTable() {
  // Pagination table
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1 ) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const cureentDisplayedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  console.log(data);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, data.length);
  return (
  <div className='mt-4'>
    {/* table */}
    <div className=" overflow-x-auto shadow-md sm:rounded-t-2xl">
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="text-xs text-slate-700 uppercase bg-white dark:bg-slate-900 dark:text-white">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label className="sr-only">checkbox</label>
                </div>
            </th>
            <th scope="col" className="px-6 py-3">
             Id
            </th>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
          <tbody className=''>
            {cureentDisplayedData.map((item,index) => {
              return (
                <tr key={index} className="border-b bg-gray-300 dark:bg-slate-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label  className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.id}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.first_name}
                  </th>
                  <td className="px-6 py-4 dark:text-white">{item.last_name}</td>
                  <td className="px-6 py-4 dark:text-white">{item.email}</td>
                  <td className="px-6 py-4 dark:text-white">{item.gender}</td>
                  <td className="px-6 py-4 dark:text-white space-x-3">
                    <a href="#" className="font-medium text-blue-600 dark:text-sky-500 hover:underline">Edit</a>
                    <a href="#" className="font-medium text-red-600  hover:underline">Delete</a>
                    <a href="#" className="font-medium text-green-600  hover:underline">Download</a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
          <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span className="text-lg font-semibold text-gray-500 dark:text-gray-300 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "} <span className="font-semibold text-gray-900 dark:text-white">{itemStartIndex}-{itemEndIndex}</span> {" "} of <span className="font-semibold text-gray-900 dark:text-white">{data.length}</span></span>
              <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 ">
                <li>
                  <Button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage-1)}
                    className="rounded-l-xl flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-slate-700 dark:border-slate-700 dark:text-white  dark:hover:text-white">
                    Previous
                  </Button>
                </li>
                {
                  Array.from({length: totalPages}, (item,index) => {
                    return(
                      <li key={index}>
                        <Button 
                          disabled={currentPage === index + 1}
                          onClick={()=>setCurrentPage(index + 1)}
                          className={
                            currentPage === index + 1 ? 
                            "flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-slate-700 dark:border-slate-700 dark:text-white  dark:hover:text-white"
                            : "flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-slate-700 dark:border-slate-700 dark:text-black dark:hover:text-white"}>
                          {index + 1}
                        </Button>
                      </li>
                    )
                  })
                }
                <li>
                  <Button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage+1)}
                    className="rounded-r-xl flex items-center justify-center px-3 h-8 leading-tight  border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-slate-700 dark:border-slate-700 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                  </Button>
                </li>
              </ul>
          </nav>
      </div>
    </div>
  )
}
