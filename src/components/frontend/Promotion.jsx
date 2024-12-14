import { Link } from "react-router-dom";

export default function Promotion() {
  return (
    <div className="py-4">
      <div className="relative overflow-hidden bg-white py-5">
        <div className="pb-80 pt-0   sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shop the Look
              </h1>
              <p className="mt-4 text-xl text-gray-500">
              Shop the Look offers curated outfits that simplify styling by providing complete ensembles for various occasions. Whether you need a casual weekend outfit, a professional office look, or something versatile for both, the collection includes hand-picked pieces that pair well together.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            alt=""
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to={'/products'}
                  className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
