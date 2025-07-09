import React, { useState } from "react";
import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";

const allCourses = [
  {
    id: 1,
    title: "React.js for Beginners",
    description: "Start building dynamic web apps with React.",
    image: "https://source.unsplash.com/400x300/?reactjs,code",
    category: "Frontend",
    department: "IT",
    facultyAvailable: true,
    duration: "1–3 months",
    price: "Free",
  },
  {
    id: 2,
    title: "Full Stack with MERN",
    description: "Master MongoDB, Express, React, and Node.js.",
    image: "https://source.unsplash.com/400x300/?mern,developer",
    category: "Full Stack",
    department: "IT",
    facultyAvailable: false,
    duration: "> 3 months",
    price: "Paid",
  },
  {
    id: 3,
    title: "Communication Skills",
    description: "Improve your verbal and non-verbal communication.",
    image: "https://source.unsplash.com/400x300/?softskills,communication",
    category: "Non-Tech",
    department: "Non-IT",
    facultyAvailable: true,
    duration: "< 1 month",
    price: "Free",
  },
];

const Courses = () => {
  const [filters, setFilters] = useState({
    category: [],
    department: [],
    faculty: [],
    duration: [],
    price: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleCheckboxChange = (filterType, value) => {
    setFilters((prev) => {
      const currentValues = prev[filterType];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: updatedValues };
    });
  };

  const handleClearFilters = () => {
    setFilters({
      category: [],
      department: [],
      faculty: [],
      duration: [],
      price: [],
    });
    setSearchTerm("");
    setSortKey("");
  };

  const handleSort = (a, b) => {
    if (sortKey === "title") return a.title.localeCompare(b.title);
    if (sortKey === "price") return a.price.localeCompare(b.price);
    if (sortKey === "duration") return a.duration.localeCompare(b.duration);
    return 0;
  };

  const filteredCourses = allCourses
    .filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        filters.category.length === 0 ||
        filters.category.includes(course.category);

      const matchesDepartment =
        filters.department.length === 0 ||
        filters.department.includes(course.department);

      const matchesFaculty =
        filters.faculty.length === 0 ||
        (filters.faculty.includes("Available") && course.facultyAvailable) ||
        (filters.faculty.includes("Unavailable") && !course.facultyAvailable);

      const matchesDuration =
        filters.duration.length === 0 ||
        filters.duration.includes(course.duration);

      const matchesPrice =
        filters.price.length === 0 || filters.price.includes(course.price);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDepartment &&
        matchesFaculty &&
        matchesDuration &&
        matchesPrice
      );
    })
    .sort(handleSort);

  const FilterSection = () => (
    <div className="border rounded p-4 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Filter Courses</h2>
      {[
        { label: "Category", name: "category", values: ["Frontend", "Backend", "Full Stack", "Non-Tech"] },
        { label: "Department", name: "department", values: ["IT", "Non-IT"] },
        { label: "Faculty", name: "faculty", values: ["Available", "Unavailable"] },
        { label: "Duration", name: "duration", values: ["< 1 month", "1–3 months", "> 3 months"] },
        { label: "Price", name: "price", values: ["Free", "Paid"] },
      ].map(({ label, name, values }) => (
        <div key={name} className="mb-4">
          <h3 className="font-semibold mb-1">{label}</h3>
          {values.map((val) => (
            <label key={val} className="block text-sm">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(name, val)}
                checked={filters[name].includes(val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ))}
      <button
        className="bg-red-500 text-white mt-4 px-4 py-2 rounded hover:bg-red-600 transition"
        onClick={handleClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-800">Courses</h1>
        <p className="text-gray-600 mt-2">Browse our curated list of learning paths</p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row justify-between px-6 md:px-20 mt-8 gap-4">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          className="border p-2 rounded w-full md:w-1/4"
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="title">Title (A-Z)</option>
          <option value="duration">Duration</option>
          <option value="price">Price</option>
        </select>

        {/* Toggle filter for small screens only */}
        <button
          className="md:hidden bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Mobile Filter Dropdown */}
      {showMobileFilters && (
        <div className="md:hidden px-6 md:px-20 mt-6">
          <FilterSection />
        </div>
      )}

      {/* Desktop View - Filters + Results */}
      <div className="flex flex-col md:flex-row px-6 md:px-20 mt-10 gap-6">
        {/* Filters Left */}
        <div className="hidden md:block w-full md:w-1/4">
          <FilterSection />
        </div>

        {/* Results Right */}
        <div className="w-full md:w-3/4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Filtered Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No courses match your filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
