import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import axios from 'axios';
const Index = () => {
  const [jobs, setJobs] = useState([])
  const REACT_APP_API_URL = 'http://localhost:5000'

  const [currentPage, setCurrentPage] = useState(1);

  // No of Job postings to be displayed on each page
  const [recordsPerPage] = useState(3);

  useEffect(() => {
    const getJobs = async () => {
      axios.get(`${REACT_APP_API_URL}/jobs`).then((response) => {
        setJobs(response.data);
      }).catch(function (error) {
        console.log(error);
      })
    }
    getJobs()
  }, [])


  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = jobs.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(jobs.length / recordsPerPage)

  return (
    <>
      <Header is_home_page={true} />

      <section className="px-4 pb-10 sm:pb-24 mx-auto max-w-7xl">
        <h2 data-testid="title" className="pb-8 mb-12 text-2xl font-bold leading-tight text-center text-gray-900 border-b border-gray-200 md:text-4xl">
          Jobs Board
        </h2>
        <div className="container px-5 mx-auto">
          <div>
            {currentRecords &&
              currentRecords.map((job, index) => (
                <div className="py-2 " key={index} data-testid='job-listing'>
                  <div
                    className="h-full p-6 grid grid-cols-5 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
                  >
                    <div className="col-span-1">
                      <span
                        className="tracking-widest text-xl title-font font-bold text-purple-700 hover:text-green-500 mb-1">
                        {job?.title}
                      </span>
                      <Link to="!#" className='block py-2 text-black font-bold hover:text-green-900'>{job?.company}</Link>
                      <span className='block'>
                        {job?.location}
                      </span>
                    </div>
                    <div className='col-span-3 px-3'>
                      <h4 className='font-semibold'>Job Description</h4>
                      <ul className="leading-relaxed mb-3 text-gray-800 text-sm">
                        {job?.description.map((requirement, id) => (
                          <li key={id}><span className='mr-1'>-</span>{requirement}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h1 className="title-font text-md text-gray-900 mb-3">
                        {job?.role}
                      </h1>
                      <span className="title-font text-lg font-medium text-gray-900">
                        {job?.means_of_application}
                      </span>
                      <div className="flex items-center flex-wrap ">
                        <p className='mt-3 text-black'>
                          Deadline: <time dateTime={job?.expiry_date}>
                            {moment(job?.expiry_date).format(
                              "MMM DD, YYYY"
                            )}</time>
                        </p>
                        <Link to="!#"
                          className="text-indigo-700 inline-flex items-center md:my-2 lg:mb-0 hover:no-underline hover:text-indigo-900"
                        >
                          Learn More
                          <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}


          </div>
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>

      <Footer/>
    </>
  )
}

export default Index