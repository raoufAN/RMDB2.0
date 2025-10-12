import { CiSettings } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { FiTv } from "react-icons/fi";
import { BsFillPeopleFill, BsGrid1X2 } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { LiaCommentSolid } from "react-icons/lia";
import { FaBookmark } from "react-icons/fa";
import { FaStar, FaFire, FaCalendarAlt, FaChartLine, FaPlayCircle } from "react-icons/fa";

export const navBarTitles = [
  {
    name: "Menu",
    items: [
      { icon: FaHome, title: "Home", list: [] },
      {
        icon: MdLocalMovies,
        title: "Movie",
        list: [
          { title: "Popular", icon: FaFire }, // /movie/popular
          { title: "Top Rated ", icon: FaStar }, // /movie/top_rated
          { title: "Upcoming", icon: FaCalendarAlt }, // /movie/upcoming
          { title: "Now Playing", icon: FaPlayCircle }, // /movie/now_playing
          { title: "Trending Movie This Week", icon: FaChartLine }, // /trending/movie/week
        ],
      },
      {
        icon: FiTv,
        title: "Series",
        list: [
          { title: "Popular", icon: FaFire }, // /tv/popular
          { title: "Top Rated", icon: FaStar }, // /tv/top_rated
          { title: "On The Air", icon: FaCalendarAlt }, // /tv/on_the_air
          { title: "Trending Serie This Week", icon: FaChartLine }, // /trending/tv/week
        ],
      },
      { icon: BsFillPeopleFill, title: "People", list: [] },
      {
        icon: BsGrid1X2,
        title: "Genres",
        list: [
          {
            icon: FiTv,
            title: "Series",
          },
          {
            icon: MdLocalMovies,
            title: "Movie",
          },
        ],
      },
    ],
  },
  {
    name: "Library",
    items: [
      { icon: FaBookmark, title: "Watchlist", list: [] },
      { icon: MdFavorite, title: "Favorites", list: [] },
      { icon: LiaCommentSolid, title: "Comments", list: [] },
    ],
  },
  {
    name: "General",
    items: [
      { icon: CiSettings, title: "Setting", list: [] },
      // { icon: MdOutlineDarkMode, title: "Mode", list: [] },
      { icon: BiLogOut, title: "Log Out", list: [] },
    ],
  },
];

export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const TMDB_IMAGE_ORIGINAL = "https://image.tmdb.org/t/p/original";
