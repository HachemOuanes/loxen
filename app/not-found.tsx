export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Not Found</h2>
      <p className="text-gray-600 mb-4">Could not find requested resource</p>
      <a
        href="/"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Return Home
      </a>
    </div>
  )
}
