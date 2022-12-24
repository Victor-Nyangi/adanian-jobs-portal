import React, { useState } from 'react'
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import moment from 'moment/moment';
import { job_roles } from './data'
import Alert from '../components/Alert';
import Footer from '../components/Footer';
import axios from 'axios'

const RequiredComponent =()=> (<span className='text-red-600 ml-1'>*</span>)
const Create = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [job_description, setJobDescription] = useState("")
  const REACT_APP_API_URL = 'http://localhost:5000'


  const [job, setJob] = useState({
    title: "",
    role: "",
    company: "",
    means_of_application: "",
    description: [],
    location: "",
    slug: "",
    date_created: moment().format("YYYY-MM-DD"),
    expiry_date: ""
  });

  const newJob = (e) => {
    e.preventDefault();
    setMessage("Adding job, please wait.....");
    setIsLoading(true)

    axios.post(`${REACT_APP_API_URL}/jobs`, job)
    .then((response) => {
      if (response.status === 200) {
        setStatus("success");
        setMessage("Job Posting successfully added")
      }      })
    .catch((error) => {
      setMessage(error ?? "Technical Error Occured");
    })

    setTimeout(() => {
      setJob({
        title: "",
        description: [],
        role: "",
        company: "",
        means_of_application: "",
        location: "",
        slug: "",
        date_created: Date.now,
        expiry_date: ""
      });
      setStatus("");
      setMessage("");
      setJobDescription("")
      setIsLoading(false)
    }, 2000)
  };

  const onAddJobDescription = (e) => {
    setJobDescription(e.target.value)
    setJob({ ...job, description: e.target.value.split(";") })
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header is_home_page={false} />
      {status !== "" ? <Alert status={status} message={message} /> : null}
      <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
        <div className="flex items-center justify-between">
          <h2 className="mb-1 text-2xl font-semibold leading-tight text-gray-900" data-testid="title">Add Job</h2>
        </div>
      </header>
      <div className="px-4 mx-8 py-3 mb-8 bg-white rounded-lg shadow-md">
        <form action="post" onSubmit={newJob}>
          <div className="grid grid-cols-3 gap-6">
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Role<RequiredComponent/>
              </label>

              <select
                name="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id="role"
                required
                onChange={(e) =>
                  setJob({
                    ...job,
                    role: e.target.value,
                  })
                }
              >
                <option value="">-- Select Role --</option>
                {job_roles &&
                  job_roles.map((job, id) => (
                    <option
                      key={id}
                      value={job.name}
                    >{job.name}</option>
                  ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Title<RequiredComponent/>
              </label>

              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="title"
                placeholder="Title"
                autoComplete="off"
                name="title"
                value={job.title}
                required
                onChange={(e) =>
                  setJob({
                    ...job,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Company<RequiredComponent/>
              </label>

              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="company"
                placeholder="Company"
                name="company"
                required
                value={job.company}
                onChange={(e) =>
                  setJob({
                    ...job,
                    company: e.target.value,
                  })
                }
              />
            </div>

          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Location<RequiredComponent/>
              </label>

              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="location"
                placeholder="County of Location/On Site/Remote/Hybrid"
                autoComplete="off"
                name="location"
                value={job.location}
                required
                onChange={(e) =>
                  setJob({
                    ...job,
                    location: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Slug
              </label>

              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                id="slug"
                placeholder="job-name"
                autoComplete="off"
                name="slug"
                value={job.slug}
                required
                onChange={(e) =>
                  setJob({
                    ...job,
                    slug: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Expiry Date
              </label>

              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="date"
                id="expiry_date"
                name="expiry_date"
                min={moment().format("YYYY-MM-DD")}
                value={job.expiry_date}
                onChange={(e) =>
                  setJob({
                    ...job,
                    expiry_date: e.target.value,
                  })
                }
              />
            </div>

          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Description<RequiredComponent/>
              </label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id="job_description"
                name="job_description"
                rows={4}
                required
                value={job_description}
                onChange={onAddJobDescription
                }
              >
              </textarea>
              <small className="block mt-2 text-gray-400">
                Separate each description with a ;
              </small>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Means of Application<RequiredComponent/>
              </label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id="means_of_application"
                name="means_of_application"
                rows={4}
                placeholder="Email, Link, CV Drop"
                required
                value={job.means_of_application}
                onChange={(e) =>
                  setJob({
                    ...job,
                    means_of_application: e.target.value,
                  })
                }
              >
              </textarea>
            </div>
          </div>

          <div className="px-4 py-3 text-right sm:px-6">
            <button type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default Create