// import React, { useState } from "react";
// import { useTheme } from "../Context/ThemeContext";

// const Topbar = ({ onSearch }) => {
//   const { darkMode, toggleTheme } = useTheme();

//   const [profileOpen, setProfileOpen] = useState(false);
//   const [notifOpen, setNotifOpen] = useState(false);

//   return (
//     <div style={{ ...styles.topbar, background: darkMode ? "#111827" : "white" }}>

//       {/* SEARCH */}
//       <input
//         placeholder="Search bookings..."
//         style={styles.search}
//         onChange={(e) => onSearch(e.target.value)}
//       />

//       <div style={styles.right}>

//         {/* DARK MODE */}
//         <button onClick={toggleTheme} style={styles.btn}>
//           {darkMode ? "🌞" : "🌙"}
//         </button>

//         {/* NOTIFICATIONS */}
//         <div style={styles.icon} onClick={() => setNotifOpen(!notifOpen)}>
//           🔔
//           <span style={styles.badge}>3</span>

//           {notifOpen && (
//             <div style={styles.dropdown}>
//               <p>New booking received</p>
//               <p>Payment confirmed</p>
//               <p>New customer registered</p>
//             </div>
//           )}
//         </div>

//         {/* PROFILE */}
//         <div style={styles.profile} onClick={() => setProfileOpen(!profileOpen)}>
//           <div style={styles.avatar}>A</div>

//           {profileOpen && (
//             <div style={styles.dropdown}>
//               <p>Settings</p>
//               <p>Profile</p>
//               <p style={{ color: "red" }}>Logout</p>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Topbar;

// const styles = {
//   topbar: {
//     height: "60px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "0 20px",
//     borderBottom: "1px solid #eee",
//     position: "sticky",
//     top: 0,
//     zIndex: 1000,
//   },

//   search: {
//     width: "300px",
//     padding: "10px",
//     borderRadius: "10px",
//     border: "1px solid #ddd",
//   },

//   right: {
//     display: "flex",
//     alignItems: "center",
//     gap: "20px",
//   },

//   icon: {
//     position: "relative",
//     cursor: "pointer",
//   },

//   badge: {
//     position: "absolute",
//     top: "-5px",
//     right: "-8px",
//     background: "red",
//     color: "white",
//     fontSize: "10px",
//     width: "15px",
//     height: "15px",
//     borderRadius: "50%",
//     textAlign: "center",
//   },

//   profile: {
//     position: "relative",
//     cursor: "pointer",
//   },

//   avatar: {
//     width: "35px",
//     height: "35px",
//     borderRadius: "50%",
//     background: "#111827",
//     color: "white",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   dropdown: {
//     position: "absolute",
//     top: "45px",
//     right: 0,
//     background: "white",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//     padding: "10px",
//     borderRadius: "10px",
//     width: "160px",
//   },

//   btn: {
//     padding: "6px 10px",
//     borderRadius: "8px",
//     border: "none",
//     cursor: "pointer",
//   },
// };