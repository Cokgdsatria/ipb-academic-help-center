export default function IPBLogo({ size = 40, white = false }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 ${
        white ? 'border-white bg-white' : 'border-blue-700 bg-white'
      } overflow-hidden`}
      style={{ width: size, height: size, minWidth: size }}
    >
      <img
        src="/logo-ipb.png"
        alt="IPB Logo"
        style={{
          width: size - 8,
          height: size - 8,
          objectFit: "contain"
        }}
      />
    </div>
  );
}