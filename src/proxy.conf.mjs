export default [
  {
    context: ["/api", "/public", "/auth", "/chat", "/login"],
    // target: "http://localhost:8080",
    target: "https://dineflow-production.up.railway.app",
    secure: false,
    changeOrigin: true,
    ws: true,
    xfwd: false,
  },
];
