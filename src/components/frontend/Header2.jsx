import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { HiOutlineHeart } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { UserIcon } from "@heroicons/react/24/outline";

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: 'products',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: 'products',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: 'products',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: 'products',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: 'products' },
    { name: 'Stores', href: 'collections' },
  ],
}

function Header2() {
  const { user, search, setSearch, cartItems, cart, setCart } = useAuth();

  const [open, setOpen] = useState(false)
  const [searchToggle, setSearchToggle] = useState(false);

  useEffect(() => {
    let cartGet = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartGet);
  }, []);

  return (
    <>
    <div className="bg-white sticky top-0 z-10">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <Link to={item.href} className="mt-6 block font-medium text-gray-900">
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                          </Link>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <Link to={`/${item.href}`} className="-m-2 block p-2 text-gray-500">
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link to={'/'} href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              { !user && 
                <div className="flow-root">
                  <Link to={'/login'} className="-m-2 block p-2 font-medium text-gray-900">
                    Sign in
                  </Link>
                </div>
              }
              
              {/* <div className="flow-root">
                <Link to={'/register'} className="-m-2 block p-2 font-medium text-gray-900">
                  Create account
                </Link>
              </div> */}
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <Link to={'/'} className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/flags/flag-canada.svg"
                  
                  className="block h-auto w-5 shrink-0"
                />
                
                <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                <span className="sr-only">, change currency</span>
              </Link>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className=" bg-white">
        {/* <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p> */}

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'}>
                  <span className="sr-only">Your Company</span>
                  {/* <img
                    alt=""
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  /> */}
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1032 93" fill="none" className="h-4 md:h-5 w-auto">
                  <path d="M0.688 1.39999H67.248L68.528 28.024H66.224C63.0667 18.808 59.3973 12.536 55.216 9.20799C51.12 5.87999 44.976 4.216 36.784 4.216H33.2V45.816H38.96C43.056 45.816 46.4693 44.3227 49.2 41.336C51.9307 38.3493 53.808 34.2533 54.832 29.048H56.752V66.936H54.576C53.2107 60.536 51.2907 55.9707 48.816 53.24C46.4267 50.5093 43.1413 49.144 38.96 49.144H33.2V88.184H49.072V91H0.688V88.184H8.24V4.216H0.688V1.39999ZM116.296 88.568L106.952 60.92H81.608L71.752 88.568H81.352V91H61.768V88.568H67.784L100.424 0.631996H110.92L143.176 88.568H149.064V91H107.208V88.568H116.296ZM94.792 24.568L82.76 58.104H105.928L94.792 24.568ZM190.225 89.592C194.492 89.592 198.246 88.44 201.489 86.136C204.817 83.832 206.481 80.376 206.481 75.768C206.481 71.0747 204.689 67.4907 201.105 65.016C197.606 62.5413 192.572 60.408 186.001 58.616C179.516 56.7387 174.78 55.1173 171.793 53.752C168.892 52.3867 166.118 50.5947 163.473 48.376C158.182 43.9387 155.537 37.0693 155.537 27.768C155.537 20.1733 158.225 13.6453 163.601 8.184C169.062 2.72266 176.486 -0.00800323 185.873 -0.00800323C190.396 -0.00800323 195.089 0.674662 199.953 2.03999C204.902 3.32 207.974 3.96 209.169 3.96C210.364 3.96 211.43 3.10666 212.369 1.39999H213.777L214.673 27.256H212.625C208.529 19.832 204.22 13.9013 199.697 9.464C195.26 4.94133 190.396 2.67999 185.105 2.67999C179.9 2.67999 175.846 3.91733 172.945 6.392C170.044 8.78133 168.593 12.024 168.593 16.12C168.593 20.1307 170.3 23.2453 173.713 25.464C177.212 27.5973 181.478 29.3467 186.513 30.712C191.548 32.0773 194.833 33.016 196.369 33.528C197.99 34.04 199.953 34.7653 202.257 35.704C204.646 36.5573 206.566 37.496 208.017 38.52C209.553 39.4587 211.132 40.696 212.753 42.232C214.46 43.6827 215.782 45.304 216.721 47.096C219.025 51.192 220.177 56.056 220.177 61.688C220.177 70.904 217.276 78.328 211.473 83.96C205.756 89.5067 198.204 92.28 188.817 92.28C183.953 92.28 178.364 91.64 172.049 90.36C165.82 89.08 162.364 88.44 161.681 88.44C160.486 88.44 159.334 89.72 158.225 92.28H156.433L155.153 61.816H157.329C161.084 69.24 165.862 75.7253 171.665 81.272C177.553 86.8187 183.74 89.592 190.225 89.592ZM228.063 1.39999H267.999V3.83199H260.575V43.512H286.047V3.83199H278.495V1.39999H318.559V3.83199H311.007V88.568H318.559V91H278.495V88.568H286.047V46.84H260.575V88.568H267.999V91H228.063V88.568H235.615V3.83199H228.063V1.39999ZM324.45 1.39999H363.49V3.83199H356.45V88.568H363.49V91H324.45V88.568H331.49V3.83199H324.45V1.39999ZM430.878 51.448V41.976C430.878 26.36 430.11 16.504 428.574 12.408C426.867 7.71466 424.435 4.81333 421.278 3.70399C419.486 3.02133 417.31 2.67999 414.75 2.67999C412.19 2.67999 409.971 3.02133 408.094 3.70399C406.302 4.38666 404.809 5.58133 403.614 7.28799C402.419 8.99466 401.438 10.7867 400.67 12.664C399.987 14.5413 399.433 17.1867 399.006 20.6C398.494 25.5493 398.238 32.8453 398.238 42.488V51.704C398.238 62.1147 398.622 69.5387 399.39 73.976C400.243 78.328 401.267 81.4427 402.462 83.32C405.107 87.5013 409.203 89.592 414.75 89.592C421.491 89.592 425.843 86.776 427.806 81.144C429.854 75.4267 430.878 65.528 430.878 51.448ZM414.494 92.28C400.243 92.28 389.577 88.44 382.494 80.76C375.497 72.9947 371.998 61.816 371.998 47.224C371.998 32.5467 375.753 21.0267 383.262 12.664C390.857 4.216 401.566 -0.00800323 415.39 -0.00800323C429.214 -0.00800323 439.625 4.00266 446.622 12.024C453.705 19.96 457.246 31.2667 457.246 45.944C457.246 60.6213 453.662 72.0133 446.494 80.12C439.411 88.2267 428.745 92.28 414.494 92.28ZM538.02 3.83199V91H520.1L476.196 8.184V88.568H483.236V91H465.7V88.568H472.74V3.83199H465.7V1.39999H501.028L534.564 65.656V3.83199H527.524V1.39999H545.06V3.83199H538.02Z" fill="#FF9900"/>
                  <path d="M573.938 1.39999H640.498L641.778 28.024H639.474C636.317 18.808 632.647 12.536 628.466 9.20799C624.37 5.87999 618.226 4.216 610.034 4.216H606.45V45.816H612.21C616.306 45.816 619.719 44.3227 622.45 41.336C625.181 38.3493 627.058 34.2533 628.082 29.048H630.002V66.936H627.826C626.461 60.536 624.541 55.9707 622.066 53.24C619.677 50.5093 616.391 49.144 612.21 49.144H606.45V88.184H622.322V91H573.938V88.184H581.49V4.216H573.938V1.39999ZM679.813 63.736C679.813 71.5867 681.136 77.6027 683.781 81.784C686.512 85.9653 691.376 88.056 698.373 88.056C705.37 88.056 710.746 85.88 714.501 81.528C718.256 77.176 720.133 70.5627 720.133 61.688V3.83199H711.813V1.39999H730.501V3.83199H723.461V60.792C723.461 71.3733 721.114 79.2667 716.421 84.472C711.728 89.6773 703.408 92.28 691.461 92.28C679.6 92.28 670.512 89.8053 664.197 84.856C657.968 79.9067 654.853 71.416 654.853 59.384V3.83199H647.813V1.39999H688.133V3.83199H679.813V63.736ZM772.85 89.592C777.117 89.592 780.871 88.44 784.114 86.136C787.442 83.832 789.106 80.376 789.106 75.768C789.106 71.0747 787.314 67.4907 783.73 65.016C780.231 62.5413 775.197 60.408 768.626 58.616C762.141 56.7387 757.405 55.1173 754.418 53.752C751.517 52.3867 748.743 50.5947 746.098 48.376C740.807 43.9387 738.162 37.0693 738.162 27.768C738.162 20.1733 740.85 13.6453 746.226 8.184C751.687 2.72266 759.111 -0.00800323 768.498 -0.00800323C773.021 -0.00800323 777.714 0.674662 782.578 2.03999C787.527 3.32 790.599 3.96 791.794 3.96C792.989 3.96 794.055 3.10666 794.994 1.39999H796.402L797.298 27.256H795.25C791.154 19.832 786.845 13.9013 782.322 9.464C777.885 4.94133 773.021 2.67999 767.73 2.67999C762.525 2.67999 758.471 3.91733 755.57 6.392C752.669 8.78133 751.218 12.024 751.218 16.12C751.218 20.1307 752.925 23.2453 756.338 25.464C759.837 27.5973 764.103 29.3467 769.138 30.712C774.173 32.0773 777.458 33.016 778.994 33.528C780.615 34.04 782.578 34.7653 784.882 35.704C787.271 36.5573 789.191 37.496 790.642 38.52C792.178 39.4587 793.757 40.696 795.378 42.232C797.085 43.6827 798.407 45.304 799.346 47.096C801.65 51.192 802.802 56.056 802.802 61.688C802.802 70.904 799.901 78.328 794.098 83.96C788.381 89.5067 780.829 92.28 771.442 92.28C766.578 92.28 760.989 91.64 754.674 90.36C748.445 89.08 744.989 88.44 744.306 88.44C743.111 88.44 741.959 89.72 740.85 92.28H739.058L737.778 61.816H739.954C743.709 69.24 748.487 75.7253 754.29 81.272C760.178 86.8187 766.365 89.592 772.85 89.592ZM811.2 1.39999H850.24V3.83199H843.2V88.568H850.24V91H811.2V88.568H818.24V3.83199H811.2V1.39999ZM917.628 51.448V41.976C917.628 26.36 916.86 16.504 915.324 12.408C913.617 7.71466 911.185 4.81333 908.028 3.70399C906.236 3.02133 904.06 2.67999 901.5 2.67999C898.94 2.67999 896.721 3.02133 894.844 3.70399C893.052 4.38666 891.559 5.58133 890.364 7.28799C889.169 8.99466 888.188 10.7867 887.42 12.664C886.737 14.5413 886.183 17.1867 885.756 20.6C885.244 25.5493 884.988 32.8453 884.988 42.488V51.704C884.988 62.1147 885.372 69.5387 886.14 73.976C886.993 78.328 888.017 81.4427 889.212 83.32C891.857 87.5013 895.953 89.592 901.5 89.592C908.241 89.592 912.593 86.776 914.556 81.144C916.604 75.4267 917.628 65.528 917.628 51.448ZM901.244 92.28C886.993 92.28 876.327 88.44 869.244 80.76C862.247 72.9947 858.748 61.816 858.748 47.224C858.748 32.5467 862.503 21.0267 870.012 12.664C877.607 4.216 888.316 -0.00800323 902.14 -0.00800323C915.964 -0.00800323 926.375 4.00266 933.372 12.024C940.455 19.96 943.996 31.2667 943.996 45.944C943.996 60.6213 940.412 72.0133 933.244 80.12C926.161 88.2267 915.495 92.28 901.244 92.28ZM1024.77 3.83199V91H1006.85L962.946 8.184V88.568H969.986V91H952.45V88.568H959.49V3.83199H952.45V1.39999H987.778L1021.31 65.656V3.83199H1014.27V1.39999H1031.81V3.83199H1024.77Z" fill="#2874F0"/>
                  </svg>
                </Link>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div key={item.name} className="group relative text-base sm:text-sm">
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                    />
                                    <Link to={`/${item.href}`} className="mt-6 block font-medium text-gray-900">
                                      <span aria-hidden="true" className="absolute inset-0 z-10" />
                                      {item.name}
                                    </Link>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <Link to={`/${item.href}`} className="hover:text-gray-800">
                                            {item.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link to={`/${page.href}`}
                      key={page.name}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  { !user && 
                    <Link to={'/login'} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Sign in
                    </Link>
                  }
                  {/* <span aria-hidden="true" className="h-6 w-px bg-gray-200" />*/}
                  { searchToggle && 
                  <div className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)} className="block w-[280px] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 font-normal border placeholder:text-gray-400 focus:outline-2 focus:border-indigo-600 sm:text-sm/6" placeholder="Search clothes"  />
                  </div> 
                  }
                </div>

                {/* <div className="hidden lg:ml-8 lg:flex">
                  <Link to={'/'} className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      alt=""
                      src="https://tailwindui.com/plus/img/flags/flag-canada.svg"
                      className="block h-auto w-5 shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </Link>
                </div> */}

                {/* Search */}
                
                <div className="relative flex lg:ml-6">
                  <div onClick={()=> setSearchToggle(!searchToggle)} className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                  </div>
                  <Link to={'/account'} onClick={()=> setSearchToggle(!searchToggle)} className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    {/* <MagnifyingGlassIcon aria-hidden="true" className="size-6" /> */}
                    <UserIcon className="size-6" />

                  </Link>
                </div>
                

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={'/cart'} className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
    </>
  );
}

export default Header2;
