import React from 'react';

const FeaturedCard = (props) => {
  
    const title = "TwitchStitch";
    const description = "Watch all of your favorite TwitchStreams simultaneously!";


  return (
    <div className="relative flex flex-col lg:flex-row rounded-md  lg:rounded-l-md shadow-lg cursor-pointer z-50 ">
      <div
        className="left w-full lg:w-3/5 h-48 lg:h-auto z-10 rounded-t-md lg:rounded-r-none lg:rounded-b-none lg:rounded-l-md"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1612971446746-b79cc11824f5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="right  p-6 lg:py-8 px-8 w-full lg:w-2/5 z-10 bg-white rounded-b-md lg:rounded-l-none lg:rounded-r-md flex flex-col h-full justify-center">
        <div className="text-left">
          <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-5xl lg:text-4xl hidden lg:block">
            <span className="block xl:inline text-black">{title}</span>
          </h1>
          <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900 block lg:hidden">
            {title}
          </h3>
          <p className="mt-3 text-base text-gray-500 ">
            {description}
          </p>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href="#">
              <img className=" h-9 w-9 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=D2hXbp6dVH&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>

            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm leading-5 font-medium text-gray-900">
              <a href="#" className="hover:underline">
                {/* {name} */}
                Abhinav
              </a>
            </p>
            <div className="flex text-sm leading-5 text-gray-500">
              {/* <time dateTime={created_at}>{created_at}</time> */}
              <span className="mx-1">&middot;</span>
              <span>
                5
                {' '}
                min read
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default FeaturedCard;
