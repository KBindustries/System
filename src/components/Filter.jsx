import React from 'react'
import {
    SearchIcon,
    
  } from '../icons'
import { Input } from '@windmill/react-ui'


const Filter = ({ value, onChange }) => (
    <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
            type="text"
            onChange={onChange}
              className="pl-8 text-gray-700"
              placeholder="Type to search ..."
              aria-label="Search"
            />
          </div>
  );
  export default Filter