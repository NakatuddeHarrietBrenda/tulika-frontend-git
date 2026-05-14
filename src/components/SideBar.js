// import React from "react";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div style={styles.sidebar}>
//       <div style={styles.logo}>✈ Tulika Admin</div>

//       <NavLink to="/" style={nav}>
//         📊 Dashboard
//       </NavLink>

//       <NavLink to="/bookings" style={nav}>
//         🧳 Bookings
//       </NavLink>

//       <NavLink to="/customers" style={nav}>
//         👤 Customers
//       </NavLink>

//       <NavLink to="/packages" style={nav}>
//         📦 Packages
//       </NavLink>
//     </div>
//   );
// };

// export default Sidebar;

// const styles = {
//   sidebar: {
//     width: "260px",
//     height: "100vh",
//     position: "fixed",
//     left: 0,
//     top: 0,
//     background: "#111827",
//     color: "white",
//     padding: "20px",
//   },

//   logo: {
//     fontSize: "20px",
//     fontWeight: "bold",
//     marginBottom: "30px",
//   },
// };

// const nav = ({ isActive }) => ({
//   display: "block",
//   padding: "12px",
//   marginBottom: "10px",
//   borderRadius: "10px",
//   textDecoration: "none",
//   color: isActive ? "white" : "#9ca3af",
//   background: isActive ? "#1f2937" : "transparent",
//   transition: "0.2s",
// });