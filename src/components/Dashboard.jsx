import React from 'react'
import Header from './Header'

function Dashboard() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
        <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50">
          <p className="text-2xl text-gray-400">Dashboard</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard