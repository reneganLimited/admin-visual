import { Auth } from "aws-amplify";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { removeAuthTokens } from "../../Login";
import { setLoggedIn } from "../../redux/slices/AdminSlice";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RiUserSearchFill } from "react-icons/ri";
import { GrAddCircle, GrSearch, GrTransaction } from "react-icons/gr";
import { IoCardSharp } from "react-icons/io5";
import { MdAccountBalanceWallet, MdPolicy } from "react-icons/md";
import { ReactNode, useEffect, useState } from "react";
import { CgBell } from "react-icons/cg";
import { BsBank } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbLayersSubtract } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { FaSuperpowers, FaUserLarge } from "react-icons/fa6";
import { getSeasonalLogo } from "../../utils/helper";
import { RootState } from "../../redux/store";
interface ITab {
  id: number
  tabName: string
  tabIcon: ReactNode
  disable?: Boolean
  path: string
  onClick: (e: any) => void
}

interface iSideBar {
  isOpen: Boolean
  handleClick: () => void
  KYCState?: string
}

const getUserTabs = (group: string, allTabs: ITab[]) => {
  switch (group) {
    case "SuperAdmin":
      return allTabs
    case "CardOperations":
      return allTabs.filter((tab) =>
        ["/kyc", "/announcements", "/cards", "/customer"].includes(tab.path)
      )
    case "FxTrader":
      return allTabs.filter((tab) =>
        ["/treasury", "/vendors"].includes(tab.path)
      )
    case "Developers":
      return allTabs.filter((tab) =>
        ["/kyc", "/announcements", "/aml", "/transaction-lookup"].includes(
          tab.path
        )
      )
    case "Admin":
      return allTabs.filter((tab) => !["/treasury", "/v4"].includes(tab.path))
    case "CustomerSupport":
      return allTabs.filter((tab) =>
        [
          "/kyc",
          "/policy",
          "/customer",
          "/cards",
          "/transaction-lookup",
        ].includes(tab.path)
      )
    case "FraudAnalyst":
      return allTabs.filter(
        (tab) =>
          ![
            "/treasury",
            "/announcements",
            "/vendors",
            "/v4",
            "/create-transaction",
          ].includes(tab.path)
      )
    default:
      return []
  }
}

export default function SideBar(props: iSideBar) {
  const dispatch = useDispatch();
  const { isOpen, handleClick } = props;
  const navigate = useNavigate();
  const [userGroup, setUserGroup] = useState('');
  const [tabs, setTabs] = useState<ITab[]>([]);
  const {loggedin} = useSelector((state: RootState) => state.admin);

  const allTabs: ITab[] = [
    {
      id: 1,
      tabName: "Transactions",
      tabIcon: <GrTransaction />,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
      disable: false,
    },
    {
      id: 2,
      tabName: "Lookup Transaction",
      tabIcon: <GrSearch />,
      onClick: () => navigate("/transaction-lookup"),
      path: "/transaction-lookup",
      disable: false,
    },
    // {
    //   id: 3,
    //   tabName: "Create Transaction",
    //   tabIcon: <GrAddCircle />,
    //   onClick: () => navigate("/create-transaction"),
    //   path: "/create-transaction",
    //   disable: false,
    // },
    {
      id: 4,
      tabName: "KYC",
      tabIcon: <RiUserSearchFill />,
      onClick: () => navigate("/kyc"),
      path: "/kyc",
      disable: false,
    },
    {
      id: 5,
      tabName: "AML",
      tabIcon: <IoIosWarning />,
      onClick: () => navigate("/aml"),
      path: "/aml",
      disable: false,
    },
    {
      id: 6,
      tabName: "Customer",
      tabIcon: <FaUserLarge />,
      onClick: () => navigate("/customer"),
      path: "/customer",
      disable: false,
    },
    {
      id: 7,
      tabName: "Cards",
      tabIcon: <IoCardSharp />,
      onClick: () => navigate("/cards"),
      path: "/cards",
      disable: false,
    },
    {
      id: 8,
      tabName: "Virtual Account",
      tabIcon: <MdAccountBalanceWallet />,
      onClick: () => navigate("/virtual-account"),
      path: "/virtual-account",
      disable: false,
    },
    {
      id: 9,
      tabName: "Policy",
      tabIcon: <MdPolicy />,
      onClick: () => navigate("/policy"),
      path: "/policy",
      disable: false,
    },
    {
      id: 10,
      tabName: "Vendors",
      tabIcon: <TbLayersSubtract />,
      onClick: () => navigate("/vendors"),
      path: "/vendors",
      disable: false,
    },
    {
      id: 11,
      tabName: "Treasury",
      tabIcon: <BsBank />,
      onClick: () => navigate("/treasury"),
      path: "/treasury",
      disable: false,
    },
    {
      id: 12,
      tabName: "V4",
      tabIcon: <FaSuperpowers />,
      onClick: () => navigate("/v4"),
      path: "/v4",
      disable: false,
    },
    {
      id: 13,
      tabName: "Announcements",
      tabIcon: <CgBell />,
      onClick: () => navigate("/announcements"),
      path: "/announcements",
      disable: false,
    },
  ]

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        const groups =
          user.signInUserSession.accessToken.payload["cognito:groups"]
        const group = groups ? groups[0] : ""
        setUserGroup(group)
        setTabs(getUserTabs(group, allTabs))
      })
      .catch(() => setTabs([]))
  }, [])

  const handleLogout = async() => {
    removeAuthTokens();
    dispatch(setLoggedIn(false));
    await Auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    if (!loggedin) {
      navigate("/login");
    }
  }
  , [loggedin, navigate]);


  return (
    <section
      onClick={handleClick}
      id="sideBar"
      className={`w-[290px] sm:w-[320px] z-50 lg:sticky bg-black h-screen fixed top-0 left-0 transform delay-0 ${isOpen ? "translate-x-0" : "-translate-x-[300%] lg:translate-x-0"} transition-transform duration-300 ease-in overflow-y-auto`}
    >
      <div className="flex items-center justify-between">
        <div className="p-4 cursor-pointer">
          <img src={getSeasonalLogo()} alt="logo" />
        </div>
        <button className="pr-[1.66rem] lg:hidden">
          <FaTimes />
        </button>
      </div>
      <nav className="text-[14px] text-[#EBF0F0] leading-[4em] font-bold px-9 md:mt-12 mb-16">
        {tabs.map((tab, index) => (
          <div className="relative" key={index}>
            <NavLink
              data-test="sidenav"
              onClick={handleClick}
              to={tab.path}
              style={
                tab.disable
                  ? {pointerEvents: "none", color: "#A9A9A9"}
                  : undefined
              }
              className={({isActive}) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
            >
              <span className="text-[20px]">{tab.tabIcon}</span>
              <span className="cursor-pointer">{tab.tabName}</span>
              {tab.disable && (
                <div className="absolute right-[-1rem] sm:right-[3rem] lg:right-[-1rem] top-0">
                  <span
                    data-test="Request Access"
                    className="bg-green-600 text-white rounded-lg px-[0.5rem] py-[0.2rem] text-[.5rem]"
                  >
                    Request Access
                  </span>
                </div>
              )}
            </NavLink>
          </div>
        ))}
        <button
          className="flex items-center gap-4 mt-16 text-[#FF0000]"
          onClick={handleLogout}
        >
          <span className="text-[20px]">
            <RiLogoutCircleLine />
          </span>
          <span>Logout</span>
        </button>
      </nav>
    </section>
  )
}
