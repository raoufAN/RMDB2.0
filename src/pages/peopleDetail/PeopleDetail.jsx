import { useParams } from "react-router-dom";
import { useGetDetailPeopleQuery } from "../../Redux/TmdbApi";
import Container from "../../components/Container/Container";
import { BsTvFill } from "react-icons/bs";
import { TMDB_IMAGE_BASE } from "../../data/data";
import {
  FaAward,
  FaCalendar,
  FaCamera,
  FaExternalLinkAlt,
  FaMapPin,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { useState } from "react";
import ImagesSection from "./ImagesSection";
import Acting from "./Acting";
import Loading from "../../components/fetchHandler/Loading";
import Erorre from "../../components/fetchHandler/Erorre";

const PeopleDetail = () => {
  const [readMore, setReadMore] = useState(false);
  const { person_id } = useParams();
  const { data, error, isLoading } = useGetDetailPeopleQuery({ person_id });

  const getGender = (gender) => {
    switch (gender) {
      case 1:
        return "Female";
      case 2:
        return "Male";
      case 3:
        return "Non-binary";
      default:
        return "Not specified";
    }
  };

  const calculateAge = (birthday, deathday) => {
    const birth = new Date(birthday);
    const end = deathday ? new Date(deathday) : new Date();
    const age = end.getFullYear() - birth.getFullYear();
    const monthDiff = end.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) return <Loading />;
  if (error) return <Erorre />;

  return (
    <div className="">
      <Container>
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-start gap-4 pt-10">
          <div className="w-68 h-[400px] rounded bg-[#121212] flex-shrink-0">
            {data?.profile_path ? (
              <img
                src={`${TMDB_IMAGE_BASE}/${data.profile_path}`}
                alt={data.title || data.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <BsTvFill className="w-6 h-6" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-4xl lg:text-5xl font-bold mb-4 uppercase italic">
              {data.title || data.name}
            </h3>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <FaAward className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold">Known for:</span>
                  <span className="">{data.known_for_department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">Gender:</span>
                  <span className="">{getGender(data.gender)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendar className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">Born:</span>
                  <span className="">
                    {formatDate(data.birthday)}
                    {data.deathday
                      ? ` (Age ${calculateAge(data.birthday, data.deathday)})`
                      : ` (Age ${calculateAge(data.birthday)})`}
                  </span>
                </div>
                {data.deathday && (
                  <div className="flex items-center gap-2">
                    <FaCalendar className="w-5 h-5 text-red-500" />
                    <span className="font-semibold">Died:</span>
                    <span className="">{formatDate(data.deathday)}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-start gap-2">
                  <FaMapPin className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div className="flex flex-wrap gap-1">
                    <span className="font-semibold">Place of birth:</span>
                    <p className="">{data.place_of_birth}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold">Popularity:</span>
                  <span className="">{data.popularity.toFixed(1)}</span>
                </div>
                {data.homepage && (
                  <div className="flex items-center gap-2">
                    <FaExternalLinkAlt className="w-5 h-5 text-blue-500" />
                    <a
                      href={data.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors">
                      Official Website
                    </a>
                  </div>
                )}
              </div>
            </div>
            {data.also_known_as.length > 0 && (
              <div className="my-6">
                <h3 className="text-lg font-semibold mb-2">Also Known As</h3>
                <div className="flex flex-wrap gap-2">
                  {data.also_known_as.slice(0, 5).map((name, index) => (
                    <span
                      key={index}
                      className="bg-[#3590F3] text-white px-3 py-1 rounded-full text-sm">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold mb-3">Biography</h3>
              <div className=" leading-relaxed">
                {data.biography ? (
                  <div>
                    {readMore ? data.biography : data.biography.slice(0, 200)}
                    {data.biography.length > 200 ? (
                      <span
                        className="text-[#3590F3] mx-5 cursor-pointer"
                        onClick={() => setReadMore((prev) => !prev)}>
                        {readMore ? "ReadLess..." : "ReadMore..."}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <p className="italic">No biography available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="py-12">
          <h2 className="text-3xl font-bold  mb-6 flex items-center gap-2">
            <FaCamera className="w-8 h-8 text-pink-400" />
            Photos
          </h2>
          <ImagesSection person_id={data.id} person_name={data.name} />
        </div>
        <div className="pb-12">
          <Acting person_id={data.id} />
        </div>
      </Container>
    </div>
  );
};

export default PeopleDetail;
