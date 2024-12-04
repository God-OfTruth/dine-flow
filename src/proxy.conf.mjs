export default [
  {
    context: ["/api", "/public", "/auth", "/chat", "/login"],
    target: "http://localhost:8080",
    secure: false,
    changeOrigin: true,
    ws: true,
    xfwd: false,
  },
];
