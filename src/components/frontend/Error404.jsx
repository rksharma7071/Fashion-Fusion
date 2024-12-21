
//   This example requires updating your template:
//   <html class="h-full">
//   <body class="h-full">


import React from 'react'

function Error404() {
  return (
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <h1 class="font-semibold text-5xl sm:text-8xl text-[#2874F0]">404</h1>
        <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-[#FF9900] sm:text-3xl">Page not found</h1>
        <p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
        {/* <div class="mt-10 flex items-center justify-center gap-x-6">
          <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
          <a href="#" class="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a>
        </div> */}
      </div>
    </main>
  )
}

export default Error404